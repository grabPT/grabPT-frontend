import { axiosInstance } from "@/features/Signup/apis/axios";
import type { ProSignupRequestDto, SignupResponseDto, UserSignupRequestDto,  } from "@/features/Signup/types/Auth";



export const postUserSignup = async (
    body: UserSignupRequestDto
): Promise<SignupResponseDto> =>{
    const {data} = await axiosInstance.post("/auth/user-signup",body);
    return data;
}

export const postProSignup = async(
    body: ProSignupRequestDto
): Promise<SignupResponseDto>=>{
    const {data} = await axiosInstance.post("/auth/pro-signup",body);
    return data;
}
