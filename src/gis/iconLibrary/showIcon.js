/*
 * @Author: your name
 * @Date: 2020-05-31 14:51:14
 * @LastEditTime: 2021-12-23 16:53:59
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \onemind-web\src\components\iconLibrary\index.js
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import asyncLoad from '../utils/asyncLoad';

const Icon = asyncLoad(() => import('sdata-ui'), 'Icon');

class ShowIcon extends Component {
  static propTypes = {
    icon_type: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    bgColor: PropTypes.string,
    iconSize: PropTypes.string,
    model: PropTypes.object,
    style: PropTypes.object,
  };

  render() {
    const {
      icon_type,
      name,
      color,
      size,
      bgColor,
      iconSize,
      model = {},
      style = {},
    } = this.props;
    const { baseConfig = {} } = model;
    const { width, height } = baseConfig;
    return (
      <>
        {icon_type === 'custom' ? (
          <img
            src={name}
            style={{
              width: size || '14px',
              height: size || '14px',
              maxWidth: width,
              maxHeight: height - 10,
              ...style,
            }}
          />
        ) : (
          <Icon
            type={name}
            style={{
              color: color,
              fontSize: iconSize || '14px',
              background: bgColor,
              lineHeight: 0,
              ...style,
            }}
          />
        )}
      </>
    );
  }
}
export default ShowIcon;
