import Vue from "vue";
import App from "./App.vue";

// 按需引入组件，引入方式见https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru
import {
  Input,
  Select,
  Option,
  Form,
  FormItem,
  RadioGroup,
  RadioButton,
  Switch,
} from "element-ui";
import "./index.css";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
// Vue.prototype.$cytoscape = cytoscape()


Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Switch);

// Vue.use(Element);

if (process.env.NODE_ENV !== "production") {
  const appArr = [
    { title: "设计页组件", type: "set" },
    { title: "设计页属性组件", type: "designConfiguration" },
    { title: "新增/编辑 主表组件", type: "add" },
    { title: "新增/编辑 主表多字段组件", type: "addMultiple" },
    { title: "新增/编辑 子表组件", type: "child" },
    { title: "列表页组件", type: "table" },
    { title: "详情页组件", type: "preview" },
  ];

  const customConfig = {
    componentId: "111",
    data: "南京市",
    saveValue: [],
    component: {
      columnStyle: {
        title: "二开测试title",
      },
    },

    formConfig: {
      form_name: "二开数据",
      id: '502768ef-d8d4-4547-977d-0bd9882e578f',
      formColumnList: [{
        "componentBusinessConfigList": [
          {
            "businessId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "businessName": "普通子表",
            "componentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "id": "7f880d5edb94435dba3698cf649d8f03",
            "sort": 0
          }
        ],
        "componentConfig": {
          "child_sort": false,
          "component_id": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
          "dateFormatForTranslate": "yyyy-MM-dd",
          "date_format": "YYYY-MM-DD",
          "datetimeFormatForTranslate": "HH:mm:ss",
          "datetime_format": "HH:mm:ss",
          "default_value_type": 0,
          "hide_title": "0",
          "hide_title_area": false,
          "hight_limit": 5,
          "is_float": false,
          "is_title_wrap": false,
          "layout": "[24,24,24,24,24]",
          "layoutType": 2,
          "move_up_down": false,
          "office_only_current_path": false,
          "operate_attribute": "7,8",
          "option_key_column_data_type": 0,
          "option_show_dict_pic": "0",
          "option_show_type": "1",
          "option_value_column_data_type": 0,
          "select_all": false,
          "sortFormColumnAlias": "",
          "sort_form_column_id": "",
          "sort_order": "",
          "style": 0,
          "title": "普通子表",
          "wrap_title": "[]"
        },
        "componentConfigs": [
          {
            "componentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "configKey": "is_title_wrap",
            "configType": 1,
            "configValue": "false",
            "id": "05263145caf44c2b83789f459337ae71"
          },
          {
            "componentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "configKey": "is_float",
            "configType": 1,
            "configValue": "false",
            "id": "2ad7a0208b934e87ab8f0df39e6c876a"
          },
          {
            "componentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "configKey": "operate_attribute",
            "configType": 1,
            "configValue": "7,8",
            "id": "30672562a2a143ae856c5bfbeb8c10d8"
          },
          {
            "componentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "configKey": "wrap_title",
            "configType": 1,
            "configValue": "[]",
            "id": "328b24f61f2f4c9286b7a81194efe401"
          },
          {
            "componentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "configKey": "hight_limit",
            "configType": 1,
            "configValue": "5",
            "id": "4e8148273009481abe36bcb57c2a57e3"
          },
          {
            "componentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "configKey": "sortFormColumnAlias",
            "configType": 1,
            "configValue": "",
            "id": "642adfb1552047979654d820689c8439"
          },
          {
            "componentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "configKey": "layoutType",
            "configType": 1,
            "configValue": "2",
            "id": "a24a5d5652104fe8a504221763d7615e"
          },
          {
            "componentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "configKey": "hide_title",
            "configType": 1,
            "configValue": "0",
            "id": "b462ac9cf7df4be4bd5df608831e3e53"
          },
          {
            "componentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "configKey": "sort_form_column_id",
            "configType": 1,
            "configValue": "",
            "id": "c0e892ba4d90489fa62f10b99d4e7a33"
          },
          {
            "componentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "configKey": "move_up_down",
            "configType": 1,
            "configValue": "false",
            "id": "ca7093c74d8d45de860aea10f0f6444b"
          },
          {
            "componentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "configKey": "title",
            "configType": 1,
            "configValue": "普通子表",
            "id": "cb0ca105048e4573a457162af0b900e0"
          },
          {
            "componentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "configKey": "layout",
            "configType": 1,
            "configValue": "[24,24,24,24,24]",
            "id": "d31e5af394d8494eb019e3045a5be496"
          },
          {
            "componentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "configKey": "hide_title_area",
            "configType": 1,
            "configValue": "false",
            "id": "e471ccd3ee3c48aeaf9bab02e0a7b303"
          },
          {
            "componentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "configKey": "sort_order",
            "configType": 1,
            "configValue": "",
            "id": "e761f226984c48caa13c3e2a29075889"
          },
          {
            "componentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "configKey": "child_sort",
            "configType": 1,
            "configValue": "false",
            "id": "ed5424306fa340bf8d196dac9514aa88"
          }
        ],
        "componentPhysicalFieldMappingList": [
          {
            "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
            "assetName": "简单a子表"
          }
        ],
        "formComponentValidate": {
          "formComponentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
          "id": "12348113f6c84d8e9e4af26b80767024",
          "manualValidateValue": "",
          "required": "0",
          "unique": "0",
          "validateType": "0"
        },
        "gridIndex": 0,
        "id": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
        "modelId": "502768ef-d8d4-4547-977d-0bd9882e578f",
        "modelType": 1,
        "multiple": false,
        "showInDesign": true,
        "showType": "childtable",
        "sort": 2,
        "subLayOutFlag": false,
        "subLayout": false,
        "subTable": true,
        "subTableComponents": [
          {
            "componentBusinessConfigList": [
              {
                "businessId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "businessName": "单行文本",
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "id": "6a68ced71a044e38b40ea1124eb01264",
                "sort": 0
              }
            ],
            "componentConfig": {
              "component_id": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_text_value": "",
              "default_value_type": 3,
              "disable_data_mapping": false,
              "hide_title": "0",
              "hide_title_area": false,
              "isCiphertext": false,
              "isPrivate": false,
              "is_title_wrap": false,
              "office_only_current_path": false,
              "operate_attribute": "",
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "suffix": "",
              "support_association_search": false,
              "tips": "",
              "tips_checked": false,
              "tips_content": "",
              "title": "左实体序号",
              "variable_id": "",
              "width_unit": "%",
              "wrap_title": "[]"
            },
            "componentConfigs": [
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "suffix",
                "configType": 1,
                "configValue": "",
                "id": "0b60fc1aa8c84edf951dcc6584e5b6b4"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "operate_attribute",
                "configType": 1,
                "configValue": "",
                "id": "0e4922e62a0f4d81b0e6bc303eb07a41"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "hide_title_area",
                "configType": 1,
                "configValue": "false",
                "id": "114eae429cb6471eab6c356be26d9658"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "disable_data_mapping",
                "configType": 1,
                "configValue": "false",
                "id": "2b18f154fd1c4bfeb99157352920d87a"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "default_value_type",
                "configType": 1,
                "configValue": "3",
                "id": "309e3d0569fc4956879a64eefa0988a0"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "default_text_value",
                "configType": 1,
                "configValue": "",
                "id": "47232a0b783b44daadbcd8287aeed4da"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "hide_title",
                "configType": 1,
                "configValue": "0",
                "id": "545c4932e3e14bd0a0f11f8b96f9b7db"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "width_unit",
                "configType": 1,
                "configValue": "%",
                "id": "59609de495da41f581357f10a9f9ce61"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "support_association_search",
                "configType": 1,
                "configValue": "false",
                "id": "69522eed30bd4c9c9771f1f85069cc9a"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "title",
                "configType": 1,
                "configValue": "左实体序号",
                "id": "69ec86d9084646849b58ea4c8ed554de"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "isPrivate",
                "configType": 1,
                "configValue": "false",
                "id": "71c47dfabe8041fb9f9c2276dd558034"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "wrap_title",
                "configType": 1,
                "configValue": "[]",
                "id": "73ec20fd20574617970bd01bcb69ef5c"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "tips_checked",
                "configType": 1,
                "configValue": "false",
                "id": "7dff2969719d4b6587d347ff657f5985"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "is_title_wrap",
                "configType": 1,
                "configValue": "false",
                "id": "80da002c8c064d35ba2d5f48c635c08e"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "isCiphertext",
                "configType": 1,
                "configValue": "false",
                "id": "986587b26eef41a5a130e36450777269"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "tips_content",
                "configType": 1,
                "configValue": "",
                "id": "a761ada99fea4b0eb3896e0288ead19a"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "tips",
                "configType": 1,
                "configValue": "",
                "id": "ae49935f60dc4daf97752bd5c754666b"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "variable_id",
                "configType": 1,
                "configValue": "",
                "id": "b83af53bf76642e0b5633bcb6ad2a12c"
              }
            ],
            "componentPhysicalFieldMappingList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "759a95ec-4492-4947-826e-c4cd7780ab24",
                "structName": "左实体序号"
              }
            ],
            "formComponentValidate": {
              "formComponentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
              "id": "81a5c98caba143f991bb7398545ad969",
              "manualValidateValue": "",
              "required": "0",
              "unique": "0",
              "validateType": "0"
            },
            "id": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
            "modelId": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "modelType": 1,
            "multiple": false,
            "parentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "showInDesign": true,
            "showType": "input",
            "sort": 3,
            "subLayOutFlag": false,
            "subLayout": false,
            "subTable": false
          },
          {
            "componentBusinessConfigList": [
              {
                "businessId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "businessName": "左实体名称",
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "id": "bb619ebb0d5f4f89b06455d3c7d74d67",
                "sort": 0
              }
            ],
            "componentConfig": {
              "component_id": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_text_value": "",
              "default_value_type": 3,
              "disable_data_mapping": false,
              "hide_title": "0",
              "hide_title_area": false,
              "isCiphertext": false,
              "isPrivate": false,
              "is_title_wrap": false,
              "office_only_current_path": false,
              "operate_attribute": "",
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "suffix": "",
              "support_association_search": false,
              "tips": "",
              "tips_checked": false,
              "tips_content": "",
              "title": "左实体名称",
              "variable_id": "",
              "width_unit": "%",
              "wrap_title": "[]"
            },
            "componentConfigs": [
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "is_title_wrap",
                "configType": 1,
                "configValue": "false",
                "id": "05b514fb4d0a48dbb3aa34728d186e40"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "wrap_title",
                "configType": 1,
                "configValue": "[]",
                "id": "1f3741fd34b24f849a0d4cf2914d7c9f"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "hide_title_area",
                "configType": 1,
                "configValue": "false",
                "id": "242133d7efa64f37a0120a77c1e1bf5c"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "default_value_type",
                "configType": 1,
                "configValue": "3",
                "id": "3b91723820da47d0880dcd599f586b1c"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "suffix",
                "configType": 1,
                "configValue": "",
                "id": "3e63327485804e1d845fe03a1f9b8990"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "width_unit",
                "configType": 1,
                "configValue": "%",
                "id": "3ef9f177441747a5aa60007d9ff284df"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "tips",
                "configType": 1,
                "configValue": "",
                "id": "4a0c1309068a4be89c6a1cf26ee3abab"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "variable_id",
                "configType": 1,
                "configValue": "",
                "id": "6057b5426d564966b94120d986f843fa"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "title",
                "configType": 1,
                "configValue": "左实体名称",
                "id": "654a8cd2e0c144129586d747ef5193f8"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "isCiphertext",
                "configType": 1,
                "configValue": "false",
                "id": "7ea49ce4043a4fc9af50ddbc8611f995"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "support_association_search",
                "configType": 1,
                "configValue": "false",
                "id": "83af68d2ad4f4490b957e0e772e691fe"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "default_text_value",
                "configType": 1,
                "configValue": "",
                "id": "8c5d9f21ebd84f55bc4ce43ed32ba8e6"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "tips_content",
                "configType": 1,
                "configValue": "",
                "id": "955a947fa25b44d281a0263003b99ebc"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "isPrivate",
                "configType": 1,
                "configValue": "false",
                "id": "a60d6c8ee111445d85da4359c6527501"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "hide_title",
                "configType": 1,
                "configValue": "0",
                "id": "b4d671a18f99476f88ece24facd87299"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "tips_checked",
                "configType": 1,
                "configValue": "false",
                "id": "b6bd8579354c4999821a57659d3df34e"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "operate_attribute",
                "configType": 1,
                "configValue": "",
                "id": "d46dbc84a8354f649696c94f7aa69d01"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "disable_data_mapping",
                "configType": 1,
                "configValue": "false",
                "id": "e813e5f8af824ceb9e7a0908e043ff9f"
              }
            ],
            "componentPhysicalFieldMappingList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "0853de60-6f4b-430e-b7fc-a4e60c8551b9",
                "structName": "左实体名称"
              }
            ],
            "formComponentValidate": {
              "formComponentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
              "id": "0e4e95e36b5e4169950d9e1e7ed16a92",
              "manualValidateValue": "",
              "required": "0",
              "unique": "0",
              "validateType": "0"
            },
            "id": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
            "modelId": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "modelType": 1,
            "multiple": false,
            "parentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "showInDesign": true,
            "showType": "input",
            "sort": 4,
            "subLayOutFlag": false,
            "subLayout": false,
            "subTable": false
          },
          {
            "componentBusinessConfigList": [
              {
                "businessId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "businessName": "关系",
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "id": "c4095f926ec14e96b5121fe2bb716f54",
                "sort": 0
              }
            ],
            "componentConfig": {
              "component_id": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_text_value": "",
              "default_value_type": 3,
              "disable_data_mapping": false,
              "hide_title": "0",
              "hide_title_area": false,
              "isCiphertext": false,
              "isPrivate": false,
              "is_title_wrap": false,
              "office_only_current_path": false,
              "operate_attribute": "",
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "suffix": "",
              "support_association_search": false,
              "tips": "",
              "tips_checked": false,
              "tips_content": "",
              "title": "关系",
              "variable_id": "",
              "width_unit": "%",
              "wrap_title": "[]"
            },
            "componentConfigs": [
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "disable_data_mapping",
                "configType": 1,
                "configValue": "false",
                "id": "076ac055a2824917a9a377d56e652d3d"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "hide_title_area",
                "configType": 1,
                "configValue": "false",
                "id": "08ef43024f82481ba2ad2bca72fc140e"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "hide_title",
                "configType": 1,
                "configValue": "0",
                "id": "0b4b2589f98441c58f2882605737369f"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "tips",
                "configType": 1,
                "configValue": "",
                "id": "139da5c12b644333af72ebee2532f5c5"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "support_association_search",
                "configType": 1,
                "configValue": "false",
                "id": "22e808b45008421a9dbc9644548fbf17"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "isCiphertext",
                "configType": 1,
                "configValue": "false",
                "id": "241c108f696a4192ad780538f64434d0"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "default_text_value",
                "configType": 1,
                "configValue": "",
                "id": "33bc572fba46470e8c7acc983d1f4bc2"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "width_unit",
                "configType": 1,
                "configValue": "%",
                "id": "40ec1ca068eb46c085e1ede446d6d95c"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "operate_attribute",
                "configType": 1,
                "configValue": "",
                "id": "55bdba8fce844fe7a4659ed0c2d67a52"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "tips_content",
                "configType": 1,
                "configValue": "",
                "id": "62bed0b547334289ad4baf0574ed62fc"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "wrap_title",
                "configType": 1,
                "configValue": "[]",
                "id": "6805b612a0c84b1e917f077f9b4381cf"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "tips_checked",
                "configType": 1,
                "configValue": "false",
                "id": "6d573f86d6a146aab3ed5952914cf21e"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "default_value_type",
                "configType": 1,
                "configValue": "3",
                "id": "941c4250bb534372866da0f20ccf15bd"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "isPrivate",
                "configType": 1,
                "configValue": "false",
                "id": "95262aa92df543e98167a9e958d52781"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "is_title_wrap",
                "configType": 1,
                "configValue": "false",
                "id": "97876eb8e954404ab6093f3ddd256bc0"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "suffix",
                "configType": 1,
                "configValue": "",
                "id": "e919b2023063433c953c74581ecbd1d3"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "title",
                "configType": 1,
                "configValue": "关系",
                "id": "eb1fe51894cb4d53832cae98f7d8c870"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "variable_id",
                "configType": 1,
                "configValue": "",
                "id": "fecf3e077c87430caba53fd589a8ab62"
              }
            ],
            "componentPhysicalFieldMappingList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "f57ef495-5ac0-4dd6-bdae-87e85eb41a1f",
                "structName": "关系"
              }
            ],
            "formComponentValidate": {
              "formComponentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
              "id": "4c8cc358e5a54532b46d76cfa42a8a7c",
              "manualValidateValue": "",
              "required": "0",
              "unique": "0",
              "validateType": "0"
            },
            "id": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
            "modelId": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "modelType": 1,
            "multiple": false,
            "parentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "showInDesign": true,
            "showType": "input",
            "sort": 5,
            "subLayOutFlag": false,
            "subLayout": false,
            "subTable": false
          },
          {
            "componentBusinessConfigList": [
              {
                "businessId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "businessName": "右实体序号",
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "id": "d3fe7ccace9842d2a5d60d7fbb1fdc9f",
                "sort": 0
              }
            ],
            "componentConfig": {
              "component_id": "436560f9-7ebc-48f1-9e6f-d425c9691003",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_text_value": "",
              "default_value_type": 3,
              "disable_data_mapping": false,
              "hide_title": "0",
              "hide_title_area": false,
              "isCiphertext": false,
              "isPrivate": false,
              "is_title_wrap": false,
              "office_only_current_path": false,
              "operate_attribute": "",
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "suffix": "",
              "support_association_search": false,
              "tips": "",
              "tips_checked": false,
              "tips_content": "",
              "title": "右实体序号",
              "variable_id": "",
              "width_unit": "%",
              "wrap_title": "[]"
            },
            "componentConfigs": [
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "operate_attribute",
                "configType": 1,
                "configValue": "",
                "id": "2def8beacf734a14b50dcb7f40cee4f6"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "default_value_type",
                "configType": 1,
                "configValue": "3",
                "id": "3aed7a3cfb3f4d07a00ba5c7e307c7e9"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "hide_title",
                "configType": 1,
                "configValue": "0",
                "id": "44e0536c7f7a4bb59a9e601c83d55166"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "tips_content",
                "configType": 1,
                "configValue": "",
                "id": "4d6db03e82be4a48925910f9084cced5"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "isPrivate",
                "configType": 1,
                "configValue": "false",
                "id": "55dc4a27d5ee4cf8969c6b49f2d17533"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "tips",
                "configType": 1,
                "configValue": "",
                "id": "60320de1176e4f0b8e10145c33510dca"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "variable_id",
                "configType": 1,
                "configValue": "",
                "id": "6df63b40543640309e362d7b580359fe"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "suffix",
                "configType": 1,
                "configValue": "",
                "id": "7219e0e8abd246da947107e9f90020f5"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "isCiphertext",
                "configType": 1,
                "configValue": "false",
                "id": "79ca229f0e32459a8195c614e52f40f4"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "title",
                "configType": 1,
                "configValue": "右实体序号",
                "id": "7edcac070886437aba9d45b2214ee7bb"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "tips_checked",
                "configType": 1,
                "configValue": "false",
                "id": "8680606df5a84ae5bae62cbc8196402e"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "is_title_wrap",
                "configType": 1,
                "configValue": "false",
                "id": "9ed584753ee6483581714046f579dace"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "width_unit",
                "configType": 1,
                "configValue": "%",
                "id": "af3b73c55465421588292a71418ac3c2"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "hide_title_area",
                "configType": 1,
                "configValue": "false",
                "id": "b115163215cb45b3aa6e5ee0019636e1"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "disable_data_mapping",
                "configType": 1,
                "configValue": "false",
                "id": "b7651fe6626e4ccea3499f78a34528ba"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "support_association_search",
                "configType": 1,
                "configValue": "false",
                "id": "b9a9401372c64ce0b4a99a9b9a49f36e"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "default_text_value",
                "configType": 1,
                "configValue": "",
                "id": "c0ac691167324d4b900853ed05233014"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "wrap_title",
                "configType": 1,
                "configValue": "[]",
                "id": "d5a5a20181c34ebcb7e16259510cd303"
              }
            ],
            "componentPhysicalFieldMappingList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "3b425aac-c1af-4c6c-8340-6fc6508360c8",
                "structName": "右实体序号"
              }
            ],
            "formComponentValidate": {
              "formComponentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
              "id": "107ad5100d164bc0921a9f420eaf9872",
              "manualValidateValue": "",
              "required": "0",
              "unique": "0",
              "validateType": "0"
            },
            "id": "436560f9-7ebc-48f1-9e6f-d425c9691003",
            "modelId": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "modelType": 1,
            "multiple": false,
            "parentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "showInDesign": true,
            "showType": "input",
            "sort": 6,
            "subLayOutFlag": false,
            "subLayout": false,
            "subTable": false
          },
          {
            "componentBusinessConfigList": [
              {
                "businessId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "businessName": "右实体名称",
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "id": "c9e82bee4f80448ca2c5874931a896e4",
                "sort": 0
              }
            ],
            "componentConfig": {
              "component_id": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_text_value": "",
              "default_value_type": 3,
              "disable_data_mapping": false,
              "hide_title": "0",
              "hide_title_area": false,
              "isCiphertext": false,
              "isPrivate": false,
              "is_title_wrap": false,
              "office_only_current_path": false,
              "operate_attribute": "",
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "suffix": "",
              "support_association_search": false,
              "tips": "",
              "tips_checked": false,
              "tips_content": "",
              "title": "右实体名称",
              "variable_id": "",
              "width_unit": "%",
              "wrap_title": "[]"
            },
            "componentConfigs": [
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "variable_id",
                "configType": 1,
                "configValue": "",
                "id": "2242e6e36572427cba1d5df9125fb702"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "default_text_value",
                "configType": 1,
                "configValue": "",
                "id": "387e887442c14f63a84a0a3e56750de6"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "operate_attribute",
                "configType": 1,
                "configValue": "",
                "id": "3b86f488817b4d9785e427886a633fce"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "tips_content",
                "configType": 1,
                "configValue": "",
                "id": "45ab21b262f54de2ae1c78d3c69220de"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "title",
                "configType": 1,
                "configValue": "右实体名称",
                "id": "54db197c3d7f46d485efa2c14cfa41a5"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "hide_title",
                "configType": 1,
                "configValue": "0",
                "id": "70c561fd00344cfd948e7098162dc843"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "is_title_wrap",
                "configType": 1,
                "configValue": "false",
                "id": "767469f82e8d42648e2c2440b76996c5"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "tips_checked",
                "configType": 1,
                "configValue": "false",
                "id": "789760b4071a44efb44003458081c924"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "width_unit",
                "configType": 1,
                "configValue": "%",
                "id": "973057e20c4d4f08915f35edceda7a12"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "suffix",
                "configType": 1,
                "configValue": "",
                "id": "9ea7ad4ed8754c90b2f18a57b610bb50"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "wrap_title",
                "configType": 1,
                "configValue": "[]",
                "id": "a1d045bd32a44f6b8c0d921796f5b909"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "tips",
                "configType": 1,
                "configValue": "",
                "id": "ab01fdb17a414933a2aad0295890f23b"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "isCiphertext",
                "configType": 1,
                "configValue": "false",
                "id": "ab4089f8f49f4b2eb3c312a774ea1b6d"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "disable_data_mapping",
                "configType": 1,
                "configValue": "false",
                "id": "acc1cd41744f478ba9b1e5e73b424095"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "default_value_type",
                "configType": 1,
                "configValue": "3",
                "id": "b6a915d53c2745688a515ea6a9ce1249"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "support_association_search",
                "configType": 1,
                "configValue": "false",
                "id": "e5d734baba1945059d6166133c1a6609"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "hide_title_area",
                "configType": 1,
                "configValue": "false",
                "id": "e7611540402448f9963c2c989c6a0249"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "isPrivate",
                "configType": 1,
                "configValue": "false",
                "id": "eb35a97ee308497daf2ab7b88d4a8e55"
              }
            ],
            "componentPhysicalFieldMappingList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "5d3903e0-413f-4c67-b4f4-52625398055c",
                "structName": "右实体名称"
              }
            ],
            "formComponentValidate": {
              "formComponentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
              "id": "a2232a46098143139000daca2064fa3b",
              "manualValidateValue": "",
              "required": "0",
              "unique": "0",
              "validateType": "0"
            },
            "id": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
            "modelId": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "modelType": 1,
            "multiple": false,
            "parentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "showInDesign": true,
            "showType": "input",
            "sort": 7,
            "subLayOutFlag": false,
            "subLayout": false,
            "subTable": false
          },
          {
            "componentBusinessConfigList": [
              {
                "businessId": "4ed70413a5c94cf18ff73408a940c58e",
                "businessName": "primaryKey",
                "componentId": "4ed70413a5c94cf18ff73408a940c58e",
                "id": "c415fefca3284f8b90489f0f96fbf673",
                "sort": 0
              }
            ],
            "componentConfig": {
              "component_id": "4ed70413a5c94cf18ff73408a940c58e",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_value_type": 0,
              "office_only_current_path": false,
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "title": "TSFCC.PRIMARY_KEY"
            },
            "componentConfigs": [
              {
                "componentId": "4ed70413a5c94cf18ff73408a940c58e",
                "configKey": "title",
                "configType": 1,
                "configValue": "TSFCC.PRIMARY_KEY",
                "id": "245cdbf7f8dd4f3ab8efd051282f5f89"
              },
              {
                "componentId": "4ed70413a5c94cf18ff73408a940c58e",
                "configKey": "default_value_type",
                "configType": 1,
                "configValue": "0",
                "id": "643f88c1e0e04cf6813a487879bbbe6e"
              }
            ],
            "componentPhysicalFieldMappingList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "a27217c8-30fe-48d2-b347-ca34accfb53a",
                "structName": "data_id"
              }
            ],
            "id": "4ed70413a5c94cf18ff73408a940c58e",
            "modelId": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "modelType": 1,
            "multiple": false,
            "parentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "showInDesign": false,
            "showType": "input",
            "sort": 8,
            "subLayOutFlag": false,
            "subLayout": false,
            "subTable": false,
            "systemType": "primaryKey"
          },
          {
            "componentBusinessConfigList": [
              {
                "businessId": "f25487afbb734a86ac424233f1109522",
                "businessName": "foreignKey",
                "componentId": "f25487afbb734a86ac424233f1109522",
                "id": "b2ad13d822ff42a399102632a790b226",
                "sort": 0
              }
            ],
            "componentConfig": {
              "component_id": "f25487afbb734a86ac424233f1109522",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_value_type": 0,
              "office_only_current_path": false,
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "title": "TSFCC.FOREIGN_KEY"
            },
            "componentConfigs": [
              {
                "componentId": "f25487afbb734a86ac424233f1109522",
                "configKey": "title",
                "configType": 1,
                "configValue": "TSFCC.FOREIGN_KEY",
                "id": "5ab8b14ddcbc4d149c3c0c9351a4f881"
              },
              {
                "componentId": "f25487afbb734a86ac424233f1109522",
                "configKey": "default_value_type",
                "configType": 1,
                "configValue": "0",
                "id": "e15c6232d13e405380dbd31e2bfd7949"
              }
            ],
            "componentPhysicalFieldMappingList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "0ede0635-b20d-4cbe-b2c7-5ee9fef65ebb",
                "structName": "用户"
              }
            ],
            "id": "f25487afbb734a86ac424233f1109522",
            "modelId": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "modelType": 1,
            "multiple": false,
            "parentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "showInDesign": false,
            "showType": "input",
            "sort": 9,
            "subLayOutFlag": false,
            "subLayout": false,
            "subTable": false,
            "systemType": "foreignKey"
          }
        ],
        "form_id": "502768ef-d8d4-4547-977d-0bd9882e578f",
        "show_type": "childtable",
        "show_in_config": true,
        "columnStyle": {
          "child_sort": false,
          "component_id": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
          "dateFormatForTranslate": "yyyy-MM-dd",
          "date_format": "YYYY-MM-DD",
          "datetimeFormatForTranslate": "HH:mm:ss",
          "datetime_format": "HH:mm:ss",
          "default_value_type": 0,
          "hide_title": "0",
          "hide_title_area": false,
          "hight_limit": 5,
          "is_float": false,
          "is_title_wrap": false,
          "layout": "[24,24,24,24,24]",
          "layoutType": 2,
          "move_up_down": false,
          "office_only_current_path": false,
          "operate_attribute": "7,8",
          "option_key_column_data_type": 0,
          "option_show_dict_pic": "0",
          "option_show_type": "1",
          "option_value_column_data_type": 0,
          "select_all": false,
          "sortFormColumnAlias": "",
          "sort_form_column_id": "",
          "sort_order": "",
          "style": 0,
          "title": "普通子表",
          "wrap_title": "[]"
        },
        "assetColumnList": [
          {
            "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
            "assetName": "简单a子表"
          }
        ],
        "columnLinkDetailList": [],
        "columnRequiredDetailList": [],
        "columnMappingList": [],
        "validate": {
          "formComponentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
          "id": "12348113f6c84d8e9e4af26b80767024",
          "manualValidateValue": "",
          "required": "0",
          "unique": "0",
          "validateType": "0"
        },
        "child_table_children": [
          {
            "componentBusinessConfigList": [
              {
                "businessId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "businessName": "单行文本",
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "id": "6a68ced71a044e38b40ea1124eb01264",
                "sort": 0
              }
            ],
            "componentConfig": {
              "component_id": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_text_value": "",
              "default_value_type": 3,
              "disable_data_mapping": false,
              "hide_title": "0",
              "hide_title_area": false,
              "isCiphertext": false,
              "isPrivate": false,
              "is_title_wrap": false,
              "office_only_current_path": false,
              "operate_attribute": "",
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "suffix": "",
              "support_association_search": false,
              "tips": "",
              "tips_checked": false,
              "tips_content": "",
              "title": "左实体序号",
              "variable_id": "",
              "width_unit": "%",
              "wrap_title": "[]"
            },
            "componentConfigs": [
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "suffix",
                "configType": 1,
                "configValue": "",
                "id": "0b60fc1aa8c84edf951dcc6584e5b6b4"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "operate_attribute",
                "configType": 1,
                "configValue": "",
                "id": "0e4922e62a0f4d81b0e6bc303eb07a41"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "hide_title_area",
                "configType": 1,
                "configValue": "false",
                "id": "114eae429cb6471eab6c356be26d9658"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "disable_data_mapping",
                "configType": 1,
                "configValue": "false",
                "id": "2b18f154fd1c4bfeb99157352920d87a"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "default_value_type",
                "configType": 1,
                "configValue": "3",
                "id": "309e3d0569fc4956879a64eefa0988a0"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "default_text_value",
                "configType": 1,
                "configValue": "",
                "id": "47232a0b783b44daadbcd8287aeed4da"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "hide_title",
                "configType": 1,
                "configValue": "0",
                "id": "545c4932e3e14bd0a0f11f8b96f9b7db"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "width_unit",
                "configType": 1,
                "configValue": "%",
                "id": "59609de495da41f581357f10a9f9ce61"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "support_association_search",
                "configType": 1,
                "configValue": "false",
                "id": "69522eed30bd4c9c9771f1f85069cc9a"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "title",
                "configType": 1,
                "configValue": "左实体序号",
                "id": "69ec86d9084646849b58ea4c8ed554de"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "isPrivate",
                "configType": 1,
                "configValue": "false",
                "id": "71c47dfabe8041fb9f9c2276dd558034"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "wrap_title",
                "configType": 1,
                "configValue": "[]",
                "id": "73ec20fd20574617970bd01bcb69ef5c"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "tips_checked",
                "configType": 1,
                "configValue": "false",
                "id": "7dff2969719d4b6587d347ff657f5985"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "is_title_wrap",
                "configType": 1,
                "configValue": "false",
                "id": "80da002c8c064d35ba2d5f48c635c08e"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "isCiphertext",
                "configType": 1,
                "configValue": "false",
                "id": "986587b26eef41a5a130e36450777269"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "tips_content",
                "configType": 1,
                "configValue": "",
                "id": "a761ada99fea4b0eb3896e0288ead19a"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "tips",
                "configType": 1,
                "configValue": "",
                "id": "ae49935f60dc4daf97752bd5c754666b"
              },
              {
                "componentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
                "configKey": "variable_id",
                "configType": 1,
                "configValue": "",
                "id": "b83af53bf76642e0b5633bcb6ad2a12c"
              }
            ],
            "componentPhysicalFieldMappingList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "759a95ec-4492-4947-826e-c4cd7780ab24",
                "structName": "左实体序号"
              }
            ],
            "formComponentValidate": {
              "formComponentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
              "id": "81a5c98caba143f991bb7398545ad969",
              "manualValidateValue": "",
              "required": "0",
              "unique": "0",
              "validateType": "0"
            },
            "id": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
            "modelId": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "modelType": 1,
            "multiple": false,
            "parentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "showInDesign": true,
            "showType": "input",
            "sort": 3,
            "subLayOutFlag": false,
            "subLayout": false,
            "subTable": false,
            "form_id": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "show_type": "input",
            "show_in_config": true,
            "columnStyle": {
              "component_id": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_text_value": "",
              "default_value_type": 3,
              "disable_data_mapping": false,
              "hide_title": "0",
              "hide_title_area": false,
              "isCiphertext": false,
              "isPrivate": false,
              "is_title_wrap": false,
              "office_only_current_path": false,
              "operate_attribute": "",
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "suffix": "",
              "support_association_search": false,
              "tips": "",
              "tips_checked": false,
              "tips_content": "",
              "title": "左实体序号",
              "variable_id": "",
              "width_unit": "%",
              "wrap_title": "[]"
            },
            "assetColumnList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "759a95ec-4492-4947-826e-c4cd7780ab24",
                "structName": "左实体序号"
              }
            ],
            "columnLinkDetailList": [],
            "columnRequiredDetailList": [],
            "columnMappingList": [],
            "validate": {
              "formComponentId": "0156543f-5d40-4870-b81c-ff48bf9a09b1",
              "id": "81a5c98caba143f991bb7398545ad969",
              "manualValidateValue": "",
              "required": "0",
              "unique": "0",
              "validateType": "0"
            }
          },
          {
            "componentBusinessConfigList": [
              {
                "businessId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "businessName": "左实体名称",
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "id": "bb619ebb0d5f4f89b06455d3c7d74d67",
                "sort": 0
              }
            ],
            "componentConfig": {
              "component_id": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_text_value": "",
              "default_value_type": 3,
              "disable_data_mapping": false,
              "hide_title": "0",
              "hide_title_area": false,
              "isCiphertext": false,
              "isPrivate": false,
              "is_title_wrap": false,
              "office_only_current_path": false,
              "operate_attribute": "",
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "suffix": "",
              "support_association_search": false,
              "tips": "",
              "tips_checked": false,
              "tips_content": "",
              "title": "左实体名称",
              "variable_id": "",
              "width_unit": "%",
              "wrap_title": "[]"
            },
            "componentConfigs": [
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "is_title_wrap",
                "configType": 1,
                "configValue": "false",
                "id": "05b514fb4d0a48dbb3aa34728d186e40"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "wrap_title",
                "configType": 1,
                "configValue": "[]",
                "id": "1f3741fd34b24f849a0d4cf2914d7c9f"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "hide_title_area",
                "configType": 1,
                "configValue": "false",
                "id": "242133d7efa64f37a0120a77c1e1bf5c"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "default_value_type",
                "configType": 1,
                "configValue": "3",
                "id": "3b91723820da47d0880dcd599f586b1c"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "suffix",
                "configType": 1,
                "configValue": "",
                "id": "3e63327485804e1d845fe03a1f9b8990"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "width_unit",
                "configType": 1,
                "configValue": "%",
                "id": "3ef9f177441747a5aa60007d9ff284df"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "tips",
                "configType": 1,
                "configValue": "",
                "id": "4a0c1309068a4be89c6a1cf26ee3abab"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "variable_id",
                "configType": 1,
                "configValue": "",
                "id": "6057b5426d564966b94120d986f843fa"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "title",
                "configType": 1,
                "configValue": "左实体名称",
                "id": "654a8cd2e0c144129586d747ef5193f8"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "isCiphertext",
                "configType": 1,
                "configValue": "false",
                "id": "7ea49ce4043a4fc9af50ddbc8611f995"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "support_association_search",
                "configType": 1,
                "configValue": "false",
                "id": "83af68d2ad4f4490b957e0e772e691fe"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "default_text_value",
                "configType": 1,
                "configValue": "",
                "id": "8c5d9f21ebd84f55bc4ce43ed32ba8e6"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "tips_content",
                "configType": 1,
                "configValue": "",
                "id": "955a947fa25b44d281a0263003b99ebc"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "isPrivate",
                "configType": 1,
                "configValue": "false",
                "id": "a60d6c8ee111445d85da4359c6527501"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "hide_title",
                "configType": 1,
                "configValue": "0",
                "id": "b4d671a18f99476f88ece24facd87299"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "tips_checked",
                "configType": 1,
                "configValue": "false",
                "id": "b6bd8579354c4999821a57659d3df34e"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "operate_attribute",
                "configType": 1,
                "configValue": "",
                "id": "d46dbc84a8354f649696c94f7aa69d01"
              },
              {
                "componentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
                "configKey": "disable_data_mapping",
                "configType": 1,
                "configValue": "false",
                "id": "e813e5f8af824ceb9e7a0908e043ff9f"
              }
            ],
            "componentPhysicalFieldMappingList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "0853de60-6f4b-430e-b7fc-a4e60c8551b9",
                "structName": "左实体名称"
              }
            ],
            "formComponentValidate": {
              "formComponentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
              "id": "0e4e95e36b5e4169950d9e1e7ed16a92",
              "manualValidateValue": "",
              "required": "0",
              "unique": "0",
              "validateType": "0"
            },
            "id": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
            "modelId": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "modelType": 1,
            "multiple": false,
            "parentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "showInDesign": true,
            "showType": "input",
            "sort": 4,
            "subLayOutFlag": false,
            "subLayout": false,
            "subTable": false,
            "form_id": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "show_type": "input",
            "show_in_config": true,
            "columnStyle": {
              "component_id": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_text_value": "",
              "default_value_type": 3,
              "disable_data_mapping": false,
              "hide_title": "0",
              "hide_title_area": false,
              "isCiphertext": false,
              "isPrivate": false,
              "is_title_wrap": false,
              "office_only_current_path": false,
              "operate_attribute": "",
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "suffix": "",
              "support_association_search": false,
              "tips": "",
              "tips_checked": false,
              "tips_content": "",
              "title": "左实体名称",
              "variable_id": "",
              "width_unit": "%",
              "wrap_title": "[]"
            },
            "assetColumnList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "0853de60-6f4b-430e-b7fc-a4e60c8551b9",
                "structName": "左实体名称"
              }
            ],
            "columnLinkDetailList": [],
            "columnRequiredDetailList": [],
            "columnMappingList": [],
            "validate": {
              "formComponentId": "e7ce4750-91d6-4e52-a0fc-87e0244be429",
              "id": "0e4e95e36b5e4169950d9e1e7ed16a92",
              "manualValidateValue": "",
              "required": "0",
              "unique": "0",
              "validateType": "0"
            }
          },
          {
            "componentBusinessConfigList": [
              {
                "businessId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "businessName": "关系",
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "id": "c4095f926ec14e96b5121fe2bb716f54",
                "sort": 0
              }
            ],
            "componentConfig": {
              "component_id": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_text_value": "",
              "default_value_type": 3,
              "disable_data_mapping": false,
              "hide_title": "0",
              "hide_title_area": false,
              "isCiphertext": false,
              "isPrivate": false,
              "is_title_wrap": false,
              "office_only_current_path": false,
              "operate_attribute": "",
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "suffix": "",
              "support_association_search": false,
              "tips": "",
              "tips_checked": false,
              "tips_content": "",
              "title": "关系",
              "variable_id": "",
              "width_unit": "%",
              "wrap_title": "[]"
            },
            "componentConfigs": [
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "disable_data_mapping",
                "configType": 1,
                "configValue": "false",
                "id": "076ac055a2824917a9a377d56e652d3d"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "hide_title_area",
                "configType": 1,
                "configValue": "false",
                "id": "08ef43024f82481ba2ad2bca72fc140e"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "hide_title",
                "configType": 1,
                "configValue": "0",
                "id": "0b4b2589f98441c58f2882605737369f"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "tips",
                "configType": 1,
                "configValue": "",
                "id": "139da5c12b644333af72ebee2532f5c5"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "support_association_search",
                "configType": 1,
                "configValue": "false",
                "id": "22e808b45008421a9dbc9644548fbf17"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "isCiphertext",
                "configType": 1,
                "configValue": "false",
                "id": "241c108f696a4192ad780538f64434d0"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "default_text_value",
                "configType": 1,
                "configValue": "",
                "id": "33bc572fba46470e8c7acc983d1f4bc2"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "width_unit",
                "configType": 1,
                "configValue": "%",
                "id": "40ec1ca068eb46c085e1ede446d6d95c"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "operate_attribute",
                "configType": 1,
                "configValue": "",
                "id": "55bdba8fce844fe7a4659ed0c2d67a52"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "tips_content",
                "configType": 1,
                "configValue": "",
                "id": "62bed0b547334289ad4baf0574ed62fc"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "wrap_title",
                "configType": 1,
                "configValue": "[]",
                "id": "6805b612a0c84b1e917f077f9b4381cf"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "tips_checked",
                "configType": 1,
                "configValue": "false",
                "id": "6d573f86d6a146aab3ed5952914cf21e"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "default_value_type",
                "configType": 1,
                "configValue": "3",
                "id": "941c4250bb534372866da0f20ccf15bd"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "isPrivate",
                "configType": 1,
                "configValue": "false",
                "id": "95262aa92df543e98167a9e958d52781"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "is_title_wrap",
                "configType": 1,
                "configValue": "false",
                "id": "97876eb8e954404ab6093f3ddd256bc0"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "suffix",
                "configType": 1,
                "configValue": "",
                "id": "e919b2023063433c953c74581ecbd1d3"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "title",
                "configType": 1,
                "configValue": "关系",
                "id": "eb1fe51894cb4d53832cae98f7d8c870"
              },
              {
                "componentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
                "configKey": "variable_id",
                "configType": 1,
                "configValue": "",
                "id": "fecf3e077c87430caba53fd589a8ab62"
              }
            ],
            "componentPhysicalFieldMappingList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "f57ef495-5ac0-4dd6-bdae-87e85eb41a1f",
                "structName": "关系"
              }
            ],
            "formComponentValidate": {
              "formComponentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
              "id": "4c8cc358e5a54532b46d76cfa42a8a7c",
              "manualValidateValue": "",
              "required": "0",
              "unique": "0",
              "validateType": "0"
            },
            "id": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
            "modelId": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "modelType": 1,
            "multiple": false,
            "parentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "showInDesign": true,
            "showType": "input",
            "sort": 5,
            "subLayOutFlag": false,
            "subLayout": false,
            "subTable": false,
            "form_id": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "show_type": "input",
            "show_in_config": true,
            "columnStyle": {
              "component_id": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_text_value": "",
              "default_value_type": 3,
              "disable_data_mapping": false,
              "hide_title": "0",
              "hide_title_area": false,
              "isCiphertext": false,
              "isPrivate": false,
              "is_title_wrap": false,
              "office_only_current_path": false,
              "operate_attribute": "",
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "suffix": "",
              "support_association_search": false,
              "tips": "",
              "tips_checked": false,
              "tips_content": "",
              "title": "关系",
              "variable_id": "",
              "width_unit": "%",
              "wrap_title": "[]"
            },
            "assetColumnList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "f57ef495-5ac0-4dd6-bdae-87e85eb41a1f",
                "structName": "关系"
              }
            ],
            "columnLinkDetailList": [],
            "columnRequiredDetailList": [],
            "columnMappingList": [],
            "validate": {
              "formComponentId": "60bd50dd-c553-48e0-9c98-a3412bebaa31",
              "id": "4c8cc358e5a54532b46d76cfa42a8a7c",
              "manualValidateValue": "",
              "required": "0",
              "unique": "0",
              "validateType": "0"
            }
          },
          {
            "componentBusinessConfigList": [
              {
                "businessId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "businessName": "右实体序号",
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "id": "d3fe7ccace9842d2a5d60d7fbb1fdc9f",
                "sort": 0
              }
            ],
            "componentConfig": {
              "component_id": "436560f9-7ebc-48f1-9e6f-d425c9691003",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_text_value": "",
              "default_value_type": 3,
              "disable_data_mapping": false,
              "hide_title": "0",
              "hide_title_area": false,
              "isCiphertext": false,
              "isPrivate": false,
              "is_title_wrap": false,
              "office_only_current_path": false,
              "operate_attribute": "",
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "suffix": "",
              "support_association_search": false,
              "tips": "",
              "tips_checked": false,
              "tips_content": "",
              "title": "右实体序号",
              "variable_id": "",
              "width_unit": "%",
              "wrap_title": "[]"
            },
            "componentConfigs": [
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "operate_attribute",
                "configType": 1,
                "configValue": "",
                "id": "2def8beacf734a14b50dcb7f40cee4f6"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "default_value_type",
                "configType": 1,
                "configValue": "3",
                "id": "3aed7a3cfb3f4d07a00ba5c7e307c7e9"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "hide_title",
                "configType": 1,
                "configValue": "0",
                "id": "44e0536c7f7a4bb59a9e601c83d55166"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "tips_content",
                "configType": 1,
                "configValue": "",
                "id": "4d6db03e82be4a48925910f9084cced5"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "isPrivate",
                "configType": 1,
                "configValue": "false",
                "id": "55dc4a27d5ee4cf8969c6b49f2d17533"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "tips",
                "configType": 1,
                "configValue": "",
                "id": "60320de1176e4f0b8e10145c33510dca"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "variable_id",
                "configType": 1,
                "configValue": "",
                "id": "6df63b40543640309e362d7b580359fe"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "suffix",
                "configType": 1,
                "configValue": "",
                "id": "7219e0e8abd246da947107e9f90020f5"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "isCiphertext",
                "configType": 1,
                "configValue": "false",
                "id": "79ca229f0e32459a8195c614e52f40f4"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "title",
                "configType": 1,
                "configValue": "右实体序号",
                "id": "7edcac070886437aba9d45b2214ee7bb"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "tips_checked",
                "configType": 1,
                "configValue": "false",
                "id": "8680606df5a84ae5bae62cbc8196402e"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "is_title_wrap",
                "configType": 1,
                "configValue": "false",
                "id": "9ed584753ee6483581714046f579dace"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "width_unit",
                "configType": 1,
                "configValue": "%",
                "id": "af3b73c55465421588292a71418ac3c2"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "hide_title_area",
                "configType": 1,
                "configValue": "false",
                "id": "b115163215cb45b3aa6e5ee0019636e1"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "disable_data_mapping",
                "configType": 1,
                "configValue": "false",
                "id": "b7651fe6626e4ccea3499f78a34528ba"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "support_association_search",
                "configType": 1,
                "configValue": "false",
                "id": "b9a9401372c64ce0b4a99a9b9a49f36e"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "default_text_value",
                "configType": 1,
                "configValue": "",
                "id": "c0ac691167324d4b900853ed05233014"
              },
              {
                "componentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
                "configKey": "wrap_title",
                "configType": 1,
                "configValue": "[]",
                "id": "d5a5a20181c34ebcb7e16259510cd303"
              }
            ],
            "componentPhysicalFieldMappingList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "3b425aac-c1af-4c6c-8340-6fc6508360c8",
                "structName": "右实体序号"
              }
            ],
            "formComponentValidate": {
              "formComponentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
              "id": "107ad5100d164bc0921a9f420eaf9872",
              "manualValidateValue": "",
              "required": "0",
              "unique": "0",
              "validateType": "0"
            },
            "id": "436560f9-7ebc-48f1-9e6f-d425c9691003",
            "modelId": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "modelType": 1,
            "multiple": false,
            "parentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "showInDesign": true,
            "showType": "input",
            "sort": 6,
            "subLayOutFlag": false,
            "subLayout": false,
            "subTable": false,
            "form_id": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "show_type": "input",
            "show_in_config": true,
            "columnStyle": {
              "component_id": "436560f9-7ebc-48f1-9e6f-d425c9691003",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_text_value": "",
              "default_value_type": 3,
              "disable_data_mapping": false,
              "hide_title": "0",
              "hide_title_area": false,
              "isCiphertext": false,
              "isPrivate": false,
              "is_title_wrap": false,
              "office_only_current_path": false,
              "operate_attribute": "",
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "suffix": "",
              "support_association_search": false,
              "tips": "",
              "tips_checked": false,
              "tips_content": "",
              "title": "右实体序号",
              "variable_id": "",
              "width_unit": "%",
              "wrap_title": "[]"
            },
            "assetColumnList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "3b425aac-c1af-4c6c-8340-6fc6508360c8",
                "structName": "右实体序号"
              }
            ],
            "columnLinkDetailList": [],
            "columnRequiredDetailList": [],
            "columnMappingList": [],
            "validate": {
              "formComponentId": "436560f9-7ebc-48f1-9e6f-d425c9691003",
              "id": "107ad5100d164bc0921a9f420eaf9872",
              "manualValidateValue": "",
              "required": "0",
              "unique": "0",
              "validateType": "0"
            }
          },
          {
            "componentBusinessConfigList": [
              {
                "businessId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "businessName": "右实体名称",
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "id": "c9e82bee4f80448ca2c5874931a896e4",
                "sort": 0
              }
            ],
            "componentConfig": {
              "component_id": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_text_value": "",
              "default_value_type": 3,
              "disable_data_mapping": false,
              "hide_title": "0",
              "hide_title_area": false,
              "isCiphertext": false,
              "isPrivate": false,
              "is_title_wrap": false,
              "office_only_current_path": false,
              "operate_attribute": "",
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "suffix": "",
              "support_association_search": false,
              "tips": "",
              "tips_checked": false,
              "tips_content": "",
              "title": "右实体名称",
              "variable_id": "",
              "width_unit": "%",
              "wrap_title": "[]"
            },
            "componentConfigs": [
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "variable_id",
                "configType": 1,
                "configValue": "",
                "id": "2242e6e36572427cba1d5df9125fb702"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "default_text_value",
                "configType": 1,
                "configValue": "",
                "id": "387e887442c14f63a84a0a3e56750de6"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "operate_attribute",
                "configType": 1,
                "configValue": "",
                "id": "3b86f488817b4d9785e427886a633fce"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "tips_content",
                "configType": 1,
                "configValue": "",
                "id": "45ab21b262f54de2ae1c78d3c69220de"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "title",
                "configType": 1,
                "configValue": "右实体名称",
                "id": "54db197c3d7f46d485efa2c14cfa41a5"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "hide_title",
                "configType": 1,
                "configValue": "0",
                "id": "70c561fd00344cfd948e7098162dc843"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "is_title_wrap",
                "configType": 1,
                "configValue": "false",
                "id": "767469f82e8d42648e2c2440b76996c5"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "tips_checked",
                "configType": 1,
                "configValue": "false",
                "id": "789760b4071a44efb44003458081c924"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "width_unit",
                "configType": 1,
                "configValue": "%",
                "id": "973057e20c4d4f08915f35edceda7a12"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "suffix",
                "configType": 1,
                "configValue": "",
                "id": "9ea7ad4ed8754c90b2f18a57b610bb50"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "wrap_title",
                "configType": 1,
                "configValue": "[]",
                "id": "a1d045bd32a44f6b8c0d921796f5b909"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "tips",
                "configType": 1,
                "configValue": "",
                "id": "ab01fdb17a414933a2aad0295890f23b"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "isCiphertext",
                "configType": 1,
                "configValue": "false",
                "id": "ab4089f8f49f4b2eb3c312a774ea1b6d"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "disable_data_mapping",
                "configType": 1,
                "configValue": "false",
                "id": "acc1cd41744f478ba9b1e5e73b424095"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "default_value_type",
                "configType": 1,
                "configValue": "3",
                "id": "b6a915d53c2745688a515ea6a9ce1249"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "support_association_search",
                "configType": 1,
                "configValue": "false",
                "id": "e5d734baba1945059d6166133c1a6609"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "hide_title_area",
                "configType": 1,
                "configValue": "false",
                "id": "e7611540402448f9963c2c989c6a0249"
              },
              {
                "componentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
                "configKey": "isPrivate",
                "configType": 1,
                "configValue": "false",
                "id": "eb35a97ee308497daf2ab7b88d4a8e55"
              }
            ],
            "componentPhysicalFieldMappingList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "5d3903e0-413f-4c67-b4f4-52625398055c",
                "structName": "右实体名称"
              }
            ],
            "formComponentValidate": {
              "formComponentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
              "id": "a2232a46098143139000daca2064fa3b",
              "manualValidateValue": "",
              "required": "0",
              "unique": "0",
              "validateType": "0"
            },
            "id": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
            "modelId": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "modelType": 1,
            "multiple": false,
            "parentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "showInDesign": true,
            "showType": "input",
            "sort": 7,
            "subLayOutFlag": false,
            "subLayout": false,
            "subTable": false,
            "form_id": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "show_type": "input",
            "show_in_config": true,
            "columnStyle": {
              "component_id": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_text_value": "",
              "default_value_type": 3,
              "disable_data_mapping": false,
              "hide_title": "0",
              "hide_title_area": false,
              "isCiphertext": false,
              "isPrivate": false,
              "is_title_wrap": false,
              "office_only_current_path": false,
              "operate_attribute": "",
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "suffix": "",
              "support_association_search": false,
              "tips": "",
              "tips_checked": false,
              "tips_content": "",
              "title": "右实体名称",
              "variable_id": "",
              "width_unit": "%",
              "wrap_title": "[]"
            },
            "assetColumnList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "5d3903e0-413f-4c67-b4f4-52625398055c",
                "structName": "右实体名称"
              }
            ],
            "columnLinkDetailList": [],
            "columnRequiredDetailList": [],
            "columnMappingList": [],
            "validate": {
              "formComponentId": "7dcd2c2c-402c-4c4f-9774-b988ac46097d",
              "id": "a2232a46098143139000daca2064fa3b",
              "manualValidateValue": "",
              "required": "0",
              "unique": "0",
              "validateType": "0"
            }
          },
          {
            "componentBusinessConfigList": [
              {
                "businessId": "4ed70413a5c94cf18ff73408a940c58e",
                "businessName": "primaryKey",
                "componentId": "4ed70413a5c94cf18ff73408a940c58e",
                "id": "c415fefca3284f8b90489f0f96fbf673",
                "sort": 0
              }
            ],
            "componentConfig": {
              "component_id": "4ed70413a5c94cf18ff73408a940c58e",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_value_type": 0,
              "office_only_current_path": false,
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "title": "TSFCC.PRIMARY_KEY"
            },
            "componentConfigs": [
              {
                "componentId": "4ed70413a5c94cf18ff73408a940c58e",
                "configKey": "title",
                "configType": 1,
                "configValue": "TSFCC.PRIMARY_KEY",
                "id": "245cdbf7f8dd4f3ab8efd051282f5f89"
              },
              {
                "componentId": "4ed70413a5c94cf18ff73408a940c58e",
                "configKey": "default_value_type",
                "configType": 1,
                "configValue": "0",
                "id": "643f88c1e0e04cf6813a487879bbbe6e"
              }
            ],
            "componentPhysicalFieldMappingList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "a27217c8-30fe-48d2-b347-ca34accfb53a",
                "structName": "data_id"
              }
            ],
            "id": "4ed70413a5c94cf18ff73408a940c58e",
            "modelId": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "modelType": 1,
            "multiple": false,
            "parentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "showInDesign": false,
            "showType": "input",
            "sort": 8,
            "subLayOutFlag": false,
            "subLayout": false,
            "subTable": false,
            "systemType": "primaryKey",
            "form_id": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "show_type": "input",
            "show_in_config": false,
            "columnStyle": {
              "component_id": "4ed70413a5c94cf18ff73408a940c58e",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_value_type": 0,
              "office_only_current_path": false,
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "title": "TSFCC.PRIMARY_KEY"
            },
            "assetColumnList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "a27217c8-30fe-48d2-b347-ca34accfb53a",
                "structName": "data_id"
              }
            ],
            "columnLinkDetailList": [],
            "columnRequiredDetailList": [],
            "columnMappingList": []
          },
          {
            "componentBusinessConfigList": [
              {
                "businessId": "f25487afbb734a86ac424233f1109522",
                "businessName": "foreignKey",
                "componentId": "f25487afbb734a86ac424233f1109522",
                "id": "b2ad13d822ff42a399102632a790b226",
                "sort": 0
              }
            ],
            "componentConfig": {
              "component_id": "f25487afbb734a86ac424233f1109522",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_value_type": 0,
              "office_only_current_path": false,
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "title": "TSFCC.FOREIGN_KEY"
            },
            "componentConfigs": [
              {
                "componentId": "f25487afbb734a86ac424233f1109522",
                "configKey": "title",
                "configType": 1,
                "configValue": "TSFCC.FOREIGN_KEY",
                "id": "5ab8b14ddcbc4d149c3c0c9351a4f881"
              },
              {
                "componentId": "f25487afbb734a86ac424233f1109522",
                "configKey": "default_value_type",
                "configType": 1,
                "configValue": "0",
                "id": "e15c6232d13e405380dbd31e2bfd7949"
              }
            ],
            "componentPhysicalFieldMappingList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "0ede0635-b20d-4cbe-b2c7-5ee9fef65ebb",
                "structName": "用户"
              }
            ],
            "id": "f25487afbb734a86ac424233f1109522",
            "modelId": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "modelType": 1,
            "multiple": false,
            "parentId": "e9de15aa-efde-45e0-94f2-9d4abc20646e",
            "showInDesign": false,
            "showType": "input",
            "sort": 9,
            "subLayOutFlag": false,
            "subLayout": false,
            "subTable": false,
            "systemType": "foreignKey",
            "form_id": "502768ef-d8d4-4547-977d-0bd9882e578f",
            "show_type": "input",
            "show_in_config": false,
            "columnStyle": {
              "component_id": "f25487afbb734a86ac424233f1109522",
              "dateFormatForTranslate": "yyyy-MM-dd",
              "date_format": "YYYY-MM-DD",
              "datetimeFormatForTranslate": "HH:mm:ss",
              "datetime_format": "HH:mm:ss",
              "default_value_type": 0,
              "office_only_current_path": false,
              "option_key_column_data_type": 0,
              "option_show_dict_pic": "0",
              "option_show_type": "1",
              "option_value_column_data_type": 0,
              "select_all": false,
              "style": 0,
              "title": "TSFCC.FOREIGN_KEY"
            },
            "assetColumnList": [
              {
                "assetId": "435b3ac1-9385-b373-2024-57a1d10fd07b",
                "assetName": "简单a子表",
                "structId": "0ede0635-b20d-4cbe-b2c7-5ee9fef65ebb",
                "structName": "用户"
              }
            ],
            "columnLinkDetailList": [],
            "columnRequiredDetailList": [],
            "columnMappingList": []
          }
        ]
      },]
    },
    onChange: values => {
      console.log(values);
    },
    changeConfiguration: values => {
      console.log(values);
    },
    configuration: '{"l_entity_name":"左实体名称","r_entity_name":"右实体名称","placeholder":"444"}',
  };

  new Vue({
    render: h => {
      return (
        <div class="app-container">
          {appArr.map((item, index) => {
            return (
              <div class="components">
                <span class="title">{item.title}：</span>
                <App
                  style={{ width: "calc(100% - 220px)" }}
                  customConfig={customConfig}
                  type={item.type}
                />
              </div>
            );
          })}
        </div>
      );
    },
  }).$mount("#app");
} else {
  if (!window.CUSTOM_PLUGIN) {
    window.CUSTOM_PLUGIN = new Map();
  }

  window.CUSTOM_PLUGIN.set(process.env.VUE_APP_CUSTOM_PLUGIN_ID, (dom, props, _, eventBus) => {
    const component = new Vue({
      render: (h) => <App type={props.type} customConfig={props} key={new Date().getTime()} />,
    }).$mount();
    if (dom.childNodes.length > 0) {
      dom.removeChild(dom.childNodes[0]);
    }
    dom.appendChild(component.$el);
    console.log(props, '8000');
    eventBus.on((props) => {

      const component = new Vue({
        render: (h) => <App type={props.type} customConfig={props} key={new Date().getTime()} />,
      }).$mount();
      if (dom.childNodes.length > 0) {
        dom.removeChild(dom.childNodes[0]);
      }
      dom.appendChild(component.$el);
    });
  });
}
