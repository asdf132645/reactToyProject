import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

type InitialState = ReturnType<typeof getDefaultInitialState>;
type StoreAction = {
    setUserName: (userName: string) => void;
    setLogin: (login: boolean) => void;
};

const getDefaultInitialState = () => ({
    userName: '',
    login: false,
});

export const useStore = create(
    persist<InitialState & StoreAction>(
        (set) => ({
            ...getDefaultInitialState(),
            setUserName: (userName: string) => set({ userName }),
            setLogin: (login: boolean) => set({ login }),
        }),
        {
            name: 'account',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);