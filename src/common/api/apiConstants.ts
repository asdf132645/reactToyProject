export const apiConstants = {
    notice: {
        noticeList: {
            endpoint: '/content/v1/notice/list',
            requiresToken: false,
        },
        getNoticeDetail: (noticeId: string) => ({
            endpoint: `/content/v1/notice/detail/${noticeId}`,
            requiresToken: false,
        }),
    },
};
