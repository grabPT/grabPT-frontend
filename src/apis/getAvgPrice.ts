import { privateInstance } from "@/libs/axios";
import type { ApiResponse } from "./getUserInfo";

interface GetAvgPriceResponse {
  avgUnitPrice: string;
  sampleCount: string;
}

type GetAvgPriceResponseDto = ApiResponse<GetAvgPriceResponse>;

/**
 * 평균 PT 가격 조회 API
 */
export const getAvgPrice = async (
  categoryName: string,
  city: string,
  district: string,
  street: string
): Promise<GetAvgPriceResponseDto> => {
  try {
    const { data } = await privateInstance.get<GetAvgPriceResponseDto>(
      "/price/avg-per-session",
      {
        params: {
          categoryName,
          city,
          district,
          street,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("⚠️ getAvgPrice API 에러:", error);
    throw error;
  }
};
