import { defHttp } from '/@/utils/http/axios';
import { DemoParams, DemoListGetResultModel } from './model/tableModel';

enum Api {
  USER_LIST = '/backend/customerservice/pageList',
  GROUP_LIST = '/backend/group/pageList',
}

export const getUserPageList = (params: DemoParams) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.USER_LIST,
    params,
    headers: {
      // @ts-ignore
      // ignoreCancelToken: true,
    },
  });
export const getGroupPageList = (params: DemoParams) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.GROUP_LIST,
    params,
    headers: {
      // @ts-ignore
      // ignoreCancelToken: true,
    },
  });
