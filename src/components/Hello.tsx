import { useState } from "react";
import { localesConfig } from "../../i18n.config";
import { useTranslation } from "react-i18next";
import { changeLocale } from "astro-react-i18next/utils";

export function Hello() {
  const [data, setData] = useState(1);

  const { t } = useTranslation("home");
  return (
    <div>
      {localesConfig.map((d) => {
        return (
          <p key={d.code}>
            <a href={d.isDefaultLang ? "/" : `/${d.code}`}>{d.name}</a>
          </p>
        );
      })}

      <p>{t("title")}</p>

      <p>
        {t("count")}
        {data}
      </p>

      <button onClick={() => setData((d) => d + 1)}>add</button>

      <div></div>

      <button
        onClick={() => {
          changeLocale("zh");
        }}
      >
        切换语言zh
      </button>

      {/* <a href="/about">about</a> */}
    </div>
  );
}
