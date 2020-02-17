<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>MMP</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm" >
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password" @keyup.enter.native="submitForm('loginForm')"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
				  	</el-form-item>
				</el-form>
				<p class="tip">Mobile Management Platform(admin)</p>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	import {getStore} from '../config/mUtils'
	import {login, getAdminInfo} from '@/api/getData'
	import {mapActions, mapState,getters} from 'vuex'

	export default {
		name:'login',
	    data(){
			return {
				loginForm: {
					username: '',
					password: '',
				},
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
			}
		},
		created() {
			let _adminInfo = getStore('adminInfo');
			let _token = _adminInfo && _adminInfo.token;

			if(_token === '031f347732bc55d5f36a56bbe2a3fcdbeee77796') {
				this.$router.push('manage')
			}
		},
		mounted(){
			this.showLogin = true;
			// 调取用户信息  如果存在sessionId  --cookie中 则直接跳转

			// 调取登陆接口后 后台在响应头中 setCookie  sessionId

			// 下次再进入登陆页 先获取用户信息 只要cookie中有值 就会带在请求头中 后天读取到 sessionId  就给前端返回用户信息
		},
		computed: {
			...mapState(['adminInfo']),
		},
		methods: {
			async submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						const res = await login({username: this.loginForm.username, password: this.loginForm.password})
						if (res.code == 200) {
							this.$message({
		                        type: 'success',
		                        message: '登录成功'
		                    });
							// Cookies.set('Token', response.data.token) //登录成功后将token存储在cookie之中
							this.$store.commit('GET_ADMININFO',res.data);
							this.$router.push('/');
						}else{
							this.$message({
		                        type: 'error',
		                        message: res.message || '登陆失败'
		                    });
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
					}
				});
			},
		},
		watch: {
			adminInfo: function (newValue){
				if (newValue.id) {
					this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
					this.$router.push('manage')
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background-color: #324057;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -80px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
