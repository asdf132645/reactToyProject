export interface NoticeItem {
    id: string;
    title: string;
    pinned: boolean;
    writtenAt: string;
    useYn: boolean;
}

export interface NoticeResponse {
    noticeList: NoticeItem[];
    totalPages: number;
}
