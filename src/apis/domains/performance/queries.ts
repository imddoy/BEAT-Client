import { SHOW_TYPE_KEY } from "@pages/gig/constants";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { HOME_QUERY_KEY } from "../home/queries";
import {
  getBookingPerformanceDetail,
  getPerformanceDetail,
  getScheduleAvailable,
  postPerformance,
} from "./api";

export const PERFORMANCE_QUERY_KEY = {
  DETAIL: "detail",
  BOOKING_DETAIL: "bookingDetail",
};

// 공연 상세정보
export const useGetPerformanceDetail = (performanceId: number) => {
  return useQuery({
    queryKey: [PERFORMANCE_QUERY_KEY.DETAIL, performanceId],
    queryFn: () => getPerformanceDetail(performanceId),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

// 예매하기 내 공연 정보 조회
export const useGetBookingPerformanceDetail = (performanceId: number) => {
  return useQuery({
    queryKey: [PERFORMANCE_QUERY_KEY.BOOKING_DETAIL, performanceId],
    queryFn: () => getBookingPerformanceDetail(performanceId),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

// 얜 뭘까?
export const useGetScheduleAvailable = (scheduleId: number, purchaseTicketCount: number) => {
  return useQuery({
    queryKey: [PERFORMANCE_QUERY_KEY.DETAIL, scheduleId],
    queryFn: () => getScheduleAvailable(scheduleId, purchaseTicketCount),
    enabled: false,
  });
};

interface PerformanceFormData {
  posterImage: string;
  castList: {
    castPhoto: string;
    castName: string;
    castRole: string;
  }[];
  staffList: {
    staffPhoto: string;
    staffName: string;
    staffRole: string;
  }[];
  performanceTitle: string;
  genre: SHOW_TYPE_KEY;
  runningTime: number | null;
  performanceDescription: string;
  performanceAttentionNote: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  performanceTeamName: string;
  performanceVenue: string;
  performanceContact: string;
  performancePeriod: string;
  ticketPrice: number | null;
  totalScheduleCount: number;
  scheduleList: {
    performanceDate: Dayjs | Date | null | string;
    totalTicketCount: number | null;
    scheduleNumber: string;
  }[];
}

interface PerformanceResponse {
  status: number;
  data: {
    performanceId: number;
  };
}

const isPerformanceResponse = (res: any): res is PerformanceResponse => {
  return res && typeof res === "object" && "status" in res && "data" in res;
};

// 공연 등록 API
export const usePostPerformance = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: PerformanceFormData) => postPerformance(formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [HOME_QUERY_KEY.LIST, PERFORMANCE_QUERY_KEY.DETAIL],
      });
      queryClient.refetchQueries({ queryKey: [HOME_QUERY_KEY.LIST], exact: true });
      queryClient.refetchQueries({
        queryKey: [PERFORMANCE_QUERY_KEY.DETAIL],
        exact: true,
      });

      if (isPerformanceResponse(res) && res.status === 201) {
        navigate("/register-complete", {
          state: { performanceId: res.data.performanceId },
        });
      } else {
        console.error("Unexpected response type", res);
      }
    },
  });
};
