import { useRef, useState } from 'react';

import Button from './Button';

interface CirtificationCardProps {
  CirtificationCode?: string;
  CirtificationDescription?: string;
  imageUrl?: string;
  isEditMode?: boolean;
  onDelete?: () => void; // ✅ 추가
}

const codeMap: Record<string, string> = {
  ACADEMIC: '학력',
  CERTIFICATE: '자격증',
  CAREER: '경력인증',
  AWARD: '수상기록',
};

// --- 타입 정의 수정 ---
interface CirtificationEditCardProps {
  onAdd: (
    cert: { certificationType: string; description: string; imageUrl: string },
    file: File,
  ) => void;
}

export const CirtificationCard = ({
  CirtificationCode,
  CirtificationDescription,
  imageUrl,
  isEditMode,
  onDelete,
}: CirtificationCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative flex h-[50px] w-[600px] items-center justify-between rounded-[10px] bg-[#EFEFEF]">
        <div className="w-[140px] text-center">
          {CirtificationCode ? codeMap[CirtificationCode] || CirtificationCode : '수상'}
        </div>
        <div className="h-[30px] w-[1px] border border-[#ACACAC]"></div>
        <div
          className="w-[460px] cursor-pointer text-center text-blue-600 underline"
          onClick={() => {
            if (imageUrl) setIsModalOpen(true);
          }}
        >
          {CirtificationDescription ?? '내용'}
        </div>
        {/* 삭제 버튼 */}
        {isEditMode && (
          <Button
            className="absolute right-2 cursor-pointer"
            height="h-[30px]"
            width="w-[60px]"
            onClick={onDelete} // ✅ 삭제 호출
          >
            삭제
          </Button>
        )}
      </div>

      {isModalOpen && imageUrl && (
        <div
          className="bg-opacity-30 fixed inset-1 z-50 flex items-start justify-center pt-[10vh] backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="flex max-h-[90%] max-w-[90%] flex-col rounded-lg bg-gray-200 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageUrl}
              alt="증명 이미지"
              className="max-h-[80vh] max-w-full object-contain"
            />
            <button
              className="mt-4 cursor-pointer self-end rounded rounded-[10px] bg-[#003efb] px-4 py-2 text-white hover:bg-[#0f2b91] active:bg-[#0f2b91]"
              onClick={() => setIsModalOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const CirtificationEditCard = ({ onAdd }: CirtificationEditCardProps) => {
  const options = ['학력', '자격증', '경력인증', '수상기록'];
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const [fileName, setFileName] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>(''); // 미리보기용
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null); // ✅ 실제 파일 저장

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile); // ✅ 상태에 파일 저장
      setFileName(selectedFile.name);
      setFileUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleAddClick = () => {
    if (!file || !description) {
      alert('유형, 내용, 이미지를 모두 입력해주세요!');
      return;
    }

    // 한국어 → 코드 맵핑
    const codeMap: Record<string, string> = {
      학력: 'ACADEMIC',
      자격증: 'CERTIFICATE',
      경력인증: 'CAREER',
      수상기록: 'AWARD',
    };

    // ✅ cert + file 같이 부모로 전달
    onAdd(
      {
        certificationType: codeMap[selected],
        description,
        imageUrl: fileUrl, // 미리보기 url
      },
      file,
    );

    // 입력 초기화
    setSelected(options[0]);
    setFileName('');
    setFileUrl('');
    setDescription('');
    setFile(null);
  };

  return (
    <div className="mt-[40px] flex h-[220px] w-[600px] flex-col items-center gap-[10px] rounded-[10px] bg-gray-100 pt-4">
      <div className="flex gap-[10px]">
        {/* 유형 선택 */}
        <label className="flex flex-col">
          유형
          <div className="relative w-[120px]">
            <div
              className="flex h-[50px] w-full cursor-pointer items-center justify-between rounded-[10px] border border-gray-300 bg-white px-3"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span className="w-full text-center">{selected}</span>
              <span className="text-sm text-gray-500">▼</span>
            </div>
            {isOpen && (
              <ul className="absolute top-full left-0 z-10 mt-1 w-full rounded-[10px] border border-gray-300 bg-white shadow-lg">
                {options.map((option) => (
                  <li
                    key={option}
                    className={`cursor-pointer rounded-[10px] px-3 py-2 text-center hover:bg-gray-300 ${
                      selected === option ? 'bg-gray-100 font-semibold' : ''
                    }`}
                    onClick={() => {
                      setSelected(option);
                      setIsOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </label>

        {/* 내용 입력 */}
        <label className="flex flex-col">
          내용
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-[50px] w-[400px] rounded-[10px] border border-gray-300 bg-white text-center"
          />
        </label>
      </div>

      {/* 파일 첨부 */}
      <div
        className="flex h-[50px] w-[530px] cursor-pointer items-center justify-center rounded-[10px] border border-gray-300 bg-[#B7C3FB] text-center text-[#003EFB]"
        onClick={() => fileInputRef.current?.click()}
      >
        {fileName || '사진 첨부(필수)'}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* 버튼 */}
      <Button width="w-[200px]" className="cursor-pointer" onClick={handleAddClick}>
        추가
      </Button>
    </div>
  );
};
