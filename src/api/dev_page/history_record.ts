import { defHttp } from '/@/utils/http/axios';
import { DemoParams, DemoListGetResultModel } from './model/tableModel';

enum Api {
  SESSIONORDER_LIST = '/backend/sessionorder/pageList',
}

export const getSessionorderList = (params: DemoParams) => {
  params.pageNum = params.page;
  defHttp.post<DemoListGetResultModel>({
    url: Api.SESSIONORDER_LIST,
    params,
  });
};
