<template>

    <div>
        <WebPagesButtonGroup ref="group"
                             name="网页类型"
                             type="Group"
                             :listdata="groupData"
                             @handleSelectFn='_callbackButtonGroupSelected'
                             @handleAddSelectFn='_callbackAddSelectFn'
                             @handleDeleteFn="_callbackDeletedFn"></WebPagesButtonGroup>

        <WebPagesAddGroupDialog @handleAddGroupSuccessFn='_callbackAddGroupSuccess'
                                ref="groupDialog"></WebPagesAddGroupDialog>

        <WebPagesAddHtmlDialog :group='groupSelectedItem'
                               @handleAddProductHtmlSuccessFn='_callbackAddProductHtmlSuccess'
                               ref="productHtmlDialog">

        </WebPagesAddHtmlDialog>
    </div>

</template>

<script>
import {getWebPagesType, deleteWebPagesType} from '@/api/getWebPagesData'

import WebPagesButtonGroup from './WebPagesButtonGroup'
import WebPagesAddHtmlDialog from './WebPagesAddHtmlDialog'
import WebPagesAddGroupDialog from './WebPagesAddGroupDialog'

export default {
    name: 'WebPagesButtonGroupCascade',
    data() {
        return {
            loading: true,
            groupData: [],
            //所在组
            groupSelectedItem: null,
        }
    },

    props: [],

    computed: {},
    created() {
        // 判断是否请求数据
        this._getWebPagesTypeData();
    },
    mounted() {

    },
    methods: {

        showHtmlDialog() {

            if (this.groupSelectedItem == null) {
                this.$message({
                    showClose: true,
                    message: '请先选择一个网页类型',
                    type: 'warning'
                });
                return;
            }
            this.$refs.productHtmlDialog.showDialog();
        },

        _cleanHtmlData() {
            this.$emit('handleResetTableDataFn');
        },

        _cleanWebPagesData() {
            this.groupData = [];
            this.groupSelectedItem = null;
            this.$refs.group.reset();
        },

        _callbackButtonGroupSelected(item) {

            let type = item.type;
            let data = item.item;

            this._cleanHtmlData();

            if (type == "Group") {
                this.groupSelectedItem = data;
                this.$emit('handleRefreshDataFn', {
                    tag: data.tag
                })
            } else {
                throw new Error("类型错误");
            }
        },

        //新增按钮回调
        _callbackAddSelectFn(item) {
            let type = item.type;

            if (type == "Group") {

                this.$refs.groupDialog.showDialog();

            } else {
                throw new Error("类型错误");
            }
        },

        // 删除按钮
        _callbackDeletedFn(item) {
            let type = item.type;

            if (type == "Group") {

                if (this.groupSelectedItem == null) {
                    this.$message({
                        showClose: true,
                        message: '请先选择一个网页类型',
                        type: 'warning'
                    });
                    return
                }

                this._alertConfirm(this._deleteWebPagesTypeData, this.groupSelectedItem.tag)

            } else {
                throw new Error("类型错误");
            }
        },

        //alert confirm
        _alertConfirm(method, param) {
            this.$confirm('是否继续删除操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                method(param);
            }).catch(() => {

            });
        },
        // 获取数据
        async _getWebPagesTypeData() {
            const res = await getWebPagesType();
            this.loading = false;
            console.log('res--', res);
            this.groupData = res.data;
        },

        _callbackAddGroupSuccess() {
            this._getWebPagesTypeData();
        },
        _callbackAddProductHtmlSuccess() {
            this.$emit('handleRefreshDataFn', this.groupSelectedItem);
        },

        // 删除数据
        async _deleteWebPagesTypeData(tag) {
            let _param = {
                tag: tag,
            };

            const res = await deleteWebPagesType(_param);
            console.log('res--', res);
            if (res.code == '200') {
                this._cleanHtmlData();
                this._cleanWebPagesData();
                this._getWebPagesTypeData();
            } else {
                this.$message(res.message);
            }
        },
    },
    components: {
        WebPagesButtonGroup,
        WebPagesAddGroupDialog,
        WebPagesAddHtmlDialog
    }
}
</script>

<style lang='less' type="text/less" scoped>

</style>
