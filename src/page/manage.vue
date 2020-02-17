<template>

    <el-container style="height: 100%">
        <el-header style="align-items: center;  background-color: white; line-height: 1px; border-color: #dcdcdc ;border-bottom-style: solid; border-bottom-width:1px">

            <el-row>
                <el-col :span="10" style="padding-top: 25px">
                    Mobile Distribution Platform
                </el-col>
                <el-col :span="14"  style="text-align: right;padding-right: 10px;padding-top: 10px">
                        <el-button @click="logout">退出登录</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-container >
            <el-aside width="200px" style='height:100%;' >

                <el-menu unique-opened :default-active="$route.path" class="el-menu-vertical-demo" style='height:100%;' router >
                    <template  v-for="(item , index) in menu" v-if="item.meta.menuShow">
                        <el-submenu :index="item.path" v-if="item.children && item.children.length > 1">
                            <template slot="title">
                                {{item.meta.menuName}}
                            </template>
                            <el-menu-item v-for="(itemChild , index) in item.children" :index="itemChild.path" :key="index" v-if="itemChild.meta.menuShow">
                                <span>{{itemChild.meta.menuName}}</span>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item :index="item.path" v-else>
                            {{item.meta.menuName}}
                        </el-menu-item>
                    </template>
                </el-menu>


                <!--<el-menu unique-opened :default-active='defaultActive'   class="el-menu-vertical-demo" style='height:100%;' router>-->
                    <!--<el-menu-item index='/'><i class='el-icon-menu'></i>首页</el-menu-item>-->
                    <!--<el-submenu index='2'>-->
                        <!--<template slot='title'><i class='el-icon-document'></i>ALPS</template>-->
                        <!--<el-menu-item index='/product'>产品</el-menu-item>-->
                        <!--&lt;!&ndash;<el-menu-item index='productList' >产品列表</el-menu-item>&ndash;&gt;-->
                        <!--<el-menu-item index='/manage/downloadList' >app下载页列表</el-menu-item>-->
                        <!--<el-menu-item index='/manage/emailList' >邮件配置列表</el-menu-item>-->
                        <!--<el-menu-item index='/manage/upload' >文件上传</el-menu-item>-->
                    <!--</el-submenu>-->
                    <!--<el-submenu index='3'>-->
                        <!--<template slot='title'><i class='el-icon-plus'></i>添加数据</template>-->
                        <!--<el-menu-item index='SMproduct'>ADD APP</el-menu-item>-->
                        <!--<el-menu-item index='SMproduct'>ADD 邮件人员配置</el-menu-item>-->
                        <!--<el-menu-item index='SMproduct'>ADD 下载页面配置</el-menu-item>-->
                    <!--</el-submenu>-->
                <!--</el-menu>-->

            </el-aside>
            <el-container  style='height:100%;'>
                <main style="width: 100%">
                    <BreadCrumb></BreadCrumb>
                    <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
                        <!--<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
                        <!--<el-breadcrumb-item>活动管理</el-breadcrumb-item>-->
                        <!--<el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
                        <!--<el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
                    <!--</el-breadcrumb>-->
                    <router-view></router-view>
                </main>
            </el-container>
        </el-container>
    </el-container>



</template>

<script>

    // 在此组件中 将产品组数据 请求到
    import ElRow from "element-ui/packages/row/src/row";
    import BreadCrumb from "../components/BreadCrumb.vue"
    import {cleanToken} from '../config/mUtils'
    import ElCol from "element-ui/packages/col/src/col";
    export default {
        components: {
            ElCol,
            ElRow,BreadCrumb},
        data() {return{
            menu:[]
        }},
        computed: {
            defaultActive: function() {
                let _index = '';
                let _path = this.$route.path;
                _index = _path && _path.split('/')[1];
                _index = _index.split('?')[0];

                return _index;
            },
            list () {
                return this.$route.matched
            },
            menu_item_path(itemChild, item) {
                if (itemChild.path == null || itemChild.path == "") {
                    return item.path;
                }
                return itemChild.path;
            }
        },
        created() {
            this.$store.dispatch('getAdminGroup');
            this.getRoutes();

        },
        methods: {
            logout(){
                cleanToken();
                this.$router.push('/login');
            },
            getRoutes() {
                var route = this.$router.options.routes;
                this.menu = route[0].children;
                console.log(route[0]);
            }
        }

    }
</script>

<style lang='less' scoped>
    @import '../style/mixin';
    .manage_page {
        .el-submenu {
            .el-menu-item {
                background-color:#1f2d3d!important;
            }
        }

        .header {
            background-color: #ff6600;
            position:fixed;
            z-index:999;
            height: 55px;
            top: 0;
            left: 0;
            right: 0;
        }
        .ms-title{
            width:100%;
            height: 60px;
            background-color: rgb(50, 65, 87);
            box-shadow: 4px 4px 4px;
            text-align: left;
            line-height: 60px;
            padding-left: 24px;
            font-size:20px;
            color: #fff;
        }
    }

</style>
