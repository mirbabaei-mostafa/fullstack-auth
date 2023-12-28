import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { removeAuth } from '../features/authSlice';
import { CookieProps } from '../data/types';

function Logo(props: CookieProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const signOut = () => {
    dispatch(removeAuth());
    props.cookieFN('user', '');
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-orange-600 font-display font-bold text-5xl drop-shadow hover:deop-shadow-2xl pb-6">
        {t('ControlPannel')}
      </div>
      <div className="text-white font-sans font-bold text-lg drop-shadow pb-32">
        {t('ToEntrance')}
      </div>
      {/* {props.username! === '' && ( */}
      <div className="px-2">
        <button
          className="rounded-3xl border border-orange-600 p-3 bg-orange-500 font-sans font-bold text-white"
          onClick={auth.username ? signOut : () => navigate('/signup')}
        >
          {auth.username ? t('Signout') : t('SignUp')}
        </button>
      </div>
    </div>
  );
}

export default Logo;
