export interface NoticeApiResponse {
    data: {
        noticeList: NoticeItem[];
        totalPages: number;
    };
    code: string;
    message: string;
}


// NoticeItem 타입 정의
export interface NoticeItem {
    id: string;
    title: string;
    pinned: boolean;
    writtenAt: string;
    useYn: boolean;
}