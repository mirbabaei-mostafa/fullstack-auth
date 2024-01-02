import { useTranslation } from "react-i18next";
import { AuthState } from "../features/authSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import * as yup from "yup";
import { Helmet } from "react-helmet-async";
import { User } from "../data/types";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { API_PROFILEUPDATE, API_IMAGEUPDATE } from "../data/config";
import axios from "axios";

function Profile() {
  const { t } = useTranslation();
  const [isEdit, setEdit] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User>({
    username: "",
    email: "",
    password: "",
    image: "",
  });
  const schema = yup.object().shape({
    username: yup.string().required(t("UsernameRequired")),
    email: yup.string().required(t("EmailRequired")).email(t("EmailFormat")),
    password: yup.string(),
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
  const [error, setError] = useState<string>("");
  const authInfo: AuthState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const editClassName =
    "w-full h-12 text-orange-900 px-8 bg-white hover:bg-orange-200 border border-orange-100 rounded-md";
  const showClassName =
    "w-full h-12 text-orange-900 px-8 bg-white border border-orange-300 rounded-md font-bold";

  const onSubmitHandler: SubmitHandler<User> = async (data: User) => {
    try {
      setLoading(true);
      setError("");
      const newData = { ...data, _id: authInfo._id };
      await axios
        .post(API_PROFILEUPDATE, data, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(data),
        })
        .then((res) => {
          reset();
          setLoading(false);
          setEdit(false);
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
          <title>{t("Profile")}</title>
        </Helmet>
        <div className="font-display font-bold text-gray-900 text-2xl pb-6">
          {t("Profile")}
        </div>
        {authInfo.image && (
          <div className="pb-5">
            <img src={authInfo.image} className="w-20 h-20 rounded-full" />
          </div>
        )}
        {error && (
          <div className="text-red-800 font-sans text-base">{error}</div>
        )}
        {errors.username && (
          <div className="text-red-800 font-sans text-base">
            {errors.username?.message}
          </div>
        )}
        <div className="py-4 w-full">
          <input
            type="text"
            value={authInfo.username}
            {...register("username")}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUserInfo({ ...userInfo, username: event.target.value })
            }
            disabled={isEdit ? false : true}
            className={isEdit ? editClassName : showClassName}
          />
        </div>
        {errors.email && (
          <div className="text-red-800 font-sans text-base">
            {errors.email?.message}
          </div>
        )}
        <div className="py-4 w-full">
          <input
            value={authInfo.email}
            {...register("email")}
            type="text"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUserInfo({ ...userInfo, email: event.target.value })
            }
            disabled={isEdit ? false : true}
            className={isEdit ? editClassName : showClassName}
          />
        </div>
        <div className="py-4 w-full">
          <input
            type="password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUserInfo({ ...userInfo, password: event.target.value })
            }
            disabled={isEdit ? false : true}
            className={isEdit ? editClassName : showClassName}
          />
        </div>
        <div className="py-4 w-full">
          {!isEdit ? (
            <button
              onClick={() => setEdit(true)}
              className="w-full h-12 text-gray-800 font-bold px-8 bg-gray-500 border-gray-800 rounded-md uppercase cursor-pointer"
            >
              {t("ClickToChange")}
            </button>
          ) : (
            <button
              onClick={() => setEdit(false)}
              className="w-full h-12 text-orange-900 font-bold px-8 bg-orange-500 hover:bg-orange-700 hover:text-white border border-orange-300 rounded-md uppercase cursor-pointer"
            >
              {t("Save")}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default Profile;
