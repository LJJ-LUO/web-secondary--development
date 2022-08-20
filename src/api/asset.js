import request from "./request";

/**
 * 查询资产
 * @param id 资产ID
 */
export const queryAssetById = (id) => request.post(`/asset/getAssetData?asset_id=${id}`, []);

/**
 * 1.创建会议
 */
export const creatMetting = (id) => request.post(`/customize/conference/create?data_id=${id}&type=0`, []);

/**
 * 2.保存临时资源
 */
export const saveAddResources = (id, dataForm) => request.post(`/customize/conference/add_resources?conference_id=${id}`, dataForm);

/**
 * 1.录播
 */
export const record = (dataForm) => request.post(`/customize/conference/record`, dataForm);

/**
 * 3.切换主席
 */
export const changeMain = (dataForm) => request.post(`/customize/conference/change_main`, dataForm);

/**
 * 4.快速发言
 */
export const say = (dataForm) => request.post(`/customize/conference/say`, dataForm);

/**
 * 6.预监
 */
export const preview = (dataForm) => request.post(`/customize/conference/preview`, dataForm);

/**
 * 7.麦克风控制
 */
export const micCall = (dataForm) => request.post(`/customize/conference/mic_all`, dataForm);

/**
 * 8.视频资源列表
 */
export const getVideoList = (dataForm) => request.post(`/customize/conference/video_list`, dataForm);

/**
 * 9.扬声器控制
 */
export const loudspeaker = (dataForm) => request.post(`/customize/conference/change_all_loudspeaker`, dataForm);

/**
 * 12.结束会议
 */
export const finishMetting = (dataForm) => request.post(`/customize/conference/finish`, dataForm);

/**
 * 5.重呼
 */
export const recall = (dataForm) => request.post(`/customize/conference/recall`, dataForm);

/**
 * 13.挂断
 */
export const hangup = (dataForm) => request.post(`/customize/conference/hangup`, dataForm);

/**
 * 2.单页面轮询
 */
export const oneLoop = (dataForm) => request.post(`/customize/conference/one_loop`, dataForm);

/**
 * 4.锁定/解锁会场
 */
export const lockMetting = (dataForm) => request.post(`/customize/conference/lock_meeting`, dataForm);

/**
 * 4.锁定/解锁会场
 */
export const getWsServer = (dataForm) => request.post(`/customize/conference/get_ws_server`, dataForm);
