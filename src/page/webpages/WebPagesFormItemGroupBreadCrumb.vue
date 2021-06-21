<template>

    <el-form-item label="所属" label-width="120px">

        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:13px">
            <el-breadcrumb-item v-if="this.group">{{this.group_name}}<i style="color: #2299dd">({{this.group_type}})</i></el-breadcrumb-item>
        </el-breadcrumb>
    </el-form-item>

</template>

<script>

    export default {
        name: 'WebPagesFormItemGroupBreadCrumb',
        data() {
            return {
            }
        },

        props:[
            "group",
        ],

        computed: {
            group_name() {
                return this.group ?  this.group.name: "-";
            },
            group_type() {
                return this.group ?  this.group.tag: "-";
            },
        },
        created() {
        },
        mounted(){

        },
        methods: {
        },
        components:{
        }
    }
</script>

<style lang='less' type="text/less" scoped>

</style>
