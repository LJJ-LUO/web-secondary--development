import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ANALYSE_EVENTS } from './msgCompConfig';
import { ANALYSE_EVENTS_DESIGN_STATE, EVENTS_MAP } from './eventCompConfig';
import { toJS } from 'mobx';
import customProps from "../../props.json"

const events = [
  {
    key: "onDragend",
    name: "标点拖拽",
    payload: [
      {
        name: "经纬度",
        dataType: "object",
        key: "value",
      },
    ],
  },
];

const actions = [
  {
    key: "messageSuccess",
    name: "成功提示",
    params: [
      {
        key: "value",
        name: "值",
        dataType: "string",
      },
    ],
  },
];

const columnItem = {
  "displayed": 1,
  "date": false,
  "col_index": 8,
  "datatype": 0,
  "column": "区域",
  "multipleComponentFlag": false,
  "col_name": "区域",
  "col_datatype": 0,
  "import_flag": false
}

const componentCenter = window?.componentCenter
const eventCenter = window?.eventCenter
const componentEventUnmount = id => {
  const compMaps = componentCenter?.componentMap;
  const compConfigMaps = eventCenter?.compConfigMap;

  if (compMaps && compConfigMaps) {
    compMaps.has(id) && compMaps?.map && compMaps.map.delete(id);
    compConfigMaps.has(id) &&
      compConfigMaps?.map &&
      compConfigMaps.map.delete(id);
  }
};
export default function AnalyseEventHOC() {
  return function (ComponentChild) {
    return class AnalyseEventHOC extends Component {
      constructor(props) {
        super(props);

        this.myRef = React.createRef();
        this.analyGis = React.createRef();
        this.id = this.props?.model?.baseConfig?.id || '';
        this.state = {
          value: null,
          maskVisible: false,
          props: { ...customProps }
        };
      }

      static propTypes = {
        model: PropTypes.object,
        store: PropTypes.object,
        bigscreenId: PropTypes.string,
        appId: PropTypes.string,
        appMenuList: PropTypes.array,
        sendComponentEvent: PropTypes.func,
      };

      getBlock() {
        return this?.props?.model;
      }

      changeColumnType = type => {
        switch (type) {
          case 0:
            return 'string';
          case 8:
            return 'number';
          case 5:
          case 6:
          case 7:
            return 'date';
          default:
            return 'string';
        }
      };

      /**
       * 转换组件动作绑定参数，如果type{intl.get('REPO.BY')}customAction
       * 则将model.dataConfig{intl.get('APP.IN')}columns绑定到action{intl.get('APP.IN')}
       * @param {*} config
       * @param {*} dataConfig
       * @returns
       */
      bindCompActions = (config, dataConfig) => {
        const { data = {} } = dataConfig;
        const { condition = [] } = data;
        (config.actions || []).forEach(k => {
          if (k.type && k.type === 'customAction') {
            k.params = (condition[0]?.columns || []).map(m => ({
              key: m.col_name,
              dataType: this.changeColumnType(m.col_datatype),
              name: m.col_name,
            }));
          }
        });

        return config;
      };

      // 注册动作列表
      registerEvent = () => {
        const { appId, model = {}, appMenuList } = this.props;
        if (appId || appMenuList?.length) {
          const { otherConfig = {} } = model;
          eventCenter?.registerInteractionEvent({
            interactions: toJS(otherConfig?.interactions) || [],
            id: null,
            moduleId: appId,
          });
        }
      };

      async init() {
        const { model = {}, bigscreenId, appId, appMenuList } = this.props;
        const { dataConfig = {} } = model;
        if (!this.myRef.current) {
          return void 0;
        }
        let compInstance = this.myRef.current;
        // {intl.get('COMM.RCWTCC')}，维护组件和对应的实例
        const blockID = model.baseConfig?.id;
        // {intl.get('COMM.CCI')}
        const msgConfig = this.bindCompActions(
          ANALYSE_EVENTS[(dataConfig?.data?.chartType)] ||
          ANALYSE_EVENTS['common'],
          dataConfig
        );
        componentCenter.register(blockID, 'comp', this, msgConfig);
        (appId || appMenuList?.length) &&
          componentCenter.moduleRegister(
            blockID,
            'comp',
            this,
            ANALYSE_EVENTS_DESIGN_STATE[
            dataConfig?.data?.chartType || dataConfig?.type
            ] || ANALYSE_EVENTS_DESIGN_STATE['common'],
            appId
          );
        Object.keys(compInstance)
          .filter(k => k.includes('do_EventCenter_'))
          .forEach(m => {
            this[m] = compInstance[m].bind(compInstance);
          });
        // {intl.get('COMM.GTLCCTTCAE')}
        try {
          if (bigscreenId) {
            eventCenter?.triggerEventNew({
              objectId: bigscreenId,
              type: 'bigscreen',
              componentId: blockID,
            });
          }
        } catch (error) { }

        this.Event_Center_getName = () => {
          return model.baseConfig?.name;
        };
      }

      // {intl.get('COMM.EVENT_SENDING')}
      sendComponentEvent = ({ componentId, event, payload }) => {
        const { appId, model = {}, sendComponentEvent } = this.props;
        const { otherConfig = {} } = model;
        const { interactions = [] } = otherConfig;
        // 逻辑控制触发器
        eventCenter?.triggerEvent(componentId, event, payload);
        // 事件交互触发器
        if (interactions.length && appId) {
          const ev = EVENTS_MAP[event.toLocaleLowerCase()] || event;
          const currentEvent = interactions.find(
            k => k?.triggerBy === componentId && k?.triggerType === ev
          );
          currentEvent &&
            eventCenter?.triggerInteractionEvent({
              componentId,
              event: ev,
              payload,
            });
        }
        if (sendComponentEvent) {
          sendComponentEvent({
            componentId,
            event,
            payload,
          });
        }
      };

      // {intl.get('PROC.COMPONENT_HIDING')}
      do_EventCenter_hideComponent = () => {
        this.props.model.element.style.display = 'none';
      };

      // {intl.get('PROC.COMPONENT_DISPLAY')}
      do_EventCenter_showComponent = () => {
        this.props.model.element.style.display = 'block';
      };

      // {intl.get('COMM.CEI')}
      do_EventCenter_toggleComponent = () => {
        let ele = this.props.model.element;
        ele.style.display =
          ele.style.display === 'block' || ele.style.display === ''
            ? 'none'
            : 'block';
      };

      // 逻辑交互隐藏
      do_EventCenter_hide = () => {
        this.do_EventCenter_hideComponent();
      };

      // 逻辑交互显示
      do_EventCenter_show = () => {
        this.props.model.element.style.display = 'block';
      };

      // 逻辑交互显隐
      do_EventCenter_toggleVisibility = () => {
        this.do_EventCenter_toggleComponent();
      };

      // 逻辑交互启用
      do_EventCenter_enable = () => {
        this.setState({ maskVisible: true });
      };

      // 逻辑交互禁用
      do_EventCenter_disable = () => {
        this.setState({ maskVisible: false });
      };

      // 逻辑交互启用禁用切换
      do_EventCenter_toggleStatus = () => {
        const { maskVisible } = this.state;
        this.setState({ maskVisible: !maskVisible });
      };

      // 判断是否为图表组件
      isAnalyseBlock = () => {
        const { model = {} } = this.props;
        return (
          model.baseConfig?.type === 'chart-template' ||
          model.baseConfig?.type === 'chart'
        );
      };

      do_EventCenter_messageSuccess(param) {
        console.log(param);
        alert("动作执行成功！");
      }

      //生成为唯一标识id
      uuidv4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      }

      wmskeyv4() {
        let easling = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'
        return "0#0#xxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
          var r = (Math.random() * 26) | 0,
            v = c == "x" ? easling.substring(r, 1) : null;
          return v;
        });
      }



      uukeyv4() {
        return "0#0#xxxxxxxx-xxxx".replace(/[xy]/g, function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      }


      componentWillMount() {
        let props = JSON.parse(JSON.stringify(this.state.props))
        let { dataSource, options } = this.props
        let { externalVariables } = options

        let colum = dataSource[0]
        colum.forEach(i => {
          let tempItem = JSON.parse(JSON.stringify(columnItem))
          tempItem.column = i
          tempItem.col_name = i
          props.layers[0].condition.columns.push(tempItem)
        })


        let latlng = externalVariables?.latlng != undefined ? externalVariables?.latlng.split(',') : []
        let filter = colum.filter(x => {
          return x != latlng[0] && x != latlng[1]
        })
        filter.forEach(x => {
          let tempItem = {
            label: x,
            value: x
          }

          props.layers[0].attach.push(tempItem)
        })

        props.layers[0].lanColumn = latlng[1]
        props.layers[0].latColumn = latlng[0]
        props.layers[0].searchColumn = externalVariables?.searchColumn
        if (externalVariables?.WMS服务地址) {
          let key = this.uukeyv4()
          props.layers[1] = {
            "path": externalVariables?.WMS服务地址,
            "name": "新WMS图层",
            "layers": externalVariables?.WMS参数配置,
            "id": key,
            "category": "WMS",
            "type": 5
          }
          props.options.treeLegends[1] = {
            id: this.uuidv4(),
            title: '新WMS图层',
            key: this.wmskeyv4()
          }
        }
        props.assetId = externalVariables?.assetId
        props.layers[0].assetId = externalVariables?.assetId
        // if (externalVariables?.layers) {
        //   let layerArr = externalVariables?.layers.split(',')
        //   props.options.treeLegends[0].key = layerArr[0]
        //   layerArr[1] ? props.options.treeLegends[1].key = layerArr[1] : null

        // }
        if (externalVariables?.treeLegends) {
          let legendArr = externalVariables?.treeLegends.split(',')
          legendArr.forEach((x, i) => {
            props.options.treeLegends[i].key = x
            props.layers[i].id = x
          })
        }
        if (externalVariables?.checkedList) {
          let checkedList = externalVariables?.checkedList.split(',')
          props.options.checkedList[0] = checkedList[0]
          checkedList[1] ? props.options.checkedList[1] = checkedList[1] : null
        }
        // externalVariables?.checkedList ? props.options.checkedList[0] = externalVariables?.checkedList : props.options.checkedList = []
        props.options.treeLegends[0].icon.color = externalVariables?.iconColor
        props.layers[0].icon.color = externalVariables?.iconColor
        props.layers[0].jumpField = externalVariables?.jumpField || ''
        console.log(props.options.treeLegends[0]);

        const { componentId } = this.props
        props.componentId = componentId
        this.setState({
          props
        })
      }

      async componentDidMount() {
        const { dataSource, updateProcess, componentId } = this.props;
        // window?.componentCenter?.register(componentId, "comp", this, {
        //   events,
        //   actions,
        // });
        // this.Event_Center_getName = () => {
        //   return "滨海地图";
        // };

        this.analyGis.current.parentNode.style.width = '100%'
        this.analyGis.current.parentNode.style.height = '100%'

        if (this.isAnalyseBlock()) {
          this.init();
          // this.registerEvent();
        }
        window?.componentCenter?.register(componentId, "comp", this, {
          events,
          actions,
        });
        updateProcess && updateProcess();
        this.Event_Center_getName = () => {
          return "滨海地图";
        };
      }

      componentWillUnmount() {
        const blockID = this.props.model?.baseConfig?.id;
        componentEventUnmount(blockID);
      }

      render() {
        const maskStyle = {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 99,
        };
        const { maskVisible } = this.state;
        const { model = {} } = this.props;
        return (
          <div ref={this.analyGis} style={{ position: 'relative', height: '100%', width: '100%' }}>
            {/* 事件启用禁用蒙版 */}
            {maskVisible && <div style={maskStyle} />}
            <ComponentChild
              ref={this.myRef}
              {...this.state.props}
              sendComponentEvent={(event, value) =>
                this.sendComponentEvent({
                  componentId: model.baseConfig?.id,
                  event,
                  payload: value,
                })
              }
            />
          </div>
        );
      }
    };
  };
}
