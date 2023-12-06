import { ApiResponse, httpClient } from '@/common/api/httpClient';
import { apiConstants } from '@/common/api/apiConstants';
import {
    NoticeApiResponse
} from '@/common/api/service/notice/dto/noticeApiDto';

export const noticeApi = {
    noticeList: (noticeParam: string) => httpClient.httpGet<NoticeApiResponse>(apiConstants.notice.noticeList, noticeParam),
};

