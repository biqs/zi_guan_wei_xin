<template>
	<div class="bunding">
		
	 	<header class="top-logo">
	 		<div class="table"> 			 
	 				<img src="./images/ok@3x.png">	
	 		</div>
	 		<div class="form-bottom">
		 				 <p>
		 		 		  不再使用华泰证券资产管理账号？
		 		 		</p>
		 		 		<p>您可点击 <a class="unbing" @click='isOpen=true'>解除绑定</a></p>
		 			</div>
	 	</header>
	 	<section class="center-content">
	 		<div class="form-box">
		 		
	 			<div class="info">
	 				您已成功绑定华泰证劵资产管理账户！
	 			</div>
	 			
	 		
	 		
	 		</div>
	 	</section>
	 	<footer class="footer">
	 		<p class="info"><img src="./images/phone.png"/>华泰证券资管客服电话  <a class="tel" href="tel:95597">95597</a> </p>
	 		<button type="button" class="bund-btn" @click='openindex'>查看我的账户</button>
	 	</footer>
	 	<confirm :isOpen='isOpen' @close='closeConfirm'></confirm>
	  

	</div>
</template>
<script type="text/javascript">
  
    import confirm from 'components/dialog/confirm'; 
	export default{
		name:'bunding'
		,
		data(){
			return{
		
				isOpen:false,			 
				info:'您输入的身份证不合法，请重新输入。',
				 
			}
		}, 
		components:{
			 confirm
		},
		mounted(){
		
			//this.loadImgCode();
		},
		methods:{
			openindex(){
				location.href='index.html#/mine'
			},
			closeConfirm(code){
					if(code==0){
							this.isOpen = false;
					}else if(code==1){
						 
						this.isOpen = false;
						this.$router.push({path:'unbunding'})
					}
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
	}
	.center-content{
		flex: 2;
	}
 
	.top-logo{
		flex: 1;
		min-height: 4.6933rem;
		text-align: center;
		position:relative;
		img{
			width: 1.4933rem;
			margin: 0 auto;

		}
		.table{
			display: inline-table;
			width: 2rem;
			 
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
			padding-top: 0.1rem;
		}

		.form-bottom{
    		position:absolute;
    		bottom:0.4rem;
    		text-align:center;
			font-size: 0.3733rem;
			color: #666666;
			width: 100%;
    	}

    	p{
    		padding:0;
    		margin:0;
    		line-height: 0.5333rem;
    	}
    	.unbing{
    		color: #419af3;
    	}
	}
    .form-box{
    	position:relative;
    	height: 100%;
    	.info{

			font-size: 0.48rem;
			color: #333333;
			text-align: center;
    	}
    	.form-bottom{
    		position:absolute;
    		bottom:0.8rem;
    		text-align:center;
			font-size: 0.3733rem;
			color: #666666;
			width: 100%;
    	}

    	p{
    		padding:0;
    		margin:0;
    		line-height: 0.5333rem;
    	}
    	.unbing{
    		color: #419af3;
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
			display: block;
			width: 90%;
			outline: none;
		}

	}
</style>