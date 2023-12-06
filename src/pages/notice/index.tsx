import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { httpClient } from '';

export default function Notice() {
    const router = useRouter();
    const [noticeList, setNoticeList] = useState<any[]>([]);
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
            const data = await httpClient.httpGet('/notice', `offset=${page}&size=30&target=APP,SYS`);

            if (data.noticeList.length === 0) {
                setHasMore(false);
            } else {
                setNoticeList((prevNoticeList) => [...prevNoticeList, ...data.noticeList]);
            }

            setTotalPages(data.totalPages); // 총 페이지 수 업데이트
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const goNoticeDetail = (id: string) => {
        router.push(`notice/noticeDetail?id=${id}`);
    };

    const { data, isLoading, isError } = useQuery(['notice', page], () => httpClient.httpGet('/notice', `offset=${page}&size=30&target=APP,SYS`), {
        enabled: hasMore,
    });

    useEffect(() => {
        if (data) {
            setNoticeList((prevNoticeList) => [...prevNoticeList, ...data.noticeList]);
            setTotalPages(data.totalPages);
        }
    }, [data]);

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

    const getTitle = (field: any) => {
        if (field.length > 58) {
            return field.substring(0, 58) + '...';
        } else return field;
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching data</p>;

    return (
        <>
            <div className="app-basic">
                <div className="app-container pad4 mt-05">
                    <div className="open-main-mypage">
                        <div className="notice-List">
                            {noticeList.map((item: any, idx: number) => (
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
