const consultationChecklist = [
  "철거할 지역과 건물 위치",
  "식당·카페·사무실 등 현재 업종",
  "전체 철거 또는 원상복구 범위",
  "희망 작업 시기",
  "현장 사진과 도면 보유 여부",
];

type ConsultationChecklistProps = {
  className?: string;
  titleId?: string;
};

export default function ConsultationChecklist({
  className = "",
  titleId = "consultation-checklist-title",
}: ConsultationChecklistProps) {
  const cardClassName = ["home-consult-checklist", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClassName} aria-labelledby={titleId}>
      <p className="home-eyebrow">상담 전 확인사항</p>
      <h2 id={titleId}>빠른 상담을 위해 아래 내용을 준비해주세요</h2>
      <ul>
        {consultationChecklist.map((item) => (
          <li key={item}>
            <span aria-hidden="true">✓</span>
            {item}
          </li>
        ))}
      </ul>
      <p className="home-consult-checklist-note">
        정확한 견적은 현장 구조, 철거 범위, 폐기물 양과 장비 진입 조건을 확인한
        후 안내됩니다.
      </p>
    </div>
  );
}
