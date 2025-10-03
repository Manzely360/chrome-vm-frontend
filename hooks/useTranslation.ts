'use client';

import { useApp } from '@/contexts/AppContext';
import { translations } from '@/locales/translations';

export const useTranslation = () => {
  const { language } = useApp();
  
  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key];
  };

  return { t, language };
};
