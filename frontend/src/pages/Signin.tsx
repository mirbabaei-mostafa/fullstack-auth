import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const Signin = () => {
  const { t } = useTranslation<string>();
  return (
    <div className="flex flex-col items-center">
      <Helmet>
        <title>{t("SignIn")}</title>
      </Helmet>
      <div className="font-display font-bold text-gray-900 text-lg">
        {t("SignIn")}
      </div>
    </div>
  );
};

export default Signin;
