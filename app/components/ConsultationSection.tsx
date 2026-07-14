"use client";

import { type FormEvent, useState } from "react";

type ConsultationForm = {
  name: string;
  phone: string;
  region: string;
  place: string;
  message: string;
  privacyAgreed: boolean;
};

type ConsultationSectionProps = {
  id?: string;
  title?: string;
  intro?: string;
};

const processSteps = [
  "상담 접수",
  "현장 내용 확인",
  "견적 안내",
  "일정 조율",
  "철거 및 폐기물 정리",
  "작업 완료 확인",
];

const initialForm: ConsultationForm = {
  name: "",
  phone: "",
  region: "",
  place: "",
  message: "",
  privacyAgreed: false,
};

const defaultTitle = "현장 내용을 남겨주시면 상담 준비를 돕겠습니다";
const defaultIntro =
  "철거 장소와 상담 내용을 남겨주시면 확인 후 연락드리겠습니다. 빠른 상담은 전화 연결도 이용하실 수 있습니다.";
const consultationScriptUrl =
  "https://script.google.com/macros/s/AKfycbwomxTDGz-FfsJ3M5ytRosO8zB1N0CXCAyIswernxEjfqYxbj2B8PbuHgqbitXRsbav/exec";

export default function ConsultationSection({
  id = "consultation-section",
  title = defaultTitle,
  intro = defaultIntro,
}: ConsultationSectionProps) {
  const [form, setForm] = useState<ConsultationForm>(initialForm);
  const [formNotice, setFormNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleId = `${id}-title`;
  const processTitleId = `${id}-process-title`;
  const fieldPrefix = `${id}-field`;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const requiredFields = [
      form.name,
      form.phone,
      form.region,
      form.place,
      form.message,
    ];
    const hasEmptyRequiredField = requiredFields.some(
      (value) => !value.trim(),
    );

    if (hasEmptyRequiredField) {
      setFormNotice("필수 항목을 모두 입력해주세요.");
      return;
    }

    if (!form.privacyAgreed) {
      setFormNotice("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    const formData = new URLSearchParams({
      name: form.name.trim(),
      phone: form.phone.trim(),
      region: form.region.trim(),
      businessType: form.place.trim(),
      message: form.message.trim(),
      privacyConsent: "동의",
    });

    setIsSubmitting(true);
    setFormNotice("");

    try {
      await fetch(consultationScriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: formData,
      });

      setForm(initialForm);
      setFormNotice(
        "상담 신청이 정상적으로 접수되었습니다. 확인 후 연락드리겠습니다.",
      );
    } catch {
      setFormNotice(
        "접수 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 전화 상담을 이용해주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="home-section home-section-form"
      id={id}
      aria-labelledby={titleId}
    >
      <div className="home-shell home-form-layout">
        <div>
          <p className="home-eyebrow">무료 상담 신청</p>
          <h2 id={titleId}>{title}</h2>
          <p className="home-form-intro">{intro}</p>
          <div className="home-form-process" aria-labelledby={processTitleId}>
            <div className="home-form-process-header">
              <p className="home-eyebrow">작업 진행 절차</p>
              <h2 id={processTitleId}>
                상담 후 현장에 맞춰 순서대로 진행합니다
              </h2>
            </div>
            <ol className="home-process-list">
              {processSteps.map((step, index) => (
                <li key={step}>
                  <span aria-hidden="true">{index + 1}</span>
                  <h3>{step}</h3>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <form className="home-consultation-form" onSubmit={handleSubmit} noValidate>
          <div className="home-form-row">
            <label htmlFor={`${fieldPrefix}-name`}>
              이름 <span className="home-required">*필수</span>
            </label>
            <input
              id={`${fieldPrefix}-name`}
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
              required
            />
          </div>

          <div className="home-form-row">
            <label htmlFor={`${fieldPrefix}-phone`}>
              연락처 <span className="home-required">*필수</span>
            </label>
            <input
              id={`${fieldPrefix}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(event) =>
                setForm((current) => ({ ...current, phone: event.target.value }))
              }
              required
            />
          </div>

          <div className="home-form-row">
            <label htmlFor={`${fieldPrefix}-region`}>
              지역 <span className="home-required">*필수</span>
            </label>
            <input
              id={`${fieldPrefix}-region`}
              name="region"
              type="text"
              value={form.region}
              onChange={(event) =>
                setForm((current) => ({ ...current, region: event.target.value }))
              }
              required
            />
          </div>

          <div className="home-form-row">
            <label htmlFor={`${fieldPrefix}-place`}>
              철거 장소 또는 업종 <span className="home-required">*필수</span>
            </label>
            <input
              id={`${fieldPrefix}-place`}
              name="businessType"
              type="text"
              value={form.place}
              onChange={(event) =>
                setForm((current) => ({ ...current, place: event.target.value }))
              }
              required
            />
          </div>

          <div className="home-form-row home-form-full">
            <label htmlFor={`${fieldPrefix}-message`}>
              상담 내용 <span className="home-required">*필수</span>
            </label>
            <textarea
              id={`${fieldPrefix}-message`}
              name="message"
              rows={5}
              value={form.message}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  message: event.target.value,
                }))
              }
              required
            />
          </div>

          <div className="home-privacy home-form-full">
            <label>
              <input
                name="privacyConsent"
                type="checkbox"
                value="동의"
                checked={form.privacyAgreed}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    privacyAgreed: event.target.checked,
                  }))
                }
                required
              />
              개인정보 수집 및 이용에 동의합니다.
            </label>
            <p>
              수집 항목: 이름, 연락처, 지역, 철거 장소, 상담 내용
              <br />
              수집 목적: 철거 및 원상복구 상담 연락
              <br />
              보유 기간: 상담 완료 후 6개월 이내 파기
              <br />
              동의하지 않을 경우 상담 신청이 제한될 수 있습니다.
            </p>
          </div>

          {formNotice ? (
            <p className="home-form-notice" role="status" aria-live="polite">
              {formNotice}
            </p>
          ) : null}

          <div className="home-form-actions home-form-full">
            <button
              className="home-button home-button-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "접수 중..." : "무료 상담 신청하기"}
            </button>
          </div>

          <div className="home-form-phone home-form-full">
            <strong>010-8286-7620</strong>
            <a className="home-button home-button-secondary" href="tel:010-8286-7620">
              전화 상담
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
