import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import { removeAuth } from "../features/authSlice";
import { CookieProps } from "../data/types";
import { Cookies } from "react-cookie";

function Logo(props: CookieProps) {
  const cookies = new Cookies();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const signOut = () => {
    dispatch(removeAuth());
    props.cookieFN("user", "");
    cookies.remove("auth_token", { path: "/" });
  };
  return (
    <div className="flex flex-col items-center place-content-center justify-center">
      {auth.username && (
        <div className="pb-5">
          <img src={auth.image} className="w-16 h-16 rounded-full" />
        </div>
      )}
      <div className="text-orange-600 font-display font-bold text-5xl drop-shadow hover:deop-shadow-2xl pb-9">
        {t("ControlPannel")}
      </div>
      {auth.username ? (
        <div className="flex flex-col items-center place-content-center justify-center pb-9">
          <div className="text-white hover:text-gray-300 pb-5 font-serif font-bold">
            <Link to={"/todos"}>{t("Todos")}</Link>
          </div>
          <div className="text-white hover:text-gray-300 pb-5 font-serif font-bold">
            <Link to={"/profile"}>{t("Profile")}</Link>
          </div>
        </div>
      ) : (
        <div className="text-white font-sans font-bold text-lg drop-shadow pb-32">
          {t("ToEntrance")}
        </div>
      )}
      {/* {props.username! === '' && ( */}
      <div className="px-2 flex flex-row items-center gap-4 justify-between">
        <button
          className="rounded-3xl border border-orange-600 py-3 px-5 bg-orange-500 font-sans font-bold text-white"
          onClick={auth.username ? signOut : () => navigate("/signup")}
        >
          {auth.username ? t("Signout") : t("SignUp")}
        </button>
        {!auth.username && (
          <button
            className="rounded-3xl border border-orange-600 py-3 px-5 bg-orange-500 font-sans font-bold text-white"
            onClick={() => navigate("/signin")}
          >
            {t("Signin")}
          </button>
        )}
      </div>
    </div>
  );
}

export default Logo;
