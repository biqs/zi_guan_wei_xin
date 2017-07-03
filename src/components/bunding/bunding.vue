<template>
	<div class="bunding">
		
	 	<header class="top-logo">
	 		<div class="table">
	 			 
	 				<img src="./images/logo@3x.png">
	 			    <p class="name">华泰资管</p>
	 			 
	 		</div>
	 	</header>
	 	<section class="center-content">
	 		<div class="form-box">
	 		<div class="item">
	 			<div class="label"><label>证件类型</label></div>
	 			<div class="identity-type auto"><span v-text='identity'></span></div>
	 			<div class="btn" @click='showIdentity'><img src="./images/down.png"></div>	
	 		</div>
	 		<div class="item">
	 			<div class="label"><label>证件号码</label></div>
	 			<div class="auto"><input type="text" class="identity-code" name="identity-code" placeholder="请输入证件号码" v-model='identityNum' @focus='scrollView($event)' /></div>
	 			
	 		</div>
	 		<div class="item">
	 				<div class="label"><label>手机号码</label></div>
	 				<div class="auto"><input type="number" name="phone-num" placeholder="请输入手机号码" maxlength="11" v-model='phoneNum'   @focus='scrollView($event)'/></div>
	 		
	 		</div>
	 		<div class="item">
	 		 	<div class="label"><label>图形验证码</label></div>
				<div class="img-1"><input class="img-code" type="text" name="" placeholder="图形验证码" maxlength="4" v-model='imgCode' @focus='scrollView($event)' /></div>
				<div class="img-2">
					<img class="img-btn" :src="src" @click='loadImgCode'/>
				</div>
	 		</div>
	 		<div class="item">
	 			<div class="label"><label>短信验证码</label></div>
	 			<div class="msg-1"><input class="msg-code" type="text" name="" placeholder="短信验证码"v-model='msgCode' @focus='scrollView($event)' /></div>
	 			<div class="msg-2">	
	 					<div class="msg-btn" @click='getMsgCode' v-text='msgCodeInfo'></div>
	 			</div>
	 			
	 		</div>
	 		
	 		</div>
       
	 	</section>
	 	<footer class="footer">
	 		<p class="info">
	 		<img src="./images/phone.png"/>华泰证券资管客服电话 <a class="tel" href="tel:95597">95597</a> </p>
	 		<button type="button" class="bund-btn" @click='bind'>绑定</button>
	 		 
	 	</footer>
	 	<alert-msg :isOpen='infoOpen' :info='info' @close='infoOpen=false'></alert-msg>
	 	<alert-id :isOpen='isOpen' @close='isOpen = false' @ok='getIdentity'></alert-id>
	 	<confirm :isOpen='isUnbindOpen'  @close='closeConfirm' :nickName='otherNickName'></confirm>

	</div>
</template>
<script type="text/javascript">
    import alertId from 'components/dialog/alertIdentity'; 
    import alertMsg from 'components/dialog/alertMsg'; 
    import confirm from 'components/dialog/unbindConfirm';
    import { Bunding } from 'src/common/js/config';
    import { required, minLength, maxlength } from 'vuelidate/lib/validators';
    import { Certificates ,OpenId} from 'src/common/js/global';
    import { IdentityCodeValid } from 'src/common/js/unit';
	export default{
		name:'bunding',
		data(){
			return{
				src: Bunding.getImgCode,  //获取图形验证码
				isOpen:false,           //证件弹框
				identity:'身份证',     //证件name
				identityCode:'103100', //证件Code
				identityNum :'', //证件号码
				phoneNum:'',  //手机号
				imgCode:'',  //图形验证码
				msgCode:'', //短信验证码
				msgCodeInfo:'获取验证码',  //短信验证码
				msgCodeFlag:true,
				info:'',  //输入提示信息
				infoOpen:false, //输入提示是否打开
				openId:'',
				isUnbindOpen: false,
				otherOpenId: '',
				otherEcifId:'',
				otherNickName:''
			}
		},
		validations: {
			identityNum:{required},
			phoneNum:{ 
				required,
				minLength:minLength(11)
			},
			imgCode:{required},
			msgCode:{required}
		},
		components:{
			alertId, alertMsg,confirm
		},
		mounted(){	
			//this.$ServerInfo.open('');		  
		},
		methods:{
			scrollView(e){
                setTimeout(function(){
                	if(e.target.scrollIntoViewIfNeeded){	
                		e.target.scrollIntoViewIfNeeded();
                	}
                	
                },400)
				
			},

			clear(){
				sessionStorage.OPNEID =''
			}
			,
			showIdentity(){
				this.isOpen = true;	  //证件类型弹出框	
			},
			getIdentity(value){
				this.identity = value;
				this.identityCode = Certificates.getCode(value);
				this.isOpen = false;
			},
			getMsgCode(){

				this.testIdentity()
                if(this.infoOpen) return;

                this.testPhone()
                if(this.infoOpen) return;      
                
                this.testImgCode()
                if(this.infoOpen) return;
				
				if(this.msgCodeFlag){
			        this.msgCodeFlag = false; //上锁					
					let  _this = this;
					let int
					this.axios.get(Bunding.getMsgCode,{ 
						params:{
							idType: this.identityCode,
							idNo : this.identityNum,
							mobileNo : this.phoneNum,
							imageCode : this.imgCode
					   }
					}).then((response)=>{
						if(response.data.flag.code==0){
							    let counts = 60;  // 一分钟发一次
						        int = setInterval(function(){
									_this.msgCodeInfo =  counts  -- + '' + "s"; 
									if(counts == 0){
										_this.msgCodeFlag = true; //解锁
										_this.msgCodeInfo = '重新获取';
										clearInterval(int);
										
									}
						        },1000);
						}else if(response.data.flag.code==1){   //验证码错误
						 	_this.msgCodeFlag = true; //解锁
						 	this.loadImgCode(); 
							clearInterval(int);
							_this.msgCodeInfo = '获取验证码';
							this.infoOpen = true;
							this.info ='您输入图形验证码有误！'	

						}else{
							_this.msgCodeFlag = true;  //解锁
							this.loadImgCode(); 
							this.infoOpen = true;
							this.info = response.data.flag.msg;	 
						}
					}).catch(function(){
						this.loadImgCode(); 
						_this.msgCodeFlag = true;  
						_this.infoOpen = true;
					    _this.info ='系统错误！'
					});
				}
						
			},
			loadImgCode(){  
				/*点击获取图形验证码*/
				this.src = Bunding.getImgCode + '?_dt=' + new Date().getTime();
			},
			testIdentity(){
				this.$v.identityNum.$touch();
			
				if(this.$v.identityNum.$error){
					this.infoOpen = true;
					if(!this.$v.identityNum.required){
						this.info ='请您输入证件号！'
				    } 
				}else{
					if(!this.testIdentityCode()){
						this.infoOpen = true;
						this.info ='您输入的身份证号有误，请重新输入！';
					}
				}

			},
			testIdentityCode(){ //合法身份证校验
                let flag = true
				if(this.identityCode=='103100'){ 
					flag = IdentityCodeValid(this.identityNum)
				}
				return flag; 
			},
			testPhone(){
				this.$v.phoneNum.$touch();
				if(this.$v.phoneNum.$error){
					this.infoOpen = true;
					if(!this.$v.phoneNum.required){
						this.info ='请您输入手机号！'
				    }else if(!this.$v.phoneNum.minLength){
				    	this.info ='您输入的手机号码格式不正确！'
				    }
				}
			},
			testImgCode(){
				this.$v.imgCode.$touch();
				if(this.$v.imgCode.$error){
					this.infoOpen = true;
					if(!this.$v.imgCode.required){
						this.info ='请您输入图形验证码！'
				    } 
				}
			},
			testMsgCode(){
				this.$v.msgCode.$touch();
				if(this.$v.msgCode.$error){
					this.infoOpen = true;
					if(!this.$v.msgCode.required){
						this.info ='请您输入短信验证码！'
				    } 
				}
			},
			closeConfirm(code){
				this.isUnbindOpen = false; 
				if(code==0){       //取消
					this.isUnbindOpen = false;
				}else if(code==1){ //确定
					this.axios.get(Bunding.bind,{
					params:{
						checkCode : this.msgCode,
						bindType:3
						}
				    }).then((response)=>{
				    	 if(response.data.flag.code==0 || response.data.flag.code=="0"){  //解除成功	 
					    	this.isUnbindOpen = false;
					    	sessionStorage.bindStatus = 1;
					    	this.$router.push({name:'bundingInfo'})
					    
						 }else if(response.data.flag.code==1 || response.data.flag.code=="1"){  //失败
							this.isUnbindOpen = false;
							this.infoOpen = true;
						    this.info = response.data.flag.msg
						 } 
				    })

				      
				}
				
			} ,
			bind(){

				this.testIdentity()
                if(this.infoOpen) return;

                this.testPhone()
                if(this.infoOpen) return;      
                
                this.testImgCode()
                if(this.infoOpen) return;
				this.testMsgCode()
                if(this.infoOpen) return;
                let _this = this;
				this.axios.get(Bunding.bind,{
					params:{
						idType: this.identityCode,
						idNo : this.identityNum,
						mobileNo : this.phoneNum,
						imageCode : this.imgCode,
						checkCode : this.msgCode,
						openId: '',
						bindType:1
					}
				}).then((response)=>{

					if(response.data.flag.code==0){
						sessionStorage.bindStatus = 1;
					    this.$router.push({path:'/bundingInfo'});
					}else if(response.data.flag.code==1){
						this.infoOpen = true;
					    this.info = '绑定失败'
					    sessionStorage.bindStatus = 0;
					}else if(response.data.flag.code==2){   //交叉绑定
						this.isUnbindOpen = true;
						this.otherOpenId = response.data.openId;
						this.otherEcifId = response.data.ecifId;
						this.otherNickName = response.data.nickName;
     
					}else if(response.data.flag.code==9){   //重复绑定
						this.infoOpen = true;
						this.info = '您的账号已绑定！'
						sessionStorage.bindStatus = 1;
					     
					}else{
						this.infoOpen = true;
					    this.info = response.data.flag.msg
					}
					
				}).catch(function(){
						_this.infoOpen = true;
					    _this.info ='系统错误！'
				});
			}

		}
	}
</script>
<style scoped lang="scss">
	@mixin box-sizing ($sizing) {
    -webkit-box-sizing:$sizing;     
       -moz-box-sizing:$sizing;
            box-sizing:$sizing;
	}
	.bunding{
		font-family: PingFangSC-Regular;
		display: flex;
		flex-flow: column;
		height: 100%;
		overflow: hidden;
		min-height:13.0rem; 
	}
	.center-content{
		flex: 2;
	}
 
	.top-logo{
		flex: 1;
		text-align: center;
		position:relative;
		min-height: 4.0rem;
		img{
			width: 1.4933rem;
			margin: 0 auto;

		}
		.table{
			display: inline-table;
			width: 2rem;
			height: 2.5rem; 
			position:absolute;
			top: 2.6667rem;
			left: 50%;
			margin-top: -1.3rem;
			margin-left: -1rem;
			  

		}
		.name{

			font-size: 0.48rem;
			color: #333333;
			margin: 0;
			line-height: 0.6667rem;
			padding-top: 0.2833rem; 
		}
	}
	.form-box{
		margin: 0 0.7rem;
		background: #FFFFFF;
		border: 0.0267rem solid #E7E7E7;
		border-radius: 0.1067rem;
	 

		>div{
            @include box-sizing(content-box);
			line-height: 1.3333rem;
			border-bottom: 0.0267rem solid  #E7E7E7;
			&:last-child{
				border-bottom:0;
			}
			&.item{
				display: flex;
				flex-flow: row;
				 
			}

			.label{
				font-size: 0.4267rem;
				color: #999999;	
				width: 2.86rem;			 			 
				text-indent: 0.4rem;
				/* float: left; */
				height: 1.3333rem;
				/* text-align: left; */
			}
			.identity-type{
					font-size: 0.38rem;
					color: #1B1B1B;
					flex:auto;
			}
			.identity-code{
				width: 90%;
			}

			::-webkit-input-placeholder { /* WebKit browsers */ 
			color: #999; 
			font-size: 0.39rem;
	
			} 
			:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
			color: #999; 
			} 
			::-moz-placeholder { /* Mozilla Firefox 19+ */ 
			color: #999; 
			} 
			:-ms-input-placeholder { /* Internet Explorer 10+ */ 
			color: #999; 
			font-size: 0.39rem;
			} 
			input[type=text], input[type=number]{
				padding:0;		 
				border:0;
				font-size: 0.39rem;
				color: #1B1B1B;
				outline: none;
				height: 0.8rem;	 
				position: relative;
				vertical-align: middle;
    			top: -0.0267rem;
				 
				 
			}
			.msg-1 , .img-1{
				flex:auto;
			}
			.auto{
				flex:auto;
			}
			.msg-2, .img-2{
				width: 2.6rem;
				line-height: 0;
				text-align: center;
			}
			.msg-2{
				padding-top: 0.30rem;
			}
			.msg-btn{
				font-family: PingFangSC-Regular;
				font-size: 0.32rem;
				color: #999999;
				text-align: center;
				border: 0.0267rem solid #E7E7E7;
				border-radius: 0.6667rem;
				line-height: 0.7rem;
				width: 1.9733rem;
				margin: 0 auto;
				

			}
			.msg-code{
				width: 2.5rem;
			}
			.img-code{
				width: 2.5rem;

			}
			.img-btn{
				 height: 1.0667rem;
				 
				 padding:0;
				 border:0;	
				 margin: 0 auto;
				 display: inline-block;
				 padding-top: 0.1333rem;
    			  
			}
		}
		.btn{
			/* float: right; */
			width: 1.3333rem;
			border-left: 0.0267rem solid #E7E7E7;
			text-align: center;
			img{
				vertical-align: middle;
				width: 0.4267rem;
			}

		}

	}
	.footer{
		height: 3rem;
		 
		.info{
			font-size: 0.3733rem;
			color: #999999;
			line-height: 20px;
			text-align: center;

			img{
				width: 0.5067rem;
				vertical-align: middle;
			}
		}
		.bund-btn{
			line-height: 1.2533rem;
			margin: 0 5%;
			border-radius: 0.1067rem;
			background: #0076FF;
 
			font-size: 0.4533rem;
			color: #FFFFFF;
			text-align: center;
			border:0;
			display: inline-block;
			width: 90%;
			outline: none;
		}

	}
</style>