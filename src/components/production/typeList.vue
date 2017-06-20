<template>
	<div class="cash-wrapper">
		<header class="top-type"  @touchmove.stop='stopMove($event)'>
		    <swiper :options="swiperOption" class="swiper-box ">
		    	 <swiper-slide class="swiper-item item"  v-for='tagItem in tagList' >
		    	  <div  @click='loadCategoryPrdt(tagItem)'>	
						<div class="img-box">
							<img :src="tagItem.picUrl">
						</div>	
						<div class="name" v-text="tagItem.categoryName">							
						</div>
		    	  </div>
		    	        
				 </swiper-slide>
		    </swiper>
		  
				<!-- 	<div class="item" v-for='tagItem in tagList' @click='loadCategoryPrdt(tagItem)'>
						<div class="img-box">
							<img :src="tagItem.picUrl">
						</div>	
						<div class="name" v-text="tagItem.categoryName">							
						</div>
					</div> -->
		</header>
		<section class="list-box">
			<div class="top-title">全部产品</div>
			<div class="content-box">
				   <div v-if="type==1">
				   		<div class="list-item" v-for="p in tempItems" @click="goTo(p.prdtCode,p.prdtType)" >
						  	<div class="left">
						  		<div class="type-1-name">
						  			{{p.name | sub-str(12)}}
						  		</div>
						  		<div class="type-1-info">
						  			万份收益率{{p.dayIncome}}
						  		</div>
						  		<div class="type-1-tag">

						  			<span v-for='l in p.labelList'>{{l.title }}</span>						  		 
						  		</div>
						  	</div>
						  	<div class="right">
						  	 		<div class="type-1-date">
						  	 			净值日期：{{p.valueDate ?  p.valueDate : '--'}}
						  	 		</div>
						  	 		<div class="type-1-rate" v-if='p.yieldValue'>
						  	 			<span class="title">七日年化收益</span>{{p.yieldValue | subLength(2)}}<span class="precent" v-if='p.yieldValue'>%</span>
						  	 		</div>
						  	 	    <div class="type-1-rate" v-else>
						  	 			<span class="title">七日年化收益 --</span>  
						  	 		</div>	
						  	 </div>
						 </div>

				   </div>

				   <div v-if="type==2">
				   	
				   		<div class="list-item" v-for="p in tempItems"  @click="goTo(p.prdtCode,p.prdtType)" >
				   			<div class="left">
				   				<div class="type-2-name">{{p.name | sub-str(10)}}</div>
				   				<div class="type-2-rate"> 
				   				<span class="pre_rate" v-if='p.yieldValue'>{{p.yieldValue}}%</span>
				   				<span class="pre_rate" v-else>--</span>

				   				 业绩比较基准</div>
				   			</div>
				   			<div class="right">
				   				<div class="type-2-tag">
				   					<span v-for="l in p.labelList">{{l.title}}</span>
				   					
				   				</div>	
				   				<div class="type-2-date">
				   					<div>销售起始日：{{p.startDate}}</div>
				   					<div>销售截止日：{{p.endDate}}</div>
				   				</div>
				   			</div>
				   		</div>

				   </div>




				   <div v-if="type==3">
				   	
				   		<div class="list-item" v-for="p in tempItems"  @click="goTo(p.prdtCode,p.prdtType)" >
				   			<div class="left">
				   				 <div class="type-3-name">{{p.name | sub-str(10)}}</div>
				   				<!--  <div class="type-3-sum">累计净值：{{p.totalUnitNav}}</div> -->
				   				 <div class="type-3-tag">
				   				 	<span v-for='l in p.labelList'>{{l.title}}</span>
				   				 </div>	
				   			</div>
				   			<div class="right">
				   				 
				   				 <div class="type-3-num">{{p.yieldValue ? p.yieldValue : '--'}}</div>
				   				 <div class="type-3-date">净值日期：{{p.valueDate ?  p.valueDate : '--'}}</div>
				   			</div>
				   		</div>

				   </div>
			
			</div>
			<div class="show-more" v-if='showMore' @click='loadMore()'>
				展开更多 <img src="../../common/images/double_down_arrow@2x.png">
			</div>


		</section>
	</div>
</template>
 
<script>
  	import { basePath } from 'src/common/js/config';
    import {isEmpty} from 'src/common/js/unit';
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default{

		name: 'cash',
		props:['type'],
		mounted(){
     		this.loadData(this.type);
     		
  		},
		data(){
			return {
				items:[],
				tempItems:[],
				tagList: [],
				pageSize: 3,
				page: 1,
				counts:0,
				showMore:true,
				swiperOption: {  
		          	initialSlide: 0,
		          	loop: false,
		          	autoplayStopOnLast: true,
		          	slidesPerView: 4
	    
        		}
			}
		},
		
		watch:{
          type:function(){
          	this.pageSize = 3;
          	this.loadData();
          },
          pageSize:function(){
          	this.filterItems();
          }

		},filters:{
			  subLength:function(val,len){
			  	   
			  	    if(isEmpty(val)){
			  	    	return '--';
			  	    }else{
			  	    	return  parseFloat(val).toFixed(len);
			  	    }
        			
      		  }
		}
		,components:{
    		swiper,
    		swiperSlide
  		} 
  		,

		methods:{
			loadData(_type){
				this.axios.get(basePath +'/weixin/asset_management/product',{
					params:{
						type: this.type,
						page: this.page,
						pageSize: 100
					}
				}).then((response) => {
                   if(response.data){
	                   	if(response.data.flag.code==0){
	                   		 	this.items = response.data.productList; 
	                   			this.tagList = response.data.tagList;		 
	                   			this.counts = response.data.prdtCount;
     							this.filterItems();
	                   		    
	                   	}
                   }
                  
                 
                                         
            	})

			}
			,loadMore(){
				 this.pageSize += 3;
				 
			},goTo(_code, _type){
        
		        let _href  ='';
		        if(_type == 1){
		           _href = 'pro_cash_detail.html?prdtCode=' + _code  + '&type='  + _type;
		        }else if( _type == 2){
		          _href = 'pro_static_detail.html?prdtCode=' + _code  + '&type='  + _type;
		        } else if(_type == 3){
		          _href = 'pro_float_detail.html?prdtCode=' + _code  + '&type='  + _type;
		        }
		        window.location.href = _href ;        
      		},
      		loadCategoryPrdt(item){
      		 
      		   this.$router.push({name:'prdtCategory' , params:{
      		   	type: this.type,
      		   	category: item.categoryId,
      		   	name:item.categoryName
      		   }})
      		},
      		filterItems(){
 
      	 		this.showMore =  this.pageSize < this.counts ? true : false;
      			this.tempItems =  this.items.slice(0,this.pageSize);
      		},
		      stopMove(event){
		          event.preventDefault();
		          event.stopPropagation()
		           
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
	$borderColor: #efeff5;

	.cash-wrapper{
	
	 
		.top-type{
			
				text-align: center;
				@include box-sizing(content-box);
				height: 2.2133rem;
				border-top: 5px solid $borderColor;
				border-bottom: 5px solid $borderColor;
			
			.swiper-box{
				
					display: flex;
				    flex-flow: row;

					.item{

						width: 2.5rem !important;
					 
						.img-box{
						 
							@include row-height( 1.2533rem);
							width: 100%;
							text-align: center;
							img {
								width: 0.8533rem;
								vertical-align: bottom;								 					 		    
							}	
						}

						.name{
						    
							font-size: 0.3733rem;
							color: #808080;
							@include row-height(0.96rem);
							align-self: flex-end;
							 
						}
			}
			}	

	
		}

		.list-box{
			.top-title{
				@include box-sizing(content-box);
				@include row-height(0.9333rem);
				border-bottom: 0.0267rem solid $borderColor;
				font-size: 0.3733rem;
				color: #808080;
				text-align: center;
			}
			.content-box{
                padding: 0 0.4rem; 
				.list-item{
					@include box-sizing(content-box);
					
					//height: 2.4267rem;
					border-bottom: 1px solid $borderColor;
					padding-bottom: 0.2667rem;
					display: flex;
					flex-flow: row;

					.left{
						
						flex:1;
						text-align: left;
						width: 50%;

						.type-1-name{
							padding-top: 0.4rem;
							padding-bottom: 0.20rem;
							line-height: 0.5rem;
                            //@include row-height(0.64rem);
							font-size: 0.4267rem;
							color: #303030;
						}
						.type-1-info{
							@include row-height(0.4533rem);

							font-size: 0.32rem;
							color: #AAB0C0;
						}
						.type-1-tag{
							padding-top: 0.0933rem;

							span{
								display: inline-block; 
								font-size: 0.2667rem;
								color:  #FE9D83;
								line-height: 0.4267rem; 
								//@include box-sizing(content-box);
								border-radius: 0.0533rem;
								border: 1px solid #FE9D83;
								border-radius: 0.0533rem;
								padding: 0 0.0533rem;
								margin-right:0.1rem;
								margin-bottom: 0.1333rem;
								 
							}
						}



						.type-2-name{
							
							font-size: 0.4267rem;
							color: #303030; 
							padding: 0.4rem 0;
							line-height: 0.5rem;
							//@include row-height(1.28rem);

						}
						.type-2-rate{

			
							font-size: 0.32rem;
							color: #AAB0C0;

							.pre_rate{
								
								font-size: 0.76rem;
								color: #FD2601;
							}
						}




						.type-3-name{
							    padding-top: 0.33rem;
							//	@include row-height(0.5867rem);
								/* line-height: 0.45rem; */
								@include row-height(0.96rem);
								/* padding-bottom: 0.12rem; */
								font-size: 0.4267rem;
								color: #303030;
						}
						.type-3-sum{
							@include row-height(0.5333rem);
							 
							font-size: 0.32rem;
							color: #AAB0C0;
						}

						.type-3-tag{
							
							font-size: 0.2667rem;
							color: #FE9D83;
							span{
									display: inline-block;
								    line-height: 0.4267rem;
								    border-radius: 0.0533rem;
								    border: 1px solid #FE9D83;
								    padding: 0 0.0533rem;
								    margin-right: 0.1rem;
								    margin-bottom: 0.1333rem;
							}
						}


					}
					.right{
						flex:1;
						text-align: right;
						width: 50%;

						.type-1-date{

							padding-top: 0.48rem;
							@include row-height(0.5067rem);

							font-size: 0.32rem;
							color: #AAB0C0;

						}
						.type-1-rate{
							padding-top: 0.32rem;
							font-size: 0.8rem;
							color: #FD2601;
							@include row-height(0.64rem);

							.title{
								vertical-align: border-bottom;
								font-size: 0.32rem;
								color: #AAB0C0;
							}
							.precent{
								font-size: 0.4267rem;
								vertical-align: bottom；
							}
						}

						.type-2-tag{
								//@include row-height(1.28rem);
								padding: 0.4rem 0 .15rem 0;
								font-size: 0.2667rem;
								color: #FE9D83;
								span{
									display: inline-block;
								   
								    
								    line-height: 0.4267rem;
								    border-radius: 0.0533rem;
								    border: 1px solid #FE9D83;
								    
								    padding: 0 0.0533rem;
								    margin-left: 0.1rem;
								    margin-bottom: 0.1333rem;
								}
						}
						.type-2-date{
							     
								font-size: 0.32rem;
								color: #AAB0C0;
								div{
									@include row-height(0.4267rem);
								}
						}


						.type-3-date{
							padding:0 0 0.25rem 0;
							@include row-height(0.4267rem);
							font-size: 0.32rem;
							color: #AAB0C0 ;
						}

						.type-3-num{
							padding-top: 0.3733rem;
							font-size: 0.6933rem;
							color: #FD2601;
							@include row-height(0.96rem);
						}





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

		}
		



	}
</style>