import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  username: string;
};

function Logo(props: Props) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-orange-600 font-display font-bold text-5xl drop-shadow hover:deop-shadow-2xl pb-6">
        {t("ControlPannel")}
      </div>
      <div className="text-white font-sans font-bold text-lg drop-shadow pb-32">
        {t("ToEntrance")}
      </div>
      {props.username! === "" && (
        <div className="px-2">
          <button className="rounded-3xl border border-orange-600 p-3 bg-orange-500 font-sans font-bold text-white">
            {t("SignUp")}
          </button>
        </div>
      )}
    </div>
  );
}

export default Logo;
