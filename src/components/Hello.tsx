import { changeLocale } from "astro-react-i18next/utils";
import i18next, { changeLanguage } from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function Hello() {
  const [data,setData] = useState(1)
  const {t} = useTranslation("demo")
  
  return <div>
    <p>{t("hero.title")}</p>
    {data}
    <div  onClick={()=>setData(d=>d+1)}>add</div>

    <button onClick={()=>{
      changeLocale("zh-TW")
    }}>
      切换语言
    </button>
  </div>;
}

