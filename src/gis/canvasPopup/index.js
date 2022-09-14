/*
 * @Author: zhangzhuo
 * @Email: zhangzhuo@njsdata.com
 * @LastEditors: Do not edit
 * @Date: 2021-09-07 13:43:46
 * @LastEditTime: 2021-09-27 14:49:52
 * @Description: {intl.get('EXAM.PDTROTF')}
 */
import { CanvasDisplay } from '@sd-ui/custom-canvas';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { message } from 'antd';
import { addButtonAction } from '../common/service/dataReportingNew';


export default class CanvasPopup extends Component {
  static propTypes = {
    canvasInfo: PropTypes.object,
    dataArray: PropTypes.object,
    jumpField: PropTypes.string
  };
  onSelect = async (key, value) => {
    const contentStyles = value.contentStyles || {};
    const url = contentStyles.urlValue || '';
    if (contentStyles.clickType === 'url' && url !== '') {
      window.open(url);
    } else if (contentStyles.clickType === 'interface' && url !== '') {
      try {
        await addButtonAction(url);
        message.success('操作成功！');
      } catch (e) {
        console.log(e);
        message.error('操作失败');
      }
    }
  };
  renderData = value => {
    let itemStyles;
    if (value.itemStyles.borderRadius) {
      itemStyles = {
        ...value.itemStyles,
      };
    } else {
      itemStyles = {
        borderRadius: 4,
        ...value.itemStyles,
      };
    }
    return {
      ...value,
      itemStyles,
    };
  };
  renderPop = obj => {
    let formArr = []
    for (const key in obj) {
      formArr.push(<div class="pop-up-form-item">
        <span class="form-label" title={key}>{key}:    </span>
        <span class="form-value">{obj[key]}</span>
      </div>)
    }
    return formArr

  }
  render() {
    const { canvasInfo = {}, dataArray, jumpField } = this.props;

    const {
      canvasData = [],
      backgroundUrl = '',
      canvasWidth,
      canvasHeight,
      color,
      backgroundColor,
    } = canvasInfo;
    return (


      // <div>
      <div style={{ height: "475px", overflow: "auto", marginTop: "20px", fontSize: "16px", color: '#20fdfa' }} >
        <div className="pop-up-title">
        </div>
        <div className="pop-up-form ">
          {
            dataArray.form.map((x, i) => {

              return (<div className="pop-up-form-item" key={i}>
                <span className="form-label" title={x.label}>{x.label}:    </span>
                {x.label == jumpField ? <a href={x.value}>{x.value}</a> : <span className="form-value">{x.value}</span>}

              </div>)
            })
            // this.renderPop(itemObj)
          }
        </div>
      </div>



      //   <a className="leaflet-popup-close-button" href="#close" style={{ outline: "none" }}  >×</a> 
      // <CanvasDisplay
      //       backgroundColor={backgroundColor}
      //       dataSource={canvasData}
      //       borderRadius={4}
      //       backgroundUrl={backgroundUrl}
      //       height={canvasHeight}
      //       width={canvasWidth}
      //       color={color}
      //       onSelect={this.onSelect}
      //       renderData={this.renderData}
      //     /> 
      // </div>*/}
    );
  }
}
