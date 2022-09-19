<template>
  <!-- <el-input size="small" /> -->
  <div class="cy">

  </div>
</template>

<script>
import eventActionDefine from "./msgCompConfig";
import cytoscape from 'cytoscape';
import data from '../utils/data.json';
import style from '../utils/style.json';
import myMixin from '../mixin'

export default {
  name: "Set",
  props: {
    customConfig: Object,
  },
  mixins: [myMixin],
  data() {
    return {
      data: this.customConfig.data,
    };
  },
  methods: {
    Event_Center_getName() {
      let { formConfig, component } = this.customConfig;
      return `${formConfig?.form_name}-${component.columnStyle.title}`;
    },
    Event_Center_getParentInfo() {
      return { scene: "dataForm" };
    },
  },
  mounted() {
    let { component, child_id, index } = this.customConfig;
    let initId = component.id;
    if (child_id) {
      initId = `${initId}__childId__${child_id.substr(0, 10)}`;
    }
    if (index > -1) {
      initId = `${initId}__index__${index}`;
    }
    window?.componentCenter?.register(initId, "comp", this, eventActionDefine);
    this.mixData.id = component.id
    this.mixData.child_id = child_id
    this.mixData.index = index
    this.mixData.eventActionDefine = eventActionDefine
    this.mixData.actions = { Event_Center_getName: this.Event_Center_getName, Event_Center_getParentInfo: this.Event_Center_getParentInfo }
    this.mixData.componentCenter = window?.componentCenter
    let element = [ // list of graph elements to start with

      { // node a

        data: { id: 'a' }

      },

      { // node b

        data: { id: 'b' }

      },

      { // edge ab

        data: { id: 'ab', source: 'a', target: 'b' }

      }

    ]
    let style1 = [ // the stylesheet for the graph

      {

        selector: 'node',

        style: {

          'background-color': '#666',

          'label': 'data(id)'

        }

      },


      {

        selector: 'edge',

        style: {

          'width': 3,

          'line-color': '#ccc',

          'target-arrow-color': '#ccc',

          'target-arrow-shape': 'triangle'

        }

      }

    ]
    let cy = cytoscape({
      container: document.querySelector('.cy'), zoom: 1, // 图表的初始缩放级别.可以设置options.minZoom和options.maxZoom设置缩放级别的限制.
      elements: [ // list of graph elements to start with
        { // node a
          data: { id: 'a' }
        },
        { // node b
          data: { id: 'b' }
        },
        { // edge ab
          data: { id: 'ab', source: 'b', target: 'a', name: '关系1' }
        },
        { // node a
          data: { id: 'c' }
        },
        { // node b
          data: { id: 'd' }
        },
        { // edge ab
          data: { id: 'ad', source: 'a', target: 'd', name: '关系4' }
        },
        { // edge ab
          data: { id: 'ac', source: 'a', target: 'c', name: '关系3' }
        }
      ],
      // elements: element,
      autounselectify: true,
      boxSelectionEnabled: false,
      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'text-valign': 'center',
            'label': 'data(id)',

          }
        },

        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            "label": 'data(name)',

            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        }
      ],
      // style: style1,
      layout: {
        name: 'klay',


      }
    })


  },
  destroyed() {
    let { component, child_id, index } = this.customConfig;
    let initId = component.id;
    if (child_id) {
      initId = `${initId}__childId__${child_id.substr(0, 10)}`;
    }
    if (index > -1) {
      initId = `${initId}__index__${index}`;
    }
    window?.componentCenter?.removeInstance(initId);
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
