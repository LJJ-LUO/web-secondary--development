/*
 * @Author: zhangzhuo
 * @Email: zhangzhuo@njsdata.com
 * @LastEditors: Do not edit
 * @Date: 2021-02-02 17:43:08
 * @LastEditTime: 2021-02-02 17:53:49
 * @Description: {intl.get('EXAM.PDTROTF')}
 */
/**
 * intl.get('COMM.PUDCAICL')
 */
import { ANALYZER_VARIABLE_EVENT } from './bigscreen/player/constant';

export const renderCatalogTemplate = (
  data,
  width,
  height,
  attach,
  fontSize,
  detail
) => {
  let { layer = {}, data: layerData = [], hIndex, divideIndex } = detail;
  let sameColumns = [];
  const H = height - 105;

  const popupDiv = document.createElement('div');
  popupDiv.className = 'popup-catalog-content';
  popupDiv.style.height = `${H <= 0 ? 'auto' : `${H}px`}`;
  popupDiv.style.overflow = 'auto';
  popupDiv.style.marginTop = '20px';
  popupDiv.style.fontSize = `${fontSize}px`;

  let { lanColumn, latColumn, condition, positionColumn } = layer;
  const { columns } = condition;
  const divideInData = layerData[0].findIndex(
    k => k === attach[divideIndex].label
  );

  // intl.get('COMM.WTLTIA')，对取数结果进行过滤。否则地位与弹窗内容对应不了
  if (layer.type === 1) {
    layerData = layerData.filter(k => k[divideInData]);
  }

  columns.forEach(k => {
    if (layer.type === 1 && k.col_name === positionColumn && k.col_alias) {
      positionColumn = k.col_alias;
    }
    if (layer.type === 2) {
      if (k.col_name === lanColumn && k.col_alias) {
        lanColumn = k.col_alias;
      }
      if (k.col_name === latColumn && k.col_alias) {
        latColumn = k.col_alias;
      }
    }
  });

  // intl.get('COMM.CWTLALARAEBC')，相等的放至一个分组
  const lanColumnIndex = layerData[0].findIndex(k => k === lanColumn);
  const latColumnIndex = layerData[0].findIndex(k => k === latColumn);
  const positionIndex = layerData[0].findIndex(k => k === positionColumn);

  layerData.slice(1).forEach(k => {
    if (
      (positionIndex >= 0 &&
        k[positionIndex] === layerData[hIndex + 1][positionIndex]) ||
      (latColumnIndex >= 0 &&
        lanColumnIndex >= 0 &&
        k[lanColumnIndex] === layerData[hIndex + 1][lanColumnIndex] &&
        k[latColumnIndex] === layerData[hIndex + 1][latColumnIndex])
    ) {
      sameColumns.push(k[divideInData]);
    }
  });

  sameColumns = sameColumns.filter(k => k);

  if (sameColumns.length) {
    sameColumns.forEach(k => {
      const P = document.createElement('p');
      P.className = 'popup-catalog-node';
      P.innerText = k;
      P.onclick = () => {
        const customEvent = new CustomEvent(ANALYZER_VARIABLE_EVENT, {
          detail: {
            name: k,
          },
        });
        document.dispatchEvent(customEvent);
      };
      popupDiv.appendChild(P);
    });
  }

  return popupDiv;
};
