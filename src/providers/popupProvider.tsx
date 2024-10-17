'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import PopupCard from '../_molecules/popupCard/popupCard';

type PopUp = {
    message: string;
    color: string;
    uptime: number;
};

type PopupContextType = {
    popups: PopUp[];
    addPopup: (popup: PopUp) => void;
};

const PopupContext = createContext<PopupContextType>({
    popups: [],
    addPopup: () => { },
});


interface PopupMachineProps {
    children: ReactNode;
}

export default function PopupProvider({ children }: PopupMachineProps) {
    const [popups, setPopups] = useState<PopUp[]>([]);

    const addPopup = (popup: PopUp) => {
        setPopups((prevPopups) => [...prevPopups, popup]);
    };

    function renderPopups() {
        return popups.map((popup, index) => (
            <PopupCard
                key={index}
                message={popup.message}
                color={popup.color}
                uptime={popup.uptime}
            />
        ));
    }

    return (
        <PopupContext.Provider value={{ popups, addPopup }}>
            <div style={{ 'position': 'fixed', 'top': '10px', 'display': 'flex', 'flexDirection': 'column', 'width': '100%', 'pointerEvents': 'none', 'zIndex': '2' }}>{renderPopups()}</div>
            {children} 
        </PopupContext.Provider>
    );
}

export const usePopup = () => useContext(PopupContext);
