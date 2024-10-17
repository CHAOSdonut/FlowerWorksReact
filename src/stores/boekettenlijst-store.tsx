import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { Boeket } from '../models/boeketmodel';
import { boekettenActions } from '../actions/boekettenActions';
import { produce } from 'immer';

export type sortOrder = "default" | "mostLikes";

export type BoekettenlijstState = {
    boekettenlijst: Array<Boeket>
    masonrySortOrder: sortOrder;
};

export type BoekettenlijstStoreActions = {
    likeBoeket: (id: Boeket["id"]) => void;
    fetchBoekettenlijst: (orderBy: sortOrder) => Promise<void>;
    setMasonrySortOrder: (orderBy: sortOrder) => void;
};

export type BoekettenlijstStore = BoekettenlijstState & BoekettenlijstStoreActions;

export const defaultInitState: BoekettenlijstState = {
    boekettenlijst: [],
    masonrySortOrder: "default",
};

// Immer producers
const likeBoeketProducer = produce((draft, id) => {
    const boeket: Boeket = draft.boekettenlijst.find((boeket: Boeket) => boeket.id === id);

    if (boeket) {
 
        boeket.likes++;
    }
});

const dislikeBoeketProducer = produce((draft, id) => {
    const boeket: Boeket = draft.boekettenlijst.find((boeket: Boeket) => boeket.id === id);

    if (boeket) {
        boeket.likes--;
    }
});

export const createBoekettenlijstStore = (
    initState: BoekettenlijstState = defaultInitState
) => {
    return createStore<BoekettenlijstStore>()(
        devtools(
            (set) => ({
                ...initState,

                fetchBoekettenlijst: async (orderBy: sortOrder) => {
                    try {
                        const response = await boekettenActions.getBoeketten(orderBy);
                        set({ boekettenlijst: response }, false, "fetchBoekettenlijst");
                    } catch (error) {
                        console.error("Error fetching Boekettenlijst:", error);
                    }
                },

                likeBoeket: async (id: Boeket["id"]) => {
                    set((state) =>
                        likeBoeketProducer(state, id)
                    )

                    try {
                        await boekettenActions.likeBoeket(id);
                    } catch (error) {
                        console.error(`Error liking boeket with id: ${id}`, error);

                        set((state) =>
                            dislikeBoeketProducer(state, id)
                        )
                    }
                },

                setMasonrySortOrder: (orderBy: sortOrder) => {
                    set(produce((draft) => {
                        draft.masonrySortOrder = orderBy
                    }))
                }
            }),
            { name: "BoekettenlijstStore" }
        )
    );
};
