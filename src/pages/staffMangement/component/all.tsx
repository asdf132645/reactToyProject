import StaffData from './staffData';

type allType = {
  all: any[];
  onButtonClickLast: any,
};

export default function All({ all, onButtonClickLast }: allType) {
  if (!all) {
    return null; // 배열이 없을 경우 아무 내용도 렌더링하지 않음
  }
  const handleButtonClick = (accountId: string, jobClass: string, email: string, name: string, residentNumber: string, id: string | number) => {
    onButtonClickLast(accountId, jobClass, email, name, residentNumber, id);
  };

  return (
    <>
      {all.length === 0 && (
        <h1 style={{ margin: '10% auto', fontSize: '3rem' }}>
          직원 정보가 없습니다.
        </h1>
      )}
      {all.map((allItem) => (
        <StaffData
          key={allItem.id}
          id={allItem.id}
          position={allItem.position}
          name={allItem.name}
          job={allItem.job}
          joinAt={allItem.joinAt}
          careerBreakYn={allItem?.careerBreakYn}
          disability={allItem?.disability}
          over60={allItem.over60}
          youth={allItem.youth}
          email={allItem.email}
          mobilePhoneNumber={allItem.mobilePhoneNumber}
          careerNumber={allItem.careerNumber}
          accountId={allItem?.accountId}
          jobClass={allItem?.jobClass}
          residentNumber={allItem?.residentNumber}
          onButtonClick={handleButtonClick}

        />
      ))}
    </>
  );
}
