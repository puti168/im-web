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
  UPDATE_REPLAY_SORT = '/backend/conduct/updateSort',
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
    title?: string;
    content: string;
    langId: number;
  }[];
  type: number;
}
export const saveQuestionsAndReply = (params: SaveQuestionAndReplyParams) => {
  return defHttp.post<void>({
    url: Api.SAVE_REPLAY,
    params: {
      ...params,
      mainId: -1,
    },
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

interface UpdateReplySortParams {
  endSortId: string;
  startSortId: string;
  type: number;
}
export const updateQuestionReplySort = (params: UpdateReplySortParams) => {
  return defHttp.post<void>({
    url: Api.UPDATE_REPLAY_SORT,
    params,
  });
};

interface GetBannerRotationResponse {
  map: {
    [key: number]: QuestionReplyContent;
  };
}
export const getBannerRotation = () => {
  return defHttp.post<GetBannerRotationResponse>({
    url: Api.BNNER_ROTAIO,
    params: { types: [1, 2, 3] },
  });
};

export const updateSchemeMsd = (params: DemoParams) => {
  defHttp.post<DemoListGetResultModel>({
    url: Api.UPDATE_SCHEME,
    params,
  });
};
