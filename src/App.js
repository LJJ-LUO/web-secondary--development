import React, { Component } from "react";
import { Table, Button, message } from "antd";
import "./app.less";
import L from 'leaflet'
const events = [
  {
    key: "onClick",
    name: "点击",
    payload: [
      {
        name: "名称",
        dataType: "string",
        key: "name",
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
let key = 'OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77'
export default class App extends Component {
  state = {
    dataSource: [],
    rowId: "",
    columns: [],
  };

  constructor(props) {
    super(props);
    const { pubSub } = props;
    pubSub?.subscribe &&
      pubSub.subscribe("analyzeDataSource", data => {
        this.loadTableFromData && this.loadTableFromData(data);
      });
  }

  loadTableSource = data => {
    let title = data[0];
    try {
      const columns = title.map((item, index) => ({
        title: item,
        dataIndex: item,
        key: index,
        align: "center",
        ellipsis: true,
      }));
      this.setState({ columns });
    } catch (error) {
      console.error(error);
    }
    let dataSourceInit = data.slice(1);
    let dataSource = [];
    dataSourceInit.forEach((item, index) => {
      let obj = {};
      item.forEach((it, i) => {
        obj[title[i]] = it;
        obj.key = index;
      });
      dataSource.push(obj);
    });
    this.setState({ dataSource });
  };

  componentDidMount() {
    const { dataSource, updateProcess, componentId } = this.props;
    const data = dataSource;
    this.loadTableSource(data);

    window?.componentCenter?.register(componentId, "comp", this, {
      events,
      actions,
    });
    updateProcess && updateProcess();

    var map = L.map('myMap').setView([39.74739, -105], 13);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: "",
      id: 'mapbox.light'
    }).addTo(map)

    this.Event_Center_getName = () => {
      return "滨海地图";
    };
  }


  do_EventCenter_messageSuccess(param) {
    console.log(param);
    alert("动作执行成功！");
  }



  moveDown = () => {
    if (this.isSelected()) {
      const { rowId, dataSource } = this.state;
      if (rowId === dataSource.length - 1) {
        message.warn("已在最后一行，不能再下移！");
      } else {
        let data = dataSource;
        let temporaryData = data[rowId];
        data[rowId] = data[rowId + 1];
        data[rowId + 1] = temporaryData;
        this.setState({ dataSource: [...data], rowId: rowId + 1 });
      }
    }
  };

  moveToBottom = () => {
    if (this.isSelected()) {
      const { rowId, dataSource } = this.state;
      if (rowId === dataSource.length - 1) {
        message.warn("已在最后一行，不能再置底！");
      } else {
        let data = dataSource;
        let temporaryData = data.splice(rowId, 1)[0];
        data.push(temporaryData);
        this.setState({ dataSource: [...data], rowId: dataSource.length - 1 });
      }
    }
  };

  setRowClassName = (_, index) => {
    return index === this.state.rowId ? "selected-row" : "";
  };

  isSelected = () => {
    const { rowId } = this.state;
    rowId === "" && message.warn("请选择要调整的行！");
    return rowId !== "";
  };

  render() {
    const { dataSource, rowId, columns } = this.state;
    const { componentId, options = {} } = this.props;
    const { externalVariables = {} } = options;
    const { headerBGColor = "#0f2437" } = externalVariables;
    return (
      <div className="analyzer-demo" style={{ width: "100%", height: "100%" }}>
        <div className="func-area" style={{ backgroundColor: headerBGColor, width: "100%", height: "100%" }}>

          <div id="myMap" />
        </div>

      </div>
    );
  }
}
