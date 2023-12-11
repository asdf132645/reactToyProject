import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

type InitialState = ReturnType<typeof getDefaultInitialState>;
type StoreAction = {
    setUserName: (userName: string) => void;
    setLogin: (login: boolean) => void;
    setCompanyId: (companyId: string) => void;
    setUserId: (userId: string) => void;
};

const getDefaultInitialState = () => ({
    userName: '',
    login: false,
    companyId: '',
    userId: '',
});

export const useStore = create(
    persist<InitialState & StoreAction>(
        (set) => ({
            ...getDefaultInitialState(),
            setUserName: (userName: string) => set({ userName }),
            setLogin: (login: boolean) => set({ login }),
            setCompanyId: (companyId: string) => set({companyId}, false),
            setUserId: (userId) => set({userId}, false),
        }),
        {
            name: 'account',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);