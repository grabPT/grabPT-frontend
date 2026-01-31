import { END_POINT } from '@/constants/endPoints';
import type {
  getAllAlarmListResponseDto,
  getUnreadAlarmListResponseDto,
  postAlarmReadResponseDto,
} from '@/layout/types/alarmType';
import { privateInstance } from '@/libs/axios';

export const getAllAlarmList = async (): Promise<getAllAlarmListResponseDto> => {
  try {
    const response = await privateInstance.get(END_POINT.ALARM.allList);
    return response.data;
  } catch (error) {
    console.error(error);
    throw Error('axios 에러');
  }
};

export const getUnreadAlarmList = async (): Promise<getUnreadAlarmListResponseDto> => {
  try {
    const response = await privateInstance.get(END_POINT.ALARM.unreadList);
    return response.data;
  } catch (error) {
    console.error(error);
    throw Error('axios 에러');
  }
};

export const patchReadAlarm = async (alarmId: number): Promise<postAlarmReadResponseDto> => {
  try {
    const { data } = await privateInstance.patch(END_POINT.ALARM.read(alarmId), alarmId);
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};
