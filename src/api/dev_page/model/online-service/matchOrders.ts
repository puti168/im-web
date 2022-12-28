export interface matchOrdersEntry {
  csId: string;
  orderBaseInfos: orderBaseInfos;
}

interface orderBaseInfos {
  orderId: string;
  userId: string;
}
