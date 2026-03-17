import CancelIcon from '@/assets/images/cancleIcon.svg';
import EditIcon from '@/assets/images/pencil.svg';
import SaveIcon from '@/assets/images/save.svg';

interface MyProfileEditButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

//수정 버튼 컴포넌트
export const MyProfileEditButton = ({ onClick }: MyProfileEditButtonProps) => {
  return (
    <div
      className="flex h-[30px] w-[60px] cursor-pointer items-center justify-center gap-1"
      onClick={onClick}
    >
      <span>수정</span>
      <img src={EditIcon} alt="Edit Icon"></img>
    </div>
  );
};

//변경 취소 컴포넌트
export const MyProfileEditCancelButton = ({ onClick }: MyProfileEditButtonProps) => {
  return (
    <div
      className="flex h-[30px] w-[60px] cursor-pointer items-center justify-center gap-1"
      onClick={onClick}
    >
      <span>취소</span>
      <img src={CancelIcon} alt="Cancel Icon"></img>
    </div>
  );
};

export const MyProfileEditSaveButton = ({ onClick, disabled }: MyProfileEditButtonProps) => {
  return (
    <div
      className={`flex h-[30px] w-[60px] items-center justify-center gap-1 ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
      onClick={!disabled ? onClick : undefined}
    >
      <span>저장</span>
      <img src={SaveIcon} alt="Save Icon" />
    </div>
  );
};
