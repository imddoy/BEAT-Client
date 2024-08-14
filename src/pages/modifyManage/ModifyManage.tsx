import {
  usePerformanceDelete,
  usePerformanceEdit,
  useUpdatePerformance,
} from "@apis/domains/performances/queries";

import { IconChecked } from "@assets/svgs";
import {
  BankBottomSheet,
  Button,
  InputAccountWrapper,
  InputBank,
  Loading,
  Spacing,
  Stepper,
  TextArea,
  TextField,
  TimePicker,
} from "@components/commons";

import MetaTag from "@components/commons/meta/MetaTag";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader, useModal } from "@hooks";
import Content from "@pages/gig/components/content/Content";
import ShowInfo, { SchelduleListType } from "@pages/gig/components/showInfo/ShowInfo";
import { SHOW_TYPE_KEY } from "@pages/gig/constants";
import { numericFilter, phoneNumberFilter, priceFilter } from "@utils/useInputFilter";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenreSelect from "./components/GenreSelect";
import InputModifyManageBox from "./components/InputModifyManage";
import PosterThumbnail from "./components/PosterThumbnail";
import StepperModifyManageBox from "./components/StepperModifyManageBox";
import TimePickerModifyManageBox from "./components/TimePickerModifyManageBox";
import { GENRE_LIST } from "./constants/genreList";
import * as S from "./ModifyManage.styled";
import { BANK_TYPE, Cast, DataProps, Schedule, Staff } from "./typings/gigInfo";
import { isAllFieldsFilled } from "./utils/handleEvent";

// Reducer로 상태 관리 통합
type State = {
  performanceTitle: string;
  genre: SHOW_TYPE_KEY;
  runningTime: number | null;
  performanceDescription: string;
  performanceAttentionNote: string;
  accountNumber: string;
  posterImage: string;
  performanceTeamName: string;
  performanceVenue: string;
  performancePeriod: string;
  performanceContact: string;
  ticketPrice: number | undefined;
  totalScheduleCount: number;
  scheduleList: Schedule[];
  castList: Cast[];
  staffList: Staff[];
  bankName: BANK_TYPE;
  accountHolder: string;
};

type ModifyState = {
  ModifyManageStep: number;
  isBookerExist: boolean | undefined;
  isFree: boolean;
  isChecked: boolean;
  bankOpen: boolean;
};

type Action =
  | { type: "SET_STEP"; payload: number }
  | { type: "SET_DATA"; payload: Partial<State> }
  | { type: "SET_FIELD"; field: keyof State; value: State[keyof State] }
  | { type: "TOGGLE_FREE" };

const initialState: State = {
  performanceTitle: "",
  genre: "ETC",
  runningTime: null,
  performanceDescription: "",
  performanceAttentionNote: "",
  accountNumber: "",
  posterImage: "",
  performanceTeamName: "",
  performanceVenue: "",
  performancePeriod: "",
  performanceContact: "",
  ticketPrice: undefined,
  totalScheduleCount: 1,
  scheduleList: [],
  castList: [],
  staffList: [],
  bankName: "NONE",
  accountHolder: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, ...action.payload };
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
    //   case "SET_STEP":
    //   return { ...state, ModifyManageStep: action.payload };
    // case "TOGGLE_FREE":
    //   return { ...state, isFree: !state.isFree, ticketPrice: !state.isFree ? 0 : undefined };
  }
};

const ModifyManage = () => {
  const { performanceId } = useParams();
  const navigate = useNavigate();
  const { openConfirm, closeConfirm, openAlert, closeAlert } = useModal();
  const { setHeader } = useHeader();

  const { data, isLoading, isSuccess } = usePerformanceEdit(Number(performanceId));
  const { mutateAsync: updatePerformance } = useUpdatePerformance();
  const { mutate, mutateAsync } = usePerformanceDelete(); // wf: 가독성을 위해 위랑 이름 맞춰주는게 좋을 듯

  const [dataState, dispatch] = useReducer(reducer, initialState);
  const [modifyState, setModifyState] = useState<ModifyState>({
    ModifyManageStep: 1,
    isBookerExist: undefined,
    isFree: false,
    isChecked: true,
    bankOpen: false,
  });

  useEffect(() => {
    if (data && isSuccess) {
      dispatch({
        type: "SET_DATA",
        payload: {
          performanceTitle: data.performanceTitle,
          genre: data.genre,
          runningTime: data.runningTime,
          performanceDescription: data.performanceDescription,
          performanceAttentionNote: data.performanceAttentionNote,
          accountNumber: data.accountNumber,
          posterImage: data.posterImage,
          performanceTeamName: data.performanceTeamName,
          performanceVenue: data.performanceVenue,
          performancePeriod: data.performancePeriod,
          performanceContact: data.performanceContact,
          ticketPrice: data.ticketPrice,
          totalScheduleCount: data.totalScheduleCount,
          scheduleList: data.scheduleList.map((item) => ({
            scheduleId: item.scheduleId ?? -1,
            performanceDate: item.performanceDate ?? "",
            totalTicketCount: item.totalTicketCount ?? 0,
            dueDate: item.dueDate ?? 0,
            scheduleNumber: item.scheduleNumber ?? "FIRST",
          })),
          castList: data.castList?.length
            ? data.castList.map((item) => ({
                castId: item.castId ?? -1,
                castName: item.castName ?? "",
                castRole: item.castRole ?? "",
                castPhoto: item.castPhoto ?? "",
              }))
            : [{ castId: -1, castName: "", castRole: "", castPhoto: "" }],
          staffList: data.staffList?.length
            ? data.staffList.map((item) => ({
                staffId: item.staffId ?? -1,
                staffName: item.staffName ?? "",
                staffRole: item.staffRole ?? "",
                staffPhoto: item.staffPhoto ?? "",
              }))
            : [{ staffId: -1, staffName: "", staffRole: "", staffPhoto: "" }],
          bankName: data.bankName,
          accountHolder: data.accountHolder,
        },
      });

      setModifyState((prevState) => ({
        ...prevState,
        isBookerExist: data.isBookerExist,
        isFree: data.ticketPrice === 0,
      }));
    }
  }, [data, isSuccess]);

  useEffect(() => {
    const pageTitle =
      modifyState.ModifyManageStep === 1
        ? "공연 수정하기"
        : modifyState.ModifyManageStep === 2
          ? "공연 수정하기"
          : "미리보기";
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE_SUB_TEXT,
      title: pageTitle,
      subText: "삭제",
      leftOnClick: handleLeftBtn,
      rightOnClick: handleRightBtn,
    });
  }, [setHeader, modifyState.ModifyManageStep]);

  const handleInputChange = (field: keyof State, value: string | number | boolean) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const handleModifyManageStep = () => {
    dispatch({ type: "SET_STEP", payload: modifyState.ModifyManageStep + 1 });
  };

  //비즈니스 로직 분리 - 공연 수정하기 PUT 요청
  const handleComplete = async () => {
    const filteredCastList = dataState.castList.filter(
      (cast) => cast.castName || cast.castRole || cast.castPhoto
    );
    const filteredStaffList = dataState.staffList.filter(
      (staff) => staff.staffName || staff.staffRole || staff.staffPhoto
    );

    dispatch({
      type: "SET_DATA",
      payload: {
        castList: filteredCastList,
        staffList: filteredStaffList,
      },
    });

    try {
      await updatePerformance({ performanceId: Number(performanceId), ...dataState });
      openAlert({
        title: "공연 수정이 완료됐어요.",
        subTitle: "변경된 사항(시간, 장소 등)은 예매자에게\n 개별적으로 반드시 연락해주세요.",
        okText: "네, 알겠어요",
        okCallback: () => {
          navigate("/gig-manage");
        },
      });
    } catch (err) {
      openAlert({
        title: "공연 수정에 실패했습니다.",
        subTitle: "다시 시도해주세요.",
        okText: "확인",
        okCallback: closeAlert,
      });
    }
  };

  // 약관 동의
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModifyState((prevState) => ({ ...prevState, isChecked: !prevState.isChecked }));
  };
  // 티켓 가격이 무료일 때 가격을 0으로 설정하고 수정 불가능하게 함
  useEffect(() => {
    if (modifyState.isFree) {
      dispatch({
        type: "SET_DATA",
        payload: {
          ticketPrice: 0,
          accountNumber: "",
          bankName: "NONE",
        },
      });
    }
  }, [modifyState.isFree]);

  // 티켓 가격을 0으로 작성하면 자동으로 무료 공연 체크
  useEffect(() => {
    if (dataState.ticketPrice === 0) {
      setModifyState((prevState) => ({ ...prevState, isFree: true }));
    }
  }, [dataState.ticketPrice]);

  const handleLeftBtn = () => {
    if (modifyState.ModifyManageStep === 1) {
      openConfirm({
        title: "수정을 취소할까요?",
        subTitle: "페이지를 나갈 경우, 내용이 저장되지 않아요.",
        okText: "취소할게요",
        okCallback: () => {
          navigate("/gig-manage");
        },
        noText: "아니요",
        noCallback: () => {
          setModifyState((prev) => ({ ...prev, ModifyManageStep: 1 }));
        },
      });
    } else {
      setModifyState((prev) => ({ ...prev, ModifyManageStep: prev.ModifyManageStep - 1 }));
    }
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let numericValue = parseInt(value.replace(/,/g, ""), 10);

    if (isNaN(numericValue)) {
      numericValue = undefined;
    }

    dispatch({ type: "SET_FIELD", field: "ticketPrice", value: numericValue });
  };

  //공연 삭제 DELETE API 요청
  const handleDeletePerformance = async (_performanceId: number, _isBookerExist: boolean) => {
    if (_isBookerExist) {
      openAlert({
        title: "공연 삭제가 불가해요.",
        subTitle: "예매자가 1명 이상 있을 경우, 삭제할 수 없어요.",
        okText: "확인했어요",
        okCallback: closeAlert,
      });
    } else {
      mutateAsync(Number(performanceId));
      navigate("/gig-manage");
    }
  };

  //공연 삭제 버튼
  const handleRightBtn = () => {
    openConfirm({
      title: "공연을 삭제하시겠어요?",
      subTitle: "삭제할 경우, 작성했던 내용을 되돌릴 수 없어요.",
      okText: "삭제할게요",
      okCallback: () => {
        handleDeletePerformance(Number(performanceId), modifyState.isBookerExist as boolean);
      },
      noText: "아니요",
      noCallback: () => {
        closeConfirm();
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (data) {
    if (ModifyManageStep === 1) {
      return (
        <>
          <MetaTag title="공연 수정" />
          <S.ModifyManageContainer>
            <PosterThumbnail
              value={posterImage}
              // onImageUpload={(url) => handleImageUpload(url, setGigInfo)}
              onImageUpload={() => console.log("")}
            />
            <S.Divider />
            <GenreSelect
              title="공연 장르"
              genres={GENRE_LIST}
              selectedGenre={genre as string}
              onGenreSelect={(selectedGenre) => setGenre(selectedGenre)}
              marginBottom={2.4}
            />
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="공연명">
              <TextField
                isDisabled={false}
                type="input"
                name="performanceTitle"
                value={performanceTitle}
                onChange={(e) => setPerformanceTitle(e.target.value)}
                placeholder="등록될 공연의 이름을 입력해주세요."
                maxLength={30}
                cap={true}
              />
            </InputModifyManageBox>
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="주최 단체명">
              <TextField
                isDisabled={false}
                type="input"
                name="performanceTeamName"
                value={performanceTeamName}
                onChange={(e) => setPerformanceTeamName(e.target.value)}
                placeholder="주최하는 공연진(단체)의 이름을 입력해주세요."
                maxLength={10}
                cap={true}
              />
            </InputModifyManageBox>
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="공연 소개">
              <TextArea
                name="performanceDescription"
                value={performanceDescription}
                onChange={(e) => setPerformanceDescription(e.target.value)}
                placeholder="공연을 예매할 예매자들에게 공연을 소개해주세요."
                maxLength={250}
              />
            </InputModifyManageBox>
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="러닝 타임">
              <TextField
                isDisabled={false}
                type="input"
                name="runningTime"
                value={runningTime ?? ""}
                onChange={(e) => setRunningTime(parseInt(e.target.value, 10))}
                filter={numericFilter}
                unit="time"
                placeholder="공연의 러닝 타임을 분 단위로 입력해주세요."
              />
            </InputModifyManageBox>
            <S.Divider />
            <StepperModifyManageBox title="회차 수" description="최대 3회차">
              <Stepper
                max={3}
                round={totalScheduleCount as number}
                disabled={true}
                onMinusClick={() => setTotalScheduleCount((prev) => prev - 1)}
                onPlusClick={() => setTotalScheduleCount((prev) => prev + 1)}
              />
            </StepperModifyManageBox>
            <S.Divider />
            <TimePickerModifyManageBox title="회차별 시간대">
              {scheduleList?.map((schedule, index) => (
                <div key={index}>
                  <S.InputDescription>{index + 1}회차</S.InputDescription>
                  <Spacing marginBottom={"1"} />
                  <TimePicker
                    value={dayjs(schedule.performanceDate)}
                    disabled={true}
                    onChangeValue={(date) => {
                      const updatedSchedules = [...scheduleList];
                      updatedSchedules[index].performanceDate = date;
                      setScheduleList(updatedSchedules);
                    }}
                  />
                </div>
              ))}
            </TimePickerModifyManageBox>
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="공연 장소">
              <TextField
                isDisabled={false}
                type="input"
                name="performanceVenue"
                value={performanceVenue}
                onChange={(e) => setPerformanceVenue(e.target.value)}
                placeholder="ex:) 홍익아트홀 303호 소극장"
                maxLength={15}
                cap={true}
              />
            </InputModifyManageBox>
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="회차별 티켓 판매수">
              <TextField
                isDisabled={false}
                type="input"
                name="totalTicketCount"
                value={scheduleList?.[0]?.totalTicketCount ?? ""}
                onChange={(e) => {
                  const updatedSchedules = [...scheduleList];
                  updatedSchedules[0].totalTicketCount = parseInt(e.target.value, 10);
                  setScheduleList(updatedSchedules);
                }}
                placeholder="판매할 티켓의 매 수를 입력해주세요."
                filter={numericFilter}
                unit="ticket"
              />
            </InputModifyManageBox>
            <S.Divider />
            <InputModifyManageBox isDisabled={false} title="유의사항">
              <TextArea
                name="performanceAttentionNote"
                value={performanceAttentionNote}
                onChange={(e) => setPerformanceAttentionNote(e.target.value)}
                placeholder="입장 안내, 공연 중 인터미션, 공연장 반입금지 물품, 촬영 가능 여부, 주차 안내 등 예매자들이 꼭 알고 있어야할 유의사항을 입력해주세요."
                maxLength={250}
              />
            </InputModifyManageBox>
            <S.Divider />
            <InputModifyManageBox
              isDisabled={isExist as boolean}
              title="티켓 가격"
              description="*티켓 가격은 수정불가합니다."
              isFree={isFree}
              onFreeClick={() => setIsFree(!isFree)}
            >
              <TextField
                isDisabled={isExist}
                type="input"
                name="ticketPrice"
                value={ticketPrice !== undefined ? priceFilter(ticketPrice.toString()) : ""}
                onChange={handlePriceChange}
                placeholder="가격을 입력해주세요."
                filter={priceFilter}
                disabled={isFree || isExist}
                unit="amount"
              />
            </InputModifyManageBox>
            <S.Divider />
            {!isFree && (
              <>
                <InputAccountWrapper>
                  <InputBank
                    isDisabled={isExist as boolean}
                    bankOpen={bankOpen}
                    onClick={() => setBankOpen(true)}
                  >
                    {/* {bankInfo as string} */}
                    {bankName}
                  </InputBank>
                  <TextField
                    isDisabled={isExist}
                    name="accountNumber"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    filter={numericFilter}
                    placeholder="입금 받으실 계좌번호를 (-)제외 숫자만 입력해주세요."
                    disabled={isExist}
                  />
                  <TextField
                    isDisabled={isExist}
                    name="accountHolder"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    placeholder="예금주명을 입력해주세요."
                    disabled={isExist}
                  />
                </InputAccountWrapper>
                <S.Divider />
              </>
            )}
            <BankBottomSheet
              // value={bankInfo as string}
              value={bankName}
              onBankClick={(value) => {
                setBankName(value);
                setBankOpen(false);
              }}
              isOpen={bankOpen}
              onOutClick={() => setBankOpen(false)}
            />
            <InputModifyManageBox isDisabled={false} title="대표자 연락처">
              <TextField
                isDisabled={false}
                type="input"
                name="performanceContact"
                value={performanceContact}
                filter={phoneNumberFilter}
                onChange={(e) => setPerformanceContact(e.target.value)}
                placeholder="문의 가능한 대표 번호를 숫자만 입력해주세요."
              />
            </InputModifyManageBox>
          </S.ModifyManageContainer>
          <S.FooterContainer>
            <S.FooterDivider />
            <S.CheckboxContainer>
              <S.CheckboxLabel>
                <S.Checkbox
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                ></S.Checkbox>
                한 명 이상의 예매자가 있을 경우, 공연 삭제가 불가해요.
                {isChecked ? <IconChecked width={18} /> : <S.NonCheck />}
              </S.CheckboxLabel>
            </S.CheckboxContainer>
            <Button
              onClick={handleModifyManageStep}
              disabled={!isAllFieldsFilled(data as DataProps, isFree) || !isChecked}
            >
              다음
            </Button>
          </S.FooterContainer>
        </>
      );
    }

    // if (ModifyManageStep === 2) {
    //   return (
    //     <ModifyManageMaker
    //       castList={castList as Cast[]}
    //       staffList={staffList as Staff[]}
    //       handleModifyManageStep={handleModifyManageStep}
    //       // updateGigInfo={updateGigInfo}
    //       updateGigInfo={() => console.log("")}
    //     />
    //   );
    // }

    if (ModifyManageStep === 2) {
      return (
        <>
          <MetaTag title="공연 수정" />
          <ShowInfo
            posterImage={posterImage as string}
            title={performanceTitle as string}
            price={ticketPrice as number}
            venue={performanceVenue as string}
            period={performancePeriod as string}
            runningTime={runningTime as number}
            genre={genre as "BAND" | "DANCE" | "PLAY" | "ETC"}
            // 타임존 안맞아서 지금 날짜 안맞는데 로컬 타임존으로 보이게 설정하면 기간 잘 맞아요!
            scheduleList={
              scheduleList?.map((schedule, index) => ({
                scheduleId: index + 1,
                performanceDate: schedule.performanceDate?.toString() || "",
                scheduleNumber: (index + 1).toString(),
              })) as SchelduleListType[]
            }
          />
          <Content
            description={performanceDescription as string}
            attentionNote={performanceAttentionNote as string}
            contact={performanceContact as string}
            teamName={performanceTeamName as string}
            castList={
              castList?.[0].castId === -1
                ? []
                : (castList?.map((cast, index) => ({
                    ...cast,
                    castId: index + 1,
                  })) as Cast[])
            }
            staffList={
              staffList?.[0].staffId === -1
                ? []
                : (staffList?.map((cast, index) => ({
                    ...cast,
                    staffId: index + 1,
                  })) as Staff[])
            }
          />
          <S.FooterContainer>
            <Button onClick={handleComplete}>완료하기</Button>
          </S.FooterContainer>
        </>
      );
    }
  }
  return <></>;
};

export default ModifyManage;
