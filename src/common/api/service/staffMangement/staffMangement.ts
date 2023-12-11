import { ApiResponse, httpClient, GenericObject  } from '@/common/api/httpClient';
import { apiConstants } from '@/common/api/apiConstants';
import { Employee, PostEmailResponseType, TicketInfo, EmployeeApiResponse } from '@/common/api/service/staffMangement/dto/staffMangementDto';

export const staffManagementApi = {
    getEmployeeList: (hospitalId: string) =>
      httpClient.httpGet<EmployeeApiResponse>(apiConstants.staffManagement.getEmployeeList(hospitalId)),
  
    getEmployeeDetail: (employeeId: string) =>
      httpClient.httpGet<Employee>(apiConstants.staffManagement.getEmployeeDetail(employeeId)),
  
    postEmail: (formDataList: GenericObject) =>
      httpClient.httpPost<PostEmailResponseType>(apiConstants.staffManagement.postEmail, formDataList),
    ticketInfo: (ticket: GenericObject) =>
      httpClient.httpPost<TicketInfo>(apiConstants.staffManagement.ticketInfo, ticket),
  };
  