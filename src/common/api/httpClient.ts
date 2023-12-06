import axios, { AxiosError , AxiosRequestConfig } from 'axios';

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

const createHttpClient = (): HttpClient => {

    // 임시로 구현 실제 api 연동시 리프레시토큰 등 액세스토큰 사용시에는 구현 다르게 함
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
        try {
            if (isRreturn) {
                // Implement non-member logic or handle as needed
                return Promise.reject(new Error('휴대폰인증이 만료되었습니다. 다시 시도해 주세요.'));
            }

            const options: AxiosRequestConfig = {
                headers: {},
            };

            if (endpoint.requiresToken) {
                options.headers!.Authorization = `Bearer ${token}`;
            }
            // 실제로는 env 파일에서 셋팅한 url 이 들어가야함
            let url = '';
            url += endpoint.endpoint;
            const response: HttpResponse<T> = await axios.post(url, payload, options);

            if (response.data.code === 'OK') {
                return Promise.resolve(response.data);
            }

            return Promise.reject(new Error(response.data.message));
        } catch (error) {

            const axiosError = error as AxiosError;
            if (axiosError.response) {
                const responseData = axiosError.response.data as HttpResponse<T>;
                return Promise.reject(new Error(responseData.data?.message || 'Unknown error'));
            } else {
                return Promise.reject(new Error('요청이 실패하였습니다. (' + axiosError.message + ')'));
            }
        }
    };


    const httpGet = async <T>(endpoint: Endpoint, parameters?: string): Promise<ApiResponse<T>> => {
        try {
            let token: string | null = null;
            let isRreturnGet: boolean = false;

            if (endpoint.requiresToken) {
                token = 'dummyToken';
                isRreturnGet = false;
            }

            const response = await axios.get<HttpResponse<T>>(endpoint.endpoint + (parameters ? `?${parameters}` : ''));
            return httpGetAct(endpoint, token, parameters, isRreturnGet);
        } catch (error) {
            // 오류 핸들링
            console.error('httpGet Error:', error);
            throw new Error('Failed to fetch data.');
        }
    };

    const httpPost = async <T>(endpoint: Endpoint, payload: GenericObject): Promise<ApiResponse<T>> => {
        try {
            const response = await axios.post<HttpResponse<T>>(endpoint.endpoint, payload);
            let token: string | null = null;
            let isRreturn: boolean = false;
            if (endpoint.requiresToken) {
                token = 'dummyToken';
                isRreturn = false;
            }else{
                // 실무에서는 이부분에서 expirng 지난 여부 체크해서 다시 토큰 담아주는 로직있어야하나 프론트 만 구성하여 제거( 주석 부분 예시 코드 )
                // isRreturn = true;
                // try {
                //     token = await this.refreshTokenAct();
                //     isRreturn = false;
                // } catch (error) {
                //     return Promise.reject(error);
                // }
            }
            return httpPostAct(endpoint, token, payload, isRreturn);
        } catch (error) {
            // 오류 핸들링
            console.error('httpPost Error:', error);
            throw new Error('Failed to send data.');
        }
    };



    const nonMemberLogout = (): void => {
        // 로그아웃 로직 구현
        console.log('Logging out non-member...');
    };

    const refreshTokenAct = async (): Promise<string> => {
        try {
            // 리프레시 토큰 갱신 로직 구현
            const newAccessToken = 'newAccessToken'; // 임의 토큰 예시
            return newAccessToken;
        } catch (error) {
            // 오류 핸들링
            console.error('refreshTokenAct Error:', error);
            throw new Error('Failed to refresh token.');
        }
    };


    return {
        httpGet,
        httpPost,
        nonMemberLogout,
        refreshTokenAct,
    };
};

export const httpClient = createHttpClient();
