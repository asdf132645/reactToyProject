import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

export interface Endpoint {
    requiresToken: boolean;
    endpoint: string;
}

export interface GenericObject {
    [key: string]: any;
}

export interface ApiResponse<T> {
    code: string;
    message: string;
    data: T | null;
}

interface HttpResponse<T> {
    data: ApiResponse<T>;
}

interface HttpClient {
    httpGet<T>(endpoint: Endpoint, parameters?: string): Promise<ApiResponse<T>>;
    httpPost<T>(endpoint: Endpoint, payload: GenericObject): Promise<ApiResponse<T>>;
    nonMemberLogout(): void;
    refreshTokenAct(): Promise<string>;
}

const useHttpClient = (): HttpClient => {
    const [token, setToken] = useState<string | null>('dummyToken');

    const httpGet = async <T>(endpoint: Endpoint, parameters?: string): Promise<ApiResponse<T>> => {
        try {
            let isRreturnGet: boolean = false;

            if (endpoint.requiresToken) {
                isRreturnGet = false;
            }

            const response = await axios.get<HttpResponse<T>>(endpoint.endpoint + (parameters ? `?${parameters}` : ''));
            return httpGetAct(endpoint, token, parameters, isRreturnGet);
        } catch (error) {
            console.error('httpGet Error:', error);
            throw new Error('Failed to fetch data.');
        }
    };

    const httpPost = async <T>(endpoint: Endpoint, payload: GenericObject): Promise<ApiResponse<T>> => {
        try {
            let isRreturn: boolean = false;
            if (endpoint.requiresToken) {
                isRreturn = false;
            } else {
                // Check expiration logic and refresh token if needed
            }
            return httpPostAct(endpoint, token, payload, isRreturn);
        } catch (error) {
            console.error('httpPost Error:', error);
            throw new Error('Failed to send data.');
        }
    };

    const nonMemberLogout = (): void => {
        console.log('Logging out non-member...');
    };

    const refreshTokenAct = async (): Promise<string> => {
        try {
            const newAccessToken = 'newAccessToken';
            setToken(newAccessToken);
            return newAccessToken;
        } catch (error) {
            console.error('refreshTokenAct Error:', error);
            throw new Error('Failed to refresh token.');
        }
    };

    const httpGetAct = async <T>(
        endpoint: Endpoint,
        token: string | null,
        parameters?: string,
        isRreturnGet?: boolean
    ): Promise<ApiResponse<T>> => {
        return {
            code: 'OK',
            message: 'Success',
            data: null,
        };
    };

    const httpPostAct = async <T>(
        endpoint: Endpoint,
        token: string | null,
        payload: GenericObject,
        isRreturn: boolean
    ): Promise<ApiResponse<T>> => {
        return {
            code: 'OK',
            message: 'Success',
            data: null,
        };
    };

    return {
        httpGet,
        httpPost,
        nonMemberLogout,
        refreshTokenAct,
    };
};

export const httpClient = useHttpClient();
export const useQueryWithHttpClient = <T>(
    key: string,
    fetchFunction: () => Promise<ApiResponse<T>>,
    options?: UseQueryOptions<ApiResponse<T>, AxiosError>
) => {
    return useQuery<ApiResponse<T>, AxiosError>(key, fetchFunction, options);
};
