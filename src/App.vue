<template>
    <div className="analyzer-vue-demo" :style="{
        width: '100%',
        height: '100%',
    }" ref="any_bar">
        <div class="N_echarts_bar" ref="columnChart">
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
            itemS:
            {
                name: "欠费金额",
                type: "bar",
                barWidth: "15",
                barGap: "-20%",
                itemStyle: {
                    normal: {
                        opacity: 0.6,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: "#eb7680",
                            },
                            {
                                offset: 1,
                                color: "#eb7680",
                            },
                        ]),
                        //barBorderRadius: 12,
                    },
                },
                data: [400, 400, 300, 300, 300, 400, 400, 400, 300],
            },

            optionZ: {

                title: {

                    //textAlign: 'auto',
                    left: "center",
                    textStyle: {
                        color: "black",
                        fontWeight: "bold",
                    },
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                grid: {
                    left: "2%",
                    right: "4%",
                    bottom: "14%",
                    top: "16%",
                    containLabel: true,
                },
                legend: {
                    data: [{ name: '欠费金额', itemStyle: { color: '#eb7680' } }, { name: '已收金额', itemStyle: { color: '#30bafe' } }, { name: '应收金额', itemStyle: { color: '#14f6ee' } }],
                    left: "left",
                    top: 20,
                    textStyle: {
                        //color: "#fff"
                    },

                    itemWidth: 20,
                    itemHeight: 10,
                    // itemGap: 35
                },
                xAxis: {
                    type: "category",
                    data: ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],
                    axisLine: {
                        lineStyle: {
                            ////color: 'white'
                        },
                    },
                    axisLabel: {

                        textStyle: {
                            fontFamily: "Microsoft YaHei",
                            fontSize: '40',
                            color: '#eb7680'
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                },

                yAxis: {
                    type: "value",

                    boundaryGap: [0, 0.1],
                    axisLine: {
                        show: true,
                        lineStyle: {
                            // color: 'white'
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed'
                            //color: 'rgba(255,255,255,0.3)'
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        textStyle: {

                        }
                    },
                },

                series: [

                ],
            }

        };
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
        analysisFontOption() {
            let 坐标字号 = this?.options?.externalVariables?.坐标字号
            let 坐标字体 = this?.options?.externalVariables?.坐标字体
            let 坐标字体颜色 = this?.options?.externalVariables?.坐标字体颜色
            let x坐标轴颜色 = this?.options?.externalVariables?.x坐标轴颜色 ? this?.options?.externalVariables?.x坐标轴颜色 : 'black'
            let y坐标轴颜色 = this?.options?.externalVariables?.y坐标轴颜色 ? this?.options?.externalVariables?.y坐标轴颜色 : 'black'
            let y坐标轴分割线颜色 = this?.options?.externalVariables?.y坐标轴分割线颜色 ? this?.options?.externalVariables?.y坐标轴分割线颜色 : 'black'
            let y坐标轴文本颜色 = this?.options?.externalVariables?.y坐标轴文本颜色 ? this?.options?.externalVariables?.y坐标轴文本颜色 : 'black'
            let y坐标轴字体大小 = this?.options?.externalVariables?.y坐标轴字体大小 ? this?.options?.externalVariables?.y坐标轴字体大小 : 12
            let y坐标轴字体类型 = this?.options?.externalVariables?.y坐标轴字体类型 ? this?.options?.externalVariables?.y坐标轴字体类型 : 'Microsoft YaHei'
            坐标字号 = 坐标字号 ? 坐标字号 : 12
            坐标字体 = 坐标字体 ? 坐标字体 : 'Microsoft YaHei'
            坐标字体颜色 = 坐标字体颜色 ? 坐标字体颜色 : 'black'
            return { fontSize: 坐标字号, fontFamily: 坐标字体, color: 坐标字体颜色, xAisColor: x坐标轴颜色, yAxisColor: y坐标轴颜色, ySplitColor: y坐标轴分割线颜色, yfontSize: y坐标轴字体大小, yfontFamily: y坐标轴字体类型, ycolor: y坐标轴文本颜色 }
        },
        analysisColOption() {
            let 柱子宽度 = this?.options?.externalVariables?.柱子宽度
            let 颜色配置 = this?.options?.externalVariables?.颜色配置
            柱子宽度 = 柱子宽度 ? 柱子宽度 : 12
            颜色配置 = 颜色配置 ? 颜色配置 : '[["#ff9a9e","#a6c1ee"],["#4facfe","#00f2fe"],[" #667eea"," #764ba2 "]]'
            let color = JSON.parse(颜色配置)
            return { borWidth: 柱子宽度, color }
        }
    },
    created() {
        this.optionZ.xAxis.axisLabel.textStyle.fontSize = this.analysisFontOption.fontSize
        this.optionZ.xAxis.axisLabel.textStyle.fontFamily = this.analysisFontOption.fontFamily
        this.optionZ.xAxis.axisLabel.textStyle.color = this.analysisFontOption.color
        this.optionZ.yAxis.axisLabel.textStyle.fontSize = this.analysisFontOption.yfontSize
        this.optionZ.yAxis.axisLabel.textStyle.fontFamily = this.analysisFontOption.yfontFamily
        this.optionZ.yAxis.axisLabel.textStyle.color = this.analysisFontOption.ycolor
        let tableD = JSON.parse(JSON.stringify(this.dataSource))
        let columnArr = tableD.shift()
        let a = []
        for (let x = 0; x < tableD[0].length; x++) {
            let temp = []
            tableD.forEach(item => {
                temp.push(item[x])
            })
            a.push(temp)
        }
        let xAxis = a.shift()

        this.optionZ.xAxis.data = xAxis
        columnArr.shift()
        let leg = []
        columnArr.forEach((x, i) => {
            let colorArr = this.analysisColOption.color[i]
            leg.push({ name: x, itemStyle: { color: colorArr[0] } })


        })
        a.forEach((x, i) => {

            let colorArr = this.analysisColOption.color[i]
            colorArr[1] = colorArr[1] ? colorArr[1] : colorArr[0]
            this.itemS.barWidth = this.analysisColOption.borWidth
            this.itemS.data = x
            this.itemS.name = columnArr[i]
            this.itemS.itemStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: colorArr[0],
                },
                {
                    offset: 1,
                    color: colorArr[1],
                },
            ])
            this.optionZ.series.push(JSON.parse(JSON.stringify(this.itemS)))
        })

        // this.optionZ.series.forEach((x, i) => {
        //     x.barWidth = this.analysisColOption.borWidth
        //     let colorArr = this.analysisColOption.color[i]
        //     colorArr[1] = colorArr[1] ? colorArr[1] : colorArr[0]
        //     x.itemStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //         {
        //             offset: 0,
        //             color: colorArr[0],
        //         },
        //         {
        //             offset: 1,
        //             color: colorArr[1],
        //         },
        //     ])
        // })

        this.optionZ.xAxis.axisLine.lineStyle.color = this.analysisFontOption.xAisColor
        this.optionZ.yAxis.axisLine.lineStyle.color = this.analysisFontOption.yAxisColor
        this.optionZ.yAxis.splitLine.lineStyle.color = this.analysisFontOption.ySplitColor
        this.optionZ.legend.data.forEach((x, i) => {
            let colorArr = this.analysisColOption.color[i]
            x.itemStyle.color = colorArr[0]
        })
    },
    mounted() {
        this.$refs.any_bar.parentNode.style.height = "100%"
        this.$refs.any_bar.parentNode.style.width = "100%"
        this.initFn()
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
            let Gechart = echarts.init(this.$refs.columnChart);
            // this.option.series[0].data = this.nodeD;
            // this.option.series[0].links = this.linkD;
            Gechart.setOption(this.optionZ);

            this.optionZ && Gechart.setOption(this.optionZ);
            const task = () => {
                Gechart.resize();
            };
            window.addEventListener("resize", debounce(task, 300));
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
.N_echarts_bar {
    height: 100%;
    // height: 900px;
    // width: 600px;
}
</style>

