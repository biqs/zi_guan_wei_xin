<template>
	<div id="listItem" class="income-list">
		<!-- <div class="item-header"  @click='displayItem = !displayItem'>
			<div class="left">{{month.year}}年{{month.month}}月 </div>
			<div class="right" :class='{"active" :displayItem}'>
		 
				<img src="../../common/images/left_arrow@3x.png">
			</div>
		</div> -->
		<div class="item-content" v-if='displayItem'>
			<div class="income-count">
					<div class="box">
						<div class="title">总收益 (元)</div>
				<div class="all-count" v-text='totalYield'></div>
					</div>
				
			</div>
			<div class="income-sub-title">
				<div class="left">收益摘要</div>
				<div class="right">
					<img src="../../common/images/group@3x.png">
				</div>	
			</div>
			<div class="income-item" v-for='pItem in productList'>
				<div class="left" v-text='pItem.name'></div>
			   	<div class="right">
			   	<router-link :to="{name:'mineDetial', params:{product_code:pItem.prdtCode, month:yearAndMonth}}">
			   		<span v-if='isR(pItem.totalYield)' class="R">
			   			{{pItem.totalYield}}
			   		</span>
			   		<span v-if='!isR(pItem.totalYield)' class="Y">
			   			{{pItem.totalYield}}
			   		</span>
			   	 
			   		 &nbsp;<img src="../../common/images/left_arrow@3x.png">
			   	</router-link>
			   	</div>
			</div>
			<!-- <div class="income-item"  >
				<div class="left"  >121212ascadasd</div>
			   	<div class="right">
			     <router-link :to="{name:'mineDetial', params:{product_code:pItem.prdtCode, month:yearAndMonth}}">
			   		 sdd

			   		<img src="../../common/images/left_arrow@3x.png">
			    
			   	</router-link>
			   		
			   	</div>
			</div> -->
		</div>

		


	</div>
</template>
<script >
import { EcifId } from 'src/common/js/global';	
//let ecifId =  sessionStorage.ECIFId;  

import { basePath } from 'src/common/js/config';

export default {
	name:'listItem',
	props:['month','index'],
	mounted(){
		if(this.index ==0){
			this.displayItem = true;
		}
	},
	
	computed:{
		yearAndMonth:function(){
			return  this.month.year + this.month.month
		}
	},
	data(){
		return{
			displayItem:false,
			totalYield: 0.00,
			productList:[]
		}
	},methods:{
		loadData(){
			this.axios.get(basePath+ '/weixin/asset_management/month',{ params:{
					ecifId: EcifId(),
					month: this.month.year + this.month.month
				}}).then((response)=>{
                        if(response.data){
                        	if(response.data.flag.code == 0){
                        		 this.productList = response.data.productList;
						         this.totalYield =  response.data.totalYield ?  response.data.totalYield :'0.00'
                        	}
                        }
					 	
						 	
				})
		},
		isR(value){
			if(value){
				if(value.indexOf('+') !=-1){
					return true
				}else if(value.indexOf("-") !=-1){
					return false
				}

			}
		}
	},watch:{
		displayItem:function(){
			this.loadData()
		},
		month: function(){
			this.loadData()
		}
	},filters:{
		RAndY: function(value){
			if(value){
				if(value.indexOf('+') !=-1){
					return "<span class='R'>"+value+"</span>"
				}else if(value.indexOf("-") !=-1){
					return "<span class='Y'>"+value+"</span>"
				}

			}
		}
	}
}

</script>

<style lang="scss" scoped>

	@mixin box-sizing ($sizing) {
    -webkit-box-sizing:$sizing;     
       -moz-box-sizing:$sizing;
            box-sizing:$sizing;
	}
	@mixin row-height ($height){
		  height: $height;
		  line-height: $height;
	}
    .R{
    	color: #FD2601 !important;
    }
    .Y{
    	color: #00AD7A  !important;
    }
	.income-list{

			.item-header{
				font-family: PingFangSC-Regular;
				font-size: 0.4267rem;
				color: #303030;
				letter-spacing: 0.0051rem;
				@include row-height(1.3333rem);
				@include box-sizing(content-box);
				padding: 0 0.4rem;
				border-bottom: 0.0267rem solid #efeff5;
				display: flex;
				flex-flow: row;
				.left{
					flex: auto;
				}
				.right{

					width:0.4267rem;
					img{
						width: 0.24rem;
						height: 0.4rem;
						//vertical-align: middle;
						transform:rotate(0deg);
						transition: rotate  1s  ease-in;
					}
					&.active{
						img{
							transform:rotate(90deg);
						}
					}
				}
			}


			.item-content{
				.income-count{
					height: 3.7333rem;
					text-align: center;
					padding-top: 0.3467rem;
					.box{
						width: 3.3333rem;
						height: 3.3333rem;
						margin: 0 auto;
						background-image:url('../../common/images/box@3x.png') ;
						background-size: 3.3333rem 3.3333rem;
					}

					.title{
						 
						font-size: 0.4rem;
						line-height: 0.5333rem;
					 
						color: #FFFFFF;
						letter-spacing: 0.18px;
			 
						padding-top: 0.8533rem;
					}
					.all-count{
						 
						    line-height: 0.8rem;				
							font-size: 0.5333rem;
							margin-top:0.1333rem;
							color: #FFFFFF;
							font-weight: 500;
							letter-spacing: 0.24px;
					}
				}


				.income-sub-title{
					display: flex;
					flex-flow: row;
					padding: 0 0.4rem;
					font-family: PingFangSC-Regular;
					font-size: 0.4267rem;
					color: #4E4E4E;
					letter-spacing: 0.0051rem;
					background: #F6F6F6;
					@include row-height(1.0667rem);
					.left{
						flex: auto;
					}
					.right{
						width: 0.48rem;

						img{
							width: 0.48rem;
							height: 0.32rem;
						}
					}
				}


				.income-item{
					 @include row-height(1.0667rem);
					 @include box-sizing(content-box);
					 border-bottom: 0.0267rem solid #efeff5;
					 display: flex;
					 flex-flow: row;
					 margin: 0 0.4rem;
					 .left{
					 	flex:auto;
					 	font-family: PingFangSC-Regular;
						font-size: 0.3733rem;
						color: #808080;
						letter-spacing: 0.0043rem;
					 }
					 .right{
					 	font-family: PingFangSC-Regular;
						font-size: 0.3733rem;
						color: #FD2601;
						letter-spacing: 0.0043remx;
					 	width: 4.0rem;
					 	text-align: right;
					 	a{
					 		color: #FD2601;
					 	}
					 	img{
						 	width: 0.24rem;
							height: 0.40rem;	
							vertical-align: middle;
					 	}
					 	
					 }

				}
			}
	
	}




</style>