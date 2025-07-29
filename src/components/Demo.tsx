import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Demo() {
  const [data, setData] = useState(1);
  const { t } = useTranslation();

  return (
    <div className=" text-red-500 ">
      {t("hello")}
      {data}
      <button>addddddd</button>
    </div>
  );
}
