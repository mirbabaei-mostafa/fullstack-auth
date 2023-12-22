import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Signin = () => {
  const { t } = useTranslation<string>();
  return (
    <div className="flex flex-col items-center w-96">
      <Helmet>
        <title>{t('SigningIn')}</title>
      </Helmet>
      <div className="font-display font-bold text-gray-900 text-2xl pb-6">
        {t('SigningIn')}
      </div>
      <div className="py-4 w-full">
        <input
          type="text"
          className="w-full h-12 text-orange-900 px-8 bg-white hover:bg-orange-200 border border-orange-300 rounded-md"
        ></input>
      </div>
      <div className="py-4 w-full">
        <input
          type="password"
          className="w-full h-12 text-orange-900 px-8 bg-white hover:bg-orange-200 border border-orange-300 rounded-md"
        ></input>
      </div>
      <div className="py-4 w-full">
        <button className="w-full h-12 text-orange-900 font-bold px-8 bg-orange-500 hover:bg-orange-700 hover:text-white border border-orange-300 rounded-md uppercase">
          {t('Signin')}
        </button>
      </div>
      <div className="py-4 w-full">
        <button className="w-full h-12 text-white font-bold px-8 bg-gray-800 hover:bg-gray-700 border-gray-950 rounded-md uppercase">
          {t('SignUpGoole')}
        </button>
      </div>
      <div className="py-4 w-full">
        <span className="">{t('DontHaveAcoount')}</span>{' '}
        <Link className="text-orange-700 hover:text-orange-900" to={'/signup'}>
          {t('SignUp')}
        </Link>
      </div>
    </div>
  );
};

export default Signin;
