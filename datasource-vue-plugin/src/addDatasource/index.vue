<template>
  <div class="asset-mysql-wrapper" v-loading="loading">
    <div
      class="content-container"
      :style="{
        width: isCustom ? '100%' : '1170px',
      }"
    >
      <div class="navbar">
        <i class="el-icon-back icon-ele" @click="sdk.GOBACK"></i>
        <!-- <a-icon type="left" @click="sdk.GOBACK" /> -->
        <span> {{ scene === "edit" ? "编辑数据源" : "新建数据源" }}</span>
      </div>
      <el-form ref="myForm" :model="myForm" :rules="myRules">
        <div class="type-content">
          <span>数据类型</span>
          <img :src="logo" alt="" />
        </div>
        <div class="basic-content">
          <div class="basic-title">基础信息</div>
          <div class="basic-detail">
            <el-form-item label="数据源名称" prop="name">
              <el-input
                v-model="myForm.name"
                :style="{ width: '220px' }"
                @blur="onNameBlur"
                @focus="
                  () => {
                    oldName = myForm.name;
                  }
                "
              />
            </el-form-item>
          </div>
        </div>
        <div class="info-content">
          <div class="info-title">连接信息</div>
          <div class="info-detail">
            <el-form-item label="JDBC连接串" prop="url">
              <el-input v-model="myForm.url" :style="{ width: '600px' }" />
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="myForm.username" :style="{ width: '220px' }" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="myForm.password"
                type="password"
                :style="{ width: '220px' }"
                @focus="
                  () => {
                    if (!passwordFlag) {
                      myForm.password = '';
                    }
                  }
                "
                @change="
                  (e) => {
                    passwordFlag = true;
                  }
                "
                @blur="
                  (e) => {
                    if (e.target.value === '') {
                      passwordFlag = false;
                      myForm.password = detailForm.password;
                    }
                  }
                "
              />
            </el-form-item>
            <el-form-item label="客户端字符集" prop="clientEncoding">
              <el-select
                v-model="myForm.clientEncoding"
                :style="{ width: '220px' }"
              >
                <el-option value="UTF-8">UTF-8</el-option>
                <el-option value="GBK">GBK</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数据库字符集" prop="serverEncoding">
              <el-select
                v-model="myForm.serverEncoding"
                :style="{ width: '220px', textAlign: 'right' }"
              >
                <el-option value="AL32UTF8">AL32UTF8</el-option>
                <el-option value="ZHS16GBK">ZHS16GBK</el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <div class="bottom ant-customized">
      <div :style="{ width: isCustom ? '100%' : '1170px' }">
        <el-button key="test" @click="onTest"> 测试连接 </el-button>
        <el-button type="primary" @click="submit" :loading="loading">
          保存
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from "../api";
import { Encrypt } from "../common/RSA";
import { guid } from "../common/Transform";
import qs from "querystringify";
import history from "../common/history";
export default {
  name: "addDataSource",
  props: {
    scene: String,
    module: String,
    datasourceDetail: {
      type: Object,
      default: {},
    },
    sdk: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      isCustom: false,
      loading: false,
      logo: require("../assets/images/mysql.png"),
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      myForm: {
        name: "",
        url: "jdbc:mysql://[ip]:[port]/[databaseName]?useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&useSSL=false",
        username: "",
        password: "",
        clientEncoding: "UTF-8",
        serverEncoding: "AL32UTF8",
      },
      myRules: {
        name: [
          {
            required: true,
            message: "请输入数据源名称",
            trigger: "change",
          },
          {
            max: 24,
            message: "数据源名称过长",
            trigger: "change",
          },
        ],
        url: [
          {
            required: true,
            message: "请输入JDBC连接串",
            trigger: "change",
          },
        ],
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change",
          },
        ],
      },
      detailForm: {},
      oldName: "",
      isSameName: false,
      passwordFlag: false,
      query: qs.parse(location.search),
      isCustom: false,
    };
  },
  metaInfo() {
    return {
      title: this.module,
    };
  },
  mounted() {
    this.isCustom = window.location.pathname.includes("/datasource2");
    if (this.scene === "edit") {
      this.editInit();
    }
  },
  methods: {
    editInit() {
      const { url, username, password, clientEncoding, serverEncoding } =
        this.datasourceDetail?.source_detail ?? {};
      this.detailForm = {
        name: this.datasourceDetail?.source_name,
        url,
        username,
        password,
        clientEncoding,
        serverEncoding,
      };
      this.myForm = { ...this.detailForm };
    },
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.myForm.validate((valid) => {
          resolve(valid);
        });
      });
    },
    async onTest() {
      // if (this.isSameName) {
      //   this.$message.error("数据源重名，请修改后测试");
      //   return;
      // }

      const isValid = await this.validateForm();
      if (!isValid) {
        return;
      }
      this.loading = true;

      try {
        const { name, ...restProps } = this.myForm;
        const { url, username, password, clientEncoding, serverEncoding } =
          restProps;
        if (
          name &&
          url &&
          username &&
          password &&
          clientEncoding &&
          serverEncoding
        ) {
          restProps.password = this.passwordFlag
            ? Encrypt(restProps.password)
            : this.datasourceDetail?.source_detail?.password;
        } else {
          this.$message.error("数据均不能为空，请填写完整！");
          return;
        }
        try {
          const newDatasource = {
            source_type: 3022,
            source_detail: JSON.stringify(restProps),
            source_name: name,
          };
          if (this.scene === "edit") {
            newDatasource.source_id = this.datasourceDetail?.source_id;
          }
          await API.testDatasource(newDatasource);
          this.loading = false;
          this.$message.success("成功连接数据源", 2);
        } catch (err) {
          this.loading = false;
          this.$message.error(err?.data?.message ?? "测试数据源失败", 2);
        }
      } catch (error) {
        this.loading = false;
      }
    },
    async submit() {
      const { datasourceDetail, scene, sdk, passwordFlag } = this;
      if (this.isSameName) {
        this.$message.error("数据源重名，请修改后提交");
        return;
      }
      const isValid = await this.validateForm();
      if (!isValid) {
        return;
      }
      const { name, ...restProps } = await this.myForm;
      const { url, username, password, clientEncoding, serverEncoding } =
        restProps;
      let that = this;
      if (
        name &&
        url &&
        username &&
        password &&
        clientEncoding &&
        serverEncoding
      ) {
        restProps.password = passwordFlag
          ? Encrypt(restProps.password)
          : datasourceDetail?.source_detail?.password;
      } else {
        this.$message.error("数据均不能为空，请填写完整！");
        return;
      }
      this.loading = true;
      try {
        let sourceId = guid();
        let newDatasource = {
          source_id: sourceId,
          source_type: 3022,
          source_detail: JSON.stringify(restProps),
          source_name: name,
          sys_source_id: datasourceDetail?.id,
        };
        if (scene === "add") {
          const { data } = await API.addDatasource(newDatasource);
          this.$message.success("成功保存数据源", 2);
          localStorage.setItem("dataSourceNeedReload", true);
          // 元数据采集新增数据源跳转到选择表页面
          if (that?.query?.showType === "metadata") {
            history.push({
              pathname: `/import-assets/${data}`,
              search: qs.stringify(
                {
                  catalog: this.query.catalog,
                  category: this.query.category,
                  showType: this.query.showType,
                  sourceType: datasourceDetail.type,
                  module: "元数据采集",
                },
                true
              ),
            });
          } else if (that?.query?.showType === "assetList") {
            history.push({
              pathname: `/import-assets/${data}`,
              search: qs.stringify(
                {
                  catalog: this.query.catalog,
                  category: this.query.category,
                  showType: this.query.showType,
                  sourceType: datasourceDetail.type,
                },
                true
              ),
            });
          } else {
            setInterval(() => {
              if (this.isCustom) {
                history.goBack();
              } else {
                window.close();
              }
            }, 1500);
          }
        } else if (scene === "edit") {
          newDatasource.source_id = datasourceDetail.source_id;
          newDatasource.sys_source_id = datasourceDetail.sys_source_id;
          const { data } = await API.updateDatasource(newDatasource);
          this.$message.success("成功保存数据源", 2);
          localStorage.setItem("dataSourceNeedReload", true);
          sdk?.GOBACK(true);
        }
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      } catch (err) {
        console.log(err);
        if (err?.data?.message === "数据源重名") {
          this.$message.error(err.data.message, 2);
        } else {
          this.$message.error("保存数据源失败", 2);
        }
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      }
    },
    // 数据源名称input失去焦点
    async onNameBlur() {
      const name = this.myForm.name;
      // console.log('new--' + name + ',old--' + this.state.oldName);
      if (name && name !== "" && name !== this.oldName) {
        try {
          await API.duplicateCheck(name);
          this.isSameName = false;
        } catch (err) {
          this.$message.error(err?.data?.message ?? "数据源重名,请修改", 2);
          this.isSameName = true;
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.asset-mysql-wrapper {
  // height: calc(100% - 128px);
  height: 100%;
  background-color: #f5f6f7;
  overflow: auto;
  .content-container {
    // width: 1170px;
    margin: auto;
    overflow: auto;
    height: calc(100vh - 128px);
  }
  .navbar {
    padding: 24px 22px;
    background: #fff;
    font-size: 18px;
    display: flex;
    justify-items: center;
    .icon-ele {
      margin-right: 30px;
      cursor: pointer;
      font-size: 24px;
    }
  }
  .type-content {
    padding: 24px 22px;
    display: flex;
    justify-content: space-between;
    background: #fff;
    img {
      width: 68px;
      height: 68px;
    }
  }
  .basic-content {
    margin-top: 10px;
    .basic-title {
      color: #898f96;
      height: 40px;
      line-height: 40px;
    }
    .basic-detail {
      background: #fff;
      border-radius: 3px;
    }
  }
  .info-content {
    margin-top: 10px;
    .info-title {
      color: #898f96;
      height: 40px;
      line-height: 40px;
    }
    .info-detail {
      background: #fff;
      border-radius: 3px;
    }
  }

  .el-form-item {
    margin-bottom: 0;
    padding: 10px 22px;
    border-bottom: 1px solid #f5f6f7;
    ::v-deep .el-form-item__label {
      text-align: left;

      > label {
        color: #898f96;
      }
      > label::after {
        display: none;
      }
      > label::before {
        display: none;
      }
    }

    ::v-deep .el-form-item__content {
      text-align: right;

      .el-input {
        border: 0;
        border-radius: 0;
        border-bottom: 1px solid #dedfe0;
      }
      .el-input:focus {
        outline: none;
        border: 0;
        border-radius: 0;
        border-bottom: 1px solid #7da7f0;
        box-shadow: none;
      }
      .el-input[disabled] {
        border-bottom: 1px solid #f5f5f5;
        background-color: transparent;
      }
      .el-input__inner {
        border: none;
      }
      .el-form-item__error {
        right: 0;
      }
      .ant-select-selection-selected-value {
        float: right;
      }
    }
  }

  .bottom {
    position: absolute;
    bottom: 0;
    height: 64px;
    background: #e6e8eb;
    width: 100%;
    min-width: 1170px;
    overflow: hidden;
    & > div {
      height: 100%;
      padding: 12px 22px;
      text-align: right;
      margin: 0 auto;
    }
  }

  .ant-customized .el-button.el-button--primary {
    color: #0454f2;
    box-shadow: none;
  }
  .ant-customized .el-button {
    border-color: transparent;
    background-color: transparent;
    border-radius: 0;
    box-shadow: none;
  }
  .el-button:not([disabled]):hover {
    text-decoration: none;
  }
  .ant-customized .el-button:hover,
  .ant-customized .el-button:focus {
    color: #0454f2;
    box-shadow: inset 0 -2px 0 0 #0454f2;
    transition: 0.2s ease-in-out all;
    background-color: #fff;
    border-color: #fff;
  }
}
</style>
