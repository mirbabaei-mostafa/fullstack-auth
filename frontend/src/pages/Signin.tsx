import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CookieProps, UserLogin, ErrorResult } from "../data/types";
import { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { API_SIGNIN } from "../data/config";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setAuth } from "../features/authSlice";
import { useAppDispatch } from "../app/hooks";
import OAuth from "../components/OAuth";

const Signin = (props: CookieProps) => {
  const { t } = useTranslation<string>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const schema = yup.object().shape({
    email: yup.string().required(t("EmailRequired")).email(t("EmailFormat")),
    password: yup.string().required(t("PasswordRequired")),
  });
  interface UserI extends yup.InferType<typeof schema> {
    email: string;
    password: string;
  }
  const { ret } = useParams<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<UserI>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler: SubmitHandler<UserLogin> = async (data: UserLogin) => {
    try {
      setLoading(true);
      setError("");
      await axios
        .post(API_SIGNIN, data, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          dispatch(setAuth(res.data));
          props.cookieFN("user", res.data.username);
          reset();
          setLoading(false);
          navigate("/profile");
        });
    } catch (err: any) {
      if (err.response.data as ErrorResult) {
        setError(t(err.response.data.message));
      } else if (typeof err === "string") {
        setError(err);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("GeneralError"));
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-96">
        <form onSubmit={handleSubmit(onSubmitHandler)} className=" w-96">
          <Helmet>
            <title>{t("SigningIn")}</title>
          </Helmet>
          <div className="font-display font-bold text-gray-900 text-2xl pb-6">
            {t("SigningIn")}
          </div>
          {ret === "success" && (
            <div className="text-green-800 font-sans text-base">
              {t("SuccessCreateUser")}
            </div>
          )}
          {error && (
            <div className="text-red-800 font-sans text-base">{t(error)}</div>
          )}
          <div className="py-4 w-full">
            <input
              placeholder={t("Email")}
              type="text"
              {...register("email")}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              className="w-full h-12 text-orange-900 px-8 bg-white hover:bg-orange-200 border border-orange-300 rounded-md"
            ></input>
          </div>
          {errors.email && (
            <div className="text-red-800 font-sans text-base">
              {errors.email?.message}
            </div>
          )}
          <div className="py-4 w-full">
            <input
              placeholder={t("Password")}
              type="password"
              {...register("password")}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              className="w-full h-12 text-orange-900 px-8 bg-white hover:bg-orange-200 border border-orange-300 rounded-md"
            ></input>
          </div>
          {errors.password && (
            <div className="text-red-800 font-sans text-base">
              {errors.password?.message}
            </div>
          )}
          <div className="py-4 w-full">
            {!isLoading ? (
              <button
                type="submit"
                className="w-full h-12 text-orange-900 font-bold px-8 bg-orange-500 hover:bg-orange-700 hover:text-white border border-orange-300 rounded-md uppercase cursor-pointer"
              >
                {t("SignIn")}
              </button>
            ) : (
              <button
                className="w-full h-12 text-gray-800 font-bold px-8 bg-gray-500 border-gray-800 rounded-md uppercase cursor-none"
                disabled
              >
                {t("SignInWait")}
              </button>
            )}
          </div>
          <div className="py-4 w-full">
            <span className="">{t("DontHaveAcoount")}</span>{" "}
            <Link
              className="text-orange-700 hover:text-orange-900"
              to={"/signup"}
            >
              {t("SignUp")}
            </Link>
          </div>
        </form>
        <OAuth errorFN={setError} cookieFN={props.cookieFN} />
      </div>
    </>
  );
};

export default Signin;
