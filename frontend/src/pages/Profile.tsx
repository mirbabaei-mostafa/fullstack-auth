import { useTranslation } from "react-i18next";
import { AuthState } from "../features/authSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import * as yup from "yup";
import { Helmet } from "react-helmet-async";
import { User } from "../data/types";
import { ChangeEvent, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { API_PROFILEUPDATE, API_IMAGEUPDATE } from "../data/config";
import axios, { AxiosProgressEvent } from "axios";

function Profile() {
  const maxFileSize = 1024 * 1024;
  const { t } = useTranslation();
  const [isEdit, setEdit] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const avaterRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
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
          onUploadProgress: function (progressEvent: AxiosProgressEvent) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
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

  const handelFileUpload = async () => {
    setLoading(true);
    if (parseInt(avaterRef.current.files[0].size) >= maxFileSize) {
      setError(t("MaxFileSize"));
      setLoading(false);
      // } else if (
      //   !avaterRef.current.files[0].name.endsWith('.git') ||
      //   !avaterRef.current.files[0].name.endsWith('.png') ||
      //   !avaterRef.current.files[0].name.endsWith('.jpg') ||
      //   !avaterRef.current.files[0].name.endsWith('.jpeg')
      // ) {
    } else if (
      avaterRef.current.files[0].type == "image/jpeg" ||
      avaterRef.current.files[0].type == "image/png" ||
      avaterRef.current.files[0].type == "image/gif" ||
      avaterRef.current.files[0].type == "image/webp"
    ) {
      setError(t("ImageFileType"));
      setLoading(false);
    } else {
      const formData = new FormData();
      formData.append("file", avaterRef.current.files[0]);
      formData.append("fileName", avaterRef.current.files[0].name);
      console.log(formData);
      await axios
        .post(API_IMAGEUPDATE, formData, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => {});
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
          <div className="pb-5 flex flex-col items-center">
            <img
              src={authInfo.image}
              onClick={() => avaterRef.current.click()}
              className="w-20 h-20 rounded-full cursor-pointer self-center"
            />
            <input
              type="file"
              accept="image/*"
              ref={avaterRef}
              className="hidden"
              onChange={handelFileUpload}
            />
            {isLoading && (
              <progress
                value={uploadProgress}
                className="self-center"
                max="100"
              ></progress>
            )}
          </div>
        )}
        {error && (
          <div className="text-red-800 font-sans text-xs font-bold text-base">
            {error}
          </div>
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
