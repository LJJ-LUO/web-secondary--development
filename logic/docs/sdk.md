---
title: sdk
nav:
  title: 逻辑控制
  path: /logic
group:
  title: sdk
  path: /dev
toc: menu
---
## **场景说明**

如果开发插件涉及到使用JS SDK基础API功能，并且数睿企业级无代码开发平台也提供此能力，用户可通过接入JS SDK实现。

## **操作步骤**

JS SDK无需安装，直接从前端开发的全局变量windows调用即可。

组件中心与事件中心实例类已挂载到window上，window.componentCenter ，window.eventCenter。

## **componentCenter.register(id,type,ref,eventActionConfig)**

* 描述：将组件实例与事件动作配置注册到组件中心。

* ##### 参数

| 参数名称 | 说明 |
| --- | --- |
| id | 组件Id, 唯一id。 |
| type | 固定值：comp。 |
| ref | 组件实例。 |
| eventActionConfig | 组件事件与动作的配置json。 |

* 返回值：无。

## **componentCenter.registerInstance(id,ref)**

* 描述：将组件实例注册到组件中心。

* ##### 参数

| 参数名称 | 说明 |
| --- | --- |
| id | 组件Id, 唯一id。 |
| ref | 组件实例。 |

* 返回值：无。

## **componentCenter.registerConfig(id,eventActionConfig)**

* 描述：将组建实例注册到组件中心。

* ##### 参数

| 参数名称 | 说明 |
| --- | --- |
| id | 组件Id, 唯一id。 |
| eventActionConfig | 组件事件与动作的配置json。 |

* 返回值：无。

## **componentCenter.removeInstance(id)**

* 描述：删除组件实例，清除组件时间与动作配置。

* ##### 参数：id 组件Id, 唯一id

* 返回值：无。

## **eventCenter.triggerEventNew({objectId,componentId,type,event,payload})**

* 描述：组件事件触发，通知事件中心，将此组件此事件绑定的逻辑控制，执行起来。

* ##### 参数

| 参数 | 参数说明 |
| --- | --- |
| objectId | 模块id。 |
| componentId | 组件id。 |
| type | 触发的 模块类型。 |
| event | 触发的事件名称。 |
| payload | 返回数据体。 |

* 返回值：无。
