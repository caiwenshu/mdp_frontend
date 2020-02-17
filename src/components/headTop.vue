<template>
    <div class="header_container">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item,index) in $route.meta" :to="{path : item.path}" :key='index'>{{item.title}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-tooltip class="item" effect="dark" content="select app" placement="top-start">
			<el-button type='primary' round @click='toSelect'>SELECT</el-button>
		</el-tooltip>
		<el-tooltip class="item" effect="dark" content="add app" placement="top-start">
			<el-button type='primary' round @click='toAdd'>ADD</el-button>
		</el-tooltip>
		<el-dropdown @command="handleCommand" menu-align='start'>
			<img :src="baseImgPath" class="avator">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="home">首页</el-dropdown-item>
				<el-dropdown-item command="singout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>
	import {removeStore} from '../config/mUtils'
	import {signout} from '@/api/getData'
	import {mapActions, mapState} from 'vuex'

    export default {
    	data(){
    		return {
    			baseImgPath:require('../assets/img/default.jpg'),
    		}
    	},
    	created(){
    		// if (!this.adminInfo.id) {
    		// 	this.getAdminData()
    		// }
			window.vm = this;
    	},
		props:['flag'],
    	computed: {
    		...mapState(['adminInfo']),
    	},
		methods: {
			...mapActions(['getAdminData']),
			async handleCommand(command) {
				if (command == 'home') {
					this.$router.push('/manage');
				}else if(command == 'singout'){
					// const res = await signout()
					// if (res.status == 1) {
					// 	this.$message({
	                //         type: 'success',
	                //         message: '退出成功'
	                //     });
	                //     this.$router.push('/');
					// }else{
					// 	this.$message({
	                //         type: 'error',
	                //         message: res.message
	                //     });
					// }
					removeStore('adminInfo');
					this.$message({
						type: 'success',
						message: '退出成功',
					});
					this.$router.push('/');
				}
			},
			toSelect() {
				console.log('this flag--',this.flag);
				this.$router.push(this.flag);
			},
			toAdd() {
				this.$router.push('/detail');
			}
		}
    }
</script>

<style lang="less" type="text/less">
	@import '../style/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>
