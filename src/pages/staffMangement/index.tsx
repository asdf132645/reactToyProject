import React, {useEffect, useMemo, useRef, useState} from 'react';
// @ts-ignore
import Slider from 'react-slick';

import { ApiResponse, useQueryWithHttpClient, useMutationWithHttpClient } from '@/common/api/httpClient';
import { useStore } from '@/common/lib/store';
import { Employee, PostEmailResponseType, TicketInfo, EmployeeApiResponse } from '@/common/api/service/staffMangement/dto/staffMangementDto';
import { staffManagementApi } from '@/common/api/service/staffMangement/staffMangement';

import All from '@/pages/staffMangement/component/all'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function StaffManagement() {
    const { userId, companyId } = useStore();

    const [openPopS, setOpenPopS] = useState(false);
    const [addPopup, setAddPopup] = useState(false);
    const sliderRef = useRef<Slider | null>(null);
    const { companyId: hospitalId } = useStore();
    const [activeCategory, setActiveCategory] = useState('전체'); // 전체가 기본
    // 직무별로 쪼개서 배열사용
    const [all, setAll] = useState<Employee[]>([]);
    const [doctors, setDoctors] = useState<Employee[]>([]);
    const [nurses, setNurses] = useState<Employee[]>([]);
    const [therapists, setTherapists] = useState<Employee[]>([]);
    const [others, setOthers] = useState<Employee[]>([]);
    const [staffMangementList, setStaffMangementList] = useState<Employee[]>([]);
    const [hospitalName, setHospitalName] = useState('');
    const [hidden, setHidden] = useState(false);
    const [accountId, setAccountId] = useState('');
    const [jobClassText, setJobClassText] = useState<string>('W'); // 초기 재직자로 셋팅
    const [jobClassProps, setJobClassProps] = useState('');
    const [staffPropsEmail, setStaffPropsEmail] = useState('');
    const [staffPropsName, setStaffPropsName] = useState('');
    const [staffPropsResidentNumber, setStaffPropsResidentNumber] = useState('');
    const [staffId, setStaffId] = useState('');
    const [staffInfos, setStaffInfos] = useState<Employee[]>([]);
    const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false); // 저장 확인 모달
    const [alertMsg, setAlertMsg] = useState<string>(''); // 저장 확인 모달 메시지

    // 클릭한 탭에 따라 필터링된 배열을 저장할 상태 추가
    const handleCategoryClick = (category: string, index: number) => {
        setActiveCategory(category);
        setContentSlideIndex(index); // 슬라이드 변경 시 contentSlideIndex 업데이트
        sliderRef.current?.slickGoTo(index);
    };

    // 탭 버튼 클릭 시 데이터 필터링 및 상태 업데이트 함수(재직자, 휴직자, 퇴직자) - 업데이트 작업
    const handleTabClick = (jobClass: string) => {
        // 탭 종류에 따라 필터 조건을 설정
        const filterByJobClass = (employee: Employee) => employee.jobClass === jobClass;

        setJobClassText(jobClass);

        //전체
        const filteredAll = staffMangementList.filter((employee) => filterByJobClass(employee));
        setAll(filteredAll);

        // 직원 데이터를 초기 데이터로부터 필터링하여 변경된 상태로 설정
        // useMemo 훅을 사용하여 staffMangementList가 변경될 때만 해당 배열이 재계산되어 성능 향상
        const filteredDoctors = useMemo(() => staffMangementList.filter((employee) => employee.job === '의사' && employee.jobClass === 'W'), [staffMangementList]);
        const filteredNurses = useMemo(() => staffMangementList.filter((employee) => employee.job === '간호사' && employee.jobClass === 'W'), [staffMangementList]);
        const filteredTherapists = useMemo(() => staffMangementList.filter((employee) => employee.job === '물리치료사' && employee.jobClass === 'W'), [staffMangementList]);
        const filteredOthers = useMemo(() => staffMangementList.filter((employee) => (employee.job === '기타' || employee.job === null) && employee.jobClass === 'W'), [staffMangementList]);

        setDoctors(filteredDoctors);
        setNurses(filteredNurses);
        setTherapists(filteredTherapists);
        setOthers(filteredOthers);

        // 슬라이드 이동
        const index = categories.findIndex((category) => category === activeCategory);
        sliderRef.current?.slickGoTo(index);
    };


    const categories = useMemo(() => ['전체', '의사', '간호사', '물리치료사(일반)', '기타'], []);
    const [contentSlideIndex, setContentSlideIndex] = useState(0); // 콘텐츠 슬라이드의 현재 인덱스

    const sliderSettings = {
        slidesToShow: 1,
        infinite: false,
        swipeToSlide: true,
        afterChange: (currentSlideIndex: number) => setContentSlideIndex(currentSlideIndex),
    };

    const closeAddPopup = () => {
        setAddPopup(false);
    };


    const modalOpen = (accountId: string, jobClass: string, email: string, name: string, residentNumber: string, id: string) => {
        setAccountId(accountId);
        setHidden(true);
        setJobClassProps(jobClass);
        setStaffPropsEmail(email);
        setStaffPropsName(name);
        setStaffId(id);
        console.log(residentNumber);
        setStaffPropsResidentNumber(residentNumber);
        const selectedEmployee = all.find((employee) => Number(employee.id) === Number(id));
        setStaffInfos(selectedEmployee ? [selectedEmployee] : []);  // Employee 배열로 감싸서 설정
    };

    const closeAlertTypeModal = (event: any) => {
        const modal = document.getElementById('modal');
        const modalContent = document.querySelector('.p-wrap');
        if (hidden && modal && modalContent && modalContent.contains(event.target)) {
            return;
        }
        setHidden(false);
    };



    const formDataList = useMemo(() => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일 ${currentDate.getHours()}:${currentDate.getMinutes()}`;
        return {
            receiver: staffPropsEmail,
            receiverName: staffPropsName,
            template: 'EMPLOYEE_FORM_REQUEST',
            subject: '직원 추가',
            link: `${location.origin}/staffMangement/addStaffSuccess`,
            exp: formattedDate,
        };
    }, [staffPropsEmail, staffPropsName]);


    const { mutate } = useMutationWithHttpClient(
        '',
        (data) => staffManagementApi.postEmail(formDataList),
        {
            onSuccess: (response: ApiResponse<PostEmailResponseType>) => {
                // 성공 시 실행할 동작
                setIsConfirmModal(true);
                setAlertMsg('이메일이 전송되었습니다.');
                setHidden(false);
                ticketAdd(response.data!.ticket);
            },
            onError: (error) => {
                // 에러 시 실행할 동작
                console.error('Mutation failed:', error);
            },
        }
    );


    const ticketAdd = async (ticket: string) => {
        try {
            const minutesInOneDay = 24 * 60;
            const thirtyDaysInMinutes = 30 * minutesInOneDay;

            const resData = {
                ticket: ticket,
                name: 'employee-form',
                expireMinutes: thirtyDaysInMinutes,
                link: '/staffMangement/addStaffSuccess',
            };
            const apiResponse: ApiResponse<TicketInfo> | null = await staffManagementApi.ticketInfo(resData);
            console.log(apiResponse)

        } catch (error) {
            console.error(error);
        }
    };

    const employeeDown = async () => {
        const newWindow = window.open(
            window.location.origin +
            `/api/proxy/tax-accounting/v1/employee/${staffId}/download?fileName=${companyId}_${staffPropsName}_${staffPropsResidentNumber?.substring(
                0,
                6
            )}`,
            '_blank'
        );

        if (!newWindow) {
            console.error('다운로드 실패');
            alert('다운로드 실패');
        }
    };

    const closeModal = () => {
        setOpenPopS(false);
    };

    const { data: staffManagementData, isLoading, isError } = useQueryWithHttpClient(
        'staffManagement',
        async () => {
            try {
                const response = await staffManagementApi.getEmployeeList(hospitalId);
                return response;
            } catch (error) {
                throw new Error('Failed to fetch employee data.');
            }
        },
        {
            enabled: true,
            onSuccess: (data: ApiResponse<EmployeeApiResponse>) => {
                try {
                    const employeeList = data?.data?.data?.employeeList ?? [];
                    const newData = employeeList.map((employee) => ({
                        ...employee,
                        jobClass: employee.jobClass || 'W',
                    }));

                    const filterByJobClass = (job: string) => (item: Employee) => item.job === job && item.jobClass === 'W';
                    const filterByJobEtcClass = (job: string) => (item: Employee) =>
                        (item.job === job || item.job === null) && item.jobClass === 'W';

                    const doctorsData = newData.filter(filterByJobClass('의사'));
                    const nursesData = newData.filter(filterByJobClass('간호사'));
                    const therapistsData = newData.filter(filterByJobClass('물리치료사'));
                    const othersData = newData.filter(filterByJobEtcClass('기타'));

                    setHospitalName(newData?.[0]?.hospitalName || '');
                    setAll(newData);
                    setDoctors(doctorsData);
                    setNurses(nursesData);
                    setTherapists(therapistsData);
                    setOthers(othersData);
                } catch (error) {
                    console.error('Error processing employee data:', error);
                }
            },
            onError: (error) => {
                console.error('Error fetching employee data:', error);
            },
        }
    );





    useEffect(() => {
        document.getElementById('modal')?.addEventListener('click', closeAlertTypeModal);

        return () => {
            document.getElementById('modal')?.removeEventListener('click', closeAlertTypeModal);
        };
    }, [hidden]);




    return (
        <>
            <div className="app-hdWrap-tab border-bottom-0 ">
                <div className="memberArea">
                    <p className="subject">{hospitalName}</p>
                    <button type="button" className="btn-member-regist" onClick={() => {
                        setAddPopup(true)
                    }}>직원 신규 등록
                    </button>
                </div>
            </div>
            <div className="app-hdWrap-tab mt-0 pt-2 tab-border-top">
                <div className="tabBtnWrap">

                    {['W', 'L', 'R'].map(jobClass => (
                        <button
                            key={jobClass}
                            type="button"
                            className={`btn-mark ${jobClassText === jobClass ? 'active' : ''}`}
                            onClick={() => handleTabClick(jobClass)}
                        >
                            {jobClass === 'W' ? '재직자' : jobClass === 'L' ? '휴직자' : '퇴직자'}
                        </button>
                    ))}

                </div>
                <div className="btn-type-select gap x-swiper">

                    {categories.map((category, index) => (
                        <div key={index}>
                            <button
                                type="button"
                                className={`btn-datetime ${activeCategory === category ? 'active' : ''} ${contentSlideIndex === index ? 'slide-active' : ''}`}
                                onClick={() => handleCategoryClick(category, index)}
                            >
                                {category}
                            </button>
                        </div>

                    ))}

                </div>
            </div>
            <div className="app-container">
                <div className="labor-management">
                    <div className="dataWrap mt-1">
                        <Slider
                            ref={sliderRef}
                            slidesToShow={1}
                            infinite={false}
                            swipeToSlide={false}
                            afterChange={(index: number) => {
                                setContentSlideIndex(index);
                                setActiveCategory(categories[index]);
                            }}
                            dots={false}
                            arrows={false}
                            centerMode={true} // 가운데에 맞추는 설정 추가
                            centerPadding={'0'} // 예시로 패딩 값을 조정
                            speed={500}

                        >
                            <ul className="practice-list h-auto">
                                {/* 물리치료사 카테고리에 따른 콘텐츠 */}
                                {activeCategory === '전체' && (
                                    <All onButtonClickLast={modalOpen} all={all} />
                                )}
                            </ul>
                        </Slider>
                    </div>
                </div>
            </div>

            {
                hidden &&
                <div id="modal" className="modal alertType">
                    <div className="wrap">
                        <div className="container practice">
                            <div className="p-wrap">
                                {accountId
                                    ? <button type="button" className="btn-control-outline active"
                                        onClick={employeeDown}
                                    >근로자명부 다운로드</button>
                                    : <button type="button" className="btn-control-outline active"
                                        onClick={mutate}
                                    >직원정보 등록요청</button>}

                                <button
                                    type="button"
                                    className={`btn-control-outline ${['WR', 'LR', 'RR'].some(role => jobClassProps?.includes(role)) ? 'active' : ''}`}
                                    disabled={['WR', 'LR', 'RR'].some(role => jobClassProps?.includes(role))}
                                    onClick={() => {
                                        setOpenPopS(true)
                                    }}
                                >
                                    재직상태 변경요청
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>
    )
};

