import request from '../core/request';

/**
 * 获取申请列表
 */
export const getColumnByAssetId = (id, config) =>
  request.get(`assetForDataReport/getColumnByAssetId?asset_id=${id}`, config);
/**
 * 数据绑定映射调取新的获取资产列表接口
 */
export const getColumnDataByAssetId = id =>
  request.get(`form/getColumnsByAssetId4Mapping?asset_id=${id}`);
/**
 * 校验多选关联的资产是否符合要求
 */
export const validateMultipleAsset = (assetId, multipleAssetId) =>
  request.get(
    `form/validateMultipleAsset?asset_id=${assetId}&multiple_asset_id=${multipleAssetId}`
  );

// /**
//  * 查询子表信息
//  */
// export const queryAssociations = asset_id =>
//   request.post('asset/associations', asset_id);

/**
 * 查询数据填报列表
 */
export const queryDataReportList = (
  catalog,
  params,
  isFilterEventFlow = false
) => {
  // 过滤掉业务流产生的填报列表
  if (isFilterEventFlow) {
    return request.post(`form/queryList?catalog_id=${catalog}`, params);
  } else {
    return catalog
      ? request.post(`form/queryList?catalog_id=${catalog}`, params)
      : request.post('form/queryList', params);
  }
};
/**
 * 查询数据填报列表
 */
export const queryNewDataReportList = (
  catalog,
  params,
  isFilterEventFlow = false
) => {
  // 过滤掉业务流产生的填报列表
  if (isFilterEventFlow) {
    return request.post(`form/v2/queryPage?catalog_id=${catalog}`, params);
  } else {
    return catalog
      ? request.post(`form/v2/queryPage?catalog_id=${catalog}`, params)
      : request.post('form/v2/queryPage', params);
  }
};

/**
 * 添加数据填报
 */
export const addDataReporting = params => request.post('form/insert', params);
export const formInsertV2 = params => request.post('form/v2/insert', params);
export const formAddInsertV2 = params =>
  request.post('form/data/v2/insert', params);
export const querySystemComponentsV2 = flag =>
  request.get(
    `${
      flag
        ? 'form/component/v2/querySystemComponents?supportFlow=true'
        : 'form/component/v2/querySystemComponents'
    }`
  );
export const formUpdateV2 = params => request.post('form/v2/update', params);
export const formUpdateV3 = params =>
  request.post('form/data/v2/update', params);
export const queryFormV2 = id => request.get(`form/v2/queryById?id=${id}`);
export const queryByTokenV2 = token =>
  request.get(`/form/v2/queryByToken?token=${token}`);
export const querySubTableSystemComponents = () =>
  request.get(`form/component/v2/querySubTableSystemComponents`);
export const addDetail = params =>
  request.post('form/v2/detail/insert', params);
export const updateDetail = params =>
  request.post('form/v2/detail/update', params);
export const getDetail = id => request.get(`form/v2/detail/queryById?id=${id}`);
export const getDetailData = (id, dataId) =>
  request.post(`form/v2/detail/data/queryData?modelId=${id}&dataId=${dataId}`);
export const getDetailDataV2 = (id, dataId) =>
  request.post(`form/data/v2/queryDataDetail?formId=${id}&pkValue=${dataId}`);
export const getSystemData = () =>
  request.get(`form/component/v2/querySystemComponents`);
export const getInfoByToken = token =>
  request.post(`form/v2/detail/export/queryByToken?token=${token}`);

/**
 * 列表页 查询条件 下拉框等组件类型 资产计数
 * @param modelId
 * @param componentId
 */
export const queryConditionValueCount = (modelId, componentId) =>
  request.get(
    `form/list/model/data/queryConditionValueCount?modelId=${modelId}&componentId=${componentId}`
  );

/**
 * 列表页 查询条件 下拉框等组件类型 资产计数
 * @param modelId
 * @param componentId
 */
export const newQueryConditionValueCount = (modelId, componentId, params) =>
  request.post(
    `form/list/model/data/queryConditionValueCount?modelId=${modelId}&componentId=${componentId}`,
    params
  );
/**
 * 更新数据填报
 */
export const updateDataReporting = (params, removeViewColumn, truncate) =>
  removeViewColumn
    ? truncate
      ? request.post(
          `form/update?removeViewColumn=${true}&truncate=${truncate}`,
          params
        )
      : request.post(`form/update?removeViewColumn=${true}`, params)
    : truncate
    ? request.post(`form/update?truncate=${truncate}`, params)
    : request.post(`form/update`, params);

/**
 * 删除数据填报
 */
export const deleteDataReporting = (params, deleteAsset) =>
  request.post(`form/delete?deleteAsset=${deleteAsset}`, params);

/**
 * 删除数据填报失败后强制删除
 */
export const checkDeleteDataReporting = (params, deleteAsset) =>
  request.post(`form/delete?deleteAsset=${deleteAsset}&force=true`, params);

/**
 * 查询详情
 */
export const queryById = (id, show_in_config) =>
  show_in_config
    ? request.get(`form/v2/queryById?id=${id}&show_in_config=${show_in_config}`)
    : request.get(`form/v2/queryById?id=${id}`);

/**
 * 查询详情
 */
export const queryByIdV2 = (id, showInDesign) =>
  showInDesign
    ? request.get(`form/v2/queryById?id=${id}&showInDesign=${showInDesign}`)
    : request.get(`form/v2/queryById?id=${id}`);

export const queryFormById = (id, show_in_config) =>
  show_in_config
    ? request.get(`form/v2/queryById?id=${id}&show_in_config=${show_in_config}`)
    : request.get(`form/queryById?id=${id}`);

/**
 * 查询详情 token
 */
export const queryByToken = token =>
  request.get(`form/queryByToken?token=${token}`);

/**
 * 查询详情(审批流程)
 */
export const queryByIdApproval = id =>
  request.get(`approval/process/queryById?id=${id}`);

/**
 * 查询所有子表
 */
export const queryAssociations = id =>
  request.get(`form/queryAssociations?asset_id=${id}`);

/**
 * 验证所选资产是否满足所需的字段
 */
export const validateMandatoryField = id =>
  request.get(`form/validateMandatoryField?asset_id=${id}`);

/**
 * 查询所有数据字典项
 */
export const queryAllDictionary = (params, config) =>
  request.post('standard/dictionary/item/queryAll', params, config);

/**
 * 按照id查询字典项
 */
export const queryByDictId = (id, config) =>
  request.post(
    `standard/dictionary/content/queryByDictId?dictId=${id}`,
    undefined,
    config
  );

/**
 * 数据填报应用新增
 */
export const insertApplyData = (id, params) =>
  request.post(`form/insertApplyData?form_id=${id}`, params);
/**
 * 数据填报记录保存
 */
export const insertReadingData = (view_id, data_id, process, params) => {
  return request.post(
    `form/insertReadingData?view_id=${view_id}&data_id=${data_id}&process=${process}`,
    params
  );
};

/**
 * 数据填报应用更新
 */
export const updateApplyData = (id, params, edit_id) =>
  request.post(`form/updateApplyData?form_id=${id}&data_id=${edit_id}`, params);

/**
 * 数据填报应用查询单条数据
 */
export const queryApplyDataDetail = (report_id, id, show_value, params) =>
  show_value
    ? request.post(
        `form/queryApplyDataDetail?form_id=${report_id}&id=${id}&show_value=${show_value}`,
        params
      )
    : request.post(
        `form/queryApplyDataDetail?form_id=${report_id}&id=${id}`,
        params
      );

/**
 * 新增查询单条数据
 * @param {*} report_id
 * @param {*} id
 * @param {*} show_value
 * @param {*} params
 * @returns
 */
export const queryApplyDataDetailOriginAndTranslated = (
  report_id,
  id,
  show_value,
  params
) =>
  show_value
    ? request.post(
        `form/queryApplyDataDetail?form_id=${report_id}&id=${id}&show_value=${show_value}`,
        params
      )
    : request.post(
        `form/queryApplyDataDetail?form_id=${report_id}&id=${id}`,
        params
      );

/**
 * 获取数据资产
 */
export const generateAsset = params =>
  request.post('form/generateAsset', params);

/**
 * 更新动态资产
 */
export const updateAsset = params => request.post('form/updateAsset', params);

/**
 * 数据标准查询
 */
export const queryStandard = (params, config) =>
  request.post('standard/queryList', params, config);
/**
 * 提交并开启审核流
 */
export const addApproval = (id, params) =>
  request.post(`approval/process/addApproval?approvalId=${id}`, params);

/**
 * 查询所有部门用户
 */
export const queryOfficeUser = (params, config) =>
  request.post(`/system/office/queryOfficeUser`, params, config);

/**
 * 查询所有部门用户
 */
export const queryOfficeUserV2 = params =>
  request.post(`/system/office/queryOfficeUserV2`, params);

/**
 * 查询当前用户主管
 */
export const queryOfficeDirector = () =>
  request.get(`/system/user/queryOfficeDirector`);

/**
 * 查询所有部门用户 使用数组方式
 */
export const queryOfficeUserList = params =>
  request.post(`/system/office/queryOfficeUserList`, params);

/**
 * 复制
 */
export const datareportCopy = params => request.post(`/form/copy`, params);

/**
 * 复制视图
 */
export const copyView = (view_id, view_name) =>
  request.get(`/formView/copy?view_id=${view_id}&view_name=${view_name}`);

/**
 * 自定义按钮接口get请求
 */
export const addButtonAction = (url, params) => request.get(url, params);

/**
 * 自定义按钮接口后台响应post请求
 */
export const addButtonActionPost = (url, params) => request.post(url, params);

/**
 * 查询所有组件列表
 */
export const queryAllBlock = form_id =>
  request.get(`/formComponent/queryAll?form_id=${form_id}`);

/**
 * 新增过滤
 */

export const insertMyViewFilter = params =>
  request.post('form/insertMyViewFilter', params);

/**
 * 查询过滤
 */

export const queryMyViewFilter = id =>
  request.get(`form/queryMyViewFilter?id=${id}`);

/**
 * 查询过滤
 */

export const deleteMyViewFilter = id =>
  request.get(`form/deleteMyViewFilter?filter_id=${id}`);
/**
 * 修改过滤
 */

export const updateMyViewFilter = params =>
  request.post('form/updateMyViewFilter', params);

/**
 * 动态查询子表信息
 */
export const queryChildTableDetail = (
  child_table_id,
  form_id,
  parent_id,
  show_value
) =>
  request.post(
    show_value
      ? `/form/queryChildTableDetail?child_table_id=${child_table_id}&form_id=${form_id}&parent_id=${parent_id}&show_value=${show_value}`
      : `/form/queryChildTableDetail?child_table_id=${child_table_id}&form_id=${form_id}&parent_id=${parent_id}`
  );

/**
 * 列表数据查询
 */

export const queryViewTableInfo = id =>
  request.get(`formView/queryViewTableInfo?view_id=${id}`);

export const validateStandard = (id, params) =>
  request.post(`form/validateStandard?validateId=${id}`, params);

export const validateStandardV2 = (id, params) =>
  request.post(`form/data/v2/validateStandard?validateId=${id}`, params);

export const queryForeignData = (correlation_id, params) =>
  request.post(
    `/form/queryForeignData?correlation_id=${correlation_id}`,
    params
  );

/**
 * 根据选择的资产id查询资产关联的填报
 */

export const queryFormByAssetId = id =>
  request.get(`form/v2/queryRelevanceAssetInfo?assetId=${id}`);

/**
 * 根据业务流出来的条件查询data_id
 */

export const getAssetDataId = (id, params) =>
  request.post(`/form/getAssetDataId?form_id=${id}`, params);

/**
 * 查询列表设计是否关联了业务流
 */
export const queryRelationFlow = modelId =>
  request.get(`/form/list/model/queryRelationFlowFormId?modelId=${modelId}`);

/**
 * 按照form_id查询对应的业务流节点
 */
export const queryNodeListByFormId = formId =>
  request.get(
    `/flow/v2/component/queryAllUserComponentByFormId?formId=${formId}`
  );

/**
 * 按照form_id查询对应的业务流节点
 */
export const queryAllUserComponentByFormId = id =>
  request.get(`/flow/component/queryAllUserComponentByFormId?formId=${id}`);

/**
 * 查询数据填报列表
 */
export const queryFormViewList = (catalog, params) =>
  request.post(`/formView/queryList?catalog_id=${catalog}`, params);

/**
 * 查询详情设计各目录下的列表
 * @param {*} catalog 目录id
 * @param {*} params 参数
 */
export const queryFormDetailList = (catalog, params) =>
  request.post(`/form/v2/detail/queryList?catalog_id=${catalog}`, params);
/**
 * 查询表单设计各目录下的列表
 * @param {*} catalog 目录id
 * @param {*} params 参数
 */
export const queryFormPage = (catalog, params) =>
  request.post(`/form/v2/queryPage?catalog_id=${catalog}`, params);
/**
 * 查询详情设计各目录下的列表
 * @param {*} catalog 目录id
 * @param {*} params 参数
 */
export const queryFormListModelList = (catalog, params) =>
  request.post(`/form/list/model/queryList?catalogId=${catalog}`, params);

/**
 * 查询数据填报列表
 */
export const queryOneDataByFormIdAndDataId = (form_id, data_id) =>
  request.get(
    `/form/queryOneDataByFormIdAndDataId?form_id=${form_id}&data_id=${data_id}`
  );
/**
 * id查询用户
 */
export const getUserByIds = params =>
  request.post(`/system/user/getByIds`, params);

export const getOfficeByIds = params =>
  request.post(`/system/office/getByIds`, params);

export const queryViewListMode = id =>
  request.get(`/formView/queryViewListMode?view_id=${id}`);
/**
 *
 */
export const queryDataIdList = (view_id, params) =>
  request.post(`/form/queryDataIdList?view_id=${view_id}`, params);

/**
 * 获取所有自定义按钮
 */
export const queryAllViewButtonByFormId = id =>
  request.get(`/form/queryAllViewButtonByFormId?form_id=${id}`);

/**
 * 查询预约时间范围
 */
export const getAppointmentDetails = ({
  formId,
  columnId,
  dateTime,
  appointmentValue,
  childTableColumnId,
}) =>
  request.get(
    `/form/getAppointmentDetails?formId=${formId}&columnId=${columnId}&dateTime=${dateTime}&appointmentValue=${appointmentValue ||
      ''}&childTableColumnId=${childTableColumnId || ''}`
  );
/**
 * 文书模板应用获取数据选项资产
 */
export const queryAssetList = (id, columns) =>
  request.get(`/form/getAssetByIdAndColumn?assetId=${id}&columns=${columns}`);

/**
 * 根据用户ids查询用户
 */
export const userInfoEcho = ({ ids = '', type = '', value = '' }) =>
  request.get(
    `system/user/userInfoEcho?ids=${ids}&type=${
      type === '0' ? '' : type
    }&id=${value}`
  );

/**
 * 根据用户名模糊查询用户
 */
export const queryByName = ({ name = '', type = '', value = '' }) =>
  request.get(
    `system/user/queryByName?name=${name}&type=${
      type === '0' ? '' : type
    }&id=${value}`
  );

/**
 * @description: 获取随机抽取的数组
 * @param {chooseIds:[],queryNum:number} params
 * @return {*}
 */
export const queryRandomResult = params =>
  request.post('/form/queryRandomResult', params);
/**
 * @description:
 * @param {form_id,data_id,form_column_id,queryColumnName,queryCondition,view_id} params
 * @return {*}
 */
export const queryRandomResultList = params =>
  request.post('/form/queryRandomResultList', params);

/**
 * @description: 记录列设置
 * @param params
 */
export const updateFilterCustomColumnList = (params, view_id) =>
  request.post(
    `/formView/updateFilterCustomColumnList?view_id=${view_id}`,
    params
  );

// 图片转文字上传图片接口
export const generalTextOcr = url =>
  request.get(`/ai/generalTextOcr?filePath=${url}`);

// 语音识别转文字上传图片接口
export const sentenceAsrText = url =>
  request.get(`/ai/sentenceAsr?filePath=${url}`);

// 语音识别转文字上传图片接口
export const searchByPic = (componentId, url) =>
  request.get(`/ai/searchImage?componentId=${componentId}&filePath=${url}`);

// 获取组件映射功能相关
export const queryFormDataAttr = (formId, dataId) =>
  request.get(`form/queryFormDataAttr?form_id=${formId}&data_id=${dataId}`);
// 单行文本支持联想搜索接口
export const querySingleLineAssociativeSearch = (params, form_id, asset_id) =>
  request.post(
    `form/querySingleLineAssociativeSearch?form_id=${form_id}&asset_id=${asset_id}`,
    params
  );

// 服务集合新增查询参数
export const queryBriefInfoById = service_id =>
  request.get(`/dataServiceManage/queryBriefInfoById?service_id=${service_id}`);

export const checkFormFlowBundle = formId =>
  request.get(`/flow/v2/checkFormForFlowBundle?formId=${formId}`);

/**
 * 查询数据填报列表
 */
export const queryDataReportListV2 = (
  catalog,
  params,
  isFilterEventFlow = false
) => {
  // 过滤掉业务流产生的填报列表
  if (isFilterEventFlow) {
    return request.post(`form/v2/queryPage?catalog_id=${catalog}`, params);
  } else {
    return catalog
      ? request.post(`form/v2/queryPage?catalog_id=${catalog}`, params)
      : request.post('form/v2/queryPage', params);
  }
};

/**
 * 列表生成表单设计
 * @param {*} modelId
 * @returns
 */
export const generateFormPageInList = modelId =>
  request.get(`form/list/model/generateFormPage?modelId=${modelId}`);
/**
 * 列表生成详情
 * @param {*} modelId
 * @returns
 */
export const generateDetailPageInList = modelId =>
  request.get(`form/list/model/generateDetailPage?modelId=${modelId}`);
/**
 * 列表生成列表
 * @param {*} modelId
 * @returns
 */
export const generateListPageInList = modelId =>
  request.get(`form/list/model/generateListPage?modelId=${modelId}`);
/**
 * 表单生成表单设计
 * @param {*} formId
 * @returns
 */
export const generateFormPageInFormDesign = formId =>
  request.get(`/form/v2/generateFormPage?formId=${formId}`);
/**
 * 表单生成列表
 * @param {*} formId
 * @returns
 */
export const generateListInFormDesign = formId =>
  request.get(`/form/v2/generateListPage?formId=${formId}`);
/**
 * 表单生成详情
 * @param {*} formId
 * @returns
 */
export const generateDetailInFormDesign = formId =>
  request.get(`/form/v2/generateDetailPage?formId=${formId}`);
/**
 * 详情生成表单设计
 * @param {*} id
 * @returns
 */
export const generateFormByDetail = id =>
  request.post(`/form/v2/detail/generateFormByDetail?id=${id}`);
/**
 * 详情生成列表
 * @param {*} id
 * @returns
 */
export const generateListByDetail = id =>
  request.post(`/form/v2/detail/generateListByDetail?id=${id}`);
/**
 * 详情生成详情
 * @param {*} id
 * @returns
 */
export const generateDetailByDetail = id =>
  request.post(`/form/v2/detail/generateDetailByDetail?id=${id}`);
/**
 * 获取业务模型关联模型列表
 * @param {*} id
 * @returns
 */
export const queryRelationPagesById = id =>
  request.get(`/form/v2/queryRelationPages?formId=${id}`);
/**
 * 获取关联模型详情
 * @param {*} modelId
 * @param {*} relationId
 * @param {*} modelType
 * @returns
 */
export const queryModelRelation = (modelId, relationId, modelType) =>
  request.get(
    `/form/v2/queryModelRelation?originId=${modelId}&relationId=${relationId}&modelType=${modelType}`
  );
/**
 * 查询子表排序字段
 */
export const querySubTableSortComponent = () =>
  request.get(`/form/component/v2/querySubTableSortComponents`);
/**
 * 查询业务流字段
 */
export const queryFlowSystemComponents = formId =>
  request.get(`/form/component/v2/queryFlowSystemComponents?formId=${formId}`);
/**
 * 查询弹窗编辑子表数据
 */
export const queryRelationChildData = (formId, parentId) =>
  request.post(
    `/form/data/v2/queryRelationChildData?formId=${formId}&parentId=${parentId}`
  );
/**
 * 弹窗编辑子表数据转义
 */
export const translateRelationChildData = params =>
  request.post(`/form/data/v2/translateRelationChildData`, params);

/**
 * 查询应用内页面及填报树结构
 */
export const queryAppPagesAndFormComponents = (appid, lists = []) => {
  let params = [];
  params = lists.map(item => `list=${item}`);
  params = params.join('&');
  return request.get(`datapp/queryPages4Form?datappId=${appid}&${params}`);
};
