import { defHttp } from '/@/utils/http/axios';
import { DemoParams, DemoListGetResultModel } from './model/tableModel';
import dayjs from 'dayjs';

enum Api {
  USER_CONFUG_INFO = '/backend/customerserviceconfig/info',
  UPDATE_USER_CONFUG = '/backend/customerserviceconfig/saveOrUpdate',

  SCHEME_INFO = '/backend/scheme/info',
  UPDATE_SCHEME = '/backend/scheme/saveOrUpdate',

  IP_LIST = '/backend/accesslist/pageList',
  SAVE_IP = '/backend/accesslist/save',
  UPDATE_IP = '/backend/accesslist/update',
  DELETE_IP = '/backend/accesslist/falseDelete',

  PUBLICMSG_LIST = '/backend/publicmsg/pageList',
  SAVE_PUBLICMSG = '/backend/publicmsg/save',
  UPDATE_PUBLICMSG = '/backend/publicmsg/update',
  DELETE_PUBLICMSG = '/backend/publicmsg/falseDelete',
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


export const getPulbicMsgList = (params: DemoParams) => {
  params.pageNum = params.page
  return defHttp.post<DemoListGetResultModel>({
    url: Api.PUBLICMSG_LIST,
    params,
  }).then((res:any) => {
    return {
      items:res.records,
      total:res.total
    }
  });
}
export const savePulbicMsg = (params: DemoParams) => 
   defHttp.post<DemoListGetResultModel>({
    url: Api.SAVE_PUBLICMSG,
    params,
  });
export const updatePulbicMsg = (params: DemoParams) => 
    defHttp.post<DemoListGetResultModel>({
    url: Api.UPDATE_PUBLICMSG,
    params,
  });
export const deletePulbicMsg= (params:any[]) => 
    defHttp.delete<DemoListGetResultModel>({
    url: Api.DELETE_PUBLICMSG,
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

   
const dataSource:any = [
  {
    name: '顶部banner',
    tid:0,
  },
  {
    name: '循环文案',
    tid:1,
  },
  {
    name: '开场文案',
    tid:2,
  },
];
export const getSchemeInfo = async (params: any) => {
  let res0 = await defHttp.post<DemoListGetResultModel>({
    url: Api.SCHEME_INFO,
    params:{distributorId:params.distributorId,type:0},
  })
  dataSource[0] = {...res0,...dataSource[0],distributorId:params.distributorId};
  let res1 = await defHttp.post<DemoListGetResultModel>({
    url: Api.SCHEME_INFO,
    params:{distributorId:params.distributorId,type:1},
  })
  dataSource[1] = {...res1,...dataSource[1],distributorId:params.distributorId};
  let res2 = await defHttp.post<DemoListGetResultModel>({
    url: Api.SCHEME_INFO,
    params:{distributorId:params.distributorId,type:2},
  })
  dataSource[2] = {...res2,...dataSource[2],distributorId:params.distributorId};
  
  return {
    items:dataSource,
    total:3
  }
}
export const updateSchemeMsd = (params: DemoParams) => 
   defHttp.post<DemoListGetResultModel>({
    url: Api.UPDATE_SCHEME,
    params,
  });
