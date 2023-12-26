import React from "react";
import { useTranslation } from "react-i18next";
import { AuthState } from "../features/authSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";

function Profile() {
  const { t } = useTranslation();
  const authInfo: AuthState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  console.log(authInfo);
  return (
    <>
      <div>{t("Profile")}</div>
      <div>{authInfo.username}</div>
    </>
  );
}

export default Profile;
