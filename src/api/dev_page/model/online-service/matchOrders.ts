export interface matchOrdersEntry {
  csId: string;
  distributorId: string;
  orderBaseInfos: orderBaseInfos;
}

interface orderBaseInfos {
  orderId: string;
  userId: string;
}
