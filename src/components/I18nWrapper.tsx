// src/components/I18nWrapper.tsx
import "../i18n"; // ✅ 确保只初始化一次

export default function I18nWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
