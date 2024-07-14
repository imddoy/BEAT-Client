import Button from "@components/commons/button/Button";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks/useHeader";
import { DeleteFormDataProps } from "@typings/deleteBookerFormatProps";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "./components/banner/Banner";
import ManagerCard from "./components/managercard/ManagerCard";
import NarrowDropDown from "./components/narrowDropDown/NarrowDropDown";
import eximg from "./constants/silkagel.png";
import { BookingListProps, RESPONSE_TICKETHOLDER } from "./constants/ticketholderlist";
import * as S from "./TicketHolderList.styled";

const TicketHolderList = () => {
  /*
    중요 : navigate 할 때 파라미터로 넘겨 받아야 함. (애초에 이 주소에 올 때!)
    그래서 넘겨 받은 파라미터를 상태 관리를 해줄 예정. 아래는 performanceId 가 같이 왔다고 가정
    useLocation 으로 받아온다.
   */
  const [performanceId, setPerformanceId] = useState(1); //예시니까 1이라고 가정~
  const [reservedCount, setReservedCount] = useState(0);
  //이거 판매 완료되었는지 여부에 따라서 렌더링하는거 다르게 할지 물어보기, 색깔도 어떻게 할 지 물어보기
  const [isOutdated, setIsOutdated] = useState(false);
  const [detail, setDetail] = useState(false);

  // 0, undefined 일 때는 전체 렌더링 (필터링을 위한 state들)
  const [schedule, setSchedule] = useState(0); //1,2,3 에 따라 필터링
  const [payment, setPayment] = useState<boolean | undefined>(undefined);
  const [responseData, setResponseData] = useState<BookingListProps[]>(
    RESPONSE_TICKETHOLDER.data.bookingList
  );
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  //(추후 삭제 요청을 보내기 위한 formData - 타입 정의가 필요할 수도..?
  const [formData, setFormData] = useState<DeleteFormDataProps>({
    performanceId: performanceId,
    bookingList: [
      {
        bookingId: -1,
      },
    ],
  });
  const navigate = useNavigate();

  const handleLeftButton = () => {
    navigate(-1);
  };
  const handleRightButton = () => {
    setIsDeleteMode(true);
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE,
      title: "내가 등록한 공연",
      leftOnClick: handleLeftButton,
    });
  };
  const { setHeader } = useHeader();
  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE_SUB_TEXT,
      title: "내가 등록한 공연",
      subText: "삭제",
      leftOnClick: handleLeftButton,
      rightOnClick: handleRightButton,
    });
  }, [setHeader]);
  const handleToggleButton = () => {
    setDetail((prop) => !prop);
  };

  const count = RESPONSE_TICKETHOLDER.data.totalScheduleCount; //나중에 api로 받아와서 반영해야함. state로 바꿀 필요 있을까?

  const filteredData = responseData.filter((obj) => {
    const isScheduleMatched =
      schedule === 0 ||
      (obj.scheduleNumber === "FIRST" && schedule === 1) ||
      (obj.scheduleNumber === "SECOND" && schedule === 2) ||
      (obj.scheduleNumber === "THIRD" && schedule === 3);
    const isPaymentMatched = payment === undefined || obj.isPaymentCompleted === payment;

    return isScheduleMatched && isPaymentMatched;
  });
  //도영이가 axios 사용하면 useEffect 필요없다고 했는데, 나중에 리팩토링 할 수도 있음.
  useEffect(() => {
    const totalCount = filteredData.reduce(
      (totalSum, obj) => obj.purchaseTicketCount + totalSum,
      0
    );
    setReservedCount(totalCount);
    //그리고 여기서 바로 다시 axios 요청 쏘는 로직 구성해두기
  }, [filteredData]);
  //이해하기 어려울 것 같아 주석 남깁니다. 모든 회차, 입금 상태 2가지 필터를 사용하여 원하는 결과만 가져오는 형식입니다.
  //schedule ===0 일 경우는 전체 회차, payment === undefined 일 경우는 전체 입금 여부(입금했든 안했든 렌더링)을 의미합니다.

  //상위 컴포넌트에서 받아온 set함수와 bookingId를 이용하여 현재 오브젝트(state)의 payment 상태를 바꾸도록 한다.
  const handlePaymentToggle = (bookingId: number, isDeleteModeee: boolean) => {
    if (!isDeleteModeee) {
      setResponseData((arr) =>
        arr.map((item) =>
          item.bookingId === bookingId
            ? { ...item, isPaymentCompleted: !item.isPaymentCompleted }
            : item
        )
      );
    }
  };
  return (
    <>
      <Banner image={eximg} reservedCount={reservedCount} isOutdated={isOutdated} />
      <S.BodyWrapper>
        <S.BodyLayout>
          <S.LayoutHeaderBox>
            <S.LayoutFilterBox>
              {/*set 함수 직접 넘기는 거 안좋다고 했지만, 내부에서 감싸야 하므로 넘김 */}
              <NarrowDropDown
                schedule={schedule}
                payment={payment}
                totalScheduleCount={count}
                setSchedule={setSchedule}
              >
                모든 회차
              </NarrowDropDown>
              <NarrowDropDown
                schedule={schedule}
                payment={payment}
                totalScheduleCount={count}
                setPayment={setPayment}
              >
                입금 상태
              </NarrowDropDown>
            </S.LayoutFilterBox>
            <S.ToggleWrapper>
              {detail ? (
                <>
                  <S.ToggleText>자세히</S.ToggleText>
                  <S.ToggleOnIcon
                    onClick={handleToggleButton}
                    $width={"5.6rem"}
                    $height={"3.3rem"}
                  />
                </>
              ) : (
                <>
                  <S.ToggleText>간략히</S.ToggleText>
                  <S.ToggleOffIcon
                    onClick={handleToggleButton}
                    $width={"5.6rem"}
                    $height={"3.3rem"}
                  />
                </>
              )}
            </S.ToggleWrapper>
          </S.LayoutHeaderBox>
          {filteredData.map((obj, index) => (
            <ManagerCard
              key={`managerCard-${index}`}
              formData={formData}
              setFormData={setFormData}
              isDeleteMode={isDeleteMode}
              bookingId={obj.bookingId}
              isPaid={obj.isPaymentCompleted}
              isDetail={detail}
              setPaid={() => handlePaymentToggle(obj.bookingId, isDeleteMode)}
              bookername={obj.bookerName}
              purchaseTicketeCount={obj.purchaseTicketCount}
              scheduleNumber={obj.scheduleNumber}
              bookerPhoneNumber={obj.bookerPhoneNumber}
              createAt={obj.createdAt}
            />
          ))}

          {isDeleteMode ? (
            <S.FooterButtonWrapper>
              <Button>삭제</Button>
            </S.FooterButtonWrapper>
          ) : (
            <S.FooterButtonWrapper>
              <Button>변경내용 저장하기</Button>
            </S.FooterButtonWrapper>
          )}
        </S.BodyLayout>
      </S.BodyWrapper>
    </>
  );
};

export default TicketHolderList;