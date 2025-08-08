import type { CredentialType } from '@/features/ExpertDetail/types/credential';

interface ICredentail {
  type: CredentialType;
  content: string | null;
}
export const Credential = ({ type, content }: ICredentail) => {
  return (
    <div className="flex h-[3.125rem] w-full items-center justify-center rounded-[0.625rem] bg-[#EFEFEF]">
      <div className="flex w-[10rem] items-center justify-center border-r border-gray-300 px-4 text-lg font-semibold">
        {type}
      </div>
      <div className="flex-1 px-4 text-lg">{content}</div>
    </div>
  );
};
