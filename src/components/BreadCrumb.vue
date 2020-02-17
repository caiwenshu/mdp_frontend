<template>
    <div class="header_container">
        <el-breadcrumb separator-class="el-icon-arrow-right">

            <el-breadcrumb-item v-for="(bread,index) in breadList" :key="index">

                <span v-if="index==breadList.length-1" class="no-redirect">{{
                    bread.name }}</span>

                <a v-else @click.prevent="handleLink(bread)">{{ bread.name }}</a>

                <!--<a  v-else :href="bread.path">{{ bread.name }}</a>-->

            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    import pathToRegexp from 'path-to-regexp'

    export default {
        components: {},
        data() {
            return {
                breadList:[],
                breadsName:{
                    '1': 'title1',
                    '1-1': 'title1-1',
                    '1-2': 'title1-2',
                    '1-3': 'title1-3',
                }
            }
        },

        computed: {

            getBreadList:function() {
                this.breadList = []
                for (const routeInfo of this.$route.matched) {
                    if (routeInfo.meta.hidden == true) {

                    } else {
                        this.breadList.push(routeInfo);
                    }


//                    if (typeof routeInfo.name === 'string' && routeInfo.name !== '首页' ) {
//
//                    }
                }
            }


        },
        methods: {
            pathCompile(path) {
                // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
                const { params } = this.$route
                var toPath = pathToRegexp.compile(path)
                return toPath(params)
            },
            handleLink(item) {
                if (item.redirect) {
                    this.$router.push(item.redirect)
                    return
                }
                this.$router.push(this.pathCompile(item.path))
            }
        },
        watch: {
            '$route': function(val) {
                this.getBreadList
            },
        },
        created() {
            this.getBreadList;
        },

    }
</script>

<style lang="less" type="text/less" scoped>
    @import '../style/mixin';
    .header_container{
        background-color: #EFF2F7;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
    }
    .no-redirect {
        color: #97a8be;
        cursor: text;
    }

</style>
