import { defHttp } from '/@/utils/http/axios';
import { DemoParams, DemoListGetResultModel } from './model/tableModel';

enum Api {
  USER_LIST = '/backend/customerservice/pageList',
  UPDATE_USER = '/backend/customerservice/update',
  DELETE_USER = '/backend/customerservice/falseDelete',
  SAVE_USER = '/backend/customerservice/save',

  GROUP_LIST = '/backend/group/pageList',
  SAVE_GROUP = '/backend/group/save',
  UPDATE_GROUP = '/backend/group/update',
  DELETE_GROUP = '/backend/group/falseDelete',

  IP_LIST = '/backend/accesslist/pageList',
  SAVE_IP = '/backend/accesslist/save',
  UPDATE_IP = '/backend/accesslist/update',
  DELETE_IP = '/backend/accesslist/falseDelete',
}

export const getUserPageList = (params: DemoParams) => {
  params.pageNum = params.page
  return defHttp.post<DemoListGetResultModel>({
    url: Api.USER_LIST,
    params,
  }).then((res:any) => {
    return {
      items:res.records,
      total:res.total
    }
  });
}
export const saveUSER = (params: DemoParams) => 
   defHttp.post<DemoListGetResultModel>({
    url: Api.SAVE_USER,
    params,
  });
export const updateUSER = (params: DemoParams) => 
    defHttp.post<DemoListGetResultModel>({
    url: Api.UPDATE_USER,
    params,
  });
export const deleteUSER= (params: any[]) => 
    defHttp.delete<DemoListGetResultModel>({
    url: Api.DELETE_USER,
    params,
  });

  
export const getIPList = (params: DemoParams) => {
  params.pageNum = params.page
  return defHttp.post<DemoListGetResultModel>({
    url: Api.IP_LIST,
    params,
  }).then((res:any) => {
    return {
      items:res.records,
      total:res.total
    }
  });
}
export const saveIP = (params: DemoParams) => 
   defHttp.post<DemoListGetResultModel>({
    url: Api.SAVE_IP,
    params,
  });
export const updateIP = (params: DemoParams) => 
    defHttp.post<DemoListGetResultModel>({
    url: Api.UPDATE_IP,
    params,
  });
export const deleteIP= (params:any[]) => 
    defHttp.delete<DemoListGetResultModel>({
    url: Api.DELETE_IP,
    params,
  });

  
export const getGroupPageList = (params: DemoParams) => {
  params.pageNum = params.page
  return defHttp.post<DemoListGetResultModel>({
    url: Api.GROUP_LIST,
    params,
  }).then((res:any) => {
    res.records.forEach(element => {
      element.id = String(element.id)
    })
    return {
      items:res.records,
      total:res.total
    }
  });
}
export const saveGroup = (params: DemoParams) => 
   defHttp.post<DemoListGetResultModel>({
    url: Api.SAVE_GROUP,
    params,
  });
export const updateGroup = (params: DemoParams) => 
   defHttp.post<DemoListGetResultModel>({
    url: Api.UPDATE_GROUP,
    params,
  });
export const deleteGroup = (params: any[]) => 
   defHttp.delete<DemoListGetResultModel>({
    url: Api.DELETE_GROUP,
    params,
  });