import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetLang = '/backend/translation/getLang',
}

export interface LangData {
  crtTime: string;
  descLocal: string;
  descZh: string;
  id: number;
  lanCode: string;
  lanSimpleCode: string;
}

interface CacheLang {
  [key: number]: LangData;
}
export const getCacheLangList: () => Promise<CacheLang> = () => {
  const cache = localStorage.getItem('langList');
  if (cache) {
    return Promise.resolve(JSON.parse(cache) as CacheLang);
  }
  return defHttp
    .post<CacheLang>({
      url: Api.GetLang,
      params: {},
    })
    .then((res) => {
      localStorage.setItem('langList', JSON.stringify(res));
      return res;
    });
};
