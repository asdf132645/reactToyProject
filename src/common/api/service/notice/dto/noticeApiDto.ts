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

export interface NoticeDetailResData {
    id: string;
    title: string;
    body: string;
    pinned: boolean;
    target: string;
    writerId: string;
    useYn: boolean;
    writerName: string;
    writtenAt: string;
    openedAt: string;
    expiredAt: string | null;
    attachmentList: [];
}

export interface NoticeDetailResponse {
    data: {
        noticeDetail: {
            id: string;
            title: string;
            body: string;
            pinned: boolean;
            target: string;
            writerId: string;
            useYn: boolean;
            writerName: string;
            writtenAt: string;
            openedAt: string;
            expiredAt: string | null;
            attachmentList: [];
        };
    };
    code: string;
    message: string;
}
