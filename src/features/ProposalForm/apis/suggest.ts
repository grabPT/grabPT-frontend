import type { SuggestRequestDto, SuggestResponseDto } from '@/features/ProposalForm/types/Suggest';
import { multipartInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const postSuggest = async (
  data: SuggestRequestDto,
  photos: File[], // 이미지 파일 배열
): Promise<CommonResponseDto<SuggestResponseDto>> => {
  const form = new FormData();

  form.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' })); //data 주입

  if (photos?.length) {
    photos.forEach((file) => {
      form.append('photos', file);
    }); //이미지 파일 주입
  }
  //콘솔 출력
  for (const [key, value] of form.entries()) {
    console.log('FormData:', key, value);
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

    blob.text().then(console.log);
  }

  const { data: responseData } = await multipartInstance.post('/api/suggestion', form, {
    skipAuth: false,
  });
  return responseData;
};
