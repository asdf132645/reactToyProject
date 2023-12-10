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
    staffManagement: {
      getEmployeeList: (hospitalId: string) => ({
        endpoint: `/employee/v1/list/${hospitalId}`,
        requiresToken: true,
      }),
      getEmployeeDetail: (employeeId: string) => ({
        endpoint: `/employee/v1/detail/${employeeId}`,
        requiresToken: true,
      }),
      postEmail: {
        endpoint: '/employee/v1/sendEmail',
        requiresToken: false,
      },
      ticketInfo: {
        endpoint: '/ticket',
        requiresToken: false,
      },
    },
  };
  