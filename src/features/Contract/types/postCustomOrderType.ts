import type { CommonResponseDto } from '@/types/commonResponseDto';

export type postCustomOrderRequestDto = {
  price: number;
  item_name: string;
  matching_id: number;
};

export type postCustomOrderResultType = {
  order_uid: string;
  item_name: string;
  buyer_name: string;
  payment_price: 0;
  buyer_email: string;
  buyer_address: string;
  buyer_tel: string;
  buyer_postcode: string;
};

export type postCustomOrderResponseDto = CommonResponseDto<postCustomOrderResultType>;
