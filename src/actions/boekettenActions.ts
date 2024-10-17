import { Boeket } from "../models/boeketmodel";
import apiFetch from "../providers/apiClient"

class BoekettenActions {
    async getBoeketten(orderBy: string): Promise<Array<Boeket>> {
        try {
            const response = await apiFetch(`/Boekettenlijst/Get/?orderBy=` + orderBy, { method: 'GET'});
            return response.json();
        } catch (error) {
            console.error("Error fetching Boeketten data:", error);
            return await Promise.reject(error);
        }
    }

    async likeBoeket(id: Boeket["id"]): Promise<void> {
        try {
            await apiFetch('/Boekettenlijst/LikeBoeket?id=' + id, { method: 'POST'});
            return;
        } catch (error) {
            console.error("Error liking Boeket:", error);
            return await Promise.reject(error);   
        }
    }

    async uploadBoeket(boeketName: string, selectedImage: File): Promise<void> {

        const formData = new FormData();
        formData.append('boeketName', boeketName);
        formData.append('image', selectedImage); 

        try {
            const response = await apiFetch('/boekettenlijst/addboeket', {
                method: 'POST',
                body: formData,
            });

            console.log('Boeket uploaded successfully:', response.json());
            return;
        } catch (error) {
            console.error('Error uploading boeket:', error);
            return await Promise.reject(error);
        }
    };
}

export const boekettenActions = new BoekettenActions();
