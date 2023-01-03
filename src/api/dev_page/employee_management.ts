import { defHttp } from '/@/utils/http/axios';
import { DemoParams, DemoListGetResultModel } from './model/tableModel';

enum Api {
  USER_LIST = '/backend/customerservice/pageList',
  UPDATE_USER = '/backend/customerservice/update',
  DELETE_USER = '/backend/customerservice/delete',
  SAVE_USER = '/backend/customerservice/save',
  UPDATE_PASS_WORD = '/backend/customerservice/updateMyPassword',

  GROUP_LIST = '/backend/group/pageList',
  SAVE_GROUP = '/backend/group/save',
  UPDATE_GROUP = '/backend/group/update',
  DELETE_GROUP = '/backend/group/delete',
  GET_GROUP_BY_ID = '/backend/group/getById',

  IP_LIST = '/backend/accesslist/pageList',
  SAVE_IP = '/backend/accesslist/save',
  UPDATE_IP = '/backend/accesslist/update',
  DELETE_IP = '/backend/accesslist/delete',
}

export const getUserPageList = (params: DemoParams) => {
  params.deleteFlag = 0;
  params.pageNum = params.page;
  return defHttp
    .post<DemoListGetResultModel>({
      url: Api.USER_LIST,
      params,
    })
    .then((res: any) => {
      return {
        items: res.records,
        total: res.total,
      };
    });
};
import { useUserStore } from '/@/store/modules/user';
import { AesEncryption } from '/@/utils/cipher';
const userStore = useUserStore();
const aesEncr = new AesEncryption({ key: userStore.getUserInfo.numberStaticKey });
export const saveUSER = (params: DemoParams | any) => {
  if (params.langIds) params.langIds = params.langIds.toString();
  if (params.status) params.status = params.status - 0;

  let result = aesEncr.encryptByAES(JSON.stringify(params));
  return defHttp.post<DemoListGetResultModel>({
    url: Api.SAVE_USER,
    params: {
      body: result,
    },
  });
};
export const updateUSER = (params: DemoParams | any) => {
  let result = aesEncr.encryptByAES(JSON.stringify(params));

  if (params.langIds) params.langIds = params.langIds.toString();
  return defHttp.post<DemoListGetResultModel>({
    url: Api.UPDATE_USER,
    params: {
      body: result,
    },
  });
};
export const deleteUSER = (params: any[]) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.DELETE_USER,
    params,
  });

export const getIPList = (params: DemoParams) => {
  params.page = params.page || 1;
  params.pageNum = params.page;
  params.deleteFlag = 0;
  return defHttp
    .post<DemoListGetResultModel>({
      url: Api.IP_LIST,
      params,
    })
    .then((res: any) => {
      return {
        items: res.records,
        total: res.total,
      };
    });
};
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
export const deleteIP = (params: any[]) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.DELETE_IP,
    params,
  });

export const getGroupPageList = (params: DemoParams) => {
  params.pageNum = params.page;
  params.deleteFlag = 0;
  return defHttp
    .post<DemoListGetResultModel>({
      url: Api.GROUP_LIST,
      params,
    })
    .then((res: any) => {
      res.records.forEach((element) => {
        element.id = String(element.id);
      });
      return {
        items: res.records,
        total: res.total,
      };
    });
};
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
  defHttp.post<DemoListGetResultModel>({
    url: Api.DELETE_GROUP,
    params,
  });

export const getGroupById = (params: DemoParams | any) =>
  defHttp.post<DemoListGetResultModel>({
    url: `${Api.GET_GROUP_BY_ID}/${params.id}`,
    // params,
  });

export const updateMyPassword = (params) => {
  let result = aesEncr.encryptByAES(JSON.stringify(params));
  return defHttp.post<DemoListGetResultModel>({
    url: Api.UPDATE_PASS_WORD,
    params: {
      body: result,
    },
  });
};
