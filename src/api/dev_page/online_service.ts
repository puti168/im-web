import { defHttp } from '/@/utils/http/axios';
import { SetOnlineStatusModel } from './model/online-service/setOnlineStatus';
import { queryMychatList } from './model/online-service/queryOnlineStatus';
import { queryAllCount } from './model/online-service/queryAllCount';
import { matchOrdersEntry } from './model/online-service/matchOrders';
import { DemoListGetResultModel } from '/@/api/demo/model/tableModel';
import { queryHistoryRecordsEntry } from '/@/api/dev_page/model/online-service/queryHistoryRecordsEntry';
import { queryUserMessage } from '/@/api/dev_page/model/online-service/queryUserMessage';

enum Api {
  SETCSSTATUS = '/backend/chatMessage/setCsStatus',
  queryCsStatus = '/backend/chatMessage/queryCsStatus',
  queryMychatList = '/backend/chatMessage/queryMychatList',
  queryCsMWChatCount = '/backend/chatMessage/queryCsMWChatCount',
  queryWaitList = '/backend/chatMessage/queryWaitList',
  matchOrders = '/backend/customerservice/matchOrders',
  queryHistoryRecords = '/backend/chatMessage/queryHistoryRecords',
  queryUserDetail = '/backend/chatMessage/queryUserDetail',
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
