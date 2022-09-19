<template>
  <div class="cy" :style="{width:awidth+'px',height:aheight+'px'}">

  </div>
</template>

<script>
import eventActionDefine from "./msgCompConfig";
import qs from "querystringify";
import cytoscape from 'cytoscape';
import data from '../utils/data.json';
import style from '../utils/style.json';
import myMixin from '../mixin'
import { queryAssetById, queryFAssetById, queryDataDetail } from '../api/asset'

const tempArr = [
  { data_id: 1, l_entity_id: 1, l_entity_name: '张家界', relationship: '位于', r_entity_id: 2, r_entity_name: '湖南省' },
  { data_id: 2, l_entity_id: 3, l_entity_name: '张家界', relationship: '拥有', r_entity_id: 4, r_entity_name: '美食' },
  { data_id: 3, l_entity_id: 5, l_entity_name: '天门山', relationship: '位于', r_entity_id: 6, r_entity_name: '张家界' },
  { data_id: 4, l_entity_id: 7, l_entity_name: '桑植县', relationship: '位于', r_entity_id: 8, r_entity_name: '张家界' },
]
export default {
  name: "Add",
  props: {
    customConfig: Object,
  },
  mixins: [myMixin],
  data() {
    return {
      data: this.customConfig.data,
      propsConfiguration: this.customConfig.configuration || "{}",
      configuration: {},
      reslutArr: [],
      formInfaceData: {},
      formBoolean: null,
      awidth: 300,
      aheight: 300,
      fontSize: 12,
      l_name: '左实体名称',
      r_name: '右实体名称',
      relationship: '',
      componentName: [],
    };
  },
  watch: {
    formInfaceData: {
      handler(value, oldvalue) {

        this.formInface(value)
      },
      deep: true,
    }

  },


  mounted() {
    window?.componentCenter?.register(
      this.customConfig.componentId,
      "comp",
      this,
      eventActionDefine
    );
    let { component, child_id, index } = this.customConfig;
    this.mixData.id = component.id
    this.mixData.child_id = child_id
    this.mixData.index = index
    this.mixData.eventActionDefine = eventActionDefine
    this.mixData.actions = { Event_Center_getName: this.Event_Center_getName, Event_Center_getParentInfo: this.Event_Center_getParentInfo }
    this.mixData.componentCenter = window?.componentCenter
    try {
      this.configuration = JSON.parse(this.propsConfiguration);
      this.l_name = this.configuration.l_entity_name
      this.r_name = this.configuration.r_entity_name
      this.relationship = this.configuration.relationship
      this.awidth = this.configuration.width || 300
      this.aheight = this.configuration.height || 300
      this.fontSize = this.configuration.fontSize || 12
    } catch (error) {
      console.error("configuration解析错误", error);
    }
    this.formCommopentFn()


    const temp = qs.parse(window.location.search.substring(1))
    let dataId = temp.dataId
    let tempArr = []
    let formid = this.customConfig.formConfig.id

    style.forEach(x => {
      x.style["font-size"] = this.fontSize
    })
    // let cy = cytoscape({

    //   container: document.querySelector('.cy'), zoom: 1, // 图表的初始缩放级别.可以设置options.minZoom和options.maxZoom设置缩放级别的限制.

    //   elements: data,

    //   style: style,
    //   layout: { name: 'random' }
    // })

    if (this.customConfig.data) {
      let formId = this.customConfig?.formCenterInstance?.formId
      this.formInfaceData = this.customConfig?.formCenterInstance?.formCenterInstance[formId].getFieldsValue()
      // this.queryfromInit(formid, dataId)
      this.formInface(this.formInfaceData)
    }


  },
  methods: {
    dataHandle(tempArr) {
      let nodeItem = {
        "data": {
          "id": "605755",
          "name": "PCNA"
        },
        "group": "nodes"
      }
      let edgesItem = {
        "data": {
          "source": "602299",
          "target": "600585",
          "weight": 0.5,
          "group": "coexp",
          "id": "e1"
        },
        "group": "edges"
      }
      let nodeArr = []
      let nodeArrtmp = []
      let edgesArr = []
      tempArr.forEach((x, i) => {
        if (nodeArrtmp.indexOf(x.l_entity_name) == -1) {
          nodeItem.data.id = x.l_entity_name
          nodeItem.data.name = x.l_entity_name
          nodeArr.push(JSON.parse(JSON.stringify(nodeItem)))
          nodeArrtmp.push(x.l_entity_name)
        }
        if (nodeArrtmp.indexOf(x.r_entity_name) == -1) {
          nodeItem.data.id = x.r_entity_name
          nodeItem.data.name = x.r_entity_name
          nodeArr.push(JSON.parse(JSON.stringify(nodeItem)))
          nodeArrtmp.push(x.r_entity_name)
        }
        edgesItem.data.source = x.l_entity_name
        edgesItem.data.target = x.r_entity_name
        edgesItem.data.id = 'e' + x.data_id
        edgesArr.push(JSON.parse(JSON.stringify(edgesItem)))
      })
      let dataTest = [...nodeArr, ...edgesArr]
    },

    async queryId() {
      let res = await queryAssetById('435b3ac1-9385-b373-2024-57a1d10fd07b')

      this.reslutArr = this.translatePlatformDataToJsonArray(res)

    },
    queryfromInit(formid, dataId) {
      queryDataDetail(formid, dataId).then(res => {
        let key = res.data.length - 2
        let data = res.data[key].subTableResult
        let arrTemp = []
        let result = data.map((x, i) => {
          let temp = []
          let item = []
          x.forEach((y, i) => {
            temp.push({ comId: y.componentId, value: y.result.value })
            item.push(y.result.value)
          })
          arrTemp.push(item)
          return temp
        })
        let realFe = []
        result[0].forEach(x => {
          this.componentName.forEach(v => {
            if (x.comId == v.comId) realFe.push(v.name)
          })
        })
        let tranData = [[...realFe], [...arrTemp]]
        let a = this.tableFn(tranData)
        let nodeItem = {
          "data": {
            "id": "605755",
            "name": "PCNA"
          },
          "group": "nodes"
        }
        let edgesItem = {
          "data": {
            "source": "602299",
            "target": "600585",
            "weight": 0.5,
            "group": "coexp",
            "name": 'test',
            "id": "e1"
          },
          "group": "edges"
        }
        let nodeArr = []
        let nodeArrtmp = []
        let edgesArr = []
        a.forEach((x, i) => {

          if (nodeArrtmp.indexOf(x[this.l_name]) == -1) {
            nodeItem.data.id = x[this.l_name]
            nodeItem.data.name = x[this.l_name]
            nodeArr.push(JSON.parse(JSON.stringify(nodeItem)))
            nodeArrtmp.push(x[this.l_name])
          }
          if (nodeArrtmp.indexOf(x[this.r_name]) == -1) {
            nodeItem.data.id = x[this.r_name]
            nodeItem.data.name = x[this.r_name]
            nodeArr.push(JSON.parse(JSON.stringify(nodeItem)))
            nodeArrtmp.push(x[this.r_name])
          }
          edgesItem.data.source = x[this.l_name]
          edgesItem.data.target = x[this.r_name]
          edgesItem.data.id = 'e' + i
          edgesItem.data.name = x[this.relationship]
          edgesArr.push(JSON.parse(JSON.stringify(edgesItem)))
        })
        let dataTest = [...nodeArr, ...edgesArr]

        cytoscape({

          container: document.querySelector('.cy'), zoom: 1, // 图表的初始缩放级别.可以设置options.minZoom和options.maxZoom设置缩放级别的限制.

          elements: dataTest,
          autounselectify: true,
          style: style,
          layout: { name: 'grid' }
        })
      })

    },

    formInface(tempData) {
      // let formId = this.customConfig?.formCenterInstance?.formCenterInstance?.formId
      // let tempData = this.customConfig?.formCenterInstance?.formCenterInstance[formId].getFieldsValue()
      // let tempData = {
      //   "26d5af81-f33e-4418-a890-bce3e7e57a1b": "555",
      //   "818c16b3-61cd-4eeb-bff6-29c8a2cf6369_childtable_0": "111",
      //   "6810b0d8-6129-4d44-8dd9-e190ea498bc3_childtable_0": "222",
      //   "818c16b3-61cd-4eeb-bff6-29c8a2cf6369_childtable_1": "5646",
      //   "6810b0d8-6129-4d44-8dd9-e190ea498bc3_childtable_1": "4654",
      //   "818c16b3-61cd-4eeb-bff6-29c8a2cf6369_childtable_2": "666",
      //   "6810b0d8-6129-4d44-8dd9-e190ea498bc3_childtable_2": "555"
      // }
      let a = []
      let b = []
      for (const key in tempData) {
        if (key.indexOf('_childtable') != -1) {
          const i = key.substring(key.length - 1)
          let comId = key.split('_childtable')[0]

          if (!Boolean(a[i])) {
            a[i] = []
            b[i] = []
            a[i].push({ comId, value: tempData[key] })
            b[i].push(tempData[key])
          } else {
            b[i].push(tempData[key])
            a[i].push({ comId, value: tempData[key] })
          }
        }

      }
      let realFe = []
      a[0].forEach(x => {
        this.componentName.forEach(v => {
          if (x.comId == v.comId) realFe.push(v.name)
        })
      })
      let tranData = [[...realFe], [...b]]
      let t = this.tableFn(tranData)
      console.log(tranData);
      let nodeItem = {
        "data": {
          "id": "605755",
          "name": "PCNA"
        },
        "group": "nodes"
      }
      let edgesItem = {
        "data": {
          "source": "602299",
          "target": "600585",
          "weight": 0.5,
          "group": "coexp",
          "name": 'test',
          "id": "e1"
        },
        "group": "edges"
      }
      let nodeArr = []
      let nodeArrtmp = []
      let edgesArr = []
      t.forEach((x, i) => {

        if (nodeArrtmp.indexOf(x[this.l_name]) == -1) {
          nodeItem.data.id = x[this.l_name]
          nodeItem.data.name = x[this.l_name]
          nodeArr.push(JSON.parse(JSON.stringify(nodeItem)))
          nodeArrtmp.push(x[this.l_name])
        }
        if (nodeArrtmp.indexOf(x[this.r_name]) == -1) {
          nodeItem.data.id = x[this.r_name]
          nodeItem.data.name = x[this.r_name]
          nodeArr.push(JSON.parse(JSON.stringify(nodeItem)))
          nodeArrtmp.push(x[this.r_name])
        }
        edgesItem.data.source = x[this.l_name]
        edgesItem.data.target = x[this.r_name]
        edgesItem.data.name = x[this.relationship]
        edgesItem.data.id = 'e' + i
        edgesArr.push(JSON.parse(JSON.stringify(edgesItem)))
      })
      let dataTest = [...nodeArr, ...edgesArr]

      cytoscape({

        container: document.querySelector('.cy'), zoom: 1, // 图表的初始缩放级别.可以设置options.minZoom和options.maxZoom设置缩放级别的限制.

        elements: dataTest,

        style: style,
        layout: { name: 'random' }
      })
    },
    translatePlatformDataToJsonArray(originTableData) {
      let originTableHeader = originTableData.data[0];
      let tableHeader = [];
      originTableHeader.forEach((item) => {
        tableHeader.push(item.col_name);
      });
      let tableBody = originTableData.data[1];
      let tableData = [];
      tableBody.forEach((tableItem) => {
        let temp = {};
        tableItem.forEach((item, index) => {
          temp[tableHeader[index]] = item;
        });
        tableData.push(temp);
      });
      return tableData;
    },
    tableFn(originTableData) {
      let tableH = originTableData[0]
      let tableB = originTableData[1]
      let tableData = []
      console.log(tableB, originTableData[1])
      tableB.forEach((x, i) => {
        let tempObj = {}
        x.forEach((y, ix) => {
          tempObj[tableH[ix]] = y
        })
        tableData.push(tempObj)
      })

      return tableData;
    },
    formCommopentFn() {
      let formColumnList = this.customConfig?.formConfig?.formColumnList

      let tempArr = []
      formColumnList.forEach(x => {
        if (x.child_table_children) {
          x.child_table_children.forEach(y => {
            let comId = y.id

            let name = y.componentPhysicalFieldMappingList ? y?.componentPhysicalFieldMappingList[0]?.structName : ''

            tempArr.push({ comId, name })
          })
        }
      })
      this.componentName = tempArr
      console.log(tempArr);
    },
    async inputChange(e) {
      this.data = e;
      let { formConfig, component, onChange } = this.customConfig;
      await window.eventCenter.triggerEventNew({
        objectId: formConfig?.id,
        componentId: component.id,
        type: "report",
        event: "change",
        payload: {
          value: e,
        },
      });
      onChange(e);
    },
    Event_Center_getName() {
      let { formConfig, component } = this.customConfig;
      return `${formConfig?.form_name}-${component.columnStyle.title}`;
    },
    do_EventCenter_setValue({ value }) {
      this.data = value;
      let formId = this.customConfig?.formCenterInstance?.formId
      this.formInfaceData = this.customConfig?.formCenterInstance?.formCenterInstance[formId].getFieldsValue()
    },
    Event_Center_getName() {
      return this.data;
    },
  },
  destroyed() {
    window?.componentCenter?.removeInstance(this.customConfig.componentId);
  },
};
</script>
<style lang="less" scoped>
.cy {
  width: 600px;
  height: 600px;
  display: block;
}
</style>
