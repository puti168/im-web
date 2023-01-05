import { defHttp } from '/@/utils/http/axios';
import { DemoParams, DemoListGetResultModel } from './model/tableModel';
import dayjs from 'dayjs';
import { BasicPageParams } from '../model/baseModel';

enum Api {
  fetchDynamicKey = '/backend/customerservice/fetchDynamicKey',

  USER_CONFUG_INFO = '/backend/customerserviceconfig/info',
  UPDATE_USER_CONFUG = '/backend/customerserviceconfig/saveOrUpdate',

  SCHEME_INFO = '/backend/scheme/info',
  UPDATE_SCHEME = '/backend/scheme/saveOrUpdate',

  IP_LIST = '/backend/accesslist/pageList',
  SAVE_IP = '/backend/accesslist/save',
  UPDATE_IP = '/backend/accesslist/update',
  DELETE_IP = '/backend/accesslist/delete',

  PUBLICMSG_LIST = '/backend/publicmsg/pageList',
  SAVE_PUBLICMSG = '/backend/publicmsg/save',
  UPDATE_PUBLICMSG = '/backend/publicmsg/update',
  DELETE_PUBLICMSG = '/backend/publicmsg/delete',

  BNNER_ROTAIO = '/backend/conduct/getBannerRotationCopy',
  QA_REPLAT = '/backend/conduct/getQuestionsAndReply',
  SAVE_REPLAY = '/backend/conduct/save',
  UPDATE_REPLAY = '/backend/conduct/update',
  DELETE_REPLAY = '/backend/conduct/delete',
}
export const fetchDynamicKey = (params: any) => {
  return defHttp.post<any>({
    url: Api.fetchDynamicKey,
    params,
  });
};
export const getUserConfig = () => {
  return defHttp
    .post<any>({
      url: Api.USER_CONFUG_INFO,
    })
    .then((res: any) => {
      const data: any = [];
      data[0] = {
        tid: 0,
        name: '优先匹配',
        updateTime: dayjs(res.updateTime).format('YYYY-MM-DD HH:mm:ss'),
        updateUser: res.updateUser,
        id: res.id,
        handleLimit: String(res.handleLimit || 0),
        levelNum: String(res.levelNum || 0),
        distributorId: res.distributorId,
      };
      data[1] = {
        tid: 1,
        id: res.id,
        name: '客服匹配限制',
        updateTime: dayjs(res.updateTime).format('YYYY-MM-DD HH:mm:ss'),
        updateUser: res.updateUser,
        handleLimit: String(res.handleLimit || 0),
        levelNum: String(res.levelNum || 0),
        distributorId: res.distributorId,
      };
      console.log(data, 'asdads');

      return {
        total: 2,
        items: data,
      };
    });
};
export const updateUserConfig = (params: DemoParams) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.UPDATE_USER_CONFUG,
    params,
  });

export const getPulbicMsgList = (params: DemoParams) => {
  params.pageNum = params.page;
  params.deleteFlag = 0;
  return defHttp
    .post<DemoListGetResultModel>({
      url: Api.PUBLICMSG_LIST,
      params,
    })
    .then((res: any) => {
      return {
        items: res.records,
        total: res.total,
      };
    });
};
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
export const deletePulbicMsg = (params: any[]) =>
  defHttp.post<DemoListGetResultModel>({
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
export const deleteIP = (params: any[]) =>
  defHttp.post<DemoListGetResultModel>({
    url: Api.DELETE_IP,
    params,
  });

const dataSource: any = [
  {
    name: '顶部banner',
    tid: 1,
  },
  {
    name: '循环文案',
    tid: 2,
  },
  {
    name: '开场文案',
    tid: 3,
  },
];
export const getSchemeInfo = async () => {
  const { map: mapObj } = await defHttp.post({
    url: Api.BNNER_ROTAIO,
    params: { types: [1, 2, 3] },
  });
  // dataSource[0] = { ...res0, ...dataSource[0], distributorId: params.distributorId };
  // let res1 = await defHttp.post<DemoListGetResultModel>({
  //   url: Api.SCHEME_INFO,
  //   params: { type: 1 },
  // });
  // dataSource[1] = { ...res1, ...dataSource[1], distributorId: params.distributorId };
  // let res2 = await defHttp.post<DemoListGetResultModel>({
  //   url: Api.SCHEME_INFO,
  //   params: { distributorId: params.distributorId, type: 2 },
  // });
  // dataSource[2] = { ...res2, ...dataSource[2], distributorId: params.distributorId };
  Object.keys(mapObj).forEach((key: any) => {
    const index = key - 1;
    dataSource[index] = { ...mapObj[key], ...dataSource[index] };
  });
  return {
    items: dataSource,
    total: 3,
  };
};
export const updateSchemeMsd = (params: DemoParams) => {
  defHttp.post<DemoListGetResultModel>({
    url: Api.UPDATE_SCHEME,
    params,
  });
};

/**
 * @type 4: 快捷提问，5: 快捷回复
 */
interface GetQuestionsAndReplayParams extends Pick<BasicPageParams, 'pageNum' | 'pageSize'> {
  type: 4 | 5;
}
interface GetQuestionsAndReplayResponse {
  curPageNum: number;
  list: any[];
  pageCount: number;
  total: number;
}
export interface QuestionReplyContent {
  title: string;
  content: string;
  creator: string;
  id: string;
  langId: number;
  childList: QuestionReplyContent[];
}
export const getQuestionsAndReply = (params: GetQuestionsAndReplayParams) => {
  return defHttp
    .post<GetQuestionsAndReplayResponse>({
      url: Api.QA_REPLAT,
      params,
    })
    .then((res) => {
      return {
        items: res.list,
        total: res.total,
      };
    });
};

interface SaveQuestionAndReplyParams {
  data: {
    title: string;
    content: string;
    langId: number;
  }[];
  type: 4 | 5;
}
export const saveQuestionsAndReply = (params: SaveQuestionAndReplyParams) => {
  return defHttp.post<void>({
    url: Api.SAVE_REPLAY,
    params,
  });
};

interface UpdateQuestionAndReplyParams extends SaveQuestionAndReplyParams {
  mainId: string;
}
export const updateQuestionsAndReply = (params: UpdateQuestionAndReplyParams) => {
  return defHttp.post<void>({
    url: Api.UPDATE_REPLAY,
    params,
  });
};

interface DeleteQuestionAndReplyParams {
  ids: string[];
}
export const deleteQuestionsAndReply = (params: DeleteQuestionAndReplyParams) => {
  return defHttp.post<void>({
    url: Api.DELETE_REPLAY,
    params,
  });
};
