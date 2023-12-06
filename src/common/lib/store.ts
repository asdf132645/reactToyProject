import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

type InitialState = ReturnType<typeof getDefaultInitialState>;
type StoreAction = {
    setUserName: (userName: string) => void;
};

const getDefaultInitialState = () => ({
    userName: '',
});

export const useStore = create(
    persist<InitialState & StoreAction>(
        (set) => ({
            ...getDefaultInitialState(),
            setUserName: (userName) => set({ userName }),
        }),
        {
            name: 'account',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);