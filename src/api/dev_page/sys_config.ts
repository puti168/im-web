import { defHttp } from '/@/utils/http/axios';
import { DemoParams, DemoListGetResultModel } from './model/tableModel';
import dayjs from 'dayjs';

enum Api {
  USER_CONFUG_INFO = '/backend/customerserviceconfig/info',
  UPDATE_USER_CONFUG = '/backend/customerserviceconfig/saveOrUpdate',

  GROUP_LIST = '/backend/group/pageList',
  SAVE_GROUP = '/backend/group/save',
  UPDATE_GROUP = '/backend/group/update',
  DELETE_GROUP = '/backend/group/delete',

  IP_LIST = '/backend/accesslist/pageList',
  SAVE_IP = '/backend/accesslist/save',
  UPDATE_IP = '/backend/accesslist/update',
  DELETE_IP = '/backend/accesslist/delete',
}

export const getUserConfig = (params:{distributorId: number}) => {
  return defHttp.get<any>({
    url: Api.USER_CONFUG_INFO+'/'+params.distributorId ,
  }).then((res:any) => {
    let data:any = [];
    data[0] = {
      tid:0,
      name:'优先匹配',
      updateTime:dayjs(res.updateTime).format('YYYY-MM-DD HH:mm:ss'),
      updateUser:res.updateUser,
      id:res.id,
      handleLimit:String(res.handleLimit || 0),
      levelNum:String(res.levelNum || 0)

    }
    data[1] = {
      tid:1,
      id:res.id,
      name:'客服匹配限制',
      updateTime:dayjs(res.updateTime).format('YYYY-MM-DD HH:mm:ss'),
      updateUser:res.updateUser,
      handleLimit:String(res.handleLimit || 0),
      levelNum:String(res.levelNum || 0)
    }
    console.log(data,'asdads');
    
    return {
      total:2,
      items:data
    };
  });
}
export const updateUserConfig = (params: DemoParams) => 
    defHttp.post<DemoListGetResultModel>({
    url: Api.UPDATE_USER_CONFUG,
    params,
  });


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
  params.pageNum = params.pageSize
  return defHttp.post<DemoListGetResultModel>({
    url: Api.GROUP_LIST,
    params,
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