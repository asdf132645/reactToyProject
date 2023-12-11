import React from 'react';
import {useRouter} from 'next/router';

function StaffData({
                       key,
                       position,
                       name,
                       mobilePhoneNumber,
                       email,
                       joinAt,
                       job,
                       careerNumber,
                       youth,
                       careerBreakYn,
                       disability,
                       over60,
                       id,
                       jobClass,
                       accountId,
                       residentNumber,
                       onButtonClick,
                   }: any) {
    const postMap: { [key: string]: string } = {
        '직원': 'staff',
        '세무': 'tax',
        '총괄': 'general',
        '노동': 'labor',
        '의사': 'doctor',
        '감독': 'director',
        null: 'basic',
    };

    const nameMap: { [key: string]: string } = {
        '직원': '직원',
        '세무': '세무',
        '총괄': '총괄',
        '노동': '노동',
        '의사': '의사',
        '감독': '감독',
        null: '일반'
    };

    const checkData =
        joinAt === null &&
        job === null &&
        careerNumber === null &&
        careerBreakYn === null;

    const router = useRouter()

    return (
        <>
            <li key={key}>
                <button type="button" className="btn-practice-menu"
                        onClick={() => {
                            onButtonClick(accountId,jobClass, email, name, residentNumber, id);
                        }}
                ></button>
                <a href={`/staffMangement/component/staffDetail?id=${id}`}>
                    <div className='thumbnail'>
                        <div className={`job-type-${postMap[position]}`}>
                            {nameMap[position]}
                        </div>
                    </div>

                    <div className='name'>
                        <p>{name}</p>
                        <span className='col-2'>
                                {position ? `${nameMap[position]}관리자` : '권한없음'}
                            </span>
                    </div>

                    <div className='info'>
                        <div className='d-flex'>
                            {mobilePhoneNumber && <p className='tel'>{mobilePhoneNumber}</p>}

                            <p className='email'>{email}</p>
                        </div>
                        {!checkData ? (
                            <>
                                <div className='history ellipsis'>
                                    <span>{joinAt}(입사)</span>
                                    <span>{job}</span>
                                    <span>{careerNumber && `경력${careerNumber}년`}</span>
                                </div>
                                <div className='history ellipsis'>
                                        <span className={youth ? 'col-blue' : ''}>
                                            청년
                                        </span>
                                    <span className={`${careerBreakYn === 'Y' && 'col-green'}`}>
                                          경력단절
                                        </span>
                                    <span className={`${disability && 'col-purpple'}`}>
                                            장애인
                                        </span>
                                    <span className={`${over60 && 'col-yellow'}`}>
                                            60세 이상
                                        </span>
                                </div>
                            </>
                        ) : (
                            '근로자 명부가 없습니다.'
                        )}
                    </div>

                </a>

            </li>


        </>
    );
}

export default StaffData;
