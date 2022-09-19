import request from "./request";

/**
 * 查询资产(新的)
 * @param {*} params
 */
export const queryAssetData = (id, params, count) =>
  request.post(
    `asset/getAssetData?asset_id=${id}${
      count || count === 0 ? "&count=" + count : ""
    }`,
    params
  );

export const queryCustomData = (params) => {
  return request.post(`WisdomPark/queryMenuByAssetIdInfo`, params);
};
