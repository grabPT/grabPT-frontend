import type { CredentialType } from '@/features/ExpertDetail/type/credential';

interface ICredentail {
  type: CredentialType;
  content: string | null;
}
export const Credential = ({ type, content }: ICredentail) => {
  return (
    <div className="flex items-center justify-center h-[3.125rem] w-full rounded-[0.625rem] bg-[#EFEFEF]">
      <div className="w-[10rem] border-r flex items-center justify-center border-gray-300 px-4 text-lg font-semibold">{type}</div>
      <div className="flex-1 px-4 text-lg">{content}</div>
    </div>
  );
};
