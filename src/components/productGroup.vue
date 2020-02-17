<template>
    <div class='productsContainer'>

        <div class='wrapper'>
            <!--<div class='card'-->
                <!--v-for='(item,index) in appList'-->
                <!--:key="index"-->
            <!--&gt;-->

                <el-row class='wrapper'>
                    <el-col class='card' :span="4" v-for="(item,index) in appList" :key="index" :offset="1">
                        <el-card :bord-style='{padding:"0px",margin:"30px auto",textAlign:"center"}'>

                            <div slot="header" style=" position: relative;">
                                <el-button style="right: 10px;  padding: 3px 0; position: absolute;" type="text"  @click='handleDeleteSelect(item)'><i class="el-icon-close"></i></el-button>
                                <img :src='item.icon ? item.icon : require("../assets/img/placeholder.png")' class='image'/>
                                <p style="color: black">{{item.group_name}}</p>
                            </div>

                            <p>
                                <el-button type="primary"
                                           style="width: 100%"
                                           plain
                                           @click='handleSelect(item.ios_app, item)'>
                                    <i class="el-icon-appios"></i> {{item.ios_app ? item.ios_app.version :"----"}}
                                </el-button>
                            </p>
                            <p>
                                <el-button type="success"
                                           style="width: 100%"
                                           plain
                                           @click='handleSelect(item.android_app, item)'>
                                    <i class="el-icon-appandroid"></i> {{item.android_app ? item.android_app.version: "----"}}
                                </el-button>
                            </p>

                            <p>
                                <el-popover
                                    ref="popover2"
                                    placement="right"
                                    title="线上包地址"
                                    width="250"
                                    trigger="click">

                                    <qriously :value="item.qrcode" :size="220" />
                                    <el-button style="width: 100%" @click='copyClipboard(item)'>拷贝地址</el-button>
                                    <el-button slot="reference"
                                               style="width: 100%">
                                        <i class="el-icon-share"></i>线上发布包
                                    </el-button>

                                </el-popover>
                            </p>

                            <p>

                                <el-row aria-colspan="1">
                                    <el-col :span="11">
                                        <el-tooltip class="item" effect="dark" content="下载页面配置列表" placement="top">
                                            <el-button type="info"
                                                       style="width: 100%"
                                                       plain
                                                       @click='handleDownloadSelect(item.android_app, item)'>
                                                <i class="el-icon-download"></i>下载页
                                            </el-button>
                                        </el-tooltip>
                                    </el-col>
                                    <el-col  :span="11" :offset="2">
                                        <el-tooltip class="item" effect="dark" content="邮件人员配置列表" placement="top">
                                            <el-button type="warning"
                                                       style="width: 100%"
                                                       plain
                                                       @click='handleEmailSelect(item.android_app, item)'>
                                                <i class="el-icon-message"></i>邮件
                                            </el-button>
                                        </el-tooltip>


                                    </el-col>
                                </el-row>

                            </p>
                            <!--<p>-->
                                <!--<el-button type="warning"-->
                                           <!--style="width: 100%"-->
                                           <!--plain-->
                                           <!--@click='handleEmailSelect(item.android_app, item)'>-->
                                    <!--<i class="el-icon-message"></i>邮件人员配置-->
                                <!--</el-button>-->
                            <!--</p>-->

                            <!--<div class='btnContainer'>-->
                                <!--<template v-if='isDivide'>-->
                                    <!--<el-button type="primary" plain @click='handleSelect(item.ios_app && item.ios_app.application_id)' :autofocus='item.ios_app && item.ios_app.application_id == applicationId'>ios</el-button>-->
                                    <!--<el-button type="success" plain @click='handleSelect(item.android_app && item.android_app.application_id)' :autofocus='item.android_app && item.android_app.application_id == applicationId'>Android</el-button>-->
                                <!--</template>-->
                                <!--<template v-else>-->
                                    <!--<el-button type="primary" plain @click='handleSelect(item.ios_app && item.ios_app.application_id)' :autofocus='item.ios_app && item.ios_app.application_id == applicationId'>select</el-button>-->
                                <!--</template>-->
                            <!--</div>-->

                        </el-card>
                    </el-col>
                </el-row>




            <!--</div>-->

        </div>

    </div>
</template>

<script>
    // 此组件  用来做过滤条件  做成纯组件 不含业务逻辑
    // 有两种情况 会调用此组件  1 nav导航 跳转的的选择产品页  2 当前列表页 点击选择按钮出现的产品页

    import ElRow from "element-ui/packages/row/src/row";
    import ElCol from "element-ui/packages/col/src/col";

    export default {
        components: {
            ElCol,
            ElRow

        },
        name: 'productGroup',
        data() {
            return {
                group:[],
                visible:true
            }
        },
        props:{
            appList: { // 产品
                type: Array,
                require: true,
                default() {
                    return []
                }
            }
        },
        computed: {
        },
        created() {
            // 此周期内 可以做数据处理
            this.initData();
        },
        mounted() { window.vm = this;
        },
        methods: {

            initData() {
                this.group = this.appList;
            },
            handleSelect(data, item) {

                if (data == null) {
                    this.$message({
                        showClose: true,
                        message: '不存在数据',
                        type: 'error'
                    });
                    return;
                }

                this.$emit('handleSelectFn',{
                    application_id:data.application_id,
                    time:data.time,
                    version:data.version,
                    group_name:item.group_name,
                    group_type:item.group_type,
                    type:"App"
                });
            },

            handleDownloadSelect(data, item) {

                if (data == null) {
                    this.$message({
                        showClose: true,
                        message: '不存在数据',
                        type: 'error'
                    });
                    return;
                }

                this.$emit('handleSelectFn',{
                    application_id:data.application_id,
                    time:data.time,
                    version:data.version,
                    group_name:item.group_name,
                    group_type:item.group_type,
                    type:"Download"
                });
            },

            handleEmailSelect(data, item) {

                if (data == null) {
                    this.$message({
                        showClose: true,
                        message: '不存在数据',
                        type: 'error'
                    });
                    return;
                }

                this.$emit('handleSelectFn',{
                    application_id:data.application_id,
                    time:data.time,
                    version:data.version,
                    group_name:item.group_name,
                    group_type:item.group_type,
                    type:"Email"
                });
            },
            handleDeleteSelect(item) {

                if (item == null) {
                    this.$message({
                        showClose: true,
                        message: '不存在数据',
                        type: 'error'
                    });
                    return;
                }

                this.$emit('handleDeleteSelectFn',{
                    group_type:item.group_type,
                });
            },

            handleDistributionSelect(item) {
                if (item == null) {
                    this.$message({
                        showClose: true,
                        message: '不存在数据',
                        type: 'error'
                    });
                    return;
                }

                this.$emit('handleDeleteSelectFn',{
                    group_type:item.group_type,
                });
            },
            copyClipboard(item) {

                let that = this;
                this.$copyText(item.qrcode).then(function (e) {

                    that.$message({
                        showClose: true,
                        message: '拷贝成功',
                        type: 'success'
                    });

                }, function (e) {
                    that.$message({
                        showClose: true,
                        message: '拷贝失败,需手动访问:' + item.qrcode,
                        type: 'error'
                    });
                })

            }
        },
    }
</script>

<style lang='less' type="text/less" scoped>

    .productsContainer {
        width:100%;
        position:relative;
        .tips {
            margin-top:20px;
        }
        .wrapper {

            display: -webkit-flex;
            /*display:flex;*/
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;

            width:100%;
            margin-top: 15px;
            z-index:99;
            /*background:yellow;*/
            .card {

                -webkit-flex: 1;
                -ms-flex: 1;
                flex:1;
                -webkit-box-flex: 1 ;
                -moz-box-flex: 1;
                /*background-color: red;*/
                padding-bottom: 10px;
                width: 250px;
                .image {
                    display: block;
                    width: 100px;
                    height: 100px;
                    margin: 0 auto;
                }
                .btnContainer {
                    margin-top:10px;
                    text-align:center;
                }
                p {
                    padding:5px;
                    text-align:center;
                    /*background: #909399;*/
                    color:#FFF;
                    &:first-of-type {
                        margin-top:10px;
                    }
                }
            }
        }
    }

    .active-ios {
        color: #fff;
        background-color: #409EFF;
        border-color: #409EFF;
    }
    .active-android {
        color: #fff;
        background-color: #67c23a;
        border-color: #67c23a;
    }
    .qrcode {
        display: inline-block;
        img {
            width: 132px;
            height: 132px;
            background-color: #fff; //设置白色背景色
            padding: 6px; // 利用padding的特性，挤出白边
        }
    }

</style>
