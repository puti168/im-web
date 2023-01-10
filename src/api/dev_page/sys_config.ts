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

  /** 文案设置/广告设置接口 */
  BNNER_ROTAIO = '/backend/conduct/getBannerRotationCopy',
  QA_REPLAT = '/backend/conduct/getQuestionsAndReply',
  SAVE_REPLAY = '/backend/conduct/save',
  UPDATE_REPLAY = '/backend/conduct/update',
  DELETE_REPLAY = '/backend/conduct/delete',
  UPDATE_REPLAY_SORT = '/backend/conduct/updateSort',
  GET_OTHER_LANG = '/backend/conduct/getOtherLangData',
  UPDATE_ENABLE = '/backend/conduct/updateEnable',
  UPLOAD_IMAGE = '/third/cs/fileinfo/uploadImage',

  /** 客服配置接口 */
  GET_AGENT_SET_LIST = '/backend/customerserviceconfig/getSysCfgParms',
  GET_RULE_LIST = '/backend/customerserviceconfig/getRuleListByParam',
  ADD_AGENT_RULE = '/backend/customerserviceconfig/addCsRule',
  UPDATE_AGENT_RULE = '/backend/customerserviceconfig/updateCsRule',
  REMOVE_AGENT_RULE = '/backend/customerserviceconfig/delCsRule',
  GET_RULE_DETAIL = '/backend/customerserviceconfig/getRuleDetail',
  UPDATE_RULE_SORT = '/backend/customerserviceconfig/updateSort',
  GET_UN_CHOOSE_GROUP = '/backend/customerserviceconfig/getUnChoosedGroups',
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
  type: number;
  isEnabled: boolean;
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
  endSortId: number;
  startSortId: number;
  type: number;
}
export const updateQuestionReplySort = (params: UpdateReplySortParams) => {
  return defHttp.post<void>({
    url: Api.UPDATE_REPLAY_SORT,
    params,
  });
};

interface GetOtherLangDataParams {
  parentId: string;
  type: number;
}
interface GetOtherLangDataResponse {
  list: QuestionReplyContent[];
}
export const getOtherLangData = (params: GetOtherLangDataParams) => {
  return defHttp.post<GetOtherLangDataResponse>({
    url: Api.GET_OTHER_LANG,
    params,
  });
};

/* eslint-disable */
interface GetBannerRotationParams extends Pick<BasicPageParams, 'pageNum' | 'pageSize'> {}
interface GetBannerRotationResponse {
  list: QuestionReplyContent[];
  total: number;
}
export const getBannerRotation = (params: GetBannerRotationParams) => {
  return defHttp.post<GetBannerRotationResponse>({
    url: Api.BNNER_ROTAIO,
    params: { types: [1, 2, 3], ...params },
  });
};

interface UpdateRotationEnableParams {
  id: string;
  type: number;
  isEnable: 0 | 1;
}

export function updateRotationEnable(params: UpdateRotationEnableParams) {
  return defHttp.post<void>({
    url: Api.UPDATE_ENABLE,
    params,
  });
}

export const updateSchemeMsd = (params: DemoParams) => {
  defHttp.post<DemoListGetResultModel>({
    url: Api.UPDATE_SCHEME,
    params,
  });
};

interface UploadBannerImageResponse {
  fileName: string;
  filePath: string;
  fileSize: string;
  fileStatus: number;
}
export const uploadBannerImage = (params) => {
  return defHttp.post<UploadBannerImageResponse>({
    url: Api.UPLOAD_IMAGE,
    params,
  });
}

interface AgentSettingInfo {
  desc: string;
  opTime: string;
  operName: string;
  paramId: number;
  valueRange: any;
}
interface GetAgentSettingListResponse {
  curPageNo: number;
  pageCount: string;
  paramInfoList: AgentSettingInfo[];
  total: string;
}
export const getAgentSettingList = (params: Pick<BasicPageParams, 'pageNum' | 'pageSize'>) => {
  return defHttp.post<GetAgentSettingListResponse>({
    url: Api.GET_AGENT_SET_LIST,
    params,
  }).then((res) => {
    return {
      items: res.paramInfoList,
      total: +res.total,
    };
  });
}

interface GetRuleListParams extends Pick<BasicPageParams, 'pageNum' | 'pageSize'> {
  pageNo: number;
  pageSize: number;
  paramId: number;
}

export const getAgentSettingRuleList = (params: GetRuleListParams) => {
  return defHttp.post({
    url: Api.GET_RULE_LIST,
    params
  }).then((res) => ({
    items: res.mlist,
    total: +res.total,
  }));
}

interface AddAgentRuleParams {
  groupIds: string[];
  paramId: number;
  ruleName: string;
  value: string;
}

export const addAgentRule = (params: AddAgentRuleParams) => {
  return defHttp.post<void>({
    url: Api.ADD_AGENT_RULE,
    params
  });
}

interface UpdateAgentRuleParams {
  groupIds: string[];
  ruleId: number;
  name: string;
  paramVal: string;
}

export const updateAgentRule = (params: UpdateAgentRuleParams) => {
  return defHttp.post<void>({
    url: Api.UPDATE_AGENT_RULE,
    params
  });
}


export const removeAgentRule = (params: { ruleId: number }) => {
  return defHttp.post<void>({
    url: Api.REMOVE_AGENT_RULE,
    params,
  });
}

interface GetAgentDetailResponse {
  detailInfo: {
    name: string;
    opTime: number;
    operName: string;
    paramVal: string;
    ruleId: number;
    groupInfos: { groupId: string; name: string; status: 0 | 1 }[];
  };
}

export const getAgentRuleDetail = (params: { ruleId: number }) => {
  return defHttp.post<GetAgentDetailResponse>({
    url: Api.GET_RULE_DETAIL,
    params,
  });
}

interface UpdateRuleSortParams {
  paramId: number;
  startSortId: number;
  endSortId: number;
}

export const updateCsRuleSort = (params: UpdateRuleSortParams) => {
  return defHttp.post<void>({
    url: Api.UPDATE_RULE_SORT,
    params,
  });
}

interface GetUnChooseGroupsResponse {
  unChoosedGroupList: {
    groupId: string;
    name: string;
    status: number;
  }[];
}
export const getUnChooseGroups = (params: { paramId: number }) => {
  return defHttp.post<GetUnChooseGroupsResponse>({
    url: Api.GET_UN_CHOOSE_GROUP,
    params,
  });
}
