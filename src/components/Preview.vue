<template>
  <div class="cy" :style="{width:awidth+'px',height:aheight+'px'}">

  </div>
</template>

<script>
import cytoscape from 'cytoscape';
import data from '../utils/data.json';
import style from '../utils/style.json';
import qs from "querystringify";
import { queryAssetById, queryData, queryDataDetail } from '../api/asset'
export default {
  name: "Preview",
  props: {
    customConfig: Object,
  },
  data() {
    return {
      data: this.customConfig.data,
      propsConfiguration: this.customConfig.configuration || "{}",
      configuration: {},
      l_name: '左实体名称',
      r_name: '右实体名称',
      relationship: '',
      awidth: 300,
      aheight: 300,
      fontSize: 12,
    };
  },
  mounted() {
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
    style.forEach(x => {
      x.style["font-size"] = this.fontSize
    })
    const temp = qs.parse(window.location.search.substring(1))
    let dataId = temp.dataId
    let tempArr = []
    let formid = this.customConfig.formConfig.modelId
    this.formCommopentFn()
    if (this.customConfig.data) {

      this.queryfromInit(formid, dataId)
    }
  },
  methods: {
    //处理成关系图展示的样式
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
        edgesItem.data.name = x.r_entity_name
        edgesItem.data.id = 'e' + x.data_id
        edgesArr.push(JSON.parse(JSON.stringify(edgesItem)))
      })
      let dataTest = [...nodeArr, ...edgesArr]
    },
    formCommopentFn() {
      let formColumnList = this.customConfig?.formConfig?.detailColumnList

      let tempArr = []
      formColumnList.forEach(x => {
        if (x.subTableComponents) {
          x.subTableComponents.forEach(y => {
            let comId = y.id
            let name = y.componentPhysicalFieldMappingList ? y?.componentPhysicalFieldMappingList[0]?.structName : ''
            tempArr.push({ comId, name })
          })
        }
      })
      this.componentName = tempArr

    },
    tableFn(originTableData) {
      let tableH = originTableData[0]
      let tableB = originTableData[1]
      let tableData = []

      tableB.forEach((x, i) => {
        let tempObj = {}
        x.forEach((y, ix) => {
          tempObj[tableH[ix]] = y
        })
        tableData.push(tempObj)
      })

      return tableData;
    },
    queryfromInit(formid, dataId) {
      queryData(formid, dataId).then(res => {
        // let key = res.data.length - 2
        let data
        res.data.forEach(x => {
          if (x.subTableResult) data = x?.subTableResult
        })
        // let data = res.data[key].subTableResult

        let arrTemp = []
        let result = data?.map((x, i) => {
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
      })

    },
  }

};
</script>

<style lang="less" scoped>
.cy {
  width: 600px;
  height: 600px;
  display: block;
}

.preview-root {
  box-sizing: border-box;
  height: 32px;
  line-height: 32px;
  font-size: 13px;
  color: #606266;
}
</style>
