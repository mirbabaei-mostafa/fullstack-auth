import React from 'react';
import { useTranslation } from 'react-i18next';

function Profile() {
  const { t } = useTranslation();
  return <div>{t('Profile')}</div>;
}

export default Profile;
