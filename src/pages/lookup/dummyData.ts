export const dummyData = [
  {
    userId: 1,
    bookingId: 1,
    scheduleId: 1,
    performanceTitle: "실리카겔 락앤롤",
    performanceVenue: "공연 장소",
    performanceDate: "2023-12-28",
    posterImage: "이미지 url",
    purchaseTicketCount: 2,
    scheduleNumber: "FIRST",
    bookerName: "서지우",
    bookerPhoneNumber: "010-2222-7196",
    bankName: "부산",
    accountNumber: "924232-22-234232",
    dueDate: 2,
    paymentStatus: false, // 입금 확인중
    createdAt: "2023-11-18T12:34:56.789Z",
  },
  {
    userId: 1,
    bookingId: 2,
    scheduleId: 3,
    performanceTitle: "실리카겔 락앤롤",
    performanceDate: "2023-12-29",
    posterImage: "이미지 url",
    purchaseTicketCount: 2,
    scheduleNumber: "SECOND",
    bookerName: "서지우",
    bookerPhoneNumber: "010-2222-7196",
    bankName: "국민",
    accountNumber: "922332-12-232324",
    dueDate: -1, // -1이면 관람완료!
    paymentStatus: true, // 입금 완료
    createdAt: "2023-11-18T12:34:56.789Z",
  },
  {
    userId: 1,
    bookingId: 1,
    scheduleId: 1,
    performanceTitle: "아주대학교 스파이더스 정기공연",
    performanceDate: "2023-12-29",
    posterImage: "이미지 url",
    purchaseTicketCount: 2,
    scheduleNumber: "SECOND",
    bookerName: "윤신지",
    bookerPhoneNumber: "010-2222-0000",
    bankName: "국민",
    accountNumber: "031701-00-014842",
    dueDate: -1, // -1이면 관람완료!
    paymentStatus: true, // 입금 완료
    createdAt: "2023-11-18T12:34:56.789Z",
  },
];
