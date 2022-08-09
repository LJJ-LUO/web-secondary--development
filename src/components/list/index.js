import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import moments from 'moment'
import { queryWarnPicture } from './../../api/asset';

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
  const deviceName = customParams.deviceName ? customParams.deviceName : "deviceName";
  const alarm_content = customParams.alarm_content ? customParams.alarm_content : "alarm_content";
  const reportTime = customParams.reportTime ? customParams.reportTime : "reportTime";
  const deviceId = customParams.deviceId ? customParams.deviceId : "deviceId";
  const alarm_picture_info = customParams.alarm_picture_info ? customParams.alarm_picture_info : "alarm_picture_info";
  const picUrl = customParams.picUrl ? customParams.picUrl : 'picUrl';

  const [modalVisible, setModalVisible] = useState(false);
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
    let item = {};
    dataSource.forEach(val => {
      let systemType = val.systemType;
      item[systemType] = val.value.value;
    });
    setAlarmInfo(item)
    console.log('item',item);
    const params = {
      devId: item[deviceId],
      eveId: item[alarm_picture_info]
    }
    try {
      const { data } = await queryWarnPicture(params)
      setAlarmUrl(data)
      console.log(data,alarmInfo);
    } catch (error) {
      console.log(error);
    }
  }

  const destroyflvPlayer = () =>{
    setModalVisible(false)
  }

  return (
    <>
      <Modal title={alarmUrl[deviceName]} visible={modalVisible} destroyOnClose={true} footer={null} closable={false} onCancel={destroyflvPlayer} className="tranfer-table-filter-modal" width={width}>
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
