import request from "./request";

/**
 * 查询资产
 * @param id 资产ID
 */
export const getLists = (params) => request.post(`/deviceAppointment/queryAppointmentByTime`, params);
