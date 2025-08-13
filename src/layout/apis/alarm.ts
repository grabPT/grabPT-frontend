import type { getAlarmListResponseDto, postAlarmReadResponseDto } from '@/layout/types/alarmType';
import { privateInstance } from '@/libs/axios';

export const getAlarmList = async (): Promise<getAlarmListResponseDto> => {
  try {
    const response = await privateInstance.get('/api/alarmList', { withCredentials: true });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw Error('axios 에러');
  }
};

export const patchReadAlarm = async (alarmId: number): Promise<postAlarmReadResponseDto> => {
  try {
    const { data } = await privateInstance.patch(`/api/alarm/${alarmId}/read`, alarmId);
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};
