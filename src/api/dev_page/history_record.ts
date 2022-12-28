import { defHttp } from '/@/utils/http/axios';
import { DemoParams, DemoListGetResultModel } from './model/tableModel';

enum Api {
  SESSIONORDER_LIST = '/backend/sessionorder/pageList',
  MESSAGE_LIST = '/backend/chatMessage/pageList',
}

export const getSessionorderList = (params: DemoParams) => {
  params.pageNum = params.page;
  params.distributorId = '123';
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
export const getSessionorderListMsg = (params: DemoParams) => {
  params.page = params.page || 1;
  params.pageNum = params.page;
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
