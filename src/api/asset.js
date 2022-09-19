import request from "./request";

/**
 * 查询资产
 * @param id 资产ID
 */
export const queryAssetById = (id) => request.post(`/asset/getAssetData?asset_id=${id}`, []);
export const blockchainWrite = (params) => request.post(`/blockchain/writeV2`, params);
export const chainCertAuth = () => request.get(`/blockchain/chainCertAuth`);

/**
 * intl.get('COMM.QAC')
 */
export const getSysVariableValues = () => request.get(`asset/getSysVariableValues`);
