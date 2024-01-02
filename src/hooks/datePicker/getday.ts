export const getDay = (date?: Date | number) => {
    const [initYear, initM, initD] = new Intl.DateTimeFormat('ko-KR')
        .format(date)
        .split('.');
    const initMonth = Number(initM) < 10 ? `0${initM.trim()}` : initM.trim();
    const initDay = Number(initD) < 10 ? `0${initD.trim()}` : initD.trim();

    return `${initYear}-${initMonth}-${initDay}`;
};

export const getYear = () => new Date().getFullYear();

export const getYM = (date?: Date | number) => {
    const [initYear, initM] = new Intl.DateTimeFormat('ko-KR')
        .format(date)
        .split('.');
    const initMonth = Number(initM) < 10 ? `0${initM.trim()}` : initM.trim();

    return `${initYear}-${initMonth}`;
};

export const getDatePickerInitDate = (
    types: 'day' | 'month',
    value: number
) => {
    const today = types === 'day' ? getDay() : getYM();
    const previous =
        types === 'day'
            ? getDay(new Date().setMonth(value === 2 ? -11 : value === 1 ? -5 : 0))
                .trim()
                .replace('.', '-')
            : getYM(new Date().setMonth(value === 2 ? -11 : value === 1 ? -5 : 0))
                .trim()
                .replace('.', '-');
    return `${previous}-${today}`;
};

//날짜 비교 현재 시간의 -1일 한 시간의 값과 비교 하여 처리
export const getDayMinus = (date: string, minus: number) => {
    const mainDate = new Date(date);

    const currentDayInMilli = new Date().getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const previousDayInMilli = currentDayInMilli - oneDay * minus;
    const previousDate = new Date(previousDayInMilli);

    return mainDate > previousDate;
};


export const isLessThanAWeekOld = (dateStr: string):boolean => {
    const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
    const writtenDate: any = new Date(dateStr);
    const currentDate: any = new Date();
    return currentDate - writtenDate <= ONE_WEEK_IN_MS;
};
