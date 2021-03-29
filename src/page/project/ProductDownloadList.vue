<template>
    <div class='fillcontainer'>

        <div class='content'>
            <!--<search @searchFn='searchFn'></search>-->
            <el-row  type="flex">
                <el-col>
                    {{this.groupData.group_name}}
                    <el-button type="primary" @click="_handleAddDownload">新增</el-button>
                </el-col>
            </el-row>

            <div class='table_container'>
                <el-table
                    border
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    :highlight-current-row=true
                    @selection-change="handleSelectionChange"
                    style="width:100%"
                >
                    <el-table-column
                        prop='id'
                        label='ID'
                        width ='100'>
                    </el-table-column>
                    <el-table-column
                        prop='mobile_application_group'
                        label='所在组'
                        width='100'>
                    </el-table-column>
                    <el-table-column
                        prop='name'
                        label='名称'
                        width ='120'>
                    </el-table-column>
                    <el-table-column
                        prop='isDistribution'
                        label='发布版本'
                        align="center"
                        width='80'>
                        <template slot-scope='scope'>
                            <TrueFalseImage :status="scope.row.isDistribution"></TrueFalseImage>


                        </template>

                    </el-table-column>
                    <el-table-column
                        prop='url'
                        label='地址'
                        align='center'>
                    </el-table-column>

                    <el-table-column
                        fixed='right'
                        label='操作'
                        width='200'
                        align='center'
                    >
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="primary"
                            @click="preView(scope.$index, scope.row)">预览</el-button>
                            <el-button
                            size="mini"
                            type="Success"
                            @click="downloadFiles(scope.$index, scope.row)">下载</el-button>
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

        <ProductAddDownloadDialog :group_type="this.groupData.group_type"
                                  ref="productAddDownloadDialog"
                                  @handleAddProductDownloadSuccessFn="_callbackAddDownloadPageSuccess"></ProductAddDownloadDialog>
    </div>
</template>

<script>

    import {getDownloadList} from '@/api/getData'

    import TrueFalseImage from '../../components/TrueFalseImage'
    import ProductAddDownloadDialog from './ProductAddDownloadDialog'
    // import {baseImgPath} from '../config/env'
    // 下载页面列表
    export default {
        name: 'ProductDownloadList',
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

            groupType () {
                // 我们很快就会看到 `params` 是什么
                return this.$route.params.id
            },
        },
        created() {
            // 判断是否请求数据
            if(this.groupType) {
                this.getDownLoadData();
            }
        },
        mounted() {
        window.m=this;
        },
        watch: {

        },
        methods: {
            _handleAddDownload() {
                this.$refs.productAddDownloadDialog.showDialog();
            },

            async getDownLoadData() {
                let _param = {
                    pageNo: this.pageNo - 1,
                    pageSize: this.pageSize,
                    groupType: this.groupType,
                };

                const res = await getDownloadList(_param);

                console.log('res--',res);
                this.tableData = res.data.pages;
                this.groupData = res.data;
                this.total = res.total;
            },
            preView(index,row) { // 预览
                console.log('row--',row);
                let _url = row.url;
                window.open(_url,'_blank');

            },
            downloadFiles(index,row) { // 下载
                console.log("点击了下载")
                let _url = row.path;
                window.open(_url,'_blank');
            },
            handleSelectionChange() {

            },
            handleSizeChange(val) {
                console.log(`每页${val}条`)
            },
            handleCurrentChange(val) {
                this.pageNo=val;
                this.getDownLoadData();
            },
            _callbackAddDownloadPageSuccess() {
                this.getDownLoadData();
            }
        },
        components:{TrueFalseImage,
            ProductAddDownloadDialog}
    }
</script>

<style lang='less' type="text/less" scoped>
    @import '../../style/mixin';
    .fillcontainer {
        padding:20px;
        position: relative;
        .table_container {
            margin-top:20px;
            .el-table {
                .cell {
                    white-space: pre;
                }
            }
        }

    }

</style>
