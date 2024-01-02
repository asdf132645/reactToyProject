export interface IOption {
    value: string;
    name: string;
}

export type SelectStateType =
    | 'default' // 필터 카테고리 선택하는 상태
    | 'date' // 단일 날짜 선택
    | 'dateTerm' // 날짜 기간 선택
    | 'month' // 단일 월 선택
    | 'monthTerm' // 월 기간 선택
    | 'datePicker' // 달력 창 표시된 상태
    | 'input' // 값 입력 상태
    | 'select'; // 선택 상자 표시 상태

export interface ITypeOption extends IOption {
    type?: SelectStateType;
}

export type SelectOptionType = Record<string, IOption[]>;
