import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { noticeApi } from '@/common/api/service/notice/notice';
import { NoticeApiResponse, NoticeItem } from '@/common/api/service/notice/dto/noticeApiDto';
import {ApiResponse} from '@/common/api/httpClient';


export default function Notice() {
    const router = useRouter();
    const [noticeList, setNoticeList] = useState<NoticeItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(1);
    const pageSize = 1; // 페이지 당 공지사항 개수

    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const isObserving = useRef(false);

    let page = 0;

    const getNoticeData = async () => {
        try {
            if (!hasMore) return;

            setLoading(true);
            const apiResponse: ApiResponse<NoticeApiResponse> | null = await noticeApi.noticeList(`offset=${page}&size=30&target=APP,SYS`);

            if (apiResponse && apiResponse.data?.data.noticeList.length === 0) {
                setHasMore(false);
            } else if (apiResponse && apiResponse.data?.data.noticeList) {
                setNoticeList((prevNoticeList) => [...prevNoticeList, ...apiResponse.data!.data.noticeList]);
                setTotalPages(apiResponse.data?.data.totalPages || 1);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const goNoticeDetail = (id: string) => {
        router.push(`notice/noticeDetail?id=${id}`);
    };


    useEffect(() => {
        if (!isObserving.current) {
            const options = {
                threshold: 0.3,
            };

            const callback: IntersectionObserverCallback = (entries) => {
                for (const idx of entries) {
                    if (idx.isIntersecting) {
                        getNoticeData();
                        page += 1;
                    }
                }
            };

            if (loadMoreRef.current) {
                const io = new IntersectionObserver(callback, options);
                io.observe(loadMoreRef.current);
                isObserving.current = true;
            }
        }
    }, [loading, hasMore]);

    const getTitle = (field: string) => {
        if (field.length > 58) {
            return field.substring(0, 58) + '...';
        } else return field;
    };


    return (
        <>
            <div className="app-basic">
                <div className="app-container pad4 mt-05">
                    <div className="open-main-mypage">
                        <div className="notice-List">
                            {noticeList.map((item: NoticeItem, idx: number) => (
                                <ul key={idx}>
                                    {item.useYn ? (
                                        <li
                                            key={idx}
                                            onClick={() => {
                                                goNoticeDetail(item.id);
                                            }}
                                        >
                                            <p className="subject ellpsis" style={{ whiteSpace: 'pre-wrap' }}>
                                                {item.pinned ? <span>중요</span> : ''}
                                                {getTitle(item.title)}
                                            </p>

                                            <p className="datetime">{item.writtenAt.split('T')[0]}</p>
                                        </li>
                                    ) : (
                                        ''
                                    )}
                                </ul>
                            ))}
                            <div ref={loadMoreRef} style={{ height: '10px' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}