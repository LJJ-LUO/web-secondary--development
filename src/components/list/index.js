import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import moments from 'moment'

import { queryWarnPicture, queryAssetById } from './../../api/asset';

import './index.less';

const List = ({
  dataSource,
  customParams,
  dataId,
  deleteData
}) => {
  console.log('111111111111',{
    dataSource,
    customParams,
    dataId,
    deleteData
  });
  const width = customParams.width ? customParams.width : 600;
  const assetId = customParams.assetId ? customParams.assetId : "2f6f3e9b3897472a8af1069fd477ace4";
  const alarmDataId = customParams.data_id ? customParams.data_id : "data_id";

  const deviceName = customParams.deviceName ? customParams.deviceName : "deviceName";
  const alarm_content = customParams.alarm_content ? customParams.alarm_content : "alarm_content";
  const reportTime = customParams.reportTime ? customParams.reportTime : "reportTime";
  const deviceId = customParams.deviceId ? customParams.deviceId : "deviceId";
  const alarm_picture_info = customParams.alarm_picture_info ? customParams.alarm_picture_info : "alarm_picture_info";
  const picUrl = customParams.picUrl ? customParams.picUrl : 'picUrl';

  const [alarmInfo, setAlarmInfo] = useState({});
  const [alarmUrl, setAlarmUrl] = useState({});


  useEffect(() => {
    setModalVisible(true);
    handleClick()
  }, [])

  // useEffect(() => {
  //   handleClick()
  // }, [modalVisible])

  const handleClick = async () => {
    // let item = {};
    // dataSource.forEach(val => {
    //   let systemType = val.systemType;
    //   item[systemType] = val.value.value;
    // });
    const paramsA = [{
      column: alarmDataId,
      // compareObj: "fe6f67a60c0311edbb090050568274c9",
      compareObj: dataId,
      datatype: 0,
      type: 10
    }];
    const result = await queryAssetById(assetId,paramsA)
    let key = result.data[0]
    let value = result.data[1]
    let item = {}
    value.forEach(val => {
      key.forEach((k,index) =>{
        item[k.col_name] = val[index]
      })
    });
    setAlarmInfo(item)
    console.log('item',item);
    const paramsB = {
      devId: item[deviceId],
      eveId: item[alarm_picture_info]
    }
    try {
      const { data } = await queryWarnPicture(paramsB)
      setAlarmUrl(data)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const destroyflvPlayer = () =>{
    setModalVisible(false)
  }

  return (
    <>
      <Modal title={alarmUrl[deviceName] ? alarmUrl[deviceName] : "告警详情"} visible={modalVisible} destroyOnClose={true} footer={null} closable={true} onCancel={destroyflvPlayer} className="tranfer-table-filter-modal" width={width}>
        <div className="dia_content">
          <img className="event_img" src={alarmUrl[picUrl]} alt=""/>
          <span className="event_con">事件：{alarmInfo[alarm_content]}</span>
          <span className="event_con">时间：{moments(alarmInfo[reportTime]).format('YYYY-MM-DD HH:mm:ss')}</span>
          <span className="event_con">点位：{alarmUrl[deviceName]}</span>
        </div>
      </Modal>
    </> 
  );
};

List.propTypes = {
  isDesign: PropTypes.bool,
  tableColumns: PropTypes.array,
  modelInfo: PropTypes.object,
};

export default List;
