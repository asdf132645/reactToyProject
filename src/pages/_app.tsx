import {Hydrate, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import type {AppProps} from 'next/app';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import { Default } from '../layout/default';
import React, {useEffect, useState} from 'react';

const client = new QueryClient({
    defaultOptions: {queries: {refetchOnWindowFocus: false}},
});

export default function App(appProps: AppProps) {



    return (
        <>
            <QueryClientProvider client={client}>
                <Hydrate state={appProps.pageProps.dehydratedState}>
                    <ReactQueryDevtools initialIsOpen={false}/>
                    <Default {...appProps} />
                </Hydrate>
            </QueryClientProvider>
        </>
    );
}
