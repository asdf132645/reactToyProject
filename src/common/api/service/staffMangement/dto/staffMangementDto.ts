// 타입으로 인터페이스를 쓰는경우는 확장성이 없을 경우에만 사용합니다. 실무에서 주로 인터페이스를 사용하며 타입은 인터페이스의 거의 모든 기능을 커버합니다.
// 확장성이 필요없을 떄 주로 타입을 지정하여 씁니다. 원시, 튜플, 함수, 유니온 매핑된 타입을 정의할경우 주로 사용
// 인터페이스를 사용해야하는경우 선언 병합의 이점을 활용해야하는경우 사용 객체 타입을 정의하거나 타입을 사용할 필요가 없을경우
// 직원 관리 쪽은 딱히 확장성을 가지고 할 필요가 없어 타입으로 지정하여 사용하는 예시를 나타냈습니다.

export type Employee = {
    createdAt: string;
    updatedAt: string | null;
    fileList: any[]; 
    taxRate: number | null;
    accountId: string;
    jobList: any[]; 
    academicHistoryList: any[]; 
    sessionEmail: string | null;
    sessionAccountId: string | null;
    id: number;
    residentNumber: string;
    hospitalId: string;
    hospitalName: string;
    employeeCode: string | null;
    name: string;
    careerBreakYn: "Y" | "N";
    spec: string | null;
    academicHistory: string;
    contractDuration: string | null;
    contractDurationYear: number | null;
    contractDurationMonth: number | null;
    employment: string | null;
    annualType: string | null;
    annualIncome: number | null;
    position: string | null;
    joinAt: string | null;
    email: string;
    jobClass: "W" | "L" | "R";
    reason: string | null;
    militaryService: string | null;
    disability: string | null;
    enlistmentAt: string | null;
    dischargeAt: string | null;
    returnWorkAt: string | null;
    workRenewalAt: string | null;
    leaveStartAt: string | null;
    leaveEndAt: string | null;
    resignationAt: string | null;
    apprAt: string | null;
    resignationContents: string | null;
    mobilePhoneNumber: string;
    office: string | null;
    job: string;
    careerNumber: string | null;
    careerNumberYear: number | null;
    careerNumberMonth: number | null;
    dependentCnt: string;
    address: string;
    addressDetail: string;
    contractCondition: string | null;
    specialCondition: string | null;
    attachFileYn: "Y" | "N";
    writerId: string | null;
    writerName: string | null;
    over60: boolean;
    youth: boolean;
  };
  

  export interface EmployeeApiResponse {
    data: {
        employeeList: Employee[];
    };
    code: string;
    message: string;
}

  export type PostEmailResponseType = {
    employee_name: string;
    company: string;
    link: string;
    ticket: string;
    exp: string;
  };
  
  export type TicketInfo  = {
    ticket: string;
    name: 'employee-form';
    expireMinutes: number;
    link: string;
  }
  