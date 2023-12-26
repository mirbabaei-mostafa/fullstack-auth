import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserLogin } from "../data/types";
import { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { API_SIGNIN } from "../data/config";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {
  cookieFN: (name: string, value: string) => void;
};

const Signin = (props: Props) => {
  const { t } = useTranslation<string>();
  const navigate = useNavigate();
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
          props.cookieFN("user", res.data.username);
          reset();
          setLoading(false);
          navigate("/profile");
        });
    } catch (err: unknown) {
      if (typeof err === "string") {
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
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="flex flex-col items-center w-96">
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
        <div className="py-4 w-full">
          <input
            type="text"
            {...register("email")}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
            className="w-full h-12 text-orange-900 px-8 bg-white hover:bg-orange-200 border border-orange-300 rounded-md"
          ></input>
        </div>
        <div className="py-4 w-full">
          <input
            type="password"
            {...register("password")}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
            className="w-full h-12 text-orange-900 px-8 bg-white hover:bg-orange-200 border border-orange-300 rounded-md"
          ></input>
        </div>
        <div className="py-4 w-full">
          <button className="w-full h-12 text-orange-900 font-bold px-8 bg-orange-500 hover:bg-orange-700 hover:text-white border border-orange-300 rounded-md uppercase">
            {t("SignIn")}
          </button>
        </div>
        <div className="py-4 w-full">
          <button className="w-full h-12 text-white font-bold px-8 bg-gray-800 hover:bg-gray-700 border-gray-950 rounded-md uppercase">
            {t("ContinueGoole")}
          </button>
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
      </div>
    </form>
  );
};

export default Signin;
