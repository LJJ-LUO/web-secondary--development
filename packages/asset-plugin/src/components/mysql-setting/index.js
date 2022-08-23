import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Radio,
  Row,
  Col,
  Select,
  message,
  Button,
  InputNumber,
  Upload,
  Spin,
} from 'antd';
import MonacoEditor from 'react-monaco-editor';
import DataPreview from '../data-preview-modal';
import ModelTable from './modelTable';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { xlsxParser, sheet_to_json } from '@/common/worker';
import { apiContextPath } from '@/common/context';
import * as API from '@/api';
import { Icon } from 'sdata-ui';
import intl from 'react-intl-universal';
import uuid from 'uuid/v4';

import './index.less';

const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;

const modelTypes = {
  modelCollection: 0,
  datasourceCollection: 0,
  physicalModel: 2,
  sqlStatement: 1,
};

class JdbcSetting extends Component {
  static propTypes = {
    query: PropTypes.object,
    id: PropTypes.string,
    asset_owner: PropTypes.string,
    save: PropTypes.func,
  };

  state = {
    modeType: 0,
    dataBaseMode: '默认模式',
    dataBaseTable: undefined,
    asset_desc: undefined,
    sqlStatement: undefined,
    dbschemasData: [],
    dataSourceTable: [],
    dataViewVisible: false,
    dataView: [],
    editAuth: true,
    sourceId: undefined,
    asset_type: undefined,
    source_name: undefined,
    modelTableName: undefined,
    modelTableCols: [],
    selectedIndex: undefined,
    loading: false,
    sqlIsChange: false,
    isDatasourceCollection: false,
    tableNameEditing: false,
  };

  componentDidMount() {
    if (this.props.id) {
      this.queryAssetConf();
    } else {
      const { query } = this.props;
      this.setState(
        {
          sourceId: query.dataSourceId,
          asset_type: query.asset_type,
          source_name: query.dataSourceName,
        },
        () => {
          this.queryDataSourceDbschemas();
        }
      );
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.tableNameEditing) {
      return false;
    }
    return true;
  }

  queryAssetConf = async flag => {
    try {
      const { data } = await API.assetConfById(this.props.id);
      const storage_detail = JSON.parse(data.storage_detail || '{}');
      this.setState(
        {
          editAuth: false,
          modeType: data.model_type
            ? modelTypes[data.model_type]
            : storage_detail.sqlStatement
            ? 1
            : 0,
          dataBaseMode: storage_detail.schema
            ? storage_detail.schema
            : '默认模式',
          dataBaseTable: storage_detail.tablename,
          sqlStatement: storage_detail.sqlStatement,
          sourceId: data.source_id,
          asset_type: data.asset_type,
          asset_desc: data.asset_desc,
          source_name: data.source_name,
          modelTableName: storage_detail.tablename,
          partitionRecords: storage_detail.partitionRecords,
          isDatasourceCollection: data.model_type === 'datasourceCollection',
        },
        () => {
          if (!storage_detail.sqlStatement) {
            this.queryDataSourceDbschemas(storage_detail);
          }
        }
      );
      if (flag) {
        this.closeEdit();
      }
    } catch (err) {
      message.error('查询资产配置信息失败！');
    }
  };

  queryDataSourceDbschemas = async storage_detail => {
    try {
      const { data } = await API.dataSourceDbschemas(this.state.sourceId);
      this.setState({
        dbschemasData: data,
        dataBaseMode:
          storage_detail && storage_detail.schema
            ? storage_detail.schema
            : data.length > 0
            ? data[0].schema
            : '默认模式',
      });
      if (this.props.id) {
        this.querySourceMetaById(
          storage_detail.schema
            ? storage_detail.schema
            : data.length > 0
            ? data[0].schema
            : 'DEFAULT_SCHEMA'
        );
      } else {
        this.querySourceMetaById(
          data.length > 0 ? data[0].schema : 'DEFAULT_SCHEMA'
        );
      }
    } catch (err) {
      message.error('查询数据库模式失败！');
    }
  };

  edit = () => {
    this.setState({ editAuth: true });
  };

  closeEdit = () => {
    this.setState({ editAuth: false });
  };

  handleModeChange = e => {
    this.setState({ modeType: e.target.value });
  };

  dataBaseModeChange = value => {
    this.setState({ dataBaseMode: value }, () => {
      this.querySourceMetaById(value);
    });
  };

  querySourceMetaById = async value => {
    try {
      const { data } = await API.sourceMetaById(
        this.state.sourceId,
        value
      );
      this.setState({ dataSourceTable: data });
    } catch (err) {
      message.error('查询数据库表列表失败！');
    }
  };

  dataBaseTableChange = value => {
    this.setState({ dataBaseTable: value });
  };

  setAssetDesc = e => {
    this.setState({ asset_desc: e.target.value });
  };

  editorDidMount = editor => {
    editor.focus();

    this.editor = editor;
    // this.editor.getValue()
  };

  onViewData = async () => {
    // this.commitBtn();
    const { modeType } = this.state;
    if (modeType === 1) {
      let value = await this.checkSql();
      if (!value) {
        return;
      }
    }

    let item = this.getSaveParams() || {};
    delete item.asset_id;
    try {
      if (item.storage_detail) {
        const { data } = await API.assetPreview({
          source_id: this.state.sourceId,
          asset_type: this.state.asset_type,
          ...item,
        });
        this.setState({ dataViewVisible: true, dataView: data });
      }
    } catch (err) {
      message.error('查询预览数据失败');
    }
  };

  handleCancel = () => {
    this.setState({ dataViewVisible: false });
  };

  onRecordsChange = val => {
    this.setState({ partitionRecords: val });
  };

  queryViewData = async () => {
    try {
      const { data } = await API.sourceMetaById();
      this.setState({ dataSourceTable: data });
    } catch (err) {
      message.error('查询数据库表失败！');
    }
  };

  commitBtn = async () => {
    let value = await this.checkSql();
    if (value) {
      this.setState({
        sqlIsChange: false,
      });
      message.success('高级sql语句正确', 2);
    }

    // let value = this.editor.getValue();
    // if (value && value[value.length - 1] === ';') {
    //   message.error('此处sql语句不允许以";"结尾！', 2);
    //   return false;
    // }
    // try {
    //   await checkSqlSyntax(value);
    //   message.success('高级sql语句正确', 2);
    //   this.setState({
    //     sqlStatement: value,
    //   });
    // } catch (err) {
    //   message.error(err?.data?.message || '检查校验失败', 2);
    // }
  };

  // 校验sql是否正确
  checkSql = async () => {
    let value = this.editor.getValue();
    if (value && value[value.length - 1] === ';') {
      message.error('此处sql语句不允许以";"结尾！', 2);
      return false;
    }
    this.setState({ loading: true });
    try {
      await API.checkSqlSyntax(value);
      this.setState({
        sqlStatement: value,
        loading: false,
      });
      return true;
    } catch (err) {
      this.setState({
        loading: false,
      });
      message.error(err?.data?.message || '检查校验失败', 2);
      return false;
    }
  };

  addModelTableCol = () => {
    let { modelTableCols, selectedIndex } = this.state;
    let newCol = { id: uuid() };
    if (selectedIndex) {
      modelTableCols.splice(selectedIndex, 0, newCol);
    } else {
      modelTableCols.push(newCol);
    }

    this.setState({
      modelTableCols: [...modelTableCols],
    });
  };
  downloadTemplate = () => {
    let aEle = document.createElement('a');
    aEle.setAttribute('download', ''); // download属性
    aEle.setAttribute(
      'href',
      `${apiContextPath}/storage_area/preset/assets/structure_template/structures_template.xlsx`
    ); // href链接
    document.body.appendChild(aEle);
    aEle.click(); // 自执行点击事件
    document.body.removeChild(aEle); // 下载完成移除元素
    setTimeout(() => {
      this.setState({
        exportVisible: false,
        progressBar: 0,
      });
    }, 2000);
  };

  importModelTableCol = () => {
    // let { modelTableCols, selectedIndex } = this.state;
    // console.log(modelTableCols, selectedIndex);
  };

  onChangeModelTableCol = (index, key, value) => {
    let { modelTableCols } = this.state;
    let col = modelTableCols[index];
    col[key] = value;
    if (key === 'col_datatype') {
      switch (value) {
        case 0:
          col.length = 64;
          col.scale = undefined;
          break;
        case 8:
          col.length = undefined;
          col.scale = 0;
          break;
        default:
          break;
      }
    }
    if (key === 'primary_key_flag' && value === 1) {
      col.not_null_flag = 1;
    }
    modelTableCols[index] = col;
    // console.log(modelTableCols, 'col');
    this.setState({
      modelTableCols: [...modelTableCols],
    });
  };

  removeModelTableCol = index => {
    let { modelTableCols, selectedIndex } = this.state;
    selectedIndex = selectedIndex === index + 1 ? undefined : selectedIndex;
    modelTableCols.splice(index, 1);
    this.setState({
      modelTableCols: [...modelTableCols],
      selectedIndex,
    });
  };
  sqlEditChange = newValue => {
    this.setState({
      sqlStatement: newValue,
      sqlIsChange: true,
    });
  };
  renderSetting = () => {
    const {
      modeType,
      dataSourceTable,
      dbschemasData,
      asset_desc,
      dataBaseMode,
      dataBaseTable,
      sqlStatement,
      editAuth,
      modelTableCols,
      modelTableName,
      source_name,
      partitionRecords,
    } = this.state;

    function safe_decode_range(range) {
      var o = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
      var idx = 0;

      var i = 0;

      var cc = 0;
      var len = range.length;
      for (idx = 0; i < len; ++i) {
        if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break;
        idx = 26 * idx + cc;
      }
      o.s.c = --idx;

      for (idx = 0; i < len; ++i) {
        if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break;
        idx = 10 * idx + cc;
      }
      o.s.r = --idx;

      if (i === len || range.charCodeAt(++i) === 58) {
        o.e.c = o.s.c;
        o.e.r = o.s.r;
        return o;
      }

      for (idx = 0; i !== len; ++i) {
        if ((cc = range.charCodeAt(i) - 64) < 1 || cc > 26) break;
        idx = 26 * idx + cc;
      }
      o.e.c = --idx;

      for (idx = 0; i !== len; ++i) {
        if ((cc = range.charCodeAt(i) - 48) < 0 || cc > 9) break;
        idx = 10 * idx + cc;
      }
      o.e.r = --idx;
      return o;
    }
    const uploadProps = {
      name: 'file',
      action: '#',
      maxCount: 1,
      showUploadList: false,
      accept: '.xls,.xlsx',
      beforeUpload: async file => {
        let wb = null;
        try {
          wb = await xlsxParser(file);
          // if (wb.$error) {
          //   await this.parseCsv(file, CsvParseDefaults);
          //   return;
          // }
        } catch (err) {
          console.error(err);
          await message.destroy();
          message.error('Excel格式错误');
          return;
        }
        const ws = wb.Sheets[wb.SheetNames[0]];
        if (!ws['!ref']) {
          message.error('解析失败，Excel格式错误');
        }
        const { s, e } = safe_decode_range(ws['!ref']);
        const previewData = await sheet_to_json(ws, {
          header: 1,
          blankrows: false,
          defval: null,
          raw: false,
          range: {
            s,
            e: {
              ...e,
            },
          },
        });
        let standard = ['名称', '类型', '长度', '注释', '不为空', '为主键'];
        if (
          !previewData[0] ||
          !standard.every((val, index) => previewData[0].includes(val))
        ) {
          message.error('解析失败，Excel格式错误');
          return;
        }

        let sortData = [standard];

        for (let i = 0; i < sortData[0].length; i++) {
          let key = sortData[0][i];

          for (let j = 1; j < previewData.length; j++) {
            let index = previewData[0].indexOf(key);
            if (!sortData[j]) {
              sortData[j] = [];
            }
            sortData[j][i] = previewData[j][index];
          }
        }
        let data = [];
        sortData.map((item, index) => {
          if (index > 0) {
            let dataItem = {
              id: uuid(),
              index: index,
              col_name: item[0],
              col_datatype: undefined,
              col_desc: item[3],
              not_null_flag: item[4] === '是' ? 1 : 0,
              primary_key_flag: item[5] === '是' ? 1 : 0,
              length: undefined,
              scale: undefined,
            };
            switch (item[1]) {
              case '文本':
                dataItem.col_datatype = 0;
                dataItem.length = parseInt(item[2]);
                break;
              case '数值':
                dataItem.col_datatype = 8;
                dataItem.scale = parseInt(item[2]);
                break;
              case '日期':
                dataItem.col_datatype = 5;
                break;
              case '日期时间':
                dataItem.col_datatype = 6;
                break;
              default:
                break;
            }
            data.push(dataItem);
          }
        });
        if (data.length > 200) {
          message.error('批量导入最多支持两百条数据！');
        } else {
          this.setState({ modelTableCols: data });
        }
        return false;
      },
    };
    if (modeType === 0) {
      return (
        <>
          {!this.props.id && (
            <Row className="row sourcename">
              <Col span={2} className="right">
                数据源名称
              </Col>
              <Col span={22}>
                <Input
                  value={this.state.source_name}
                  style={{ width: '254px' }}
                  disabled={true}
                />
              </Col>
            </Row>
          )}
          <Row className="row">
            <Col span={2} className="right">
              数据库模式
            </Col>
            <Col span={22}>
              <Select
                onChange={this.dataBaseModeChange}
                style={{ width: '254px' }}
                value={dataBaseMode}
                disabled={this.props.id}
              >
                {dbschemasData.map((result, index) => {
                  return (
                    <Option value={result.schema} key={index}>
                      {result.schema === 'DEFAULT_SCHEMA'
                        ? '默认模式'
                        : result.schema === 'null'
                        ? intl.get('eventflow.no').d('无')
                        : result.schema}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <Row className="row">
            <Col span={2} className="right">
              数据库表
            </Col>
            <Col span={22}>
              <Select
                showSearch
                value={dataBaseTable}
                onChange={this.dataBaseTableChange}
                style={{ width: '254px' }}
                placeholder="请选择数据库表"
                disabled={!this.state.editAuth}
              >
                {dataSourceTable.map((result, index) => {
                  return (
                    <Option value={result.tablename} key={index}>
                      {result.tablename}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <Row className="row">
            <Col span={2} className="right">
              详细描述
            </Col>
            <Col span={22}>
              <TextArea
                value={asset_desc}
                onChange={this.setAssetDesc}
                rows={4}
                style={{ width: '348px' }}
                disabled={!editAuth}
              />
            </Col>
          </Row>
          <Row className="row">
            <Col span={2} className="right">
              分区条数
            </Col>
            <Col span={22}>
              <InputNumber
                value={partitionRecords}
                disabled={!editAuth}
                min={50000}
                onChange={this.onRecordsChange}
                style={{ width: '254px' }}
              />
            </Col>
          </Row>
        </>
      );
    } else if (modeType === 2) {
      modelTableCols.map((item, index) => {
        item.index = index + 1;
      });
      return (
        <>
          {!this.props.id && (
            <Row className="row">
              <Col span={2} className="right">
                数据源名称
              </Col>
              <Col span={22}>
                <Input
                  value={source_name}
                  disabled
                  style={{ width: '254px' }}
                />
              </Col>
            </Row>
          )}
          <Row className="row">
            <Col span={2} className="right">
              数据库模式
            </Col>
            <Col span={22}>
              <Select
                onChange={this.dataBaseModeChange}
                style={{ width: '254px' }}
                value={dataBaseMode}
                disabled
              >
                {dbschemasData.map((result, index) => {
                  return (
                    <Option value={result.schema} key={index}>
                      {result.schema === 'DEFAULT_SCHEMA'
                        ? '默认模式'
                        : result.schema === 'null'
                        ? intl.get('eventflow.no').d('无')
                        : result.schema}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <Row className="row">
            <Col span={2} className="right">
              <span style={{ color: 'rgb(255, 77, 79)' }}>*</span>数据库表
            </Col>
            <Col span={22}>
              <Input
                disabled={this.props.id}
                defaultValue={modelTableName}
                onChange={e => {
                  this.setState({
                    modelTableName: e.target.value,
                  });
                }}
                style={{ width: '254px' }}
                onFocus={() => {
                  this.setState({
                    tableNameEditing: true,
                  });
                }}
                onBlur={() => {
                  this.setState({
                    tableNameEditing: false,
                  });
                }}
              />
            </Col>
          </Row>
          {this.props.id && (
            <Row className="row">
              <Col span={2} className="right">
                详细描述
              </Col>
              <Col span={22}>
                <TextArea
                  value={asset_desc}
                  onChange={this.setAssetDesc}
                  rows={4}
                  style={{ width: '348px' }}
                  disabled={!editAuth}
                />
              </Col>
            </Row>
          )}
          {!this.props.id && (
            <Row className="row">
              <Col span={2} className="right">
                数据结构
              </Col>
              <Col span={22} style={{ paddingRight: '24px' }}>
                <div
                  className="upload-buttons"
                  style={{
                    width: '100%',
                    height: 50,
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    icon={<DownloadOutlined />}
                    style={{ marginRight: 8, borderRadius: 4 }}
                    onClick={this.downloadTemplate}
                  >
                    下载模板
                  </Button>
                  <Upload {...uploadProps}>
                    <Button style={{ marginRight: 8, borderRadius: 4 }}>
                      <Icon type="icon-daoru2" />
                      导入
                    </Button>
                  </Upload>
                  <Button
                    icon={<PlusOutlined />}
                    style={{ width: 80, borderRadius: 4 }}
                    onClick={this.addModelTableCol}
                  >
                    添加
                  </Button>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: 'calc(100vh - 460px)',
                    overflowY: 'auto',
                  }}
                >
                  <ModelTable
                    data={modelTableCols}
                    ref={e => (this.modelTable = e)}
                    onChangeCol={this.onChangeModelTableCol}
                    removeCol={this.removeModelTableCol}
                    selectedIndex={this.state.selectedIndex}
                    changeSelected={index => {
                      this.setState({
                        selectedIndex: index,
                      });
                    }}
                  />
                </div>
              </Col>
            </Row>
          )}
        </>
      );
    } else {
      return (
        <div className="overview-editor-div">
          <div className="overview-editor">
            <MonacoEditor
              width="1000"
              height="200"
              language="sql"
              value={sqlStatement}
              editorDidMount={this.editorDidMount}
              onChange={this.sqlEditChange}
            />
          </div>
          <Button
            type="primary"
            className="overview-commit"
            onClick={this.commitBtn}
          >
            检查
          </Button>
        </div>
      );
    }
  };

  getSaveParams = () => {
    const {
      modeType,
      dataBaseMode,
      dataBaseTable,
      sqlStatement,
      asset_desc,
      modelTableName,
      modelTableCols,
      partitionRecords,
      sqlIsChange,
      isDatasourceCollection,
    } = this.state;
    if (modeType === 0 && !dataBaseTable) {
      message.error('请选择数据库表！');
      return false;
    }
    if (modeType === 1 && !sqlStatement) {
      message.error('请先编辑并检查SQL语句！');
      return false;
    }
    if (modeType === 1 && sqlIsChange) {
      message.error('请重新检查SQL语句！');
      return false;
    }
    if (modeType === 2 && !modelTableName) {
      message.error('数据库表名不可以为空！');
      return false;
    }
    if (modeType === 2 && this.modelTable) {
      let errs = {};
      this.modelTable.validateFieldsAndScroll((err, values) => {
        err && (errs = err);
      });
      if (Object.keys(errs).length > 0) {
        message.error('数据模型表格中的名称和类型不可以为空！');
        return false;
      }
      modelTableCols.map((item, index) => {
        item.col_index = index + 1;
      });
    }
    return modeType === 0
      ? {
          storage_detail: JSON.stringify({
            schema: dataBaseMode === '默认模式' ? undefined : dataBaseMode, // 数据源模式
            tablename: dataBaseTable, // 数据源表名
            partitionRecords,
          }),
          model_type: isDatasourceCollection
            ? 'datasourceCollection'
            : 'modelCollection',
          asset_desc,
        }
      : modeType === 2
      ? {
          storage_detail: JSON.stringify({ tablename: modelTableName }),
          model_type: 'physicalModel',
          structures: modelTableCols,
          asset_desc,
        }
      : {
          model_type: 'sqlStatement',
          storage_detail: JSON.stringify({ sqlStatement }),
        };
  };

  save = async () => {
    try {
      const item = this.getSaveParams();
      if (item.storage_detail) {
        await API.updateAssetConf({
          ...item,
          asset_id: this.props.id,
          asset_type: this.state.asset_type,
        });
        this.closeEdit();
        message.success('更新资产配置成功！', 2);
      }
    } catch (err) {
      if (err?.data?.code === 10010005) {
        message.error('该资产对应的数据源访问账号无数据库操作权限！');
        return;
      }
      message.error(err?.data?.message || '更新资产配置失败！', 2);
    }
  };

  render() {
    const { dataViewVisible, dataView, editAuth, loading } = this.state;
    const { asset_owner } = this.props;
    return (
      <Spin spinning={loading} tip="loading...">
        <div
          className="jdbc-setting"
          onClick={() => {
            this.setState({
              selectedIndex: undefined,
            });
          }}
        >
          <div className="title">
            <span>资产配置</span>
            {this.props.id && (
              <div className="right">
                {editAuth ? (
                  <>
                    <span className="sdata-btn-primary" onClick={this.save}>
                      保存
                    </span>
                    <span
                      className="sdata-btn"
                      onClick={() => this.queryAssetConf(true)}
                    >
                      取消
                    </span>
                  </>
                ) : asset_owner === 'self' || asset_owner === 'team' ? (
                  <span className="sdata-btn-primary" onClick={this.edit}>
                    编辑
                  </span>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
          <RadioGroup
            onChange={this.handleModeChange}
            value={this.state.modeType}
            className="radiogroup"
            disabled={this.props.id}
          >
            <Radio.Button value={0}>模型采集</Radio.Button>
            <Radio.Button value={2}>物理建模</Radio.Button>
            <Radio.Button value={1}>高级SQL</Radio.Button>
          </RadioGroup>
          {this.props.id && (
            <Row className="row sourcename">
              <Col span={2} className="right">
                数据源名称
              </Col>
              <Col span={22}>
                <Input
                  value={this.state.source_name}
                  style={{ width: '254px' }}
                  disabled={true}
                />
              </Col>
            </Row>
          )}
          {this.renderSetting()}
          {!this.props.id && this.state.modeType !== 2 && (
            <Button
              type="primary"
              onClick={this.onViewData}
              className="view-data-btn"
            >
              预览数据
            </Button>
          )}
          {dataViewVisible && (
            <DataPreview handleCancel={this.handleCancel} data={dataView} />
          )}
        </div>
      </Spin>
    );
  }
}

export default JdbcSetting;
