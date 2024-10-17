'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type BoekettenlijstStore, createBoekettenlijstStore } from '../stores/boekettenlijst-store'

export type BoekettenlijstStoreApi = ReturnType<typeof createBoekettenlijstStore>

export const BoekettenlijstStoreContext = createContext<BoekettenlijstStoreApi | undefined>(
    undefined,
)

export interface BoekettenlijstStoreProviderProps {
    children: ReactNode
}

export const BoekettenlijstStoreProvider = ({
    children,
}: BoekettenlijstStoreProviderProps) => {
    const storeRef = useRef<BoekettenlijstStoreApi>()
    if (!storeRef.current) {
        storeRef.current = createBoekettenlijstStore()
    }

    return (
        <BoekettenlijstStoreContext.Provider value={storeRef.current}>
            {children}
        </BoekettenlijstStoreContext.Provider>
    )
}

export const useBoekettenlijstStore = <T,>(
    selector: (store: BoekettenlijstStore) => T,
): T => {
    const boekettenlijstStoreContext = useContext(BoekettenlijstStoreContext)

    if (!boekettenlijstStoreContext) {
        throw new Error(`useBoekettenlijstStore must be used within BoekettenlijstStoreProvider`)
    }

    return useStore(boekettenlijstStoreContext, selector)
}