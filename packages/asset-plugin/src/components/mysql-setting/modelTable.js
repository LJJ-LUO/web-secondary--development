import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Table, InputNumber, Input, Popconfirm, Select, Checkbox } from 'antd';

import './index.less';

const { Option } = Select;

class ModelTable extends Component {
  static propTypes = {
    form: PropTypes.object,
    data: PropTypes.array,
    onChangeCol: PropTypes.func,
    removeCol: PropTypes.func,
    selectedIndex: PropTypes.number,
    changeSelected: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const { getFieldDecorator } = props.form;
    this.state = {};
    this.columns = [
      {
        title: '序号',
        dataIndex: 'col_index',
        width: '8%',
        align: 'center',
        render: (text, record, index) => {
          return index + 1;
        },
      },
      {
        title: '名称',
        dataIndex: 'col_name',
        width: '15%',
        render: (text, record, index) => {
          return (
            <Form.Item style={{ margin: 0 }}>
              {getFieldDecorator(`col_name${record.id}`, {
                rules: [
                  {
                    required: true,
                    message: `必填`,
                  },
                ],
                initialValue: record.col_name,
              })(
                <Input
                  placeholder="请输入字段名称"
                  onChange={e => {
                    props.onChangeCol(index, 'col_name', e.target.value);
                  }}
                />
              )}
            </Form.Item>
          );
        },
      },
      {
        title: '类型',
        dataIndex: 'col_datatype',
        width: '20%',
        render: (text, record, index) => {
          return (
            <div style={{ display: 'flex', width: '100%' }}>
              <Form.Item
                style={{
                  margin: 0,
                  width:
                    record.col_datatype === 0 || record.col_datatype === 8
                      ? '49%'
                      : '100%',
                }}
              >
                {getFieldDecorator(`col_datatype${record.id}`, {
                  rules: [
                    {
                      required: true,
                      message: `必填`,
                    },
                  ],
                  initialValue: record.col_datatype,
                })(
                  <Select
                    placeholder="请选择字段类型"
                    onChange={value => {
                      props.onChangeCol(index, 'col_datatype', value);
                    }}
                    style={{ width: '100%' }}
                  >
                    <Option value={0}>文本</Option>
                    <Option value={8}>数值</Option>
                    <Option value={5}>日期</Option>
                    <Option value={6}>日期时间</Option>
                  </Select>
                )}
              </Form.Item>
              {(record.col_datatype === 0 || record.col_datatype === 8) && (
                <Form.Item
                  style={{ margin: 0, width: '49%', marginLeft: '2%' }}
                >
                  {getFieldDecorator(`length${record.id}`, {
                    rules: [
                      {
                        required: true,
                        message: `必填`,
                      },
                    ],
                    initialValue:
                      record.col_datatype === 0 ? record.length : record.scale,
                  })(
                    <InputNumber
                      placeholder={`请输入字段${
                        record.col_datatype === 0 ? '长度' : '精确度'
                      }`}
                      onChange={value => {
                        props.onChangeCol(
                          index,
                          record.col_datatype === 0 ? 'length' : 'scale',
                          value
                        );
                      }}
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              )}
            </div>
          );
        },
      },
      {
        title: '注释',
        dataIndex: 'col_desc',
        width: '17%',
        render: (text, record, index) => {
          return (
            <Form.Item style={{ margin: 0 }}>
              {getFieldDecorator(`col_desc${record.id}`, {
                rules: [],
                initialValue: record.col_desc,
              })(
                <Input
                  placeholder="请输入字段注释"
                  onChange={e => {
                    props.onChangeCol(index, 'col_desc', e.target.value);
                  }}
                />
              )}
            </Form.Item>
          );
        },
      },
      {
        title: '不为空',
        dataIndex: 'not_null_flag',
        width: '15%',
        align: 'center',
        render: (text, record, index) => {
          return (
            <Checkbox
              disabled={record.primary_key_flag}
              checked={record.not_null_flag === 1}
              onChange={e => {
                props.onChangeCol(
                  index,
                  'not_null_flag',
                  e.target.checked ? 1 : 0
                );
              }}
            />
          );
        },
      },
      {
        title: '主键',
        dataIndex: 'primary_key_flag',
        width: '15%',
        align: 'center',
        render: (text, record, index) => {
          return (
            <Checkbox
              checked={record.primary_key_flag === 1}
              onChange={e => {
                props.onChangeCol(
                  index,
                  'primary_key_flag',
                  e.target.checked ? 1 : 0
                );
              }}
            />
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        render: (text, record, index) => {
          return (
            <span>
              <Popconfirm
                title="确定要移除该字段?"
                onConfirm={event => {
                  event.stopPropagation();
                  this.props.removeCol(index);
                }}
              >
                <a>移除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];
  }

  render() {
    return (
      <Table
        size="small"
        className="model-table"
        dataSource={this.props.data}
        columns={this.columns}
        pagination={false}
        rowClassName={record => {
          return record.index === this.props.selectedIndex
            ? 'selected-row'
            : 'default-row';
        }}
        onRow={record => {
          return {
            onClick: event => {
              event.stopPropagation();
              this.props.changeSelected(record.index);
            },
          };
        }}
      />
    );
  }
}

export default Form.create()(ModelTable);
