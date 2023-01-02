import { defHttp } from '/@/utils/http/axios';
import { SetOnlineStatusModel } from './model/online-service/setOnlineStatus';
import { queryMychatList } from './model/online-service/queryOnlineStatus';
import { queryAllCount } from './model/online-service/queryAllCount';
import { matchOrdersEntry } from './model/online-service/matchOrders';
import { DemoListGetResultModel } from '/@/api/demo/model/tableModel';
import { queryHistoryRecordsEntry } from '/@/api/dev_page/model/online-service/queryHistoryRecordsEntry';
import { queryUserMessage } from '/@/api/dev_page/model/online-service/queryUserMessage';
import { pageList } from '/@/api/dev_page/model/online-service/pageList';
import { detect } from '/@/api/dev_page/model/online-service/detect';
import { translate } from '/@/api/dev_page/model/online-service/translate';
import { closeOrder } from '/@/api/dev_page/model/online-service/closeOrder';

enum Api {
  SETCSSTATUS = '/backend/chatMessage/setCsStatus',
  queryCsStatus = '/backend/chatMessage/queryCsStatus',
  queryMychatList = '/backend/chatMessage/queryMychatList',
  queryCsMWChatCount = '/backend/chatMessage/queryCsMWChatCount',
  queryWaitList = '/backend/chatMessage/queryWaitList',
  matchOrders = '/backend/customerservice/matchOrders',
  queryHistoryRecords = '/backend/chatMessage/queryHistoryRecords',
  queryUserDetail = '/backend/chatMessage/queryUserDetail',
  closeOrder = '/backend/chatMessage/closeOrder',
  pageList = '/backend/publicmsg/pageList',
  detect = '/backend/translation/detect',
  translate = '/backend/translation/translate',
}

export const setOnlineStatus = (params: SetOnlineStatusModel) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.SETCSSTATUS,
    params,
  });

export const queryOnlineStatus = () =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.queryCsStatus,
  });

export const queryMychatList = (params: queryMychatList) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.queryMychatList,
    params,
  });

export const queryWaitList = (params: queryMychatList) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.queryWaitList,
    params,
  });

export const queryCsMWChatCount = (params: queryAllCount) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.queryCsMWChatCount,
    params,
  });

export const matchOrders = (params: matchOrdersEntry) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.matchOrders,
    params,
  });

export const queryHistoryRecords = (params: queryHistoryRecordsEntry) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.queryHistoryRecords,
    params,
  });

export const queryUserMessage = (params: queryUserMessage) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.queryUserDetail,
    params,
  });

export const closeOrder = (params: closeOrder) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.closeOrder,
    params,
  });

export const pageList = (params: pageList) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.pageList,
    params,
  });
export const detect = (params: detect) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.detect,
    params,
  });
export const translate = (params: translate) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.translate,
    params,
  });
