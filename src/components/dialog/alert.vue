<template>
	<div class="alert" v-if='isShow'>
		<div class="alert-model"   @click.self='close'>
			
		</div>
		<div class="alert-body"  >
			<header class="header">温馨提示</header>
			<section class="content">
				
			</section>
			<footer>
				<button class="btn" type="button"  @click.self='close'>确定</button>
			</footer>
		</div>
	
	</div>
</template>
<script type="text/javascript">

	export default{
		name:'alert',
		props:['isOpen'],
		data(){
			return {
				isShow: this.isOpen
			}	 
		},
		mounted(){
		//	console.log(this.isOpen)
		},
		methods:{
			close(){
				this.$emit('close');
			}
		},
		watch:{
			isOpen:function(val, old){
				this.isShow = val;
				console.log(val)
			}
		}
	}
</script>
<style scoped lang='scss'>
	.alert{

		.alert-model{

			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			overflow: hidden;
			opacity: 0.3;
			background: #000000;
			z-index: 100;
		}
		.alert-body{
			 
			z-index: 9999;
			position: fixed;
		    top: 50%;
		    left: 50%;
		    -webkit-transform: translate3d(-50%,-50%,0);
		    transform: translate3d(-50%,-50%,0);
		    background-color: #fff;
		    width: 8.5333rem;
		    border-radius: 0.16rem;;
		    font-size: 0.4267rem;
		    -webkit-user-select: none;
		    overflow: hidden;
		    -webkit-backface-visibility: hidden;
		    backface-visibility: hidden;
		    -webkit-transition: .2s;
		    transition: .2s;
		    box-shadow: 0 0 0.2667rem 0 rgba(0,0,0,0.20);
		    min-height: 2.6667rem;

		    .header{
		    	font-family: PingFangSC-Medium;
				font-size: 17px;
				color: #333333;
				letter-spacing: 0;
				line-height: 0.64rem;
				margin-top: 0.4rem;
				text-align: center;
		    }
		    .content{
		    	min-height: 2.6rem;
		    }
		}


		.btn{
			width: 7.6533rem;
			height: 1.12rem;
			line-height: 1.12rem;
			text-align: center;
			font-size: 0.4533rem;
			color: #FFFFFF;
		    margin-left: 0.44rem;
			background: #2F78EC;
			border-radius: 0.1067rem;
			border: 0;
			letter-spacing: 0.0533rem;
			margin-bottom: 0.4rem;
			
		}

	}
</style>