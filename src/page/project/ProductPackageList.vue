<template>
    <div class='fillcontainer'>

        <div class='content'>
            <!--<head-top :flag= 'flag'></head-top>-->
            <!--<search @searchFn='searchFn'></search>-->

            <el-row  type="flex">
                <el-col>
                    {{this.groupData.group_name}}
                    <el-tag type="primary" v-if="this.groupData.platform == 'iOS'"><i class="el-icon-appios"></i></el-tag>
                    <el-tag type="success" v-if="this.groupData.platform == 'Android'"><i class="el-icon-appandroid"></i></el-tag>
                </el-col>
                <!--<el-alert-->
                <!--:title="currentApp"-->
                <!--description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……"-->
                <!--type="success"-->
                <!--style="margin-top: 10px; width: 50%"-->
                <!--:closable="false">-->
                <!--</el-alert>-->
            </el-row>


            <div class='table_container'>
                <el-table
                    border
                    v-loading="loading"
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    :highlight-current-row=true
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        prop='id'
                        label='ID'
                        width ='100'>
                    </el-table-column>
                    <el-table-column
                        prop='bundle_identifier'
                        label='bundle_identifier'
                        width ='250'>
                    </el-table-column>
                    <el-table-column
                        label='强制上线'
                        width ='100'>
                        <template slot-scope='scope'>
                            <TrueFalseImage :status="scope.row.forceOnline"></TrueFalseImage>


                        </template>
                    </el-table-column>
                    <el-table-column
                        label='历史版本'
                        width='100'>
                        <template slot-scope='scope'>
                            <TrueFalseImage :status="scope.row.historyDistribution"></TrueFalseImage>


                        </template>
                    </el-table-column>
                    <el-table-column
                        label='发布版本'
                        width='100'>
                        <template slot-scope='scope'>
                            <TrueFalseImage :status="scope.row.isDistribution"></TrueFalseImage>

                        </template>
                    </el-table-column>
                    <el-table-column
                        label='预发布版本'
                        width='100'>
                        <template slot-scope='scope'>
                            <TrueFalseImage :status="scope.row.isPreDistribution"></TrueFalseImage>

                        </template>
                    </el-table-column>
                    <el-table-column
                        label='是否推送'
                        width='100'>
                        <template slot-scope='scope'>
                            <TrueFalseImage :status="scope.row.isSendRemoteServer"></TrueFalseImage>

                        </template>
                    </el-table-column>
                    <el-table-column
                        prop='name'
                        label='APP名称'
                        width ='90'>
                    </el-table-column>
                    <el-table-column
                        prop='serverVersion'
                        label='版本号'
                        width ='90'>
                    </el-table-column>
                    <el-table-column
                        prop='size'
                        label='包大小'
                        width='100'>
                    </el-table-column>
                    <el-table-column
                        prop='createTime'
                        label='createTime'
                        width ='180'>
                    </el-table-column>
                    <el-table-column
                        border
                        fixed="right"
                        label='操作'
                        width='300'
                        align='center'
                    >
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="preView(scope.$index, scope.row)">预览</el-button>
                            <!--<el-button-->
                                <!--size="mini"-->
                                <!--type="Success"-->
                                <!--@click="upload(scope.$index, scope.row)">上传</el-button>-->
                            <el-button
                                size="mini"
                                type="danger"
                                @click="sendMessage(scope.$index, scope.row)">发送邮件</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class='Pagination' style='text-align: left;margin-top: 10px;'>
                    <el-pagination
                        :total='total'
                        :page-size='pageSize'
                        :current-page='pageNo'
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        layout='total, prev, pager, next'
                    >

                    </el-pagination>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import {getProductList} from '@/api/getData'

    import {mapActions, mapState,mapGetters} from 'vuex'
    import TrueFalseImage from '../../components/TrueFalseImage'
    // import {baseImgPath} from '../config/env'

    export default {
        name: 'ProductPackageList',
        data() {
            return {
                loading: true,
                tableData:[],
                groupData:{},
                pageSize:10,
                pageNo:1,
                total:0,
            }
        },
        computed: {

            applicationId () {
                // 我们很快就会看到 `params` 是什么
                return this.$route.params.id
            },

//            selected_data() {
//                return this.$route.data
//            },

//            ...mapGetters(['adminInfo','group','applicationId']),
            // isShow: {
            //     get() {
            //         console.log('applicationId--',this.applicationId);
            //         return !this.applicationId
            //     },
            //     set(val) {
            //         return val
            //     }
            // }
            currentApp() {

                console.log('路由参数',this.$route.query);

//                let _name = this._getCurApp(this.group,this.applicationId);
                let _name = this.applicationId
                console.log(_name)
                return '您当前选择的产品是' + _name
            }
        },
        created() {
            // 判断是否请求数据
            if(this.applicationId && !this.tableData.length) {
                this.getProductData();
            }
            // 判断是否显示过滤产品组件
            if(this.$route.query && this.$route.query.source == 'select') {
                this.isShow = false
            }
        },
        mounted(){

        },
        watch: {
            'applicationId': function(val) {
                this.isShow = false;
                this.getProductData();
            },
            'isShow': function(val) {
                if(!val) {
                    this.getProductData();
                }
            }
        },
        methods: {
            /**
             * get 当前选择的app
             */
            _getCurApp(list,id) {
                if(!list || !list.length) {return}
                let _currentApp = '';
                list.forEach((item,index) => {
                    if(item.ios_app && item.ios_app.application_id == id) {
                        if(this.isDivide) {
                            _currentApp = '  <'+  item.group_name + '--ios>'
                        } else {
                            _currentApp = '  <'+  item.group_name + '> '
                        }

                    } else if(item.android_app && item.android_app.application_id == id) {
                        if(this.isDivide) {
                            _currentApp = '  <'+ item.group_name + '--android>'
                        }else {
                            _currentApp = '  <'+ item.group_name + '> '
                        }
                    }
                })
                return _currentApp;
            },
            handleSelect(id) {
                console.log('当前选择的产品种类--',id);
                this.isShow = false;
                // this.applicationId = id;
                this.$store.commit('SELECT_IOS_ANDROID',id)
            },
            async getProductData() {
                let _param = {
                    pageNo: this.pageNo - 1,
                    pageSize: this.pageSize,
                    applicationId: this.applicationId,
                };

                const res = await getProductList(_param);
                this.loading = false;
                console.log('res--',res);
                this.tableData = res.data.apps;
                this.groupData = res.data;
                this.total = res.total;

            },

            searchFn(keyword) {
                console.log('搜索条件',keyword);

                // ajax 数据
            },
            getCellClass({row, column, columnIndex}) { // 获取当前cell className

            },
            handleSelectionChange() {

            },
            preView(index,row) { // 预览

                console.log('row--',row);
                let _url = row.app_preview_link;
                this.$router.push("")
                window.open(_url,'_blank');

            },
//            upload(index,row) { // 上传
//                let _url = row.upload_link;
//                window.open(_url,'_blank');
//            },
            sendMessage(index,row) { // 发送邮件
                let _url = row.app_send_email;
                window.open(_url,'_blank');
            },
            handleSizeChange(val) {
                console.log(`每页${val}条`)
            },
            handleCurrentChange(val) {
                this.pageNo=val;
                this.getProductData();
            }
        },
        components:{
            TrueFalseImage,
        }
    }
</script>

<style lang='less' type="text/less" scoped>
    @import '../../style/mixin';
    .fillcontainer {
        padding-left:10px;
        padding-right: 10px;
        padding-bottom: 10px;
        width: 100%;
        padding-top: 5px;
        .table_container {
            margin-top:10px;
            .el-table {
                .cell {
                    white-space: pre;
                }
            }
        }

    }

</style>
