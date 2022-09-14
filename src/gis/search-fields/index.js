/**
 * GISintl.get('COMM.MFS')
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu, Input } from 'antd';
import { toJS } from 'mobx';
import intl from 'react-intl-universal';
import ShowIcon from '../iconLibrary/showIcon';
import clonedeep from 'lodash.clonedeep';
import {
  getConditionData,
  getConditionDataByToken,
} from '../common/service/new-analyzer';
import { css } from 'emotion';
import './index.less';

const { Search } = Input;
const { Item } = Menu;

function SearchFields({
  token,
  searchTop,
  searchLeft,
  searchFields,
  searchBgColor,
  searchFontColor = '#5e605f',
  hoverColor = '#e8e6e7',
  orderNumBgColor = '#5182e4',
  orderNumFontColor = '#fff',
  drawSearchMarker,
  initLayers,
}) {
  const [currentField, setCurrentField] = useState(searchFields[0] || {});
  const [result, setResult] = useState([]);
  const [searchValue, setSearchValue] = useState(['']);
  const [menuIndex, setMenuIndex] = useState(0);

  useEffect(() => {
    setCurrentField(searchFields[menuIndex] || searchFields[0] || {});
  }, [searchFields, menuIndex]);

  const menu = () => (
    <Menu
      onClick={item => {
        const current = searchFields.findIndex(k => k.id === item.key);
        setMenuIndex(current > -1 ? current : 0);
        setCurrentField(searchFields[current] || {});
      }}
    >
      {searchFields.map(item => (
        <Item key={item.id}>
          <span>{item.name}</span>
          {item.icon && (
            <span style={{ marginLeft: 5 }}>
              <ShowIcon
                icon_type={item.icon?.type}
                name={item.icon?.url}
                color={item.icon?.color}
              />
            </span>
          )}
        </Item>
      ))}
    </Menu>
  );

  // intl.get('EVEN.QUERY_DATA')
  const queryDataDetail = async compareObj => {
    const newCondition = clonedeep(toJS(currentField.condition));
    let datatype = 0;
    newCondition.columns.forEach(col => {
      const colName = col.col_name;
      const { positionColumn, latColumn, lanColumn, attach } = currentField;
      const attachColumns = attach.map(a => {
        return a && a.value !== undefined ? a.value : a;
      });
      const inChart = [positionColumn, latColumn, lanColumn].concat(
        attachColumns
      );
      col.inChart = inChart.includes(colName);
      if (colName === currentField.searchColumn) {
        col.inChart = true;
        datatype = col.datatype;
      }
    });

    newCondition.filters = [
      ...newCondition.filters,
      {
        column: currentField.searchColumn,
        compareObj,
        datatype,
        satisfy_type: 0,
        type: 10,
        unit: 0,
        varibleType: 'values',
      },
    ];

    const { data } = token
      ? await getConditionDataByToken(
          currentField.assetId,
          token,
          currentField.analysisId,
          newCondition
        )
      : await getConditionData(
          currentField.assetId,
          currentField.analysisId,
          newCondition
        );

    if (data.chartData) {
      setResult(data.chartData);
    }
  };

  const onSearch = val => {
    if (val === '' && result.length) {
      setResult([]);
    }
    val && val !== '' && queryDataDetail(val);
  };

  const onPanToDraw = data => {
    setSearchValue(data[0]);
    drawSearchMarker({
      layer: currentField,
      data: [result[0], data],
    });
  };

  // intl.get('ASS.QUERY_RESULTS')
  const searchResult = () => {
    let searchColumnIndex = result[0]?.findIndex(
      k => k === currentField.searchColumn
    );
    return (
      <div className="search-result">
        <ul>
          {result.slice(1).map((k, v) => {
            if (k[searchColumnIndex]) {
              return (
                <li
                  className="result-item"
                  key={`${k[searchColumnIndex]}_${v}`}
                  onClick={() => onPanToDraw(k)}
                >
                  <span className="result-index">{v + 1}</span>
                  <span className="result-line">{k[searchColumnIndex]}</span>
                </li>
              );
            }
            return (
              <li key={v} style={{ textAlign: 'center' }}>
                {intl.get('ANAL.NO_DATA')}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const onSearchValueChange = e => {
    if (!e.target.value) {
      // 重新绘制
      initLayers && initLayers();
    }
    setSearchValue(e.target.value);
  };

  return (
    <div
      className={`search-fields ${css`
        color: ${searchFontColor};
        top: ${+searchTop || 10}px;
        left: ${+searchLeft || 10}px;
        background-color: ${searchBgColor || '#fff'} !important;

        & .ant-input-search-icon {
          color: ${searchFontColor};
        }

        & .ant-input {
          color: ${searchFontColor};

          & ::-webkit-input-placeholder {
            color: ${searchFontColor};
            opacity: 0.6;
          }
        }

        & .ant-dropdown-menu {
          background-color: ${searchBgColor || '#fff'} !important;
          box-shadow: 0px 0px 10px rgba(31, 33, 34, 0.5);
        }

        & .ant-dropdown-menu-item {
          color: ${searchFontColor};

          & :hover {
            background-color: ${hoverColor};
          }
        }

        & .search-result {
          background-color: ${searchBgColor || '#fff'} !important;

          & .result-item {
            & .result-index {
              color: ${orderNumFontColor} !important;
              background-color: ${orderNumBgColor} !important;
            }

            & .result-line {
              color: ${searchFontColor} !important;

              & :hover {
                color: ${hoverColor} !important;
              }
            }
          }
        }
      `}`}
    >
      <div className="dropdown">
        <Dropdown
          overlay={menu}
          overlayClassName="search-dropdown"
          getPopupContainer={() =>
            document.querySelector('.search-fields') || document.body
          }
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="current-field">{currentField.name}</span>
            {currentField.icon && (
              <span style={{ marginLeft: 5 }}>
                <ShowIcon
                  icon_type={currentField.icon?.type}
                  name={currentField.icon?.url}
                  color={currentField.icon?.color}
                />
              </span>
            )}
          </div>
        </Dropdown>
      </div>
      <div className="search-body">
        <Search
          allowClear
          onSearch={onSearch}
          onPressEnter={e => {
            onSearch(e.target.value);
          }}
          onChange={e => onSearchValueChange(e)}
          placeholder={intl.get('analysis.model.search.input.placeholder')}
          value={searchValue}
        />
      </div>
      {result.length > 1 && searchResult()}
    </div>
  );
}

SearchFields.propTypes = {
  token: PropTypes.string,
  searchTop: PropTypes.number,
  searchLeft: PropTypes.number,
  searchBgColor: PropTypes.string,
  searchFontColor: PropTypes.string,
  hoverColor: PropTypes.string,
  orderNumBgColor: PropTypes.string,
  orderNumFontColor: PropTypes.string,
  searchFields: PropTypes.array,
  drawSearchMarker: PropTypes.func,
  initLayers: PropTypes.func,
};

export default SearchFields;
