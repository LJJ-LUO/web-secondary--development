<template>
  <div class="custom-node">
    <div class="modleTop">
      <div
        class="NodeIcon"
        :style="{
          marginTop: '6px',
          display: icon.html ? 'inline-block' : 'none',
        }"
        v-html="icon.html"
      />
      <img
        class="NodeIcon"
        :src="getIconUrl"
        alt=""
        :style="{
          display: !icon.html ? 'inline-block' : 'none',
        }"
      />
      <el-input placeholder="动态输入" v-model="nodeName" @input="inputChangeVal" :style="{ marginTop: '15px', width: '200px' }" />
    </div>
    <div class="custom-node-content">
      <div class="content-row">
        <div class="row-left">选择字段：</div>
        <div class="row-right">
          <el-select :value="selectCols" @change="changeField" placeholder="请选择" class="textClass" multiple collapse-tags :style="{ width: '200px', marginLeft: '10px' }">
            <el-option :key="t.col_index" :label="t.col_name" :value="t.col_name" v-for="t in tests" />
          </el-select>
        </div>
      </div>
      <div class="content-row" style="margin-left: 60px">
        <div class="row-left">接口地址：</div>
        <div class="row-right">
          <el-input v-model="apiSrcInput" placeholder="请输入地址" @change="srcChange"></el-input>
        </div>
      </div>
      <div class="content-row" style="margin-left: 60px">
        <div class="row-left">接口返回值类型：</div>
        <div class="row-right">
          <el-select v-model="selectValue" placeholder="请选择" @change="changeBack">
            <el-option v-for="item in backOptions" :key="item.col_index" :label="item.col_name" :value="item.col_name"> </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="custom-node-content-bottom">
      <!-- <el-tooltip class="tooltip" effect="dark" content="多个字段使用英文,拼接" placement="right">
          <i class="el-icon-question"></i>
        </el-tooltip> -->
      <el-form class="bottom-right" :model="formData" :rules="rules" ref="ruleForm" label-width="180px">
        <el-form-item v-show="!textareaShow" el-form-item class="form-item" label="参数：">
          <el-input type="textarea" :rows="3" placeholder="" v-model="formData.areaKey" @change="areaChange"></el-input>
        </el-form-item>
        <el-form-item v-show="textareaShow" class="form-item" label="返回结果全量字段：" prop="desc">
          <el-input type="textarea" :rows="3" placeholder="多个字段使用英文,拼接" v-model="formData.desc" @change="areaChange"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  props: {
    currentNode: String,
    nodeCode: String,
    nodeFieldList: Object,
    nodeInfoList: Object,
    obj_id: String,
    updateNode: Function,
    customIcon: Object,
    img: String,
  },
  data() {
    let currentNodes = this.currentNode
    let detail = this.nodeInfoList[currentNodes] || {}
    let currentfieldList = this.nodeFieldList[currentNodes] || {}
    let label = detail.label?.split(':')[1]
    let field = detail.data?.detail?.columns || []
    let getApiSrc = detail.data?.detail?.apiSrc || ''
    let getSelectValue = detail.data?.detail?.backValue || ''
    let getTextarea = detail.data?.detail?.backTextarea || ''
    let getAuthParam = detail.data?.detail?.authParam || ''
    const tests = currentfieldList[currentNodes] || []
    const newIcon = this.customIcon || {}
    return {
      nodeName: label,
      fields: field,
      detail,
      currentNodes,
      currentfieldList,
      tests,
      selectCols: field.map((_) => _.col_name),
      icon: newIcon,
      apiSrcInput: getApiSrc,
      selectValue: getSelectValue,
      backOptions: [
        // {
        //   col_index: 1,
        //   col_name: '防疫信息接口',
        // },
        {
          col_index: 1,
          col_name: '健康码',
        },
        {
          col_index: 2,
          col_name: '核酸检测',
        },
        {
          col_index: 3,
          col_name: '令牌刷新',
        },
        {
          col_index: 4,
          col_name: '疫苗',
        },
        {
          col_index: 5,
          col_name: '美团接口',
        },
      ],
      formData: {
        areaKey: getAuthParam,
        desc: getTextarea,
      },
      textareaShow: false,
      rules: {
        desc: [{ required: true, message: '必填项', trigger: 'blur' }],
      },
    }
  },
  mounted() {
    if (this.selectValue === '美团接口') {
      this.textareaShow = false
    } else {
      this.textareaShow = true
    }
  },
  methods: {
    updateNode1(newName, newFields) {
      let detail = this.detail
      detail.data = detail.data || {}
      detail.data.detail = detail.data.detail || {}
      detail.data.text = {
        internalName: newName,
        code: this.currentNodes,
      }
      detail.data.detail.columns = newFields
      detail.data.detail.apiSrc = this.apiSrcInput
      detail.data.detail.backValue = this.selectValue
      detail.data.detail.backTextarea = this.formData.desc
      detail.data.detail.authParam = this.formData.areaKey
      detail.label = this.currentNodes + ':' + newName

      if (this.selectValue !== '美团接口') {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.updateNode(detail)
          } else {
            return false
          }
        })
      } else {
        this.updateNode(detail)
      }
    },

    inputChangeVal(value) {
      this.nodeName = value
      this.updateNode1(value, this.fields)
    },

    changeField(fieldOpt) {
      let ele = this.tests.filter((test) => fieldOpt.includes(test.col_name))
      this.selectCols = fieldOpt
      this.fields = ele
      this.updateNode1(this.nodeName, ele)
    },

    srcChange(val) {
      this.updateNode1(this.nodeName, this.fields)
    },

    changeBack(val) {
      if (val === '美团接口') {
        this.$refs['ruleForm'].resetFields()
        this.textareaShow = false
        this.formData.desc = ''
      } else {
        this.textareaShow = true
        this.formData.areaKey = ''
      }
      this.updateNode1(this.nodeName, this.fields)
    },

    areaChange(val) {
      this.updateNode1(this.nodeName, this.fields)
    },
  },
  computed: {
    getIconUrl() {
      return `${window.location.origin}/storage_area/ext_plugins/web/${this.obj_id}/images/${this.img}`
    },
  },
}
</script>
<style lang="less" scoped>
.custom-node {
  height: 100%;
  width: 100%;
  background-color: white;
  .modleTop {
    display: flex;
    .NodeIcon {
      color: #9e9e9e;
      margin-left: 18px;
      margin-top: 15px;
      width: 36px;
      height: 36px;
      margin-right: 10px;
    }
  }

  .custom-node-content {
    display: flex;
    justify-content: space-around;
    height: 140px;
    padding: 20px 40px;

    .content-row {
      height: 48px;
      display: flex;
      align-items: center;

      .row-left {
        width: 130px;
        text-align: left;
      }

      .row-right {
        display: flex;
        align-items: center;
      }
    }
  }
  .custom-node-content-bottom {
    padding: 0px 40px;
    display: flex;
    .bottom-right {
      display: flex;
      align-items: center;
      width: 100%;

      .form-item {
        width: 50%;
      }

      .tooltip {
        margin-left: 10px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
