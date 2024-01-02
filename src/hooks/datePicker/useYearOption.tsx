import { useCallback, useMemo, useState } from 'react';
import { IOption } from '@/types/option';
import { getYear, getDay } from './getday';

/**
 * searchtab에 있는 연도 selectbox를 관리하는 custom hook.
 * param으로 연도 미 입력시 현재 년도 자동으로 생성
 */
export const useYearOption = (currYear?: string) => {
    /** 현재 연도 state */
    const [condition, setConditon] = useState(currYear || String(getYear()));
    /** selectbox에 optiond으로 주입하는 연도 배열 */
    const selectOptions = useMemo<IOption[]>(
        () =>
            Array.from({ length: 3 }, (_, idx) => {
                const temp = String(
                    Number(condition || getDay().split('-')[0]) + idx - 1
                );
                return { value: temp, name: temp };
            }),
        [condition]
    );
    /** selectbox에 전달시 연도가 자동으로 변경 */
    const onChange = useCallback((input: string) => setConditon(input), []);
    /** 초기화 버튼에 등록 시 초기 연도로 선택옵션 초기화 */
    const onReset = useCallback(
        () => setConditon(currYear || String(getYear())),
        []
    );

    return {
        condition,
        selectOptions,
        onChange,
        onReset,
    };
};
