import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/backend/menu/tree',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.post<getMenuListResultModel>({ url: Api.GetMenuList }).then(res => {
    updateMenuData(res)
    return res;
  });
};

function updateMenuData(childrens:any,type="0"){
  childrens.forEach(item => {
    item.type = type
    item.name = item.menuName
    item.orderNo = item.sortNum;
    item.routePath = item.path;
    item.parentMenu = item.parentId;
    item.children = item.childrens;
    if(!item.component) item.component = 'LAYOUT'
    if(!item.meta) item.meta = {}
    item.meta.title = item.menuName
    item.meta.orderNo = item.sortNum
    if(item.children && item.children.length > 0){
      updateMenuData(item.children,"1")
    }
  })
}