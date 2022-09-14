/**
 * intl.get('COMM.LTM')
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tree } from 'antd';
import intl from 'react-intl-universal';
import ShowIcon from '../iconLibrary/showIcon';
import { toJS } from 'mobx';
import { css } from 'emotion';
import CatalogModal from './catalog-modal';
import rlt from '../images/rlt.png';
const { TreeNode } = Tree;

function TreeLegend({
  checkedList,
  options,
  onChangeLegends,
  setChartOptions,
  chartType,
  layers,
}) {

  const [isCatalog, setIsCatalog] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleCatalog, setVisibleCatalog] = useState(false);
  const [dire, setDire] = useState({ pageX: 0, pageY: 0 });
  const [currentCatalog, setCurrentCatalog] = useState(null);
  const onDrop = ({ node, dragNode, dropPosition, dropToGap }) => {
    const dropKey = node.props.eventKey;
    const dragKey = dragNode.props.eventKey;
    // const dragPos = dragKey.split('#');
    const dropPos = node.props.eventKey.split('#');
    const _dropPosition = dropPosition - Number(dropPos[dropPos.length - 1]);
    // const dragOver = node.props.dragOver;

    // {intl.get('COMM.RDTSL')}
    // if (
    //   dropPos.length > dragPos.length ||
    //   (dropPos.length >= dragPos.length && dragOver)
    // )
    //   return void 0;

    if (dropKey.indexOf('0#0#') > -1) {
      // drop{intl.get('COMM.RITTIAL')}
      return;
    }

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };

    const data = [...options.treeLegends];

    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!dropToGap) {
      loop(data, dropKey, item => {
        item.children = [...(item.children || []), dragObj];
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (_dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    let clone = toJS(options);
    clone.treeLegends = data;
    setChartOptions && setChartOptions(clone);
  };

  const loop = data => {
    const { customStyle = {} } = options;
    const { legendFontStyle = {} } = customStyle ?? {};
    return (data || []).map(item => {

      let isHeat =
        layers.find(layer => layer.id === item.id)?.layerType === 'heat';
      const icon = isHeat ? (
        <img src={rlt} style={{ width: '1em' }} />
      ) : item.icon ? (
        <ShowIcon
          icon_type={item.icon?.type}
          name={item.icon?.url}
          color={item.icon?.color}
          size={legendFontStyle?.fontSize || '14px'}
        />
      ) : (
        <svg
          width="1em"
          height="1em"
          fill="#5182e4"
          ariaHidden="true"
          focusable="false"
        >
          <use xlinkHref="#icon-weizhi" />
        </svg>
      );
      if (item.children && item.children.length) {
        return (
          <TreeNode
            key={item.key}
            title={
              <>
                <span>{item.title}</span>
                {chartType === '711' && (
                  <span className="tree-legend-icon">{icon}</span>
                )}
              </>
            }
          >
            {loop(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          key={item.key}
          title={
            <>
              <span>{item.title}</span>
              {chartType === '711' && (
                <span className="tree-legend-icon">{icon}</span>
              )}
            </>
          }
        />
      );
    });
  };

  const onRightClick = ({ event, node }) => {

    const { props } = node;
    const keys = props.eventKey.split('#').length;
    setCurrentCatalog(props);
    setIsCatalog(keys < 3);
    setVisibleMenu(true);
    setDire({ pageX: event.pageX, pageY: event.pageY });
  };

  // intl.get('ANAL.CREATE_DIRECTORY')
  const handleCreateCatalog = e => {
    e.stopPropagation();
    if (currentCatalog) setCurrentCatalog(null);
    setVisibleCatalog(true);
    setVisibleMenu(false);
  };

  // intl.get('COMM.MODIFY_DIRECTORY')
  const handleModifyCatalog = e => {
    e.stopPropagation();
    setVisibleCatalog(true);
    setVisibleMenu(false);
  };

  // intl.get('ANAL.DELETE_DIRECTORY')
  const handleDeleteCatalog = () => {
    let _treeLegends = options.treeLegends;
    let findCatalog = _treeLegends.find(
      item => item.key === currentCatalog.eventKey
    );
    let findCatalogIndex = _treeLegends.findIndex(
      item => item.key === currentCatalog.eventKey
    );

    if (findCatalog && findCatalogIndex > -1) {
      if (findCatalog.children && findCatalog.children.length) {
        let _children = findCatalog.children;
        _treeLegends.splice(findCatalogIndex, 1, ..._children);
      } else {
        _treeLegends.splice(findCatalogIndex, 1);
      }

      let clone = toJS(options);
      options.treeLegends = _treeLegends;
      setChartOptions(clone);
    }
  };

  const onCheck = (keys, event) => onChangeLegends(keys, event);

  const { customStyle = {} } = options;
  const {
    legendFontStyle = {
      fontFamily: intl.get('COMM.MICROSOFT_YAHEI'),
      fontSize: '14px',
      bold: false,
      italic: false,
      color: '#fff',
    },
  } = customStyle ?? {};
  return (
    <div
      className={`tree-legend ${css`
        & .ant-tree-treenode {
          align-items: center !important;
        }

        & .ant-tree-title {
          font-family: ${legendFontStyle?.fontFamily};
          font-size: ${legendFontStyle?.fontSize};
          font-weight: ${legendFontStyle?.bold ? 'bold' : 'normal'};
          font-style: ${legendFontStyle?.italic ? 'italic' : 'normal'};
          color: ${legendFontStyle?.color} !important;
          line-height: ${legendFontStyle?.fontSize} !important;
        }

        & .tree-legend-icon {
          margin-left: 5px;
        }
      `}`}
    >
      <Tree
        checkable
        className="draggable-tree"
        checkedKeys={checkedList || options.checkedList || []}
        draggable
        blockNode
        showIcon
        onCheck={onCheck}
        onDrop={onDrop}
        onRightClick={e => setChartOptions && onRightClick(e)}
      // treeData={options.treeLegends}
      >
        {loop(options.treeLegends)}
      </Tree>
      {visibleMenu && (
        <div
          className="cata-menu"
          onClick={() => {
            setVisibleMenu(false);
          }}
        >
          <ul
            className="menu-content"
            style={{ top: dire.pageY, left: dire.pageX }}
          >
            <li onClick={handleCreateCatalog}>
              {intl.get('analysis.model.catalog.create')}
            </li>
            {isCatalog && (
              <>
                <li onClick={handleModifyCatalog}>
                  {intl.get('analysis.model.catalog.modify')}
                </li>
                <li onClick={handleDeleteCatalog}>
                  {intl.get('analysis.model.catalog.delete')}
                </li>
              </>
            )}
          </ul>
        </div>
      )}
      {visibleCatalog && (
        <CatalogModal
          currentCatalog={currentCatalog}
          visible={visibleCatalog}
          options={options}
          setChartOptions={setChartOptions}
          handleCatalogVisible={bool => setVisibleCatalog(bool)}
        />
      )}
    </div>
  );
}

TreeLegend.propTypes = {
  checkedList: PropTypes.array,
  eventKey: PropTypes.string,
  options: PropTypes.object,
  onChangeLegends: PropTypes.func,
  setChartOptions: PropTypes.func,
  chartType: PropTypes.string,
  layers: PropTypes.array,
};

export default TreeLegend;
