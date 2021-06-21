<template>

    <div>
        <el-row style="margin-top: 8px">
            <el-col :span="4">
                <div class="el-form-item__label">筛选条件</div>
            </el-col>
        </el-row>
        <WebPagesButtonGroupCascade ref="groupcascade"
                                      @handleRefreshDataFn="handleRefreshData"
                                      @handleResetTableDataFn="_callbackResetTableData"></WebPagesButtonGroupCascade>

        <el-row style="margin-top: 8px; ">
            <el-col :span="10">
                <div class="el-form-item__label">访问地址:</div>
                <div class="el-form-item__label" style="color: #cf9236">http://{domain}/webpages/index.html?type={网页类型}</div>
            </el-col>
        </el-row>

        <el-row style="margin-top: 8px">

            <el-col :span="4">
                <div class="el-form-item__label">Html列表</div>
            </el-col>
            <el-col :span="20">
                <el-button icon="el-icon-plus"
                           type="success" size="medium" style="float: right"
                           @click='handleAddProductHtml'
                >新增Html</el-button>
            </el-col>
        </el-row>
        <div class='table_container'>
            <el-table
                border
                v-loading="loading"
                ref="multipleTable"
                :data="tableData"
                stripe
                tooltip-effect="dark"
                :highlight-current-row=true
            >
                <el-table-column
                    prop='id'
                    label='ID'
                    width ='50'>
                </el-table-column>
                <el-table-column
                    prop='desc'
                    label='描述'
                    width ='150'>
                </el-table-column>
                <el-table-column
                    label='发布版本'
                    width='100'>
                    <template slot-scope='scope'>
                        <TrueFalseImage :status="scope.row.isDistribution"></TrueFalseImage>
                    </template>
                </el-table-column>

                <el-table-column
                    prop='url'
                    label='访问地址'
                    fixed="right">
                </el-table-column>
                <el-table-column
                    prop='createTime'
                    label='创建时间'
                    align='center'
                    width ='180'>
                </el-table-column>
                <el-table-column
                    border
                    fixed="right"
                    label='操作'
                    width='290'
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
                            @click="download(scope.$index, scope.row)" :disabled="scope.row.downloadUrl == null">下载</el-button>
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

</template>

<script>
import {getWebPagesHtmlList} from '@/api/getWebPagesData'
import WebPagesButtonGroup from './WebPagesButtonGroup'
import TrueFalseImage from '../../components/TrueFalseImage'
import WebPagesButtonGroupCascade from './WebPagesButtonGroupCascade'
import ElContainer from "../../../node_modules/element-ui/packages/container/src/main.vue";
import ElMain from "../../../node_modules/element-ui/packages/main/src/main.vue";
import ElCol from "element-ui/packages/col/src/col";

export default {
    name: 'WebPagesPane',
    data() {
        return {
            loading: false,
            selectedTag: "",
            tableData:[],
            pageSize:10,
            pageNo:1,
            total:0,
        }
    },

    props:[
        'group'
    ],

    computed: {

        applicationId () {
            // 我们很快就会看到 `params` 是什么
            return this.$route.params.id
        },

        currentApp() {

            console.log('路由参数',this.$route.query);

            let _name = this.applicationId
            console.log(_name)
            return '您当前选择的产品是' + _name
        }
    },
    created() {

    },
    mounted(){

    },
    methods: {

//            handleGroupSelect() {
//                this.loading = false;
//                this.$refs.groupcascade.handleGroupSelect();
//            },

        _resetTableData() {
            this.tableData = [];
            this.pageSize = 10;
            this.pageNo = 1;
            this.total = 0;
        },

        // 获取数据
        async _getWebPagesHtmlData(tag) {
            let _param = {
                pageNo: this.pageNo - 1,
                pageSize: this.pageSize,
                tag: tag,
            };

            const res = await getWebPagesHtmlList(_param);
            this.loading = false;
            console.log('res--',res);
            this.tableData = res.data;
            this.total = res.total;

        },
        preView(index,row) { // 预览
            console.log('row--',row);
            let _url = row.url;
            window.open(_url,'_blank');
        },
        download(index,row) { // 上传
            let _url = row.downloadUrl;
            if (_url != null) {
                window.open(_url,'_blank');
            } else {
                this.$message.error("不存在下载地址")
            }

        },
        handleSizeChange(val) {
            console.log(`每页${val}条`)
        },
        handleCurrentChange(val) {
            this.pageNo=val;
            let id =  this.selectedTag;
            this._getWebPagesHtmlData(id);
        },

        handleRefreshData(item) {
            this.selectedTag = item.tag;
            this.loading = true;
            this._getWebPagesHtmlData(this.selectedTag)
        },
        _callbackResetTableData() {
            this._resetTableData();
        },
        handleAddProductHtml() {
            this.$refs.groupcascade.showHtmlDialog();
        }
    },
    components:{
        ElCol,
        ElMain,
        ElContainer,
        WebPagesButtonGroup,
        TrueFalseImage,
        WebPagesButtonGroupCascade
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
