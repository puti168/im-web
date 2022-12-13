export interface BasicPageParams {
  page: number;
  pageNum:number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}
