export interface BasicPageParams {
  deleteFlag: number;
  page: number;
  pageNum: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}
