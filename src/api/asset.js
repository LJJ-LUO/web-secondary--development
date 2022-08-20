import request from "./request";

/**
 * 查询资产
 * @param id 资产ID
 */
export const queryAssetById = id =>
  request.post(`/asset/getAssetData?asset_id=${id}`, []);

/**
 * 创建会议
 * @param id 资产ID
 */
export const creatMeeting = params =>
  request.post(`/customize/conference/create?data_id=${params.id}&type=${params.type}`);

/**
 * 表格数据
 * @param id 资产ID
 */
export const queryMettList = params =>
  request.post(`/customize/conference/video_list`, params);

/**
* 点名表单
* @param id 资产ID
*/
export const callTheRollForm = params =>
  request.post(`/customize/conference/artifical_call_save`, params);

/**
* 点名资源
* @param id 资产ID
*/
export const artificalVideoList = params =>
request.post(`/customize/conference/artifical_video_list`, params);

/**
 * 3.切换主席
 */
 export const changeMain = (dataForm) => request.post(`/customize/conference/change_main`, dataForm);

 /**
 * 9.扬声器控制
 */
export const loudspeaker = (dataForm) => request.post(`/customize/conference/change_all_loudspeaker`, dataForm);

/**
 * 12.结束会议
 */
export const finishMetting = (dataForm) => request.post(`/customize/conference/finish`, dataForm);

/**
 * 7.麦克风控制
 */
 export const micCall = (dataForm) => request.post(`/customize/conference/mic_all`, dataForm);

/**
 * 5.重呼
 */
 export const recall = (dataForm) => request.post(`/customize/conference/recall`, dataForm);

 /**
  * 13.挂断
  */
 export const hangup = (dataForm) => request.post(`/customize/conference/hangup`, dataForm);


 

