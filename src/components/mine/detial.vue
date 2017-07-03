 <template>
 	<div class="mine-wrapper">
 			<div class="top-header">
 				<div class="left">全部产品</div>
 				<div class="right">收益</div>
 			</div>
 			<div class="list-view">
 				<div class="item" v-for="item in dateList">
 					<div class="left" v-text='item.date'></div>
 					<div class="right" v-text='item.yield'></div>
 				</div>
 				<div class="item text-center" v-if='hasData'>
 					暂无数据！
 				</div>
 			</div>

 		<!-- 	<div class="show-more">
 					展开更多 <img src="../../common/images/double_down_arrow@2x.png">
 			</div> -->
 		 
 			
 	</div>
 </template>
 <script >

	 
	import { basePath } from 'src/common/js/config';
	import { EcifId } from 'src/common/js/global';
	import contact from 'src/components/common/Contact';
     
 	export default {
 			name: 'detail',
 			data(){
 				return {
 					prdtCode:this.$route.params.product_code,
 					month:   this.$route.params.month,
 					dateList:[],
 					hasData:false
 				}
 			},
 			mounted(){
 				this.loadData();
 			},

 			methods:{
 				loadData(){
 					this.axios.get(basePath+ '/weixin/asset_management/product_income',
 						{ 
 							params:{
							ecifId: EcifId(),
							month: this.month,
							prdtCode: this.prdtCode
							}
						}
					).then((response)=>{
						 if(response.data.flag.code==0){
						 	 this.dateList = response.data.dateList;
						 	 this.hasData = this.dateList.length > 0 ?  false : true
						 }
							
					})
 				}
 			},
 			components:{
				contact
		    } 

 	}

 </script> 
 <style lang='scss' scoped>
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
		display: flex;
		flex-flow: row;
		@include row-height(1.0667rem);

		font-size: 0.3733rem;
		color: #808080;
		letter-spacing: 0.0043remx;
		padding: 0 0.4267rem;

		>div{
			flex: 1;
		}
 
		.right{
			text-align: right;
		}
	}
	.list-view{
			padding: 0 0.4267rem;

			.item{
					display: flex;
				    flex-flow: row;
				    @include row-height(1.12rem);
					font-size: 0.3733rem;
					letter-spacing: 0.0043remx;
					>div{
						flex: 1;
					}
					.left{
						color: #AAB0C0;	
					}
					.right{
						color: #FD2601;
						text-align: right;
					}
			}

	}
 	.show-more{
				@include row-height(1.0667rem);
				font-size: 0.4rem;
				color: #808080;
				text-align: center;
				img{
					vertical-align: middle;
					width: 0.32rem;
					position: relative;
					top: -0.0267rem;
				}
	}
 </style>