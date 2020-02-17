<template>
    <div class='home_page fillcontain'>

        <el-row :gutter="16">
            <el-col :lg="6" :md="12">
                home

            </el-col>
            <el-col :lg="6" :md="12">
                home
            </el-col>
            <el-col :lg="6" :md="12">
                home
            </el-col>
            <el-col :lg="6" :md="12">
                home
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import ElRow from "element-ui/packages/row/src/row";
    import ElCol from "element-ui/packages/col/src/col";
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";

    export default {
        components: {
            ElButton,
            ElCol,
            ElRow}

    }
</script>
<style lang='less' scoped>
    @import '../style/mixin';
    .home_page {}
</style>
