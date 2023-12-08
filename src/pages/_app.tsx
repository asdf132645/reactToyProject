import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Default } from '../layout/default';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {Provider, useDispatch} from 'react-redux';
import { storeRedux } from '@/common/lib/redux';
import {useStore} from '@/common/lib/store';
import {setLoggedIn, setLoggedOut} from '@/common/lib/authSlice';

// 리덕스 사용 예
const dispatch = useDispatch();


const client = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const App = (appProps: AppProps) => {
    const router = useRouter();
    const {login} = useStore();
    const [isHydrated, setIsHydrated] = useState(false);


    //로그인 버튼이 있는 가정으로 작성 로그인 페이지 추후 다시 작성예정 호출 하면 전역으로 데이터 관리 가능
    // const handleLogin = () => {
    //     dispatch(setLoggedIn());
    // };
    //
    // const handleLogout = () => {
    //     dispatch(setLoggedOut());
    // };





    useEffect(() => {

        if (!login) {
            router.push('/login');
        } else {
            setIsHydrated(true);
        }
    }, []);

    if (!isHydrated) {
        return <p>Loading...</p>;
    }

    return (
        <Provider store={storeRedux}>
            <QueryClientProvider client={client}>
                <Hydrate state={appProps.pageProps.dehydratedState}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <Default {...appProps} />
                </Hydrate>
            </QueryClientProvider>
        </Provider>
    );
};

export default App;