import { useTranslation } from "react-i18next";
import { GoogleProps } from "../data/types";
import {
  Auth,
  GoogleAuthProvider,
  UserCredential,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import firebaseApp from "../utils/firebase";
import axios from "axios";
import { API_GOOGLESIGNIN } from "../data/config";
import { setAuth } from "../features/authSlice";
import { useAppDispatch } from "../app/hooks";

function OAuth(props: GoogleProps) {
  const { t } = useTranslation<string>();
  const dispatch = useAppDispatch();

  const googleAuthHandler = async () => {
    try {
      const gAuthProvide: GoogleAuthProvider = new GoogleAuthProvider();
      const gAuth: Auth = getAuth(firebaseApp);
      const authResult: UserCredential = await signInWithPopup(
        gAuth,
        gAuthProvide
      );
      await axios
        .post(
          API_GOOGLESIGNIN,
          JSON.stringify({
            username: authResult.user.displayName,
            email: authResult.user.email,
            image: authResult.user.photoURL,
          }),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          dispatch(setAuth(res.data));
          props.cookieFN("user", res.data.username);
        });
      console.log(authResult);
    } catch (err) {
      console.log(err);
      props.errorFN(err as string);
    }
  };

  return (
    <div className="py-6 w-full">
      <button
        type="button"
        onClick={googleAuthHandler}
        className="w-full h-12 text-white font-bold px-8 bg-gray-800 hover:bg-gray-700 border-gray-950 rounded-md uppercase"
      >
        {t("ContinueGoole")}
      </button>
    </div>
  );
}

export default OAuth;
