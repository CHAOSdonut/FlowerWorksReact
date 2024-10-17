'use client';

import { FormEvent, ChangeEventHandler, useState, useContext } from 'react';
import { useRouter } from 'next/navigation'
import styles from './uploadboeketfrom.module.scss';
import { boekettenActions } from '../../actions/boekettenActions';
import { usePopup } from '../../providers/popupProvider';

export default function UploadBoeketForm() {
    const [selectedImage, setSelectedImage] = useState<File>();
    const [previewImgUrl, setPreviewimgUrl] = useState('');
    const [boeketName, setBoeketName] = useState('');

    const router = useRouter();
    const { addPopup } = usePopup();

    const resizeMaxWidth = 500;
    const resizeMaxHeight = 500;

    const fileToDataString = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onerror = (error) => reject(error);
            reader.onload = () => resolve(reader.result as string);
        });
    };

    const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<File> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (event) => {
                img.src = event.target?.result as string;

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth || height > maxHeight) {
                        if (width / height > maxWidth / maxHeight) {
                            height = Math.round((height * maxWidth) / width);
                            width = maxWidth;
                        } else {
                            width = Math.round((width * maxHeight) / height);
                            height = maxHeight;
                        }

                        addPopup({
                            message: 'Afbeelding te groot, herschaalt naar: ' + width + 'x' + height,
                            color: '#EEE',
                            uptime: 6000,
                        })
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx?.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        if (blob) {
                            const resizedFile = new File([blob], file.name, {
                                type: file.type,
                                lastModified: Date.now(),
                            });
                            resolve(resizedFile);
                        } else {
                            reject(new Error('Canvas conversion to blob failed'));
                        }
                    }, file.type);
                };

                img.onerror = reject;
            };
        });
    };

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
        const file = event.target.files as FileList;
        const selectedFile = file?.[0];
        if (!selectedFile) {
            return;
        }
        try {
            const resizedFile = await resizeImage(selectedFile, resizeMaxWidth, resizeMaxHeight);
            setSelectedImage(resizedFile);

            const imgUrl = await fileToDataString(resizedFile);
            setPreviewimgUrl(imgUrl);
        } catch (error) {
            console.log(error);
        }
    };

    const handleNameChange = (event: FormEvent<HTMLInputElement>) => {
        setBoeketName(event.currentTarget.value);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!selectedImage || !boeketName) {
            console.log('Form is incomplete');
            return;
        }

        await boekettenActions.uploadBoeket(boeketName, selectedImage).then(() => {
            addPopup({
                message: 'Uploaded successfully!',
                color: '#33FF33',
                uptime: 2000,
            });
            router.push('/');
        }).catch((e) => addPopup({
            message: 'Upload failed: ' + e,
            color: 'red',
            uptime: 4000,
        }));
    };

    return (
        <div className={styles.formWrapper}>
            <form className={styles.uploadBoeketForm} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                    <div className={ styles.labelWrapper }>
                        <label>Boeket naam:</label>
                        <label><span className={ styles.secondLabel }>Onder deze naam verschijnt uw boeket op de website</span></label>
                    </div>
                    <input
                        type="text"
                        value={boeketName}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div className={styles.formRow}>
                    <div className={styles.labelWrapper}>
                        <label>Upload een boeket afbeelding:</label>
                        <label><span className={styles.secondLabel}>Max grootte: 500x500</span></label>
                    </div>
                    <input
                        type="file"
                        required
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                {previewImgUrl && (
                    <img
                        className={styles.imagePreview}
                        src={previewImgUrl}
                        alt="Boeket Preview"
                    />
                )}
                <div className={styles.formRow}>
                    <input
                        type="submit"
                        value="Upload"
                        className={styles.formButton}
                    />
                </div>
            </form>
        </div>
    );
}
