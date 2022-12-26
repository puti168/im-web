import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  AccountList = '/system/getAccountList',
  IsAccountExist = '/system/accountExist',
  DeptList = '/system/getDeptList',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/menu/tree',
  saveMenu = '/menu/save',
  updateMenu = '/menu/update',
  deleteMenu = '/menu/delete',
  RolePageList = '/system/getRoleListByPage',
  GetAllRoleList = '/system/getAllRoleList',
}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getMenuList = (params?: MenuParams | any) => {
  return defHttp.post<MenuListGetResultModel>({ url: Api.MenuList, params:{...params,deleteFlag:0}}).then((res:any) => {
    updateMenuData(res)
    return res;
  })
}

function updateMenuData(childrens:any,type="0"){
  childrens.forEach(item => {
    item.type = type
    item.orderNo = item.sortNum;
    item.routePath = item.path;
    item.parentMenu = item.parentId;
    item.children = item.childrens;
    if(item.children && item.children.length > 0){
      updateMenuData(item.children,"1")
    }
  })
}
export const saveMenu = (params?: MenuParams|any) => {
  params.sortNum = params.orderNo;
  params.path = params.routePath;
  params.parentId = params.parentMenu;
  return defHttp.post<MenuListGetResultModel>({ url: Api.saveMenu, params });
}
export const updateMenu = (params?: MenuParams|any) => {
  params.sortNum = params.orderNo;
  params.path = params.routePath;
  params.parentId = params.parentMenu;
  return defHttp.post<MenuListGetResultModel>({ url: Api.updateMenu, params });
}

export const deleteMenu = (params: any[]) =>
  defHttp.post<MenuListGetResultModel>({ url: Api.deleteMenu, params:{ids:params} });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });
