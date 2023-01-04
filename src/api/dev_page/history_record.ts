import { defHttp } from '/@/utils/http/axios';
import { DemoParams, DemoListGetResultModel } from './model/tableModel';

enum Api {
  SESSIONORDER_LIST = '/backend/sessionorder/pageList',
  MESSAGE_LIST = '/backend/chatMessage/pageList',
  LANG_LIST = '/backend/translation/getLang',
}

export const getSessionorderList = (params: DemoParams) => {
  params.pageNum = params.page;
  return defHttp
    .post<DemoListGetResultModel>({
      url: Api.SESSIONORDER_LIST,
      params,
    })
    .then((res: any) => {
      return {
        items: res.records,
        total: res.total,
      };
    });
};

export const getLangList = () => {
  return defHttp
  .post<DemoListGetResultModel>({
    url: Api.LANG_LIST,
    params: {},
  }).then((res: any) => {
    localStorage.setItem('langList', JSON.stringify(res));
    return {
      items: Object.values(res),
    }
  })
}

export const getSessionorderListMsg = async (params: any) => {
  params.page = params.page || 1;
  params.pageNum = params.page;
  if(!localStorage.getItem('langList')) {
    await getLangList();
  }
  // 根据langId 转换成对应的lanCode
  const langList = JSON.parse(localStorage.getItem('langList') || '[]');
  const langType = langList[params.langId];
  params.lanCode = langType.lanSimpleCode;
  delete params.langId;
  return defHttp
    .post<DemoListGetResultModel>({
      url: Api.MESSAGE_LIST,
      params,
    })
    .then((res: any) => {
      return {
        items: res.records,
        total: res.total,
      };
    });
};
