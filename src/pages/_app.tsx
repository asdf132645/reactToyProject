import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Default } from '../layout/default';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { storeRedux } from '@/common/lib/redux';
import {useStore} from '@/common/lib/store';

const client = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const App = (appProps: AppProps) => {
    const router = useRouter();
    const {login} = useStore();
    const [isHydrated, setIsHydrated] = useState(false);

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