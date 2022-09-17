import request from "./request";

/**
 * 查询资产(新的)
 * @param {*} params
 */
export const getAssetsData = (dataForm) => request.post(`WisdomPark/queryByField`, dataForm);
