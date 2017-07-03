<template>
	
	<div class="mine-wrapper">
 
	<section class="main-contanier">		   
<!-- 	 <mt-loadmore :autoFill='false'  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"> -->
   	 	<div class="top-header">
   	 			<span>月份</span>	
   	 			 <div class="select" >
   	 			 <div @click='isShowList= !isShowList'>
   	 			 	<img class="shape" src="../../common/images/Shape@2x.png">	
   	 			 	<div class="value" >{{currentMonth.year}}年{{currentMonth.month}}月</div>
   	 			 	<span >
   	 			 		<img v-if='!isShowList' class="arrow" src="../../common/images/down_arrow@2x.png">
   	 			 		 <img class="arrow"   v-if='isShowList'  src="../../common/images/up_arrow@2x.png">
   	 			 	</span>
   	 			  
   	 			 </div>	
   	 			
   	 			 	 <div class="selects" v-if='isShowList' >
   	 			 		<div v-for='item in allMonth' @click='check(item)' :class='{"active" : currentMonth.month==item.month}'>  {{item.year}}年{{item.month}}月</div>	 
   	 			     </div>
   	 			 </div>

   	 			
   	 	</div>
   	 	<div class="list-view">

 			<list-item :isDisplay='true' :month='currentMonth' :index='0'>	
 			</list-item>	
    	</div>	  
 
    	 
<!-- 	 </mt-loadmore> -->
	</section>
		

</div>


</template>
<script >
	import listItem from './listItem';
    import { getDateList } from 'src/common/js/unit';

    import contact from 'src/components/common/Contact';

	import Vue from 'vue';

    import { Loadmore } from 'mint-ui';
	Vue.component(Loadmore.name, Loadmore);
	const MONTH_COUNT = 6; //每次加载6个月
	const MAX_MONTH_COUNT = 24; //最多加载2年数据，
	export default{
		name: 'mine',
		data(){
			return{
				totalAsset: 0.00,
				allMonth:[],
				monthLen: MONTH_COUNT,
				popupVisible :true,
				allLoaded: false,
				currentMonth:Object,
				isShowList: false			 		 
			}
		},
		mounted(){
			//this.loadData();
			this.allMonth = getDateList(this.monthLen) 
			this.currentMonth = this.allMonth[0]							
		} ,
		methods: {
			 loadBottom(){
				
				if(this.monthLen > MAX_MONTH_COUNT){
						this.allLoaded = true ;
						return
				}// 若数据已全部获取完毕
				this.monthLen += MONTH_COUNT;
  				this.$refs.loadmore.onBottomLoaded();
				
			 
			},
			check(item){
				this.currentMonth = item;
				this.isShowList = false;
			} 
		},
		watch:{
			monthLen : function(val){
				this.allMonth = getDateList(val) 
			}
		},
		components:{
			listItem,contact
		}
	}
</script>
<style scoped lang="scss">
@mixin box-sizing ($sizing) {
    -webkit-box-sizing:$sizing;     
       -moz-box-sizing:$sizing;
            box-sizing:$sizing;
}
@mixin row-height ($height){
	  height: $height;
	  line-height: $height;
}
	.top-header{
	 
		 padding: 0.2667rem 0;
		 border-bottom: 0.0267rem  solid #efeff5;
		 line-height: 1.0667rem;
		 position: relative;
		 >span{
		 	position: absolute;
		 	left: 0.4rem;

		 	display: inline-block;
			font-size: 0.3733rem;
			color: #808080;
			letter-spacing: 0.17px;
		 }

		 .select{
		 	width: 4.8rem;
		 	height: 1.0667rem;
		 	margin: 0 auto;
		 	position: relative;
		 	line-height: 1.0667rem;;
		 	background: #F5F5F5;
			border: 0.0267rem solid #EFEFF5;
			border-radius: 0.1067rem;
			@include box-sizing(content-box);
			>div{
				width: 100%;
			}
			img{
				vertical-align: middle;
				margin: 0 0.2rem;
				position: relative;
			}
			.shape{
				width: 0.3733rem;
				top: -0.08rem;
				left: 0.1333rem;

			}
			.arrow{
				width: 0.4267rem;
				top: -0.08rem;
				right: 0.1333rem;
			}
		 	.value{
		 		display: inline-block;
		 		width: 3rem;
		 		height: 1.0667rem;
		 	    line-height: 1.0667rem;
		 	    font-family: PingFangSC-Regular;
				font-size: 0.4rem;
				color: #303030;
				letter-spacing: 0.18px;
				text-align: center;
		 	}
		 	span{
		 	}
		 }
		 .selects{
		 	background: #F5F5F5;
		 	line-height: 1.0667rem;
		 	text-align: center;
			font-size: 0.4rem;
			color: #303030;
			letter-spacing: 0.18px;
			border: 0.0267rem solid #EFEFF5;
			border-radius: 0.1067rem;
			width: 4.8rem;
			margin: 0 auto;
			position: absolute;
			top: 1.0133rem;
			left: -0.0267rem;
			border-top: 0;
			
			border-top-left-radius: 0;
			border-top-right-radius: 0;
			div.active{
				background: #EBEBEB 100%;
			}
		 }
		 
	
	}

	.main-contanier{


	 
	}


</style>