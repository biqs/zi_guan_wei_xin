<template>
	<div class="alert" v-if='isShow'>
		<div class="alert-model"   @click.self='close' @touchmove.stop='stopMove($event)'>
			
		</div>
		<div class="alert-body" @touchmove.stop='stopMove($event)'>
		    <header class="close-header" ><img :src="closeImgSrc" class="closeImg"  @click.self='cancle'></header>
		    <div class="main">
				<header class="header">证件类型</header>
				<section class="content">
					<mt-picker :slots="slots"   :visibleItemCount='5' @change="onValuesChange"></mt-picker>
				</section>
				<footer>
					<button class="btn" type="button"  @click.self='close'>确定</button>
				</footer>
		    </div>
		   
		</div>
	
	</div>
</template>
<script type="text/javascript">
   
    import Vue from 'vue';
    import 'mint-ui/lib/style.css'
	import { Picker } from 'mint-ui';
	import { Certificates } from 'src/common/js/global';
	import closeImg from 'src/common/images/close@2x.png';
	Vue.component(Picker.name, Picker);

	export default{
		name:'alert',
		props:['isOpen'],
		data(){
			return {
				closeImgSrc: closeImg,
				isShow: this.isOpen,
				identity:'',
				 slots: [
			        {
			          flex: 1,
			          values: Certificates.name(),
			          className: 'identity-slot',
			          textAlign: 'center',
			          defaultIndex: 2 
			        } 
			      ]
    			}
			}	 
		,
		mounted(){
		//	console.log(this.isOpen)
		},
		methods:{
			close(){
				this.$emit('ok',this.identity);
			},
			onValuesChange(picker, values) {
		       this.identity = values[0];
		    },
		    cancle(){
		    	this.$emit('close');
		    },
		    stopMove(event){
		    	event.preventDefault();
		    	event.stopPropagation()
		    	 
		    }
		},
		watch:{
			isOpen:function(val, old){
				this.isShow = val;
				 
			}
		}
	}
</script>
<style   lang='scss'>
	.identity-slot {	    		
		font-size: 0.4rem;
	}
	.picker-item{
		font-size: 0.4rem;
	}
	.identity-slot .picker-selected{
		font-size: 0.4533rem !important;
	}
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
		    width: 8.5333rem;
		    min-height: 2.6667rem;
		    margin-top: -1.5rem;
            .main{
            	  	background-color: #fff;
            	    border-radius:0.16rem;
				    font-size: 0.4267rem;
				    -webkit-user-select: none;
				    overflow: hidden;
				    -webkit-backface-visibility: hidden;
				    backface-visibility: hidden;
				    -webkit-transition: .2s;
				    transition: .2s;
				    box-shadow: 0 0 0.2667rem 0 rgba(0,0,0,0.20);
            }
		    .header{
	 
				font-size: 0.4533rem;
				color: #000000;
				letter-spacing: 0;
				line-height: 0.64rem;
				margin-top: 0.4rem;
				text-align: center;
		    }
		    .content{
		    	min-height: 2.6rem;
		    	padding: 0.2667rem 0;
		    	overflow: hidden;

		    	
		    }
		    .close-header{
		    	 text-align: right;
		    	.closeImg{
			    	position: relative;
			    	width: 0.8533rem;
			    	right: 0.4267rem;
			    	top: 0.08rem;
			    	display: inline-block;

		    	}
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
			outline: none;
			
		}

	}
</style>