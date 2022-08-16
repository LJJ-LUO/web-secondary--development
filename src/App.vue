<template>
    <div className="analyzer-vue-demo" :style="{
        width: '100%',
        height: '100%',
    }" ref="PieRot">
        <div class="PieRotation" ref="pierotation">
        </div>
    </div>
</template>

<script>

import * as echarts from "echarts";
const zipObject = (arr1, arr2) => {
    const ret = {};
    arr1.forEach((item, index) => {
        ret[item] = arr2[index];
    });
    return ret;
};
const debounce = (func, ms) => {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
        }, ms);
    };
}

export default {
    props: {
        dataSource: {
            type: Array,
            default: () => [],
        },
        componentId: {
            type: String | undefined,
            default: "",
        },
        options: {
            type: Object,
            default: () => ({
                // 配置项从externalVariables里取
                externalVariables: {},
            }),
        },
        updateProcess: {
            type: Function,
            default: () => { },
        },
    },
    data() {
        return {
            option: {

                tooltip: {
                    trigger: 'item'
                },
                // legend: {
                //   top: '5%',
                //   left: 'center'
                // },

                legend: {
                    //纵向
                    orient: 'vertical',
                    top: '40%',
                    left: '60%',
                    //图例距离饼图的距离
                    itemGap: 40,
                    itemWidth: 14,// 设置图例图形的宽
                    itemHeight: 14,
                    data: [],
                    // backgroundColor: '#0c2539',
                    textStyle: {
                        color: 'black',
                        fontSize: '16',
                        width: 200,
                        // padding: [0, 10],
                        rich: {
                            name: {
                                width: 80,
                                fontSize: 16,
                            },
                            percent: {
                                width: 10,
                                align: "right",
                                fontFamily: "Medium",
                                fontSize: 16,
                            },

                        },
                    },
                    // formatter(name) {
                    //     return `{name|${name}}`
                    // },


                    //全部样式
                    itemStyle: {
                        shadowColor: `rgb(22, 97, 171)`,

                        borderWidth: 2
                    },
                },

                series: [
                    {
                        right: '40%',
                        name: 'Access From',
                        type: 'pie',
                        //   roseType: 'radius',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {  //可以在data中单独设置
                            borderRadius: 10, //圆角弧度
                            borderColor: ' rgba(0, 0, 0, .1) ',
                            // borderColor: 'rgba(0,0,0,0)',//间隔中间的边框颜色  一般设置为白色 显得项中间的间隔
                            borderWidth: 20  //每个中间的间距
                        },
                        label: {
                            show: false,
                            // color: '#9A9EBA',
                            formatter: ' {d|{d}%}\n{b|{b}} ',
                            rich: {
                                b: {                        //name 文字样式
                                    fontSize: 20,
                                    color: 'red',
                                    align: "center",
                                },
                                d: {                   //value 文字样式
                                    fontSize: 40,
                                    color: '#63BF6A',
                                    align: "right",
                                }
                            }

                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '40',
                                fontWeight: 'bold'
                            },
                            scale: true,
                            scaleSize: 30,


                        },
                        labelLine: {
                            show: false,



                            // showAbove: true,
                            length: 60,
                            length2: 140,
                            minTurnAngle: 140
                        },
                        data: [
                        ]
                    }
                ]
            },
            timeTicket: null
        };
    },
    created() {
        //处理格式  
        let tableD = JSON.parse(JSON.stringify(this.dataSource))
        tableD.shift()
        let a = []
        for (let x = 0; x < tableD[0].length; x++) {
            let temp = []
            tableD.forEach(item => {
                temp.push(item[x])
            })
            a.push(temp)
        }

        let scaleData = [];
        a[0].forEach((x, i) => {
            let color = this.exhibitOptions.colroArr[i]
            scaleData.push({
                value: x,
                name: a[1][i],
                itemStyle: { color }
            })
            this.option.legend.data.push({
                value: x,
                name: a[1][i],
            })
        })

        this.option.series[0].data = scaleData

        let sum = 0
        scaleData.forEach(x => {
            sum += Number(x.value)
        })



        this.option.legend.formatter = function (name) {
            const item = scaleData.find((i) => {
                return i.name === name;
            });
            const p = ((item.value / sum) * 100).toFixed(2);
            return `{name|${name}}{percent| ${p}%} `
        }
        // console.log(this.exhibitOptions);
        this.option.series[0].itemStyle.borderWidth = this.regionOptions.reionSpace
        this.option.series[0].itemStyle.borderRadius = this.regionOptions.reionRadius
        this.option.series[0].itemStyle.borderColor = this.regionOptions.reionColor
        this.option.series[0].itemStyle.borderRadius = this.regionOptions.reionRadius
        this.option.series[0].label.rich.b = this.exhibitOptions.definition
        this.option.series[0].label.rich.d = this.exhibitOptions.exValue
        // this.exhibitOptions.colroArr.forEach((x, i) => {
        //     // this.option.series[0].data[i].itemStyle?.color = x
        // })

        this.option.legend.itemGap = this.legendOptions.legendSp
        for (const key in this.legendOptions.legendFont) {
            this.option.legend.textStyle[key] = this.legendOptions.legendFont[key]
        }

        if (this.labelOp) {

            if (!this.suspend) {
                this.option.series[0].label.show = true
                this.option.series[0].labelLine.show = this.labelOp
                this.option.series[0].labelLine.showAbove = this.labelOp
                this.option.series[0].label.formatter = ' {d|{d}%} {b|{b}} '
                this.option.series[0].label.padding = [0, -100, 30, -80]
            } else {
                this.option.series[0].labelLine.show = this.labelOp
                this.option.series[0].labelLine.showAbove = this.labelOp
                this.option.series[0].label.formatter = ' {d|{d}%} {b|{b}} '
                this.option.series[0].label.padding = [0, -100, 30, -80]
            }

        } else {

            this.option.series[0].label.position = 'center'
            this.option.series[0].labelLine.show = false
        }
        this.option.series[0].labelLine.length = this.lineStyle.length
        this.option.series[0].labelLine.length2 = this.lineStyle.length2
        // this.option.series[0].labelLine.color = this.lineStyle.color

    },

    computed: {
        tableDataHeader() {
            return (this.dataSource[0] || []).map(t => ({
                prop: t,
                label: t,
            }));
        },
        tableData() {
            let [header, ...tableData] = this.dataSource;
            tableData = tableData || [];
            return tableData.map(d => (window?._?.zipObject || zipObject)(header, d));
        },
        regionOptions() {
            let 区域间距 = this?.options?.externalVariables?.区域间距
            let 区域圆角 = this?.options?.externalVariables?.区域圆角
            let 区域颜色块 = this?.options?.externalVariables?.区域颜色块
            区域间距 = 区域间距 ? 区域间距 : 20
            区域圆角 = 区域圆角 ? 区域圆角 : 10
            区域颜色块 = 区域颜色块 ? 区域颜色块 : '#fff'
            return { reionSpace: 区域间距, reionRadius: 区域圆角, reionColor: 区域颜色块 }
        },
        exhibitOptions() {
            let 名称字体颜色 = this?.options?.externalVariables?.名称字体颜色
            let 名称字体 = this?.options?.externalVariables?.名称字体
            let 名称字号 = this?.options?.externalVariables?.名称字号
            let 数值字号 = this?.options?.externalVariables?.数值字号
            let 数值字体 = this?.options?.externalVariables?.数值字体
            let 数值字体颜色 = this?.options?.externalVariables?.数值字体颜色
            let 数据颜色 = this?.options?.externalVariables?.数据颜色
            数据颜色 = 数据颜色 ? 数据颜色 : '["#FF6666","#FFFF00","#0066CC","#CC6699","#FF9933","#00CC00" ]'
            let definition = {
                fontSize: 名称字号 ? 名称字号 : 20,
                color: 名称字体颜色 ? 名称字体颜色 : 'black',
                fontFamily: 名称字体 ? 名称字体 : ''
            }
            let exValue = {
                fontSize: 数值字号 ? 数值字号 : 20,
                color: 数值字体颜色 ? 数值字体颜色 : 'black',
                fontFamily: 数值字体 ? 数值字体 : ''
            }
            try {
                数据颜色 = JSON.parse(数据颜色)
            } catch (error) {
                数据颜色 = JSON.parse('["#FF6666", "#FFFF00", "#0066CC", "#CC6699", "#FF9933", "#00CC00"]')
            }


            return { definition, exValue, colroArr: 数据颜色 }
        },
        legendOptions() {
            let 图例间距 = this?.options?.externalVariables?.图例间距
            let 图例文字字号 = this?.options?.externalVariables?.图例文字字号
            let 图例文字字体 = this?.options?.externalVariables?.图例文字字体
            let 图例文字颜色 = this?.options?.externalVariables?.图例文字颜色

            图例间距 = 图例间距 ? Number(图例间距) : 20

            let legendFont = {
                fontSize: 图例文字字号 ? 图例文字字号 : 20,
                color: 图例文字颜色 ? 图例文字颜色 : 'black',
                fontFamily: 图例文字字体 ? 图例文字字体 : ''
            }



            return { legendSp: 图例间距, legendFont }
        },
        rotationSpeed() {
            let 轮播时长间隔 = this?.options?.externalVariables?.轮播时长间隔
            轮播时长间隔 = 轮播时长间隔 ? Number(轮播时长间隔) : 1000
            return 轮播时长间隔
        },
        lineStyle() {
            let 数据标签第一段线长度 = this?.options?.externalVariables?.数据标签第一段线长度 ? this?.options?.externalVariables?.数据标签第一段线长度 : 60
            let 数据标签第二段线长度 = this?.options?.externalVariables?.数据标签第二段线长度 ? this?.options?.externalVariables?.数据标签第二段线长度 : 140
            return {
                length: 数据标签第一段线长度, length2: 数据标签第二段线长度

            }
        },
        suspend() {
            let 是否轮播 = this?.options?.externalVariables?.是否轮播 ? this?.options?.externalVariables?.是否轮播 : true
            return 是否轮播 == 'true' ? true : false
        },
        labelOp() {
            let 数据标签显示 = this?.options?.externalVariables?.数据标签显示

            return 数据标签显示 == 'true' ? true : false
        }

    },
    mounted() {


        this.$refs.PieRot.parentNode.style.height = "100%"
        this.$refs.PieRot.parentNode.style.width = "100%"

        this.initFn()

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

        this.componentId &&
            window.componentCenter?.register &&
            window.componentCenter.register(this.componentId, "comp", this, {
                events,
                actions,
            });
        this.updateProcess && this.updateProcess();
    },
    methods: {
        initFn() {
            let Gechart = echarts.init(this.$refs.pierotation);
            // this.option.series[0].data = this.nodeD;
            // this.option.series[0].links = this.linkD;
            Gechart.setOption(this.option);
            this.autoHover(Gechart, this.option, this.option.series[0].data.length, this.rotationSpeed)
            this.option && Gechart.setOption(this.option);
            const task = () => {
                Gechart.resize();
            };
            window.addEventListener("resize", debounce(task, 300));
        },
        autoHover(myChart, option, num, time) {

            var defaultData = {   //设置默认值
                time: 2000,
                num: 100
            };
            if (!time) {
                time = defaultData.time;
            }
            if (!num) {
                num = defaultData.num;
            }
            var count = 0;
            if (!this.suspend) return
            var timeTicket = null;
            timeTicket && clearInterval(timeTicket);
            timeTicket = setInterval(function () {
                myChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0 //serieIndex的索引值   可以触发多个
                });
                myChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: count
                });
                myChart.dispatchAction({
                    type: "showTip",
                    seriesIndex: 0,
                    dataIndex: count
                });
                count++; //控制轮播 个数
                if (count >= num) {
                    count = 0
                }
            }, time);
            myChart.on("mouseover", function (params) {
                clearInterval(timeTicket);
                count = params.dataIndex

                myChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0
                });
                myChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: params.dataIndex
                });
                myChart.dispatchAction({
                    type: "showTip",
                    seriesIndex: 0,
                    dataIndex: params.dataIndex
                });
            });
            myChart.on("mouseout", function () {
                timeTicket && clearInterval(timeTicket);
                timeTicket = setInterval(function () {

                    myChart.dispatchAction({
                        type: "downplay",
                        seriesIndex: 0 //serieIndex的索引值   可以触发多个
                    });
                    myChart.dispatchAction({
                        type: "highlight",
                        seriesIndex: 0,
                        dataIndex: count
                    });
                    myChart.dispatchAction({
                        type: "showTip",
                        seriesIndex: 0,
                        dataIndex: count
                    });
                    count++;
                    if (count >= num) {
                        count = 0
                    }
                }, time);
            });
        },
        clickBt() {
            this.componentId &&
                window.eventCenter?.triggerEvent &&
                window.eventCenter.triggerEvent(this.componentId, "onClick", {
                    name: "二开插件",
                });
        },
        // 逻辑控制用，不可删，return内容可改
        Event_Center_getName: () => {
            return "Demo实例";
        },
        do_EventCenter_messageSuccess(param) {
            console.log(param);
            alert("动作执行成功！");
        },
    },
};
</script>


<style lang="less" scoped>
.PieRotation {
    height: 100%;
    // height: 900px;
    // width: 600px;
    // background-color: #4b4b4b;
}

.showBox {
    background-color: inherit;

}
</style>
