import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { noticeApi } from '@/common/api/service/notice/notice';
import { ApiResponse, useQueryWithHttpClient } from '@/common/api/httpClient';
import {
    NoticeApiResponse,
    NoticeDetailResData,
    NoticeDetailResponse
} from '@/common/api/service/notice/dto/noticeApiDto';
import {useState} from 'react';

const NoticeDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [noticeDetailRes, setNoticeDetailRes] = useState<NoticeDetailResData>()

    const { data: apiResponse, isLoading, isError } = useQueryWithHttpClient(
        `noticeDetail-${id}`,
        () => noticeApi.getNoticeDetail(id as string),
        {
            enabled: !!id,
            onSuccess: (response: ApiResponse<NoticeDetailResponse>) => {
                if (response?.data?.data.noticeDetail) {
                    setNoticeDetailRes(response?.data?.data!.noticeDetail);
                }
            },
            onError: (error) => {
                console.error(error);
            },
        }
    );


    // 공지사항 세부 정보를 사용하여 페이지를 렌더링합니다
    return (
        <div>
            <h1>{noticeDetailRes?.title}</h1>
            <p>{noticeDetailRes?.body}</p>
            <p>Writer: {noticeDetailRes?.writerName}</p>
            <p>Written At: {noticeDetailRes?.writtenAt}</p>
        </div>
    );
};

export default NoticeDetail;