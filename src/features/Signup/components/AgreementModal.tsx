interface AgreementModalProps {
  index: number;
  onClose: () => void;
}

const AgreementModal = ({ index, onClose }: AgreementModalProps) => {
  //갹 상세 설명 배열로 관리
  const termsList = [
    {
      title: '(필수) 개인정보 수집 및 이용 동의',
      content: `1. 수집 항목
- 필수: 이름, 휴대폰 번호, 이메일 주소, 생년월일, 성별, 위치정보
- 선택: 프로필 사진, 트레이너 경력 정보 등

2. 수집 목적
- 서비스 제공 및 사용자 식별
- 운동 요청 및 매칭 서비스 운영
- 상담 및 고객 지원
- 법적 의무 이행

3. 보유 및 이용 기간
- 서비스 이용 기간 동안 보관하며, 탈퇴 후 30일 이내 파기합니다.
- 단, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관

※ 사용자는 개인정보 수집 및 이용에 동의하지 않을 권리가 있으나, 동의 거부 시 
서비스 이용이 제한될 수 있습니다.`,
    },
    {
      title: '(필수) 이용약관 동의',
      content: `1. 서비스 개요
- grabPT는 사용자와 트레이너 간 운동 서비스를 매칭하는 플랫폼입니다.

2. 사용자 의무
- 허위 정보 기재 금지
- 타인의 권리 침해 금지
- 서비스 정상 운영을 방해하는 행위 금지

3. 서비스 제공 및 중단
- 서비스는 연중무휴 제공되나, 점검 또는 시스템 오류로 중단될 수 있습니다.
- 회사는 필요 시 서비스 내용을 사전 고지 후 변경할 수 있습니다.

4. 면책 조항
- grabPT는 트레이너와 사용자 간 직접 체결된 계약의 당사자가 아니므로,
  운동 중 발생하는 사고에 대해 법적 책임을 지지 않습니다.

5. 분쟁 해결
- 본 약관과 관련한 분쟁은 대한민국 법률에 따릅니다.`,
    },
    {
      title: '(필수) 위치기반 서비스 약관 동의',
      content: `1. 위치정보의 수집 및 이용
- 실시간 위치정보를 기반으로 주변 트레이너 또는 사용자 매칭을 위함

2. 수집 방법
- 모바일 디바이스의 GPS, 네트워크 정보 등을 통해 수집

3. 이용 목적
- 사용자 주변의 PT 서비스 추천
- 활동 지역 기반 요청서 및 제안서 제공

4. 보유 및 이용기간
- 실시간 위치정보는 저장하지 않으며, 매칭 목적 이외로 활용되지 않습니다.

`,
    },
    {
      title: '(필수) 만 14세 이상 여부 확인',
      content: `- grabPT는 만 14세 이상만 가입 가능합니다.
- 가입자는 본인의 생년월일을 정확히 입력해야 하며, 만 14세 미만 사용자는 법정 대리인의 동의 없이는 
  서비스 이용이 제한됩니다.`,
    },
    {
      title: '5. (선택) 마케팅 정보 수신 동의 (비활성 상태, 선택적 동의)',
      content: `
1. 수신 항목
- 이벤트, 프로모션, 할인 정보 등 grabPT의 마케팅 콘텐츠

2. 발송 수단
- 문자 메시지 (SMS), 이메일, 앱 알림 등

3. 철회 방법
- 마케팅 수신은 언제든지 [설정] 메뉴 또는 고객센터를 통해 철회 가능합니다.

※ 동의하지 않아도 서비스 이용에는 제한이 없습니다.

`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="max-h-[80vh] w-[59.375rem] overflow-y-auto rounded-[1.25rem] bg-white p-[3.62rem]">
        <h1 className="mb-6 text-[1.25rem] font-bold">{termsList[index].title}</h1>

        <p className="text-[1.25rem] font-normal whitespace-pre-line">{termsList[index].content}</p>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="h-[2.625rem] w-[9.125rem] rounded-[0.625rem] bg-[color:var(--color-button)] text-[0.9375rem] font-semibold text-white hover:bg-[color:var(--color-button-hover)] active:bg-[color:var(--color-button-pressed)]"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgreementModal;
