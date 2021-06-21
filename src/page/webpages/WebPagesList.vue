<template>
    <div class='container'>


        <div style="margin-top: 10px" v-loading.fullscreen.lock="tabsLoading">

            <WebPagesPane ref="WebPagesPane"></WebPagesPane>
        </div>


    </div>
</template>

<script>
import WebPagesPane from './WebPagesPane.vue'

export default {
    name: 'WebPagesList',
    data() {
        return {
            loading: true,
            tabsLoading: true,
            dialogLoading: false,
            groupData: [],
            dialogFormVisible: false,
            form: {
                name: '',
                type: ''
            },
        }
    },
    computed: {},
    created() {
        // 判断是否请求数据
        this.tabsLoading = false;
    },
    mounted() {

    },
    methods: {},
    components: {
        WebPagesPane,
    }
}
</script>

<style lang='less' type="text/less" scoped>
@import '../../style/mixin';

.container {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    width: 100%;
    padding-top: 5px;

    .table_container {
        margin-top: 10px;

        .el-table {
            .cell {
                white-space: pre;
            }
        }
    }

}

</style>
