/*
 * @Author: shijunwen
 * @Email: shijunwen@njsdata.com
 * @LastEditors: jiangsixian jiangsixian@njsdata.com
 * @Date: 2021-05-26 10:29:27
 * @LastEditTime: 2022-09-19 19:14:32
 * @FilePath: \Blockchain\src\components\wordOpen.js
 * @Description: 弹窗打开
 */
import React from 'react';
import WordOpenDetails from './wordOpenDetails';

const wordOpen = allParams => {
  const { params, setStateObj, stateParams, propsParams } = allParams;
  const { buttonInfo = {}, record } = params;
  const { selectedRows, eventCenterInstance } = stateParams;
  const { id } = propsParams;

  let response_detail = JSON.parse(buttonInfo.responseDetail || '{}');

  let dataId;
  if (record) {
    dataId = record.dataId;
  } else if (selectedRows && selectedRows.length) {
    let tempArr = [];
    selectedRows.map(item => {
      tempArr.push(item.dataId);
    });
    dataId = tempArr.join(',');
  }

  const logicExcute = async () => {
    const logicParams = {
      type: `${buttonInfo.id}-save`,
      payload: {},
      // backFunc: value => {},
    };
    const logicFlag = await eventCenterInstance.ishasProcess(logicParams);
    if (logicFlag) eventCenterInstance.logicExcute(logicParams);
  };

  const buttonModal = (
    <div>
      <WordOpenDetails
        setStateObj={setStateObj}
        response_detail={response_detail}
        modelId={id}
        dataId={dataId}
        logicExcute={logicExcute}
      />
    </div>
  );

  setStateObj({
    buttonModal,
  });
};

export default wordOpen;
