import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { User } from "../data/types";
import { API_SIGNUP } from "../data/config";
import axios from "axios";

const Signup = () => {
  const { t } = useTranslation<string>();
  const [userInfo, setUserInfo] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const schema = yup.object().shape({
    username: yup.string().required(t("UsernameRequired")),
    email: yup.string().required(t("EmailRequired")).email(t("EmailFormat")),
    password: yup.string().required(t("PasswordRequired")),
  });
  interface UserI extends yup.InferType<typeof schema> {
    username: string;
    email: string;
    password: string;
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<UserI>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler: SubmitHandler<User> = async (data: User) => {
    console.log(data);
    try {
      await axios
        .post(API_SIGNUP, data, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(data),
        })
        .then((res) => {
          console.log(res);
          reset();
        });
    } catch (err: unknown) {
      if (typeof err === "string") {
        setError(err);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("GeneralError"));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="flex flex-col items-center w-96">
        <Helmet>
          <title>{t("SigningUp")}</title>
        </Helmet>
        <div className="font-display font-bold text-gray-900 text-2xl pb-6">
          {t("SigningUp")}
        </div>
        {error && (
          <div className="text-red-800 font-sans text-base">{error}</div>
        )}
        <div className="py-4 w-full">
          <input
            {...register("username")}
            type="text"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUserInfo({ ...userInfo, username: event.target.value })
            }
            className="w-full h-12 text-orange-900 px-8 bg-white hover:bg-orange-200 border border-orange-300 rounded-md"
          />
        </div>
        {errors.username && (
          <div className="text-red-800 font-sans text-base">
            {errors.username?.message}
          </div>
        )}
        <div className="py-4 w-full">
          <input
            {...register("email")}
            type="text"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUserInfo({ ...userInfo, email: event.target.value })
            }
            className="w-full h-12 text-orange-900 px-8 bg-white hover:bg-orange-200 border border-orange-300 rounded-md"
          />
        </div>
        {errors.email && (
          <div className="text-red-800 font-sans text-base">
            {errors.email?.message}
          </div>
        )}
        <div className="py-4 w-full">
          <input
            {...register("password")}
            type="password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUserInfo({ ...userInfo, password: event.target.value })
            }
            className="w-full h-12 text-orange-900 px-8 bg-white hover:bg-orange-200 border border-orange-300 rounded-md"
          />
        </div>
        {errors.password && (
          <div className="text-red-800 font-sans text-base">
            {errors.password?.message}
          </div>
        )}
        <div className="py-4 w-full">
          <button className="w-full h-12 text-orange-900 font-bold px-8 bg-orange-500 hover:bg-orange-700 hover:text-white border border-orange-300 rounded-md uppercase">
            {t("SignUp")}
          </button>
        </div>
        <div className="py-4 w-full">
          <button
            type="submit"
            className="w-full h-12 text-white font-bold px-8 bg-gray-800 hover:bg-gray-700 border-gray-950 rounded-md uppercase"
          >
            {t("SignUpGoole")}
          </button>
        </div>
        <div className="py-4 w-full">
          <span className="">{t("HaveAcoount")}</span>{" "}
          <Link
            className="text-orange-700 hover:text-orange-900"
            to={"/signin"}
          >
            {t("SignIn")}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Signup;
