<template>
	<div class="mine-main">
		<div class="top-header">
			<div class="top-aeeset">
					<header class="title">我的总资产</header>
					<div class="count" v-text='totalAsset'></div>
			</div>
		
			<div class="info">
				<div class="left">
					<div class="name">昨日收益</div>
					<div class="value" v-text='prevProfit'></div>
				</div>
				<div class="line"><span></span></div>
				<div class="right" @click='goto'>
				   <!--  <router-link to="/mine/list"></router-link> -->
					<div class="name"> 累计收益 </div>
					<div class="value" v-text='totalProfit'></div>

				</div>
			</div>
		</div>
		<div class="item-list">
				<div v-for='item in productList'>	
				<div class="item" >
					<div class="left">
						<div  >{{item.name | sub-str(14)}}</div>
						<div>持有：{{item.totalShare}}(份)</div>
					</div>
					<div class="right">
						<div v-text='item.totalAsset'>36346.98</div>
						<div>累计收益：{{item.totalProfit}}</div>
					</div>
				</div>
				 <div class="line"></div>
				</div>
		</div>
	

		 
	</div>	
</template>
<script>
    import { EcifId } from 'src/common/js/global';
    import { basePath } from 'src/common/js/config';
   
	export default {
		name:'mine-main',
		data(){
			return{
				productList:[],
				totalAsset: '' , //总资产
				prevProfit :'' , //昨日收益
				totalProfit : ''   //累计收益
			}
		},
		created(){
			this.loadData();
			 
		}
		,
		methods:{
			loadData(){
				this.axios.get(basePath+'/weixin/asset_management/myAccount' ,
					{
					  params:{
						ecifId: EcifId()
					  }
					})
					.then((response)=>{
					if(response.data.flag.code==0){
						this.totalAsset = response.data.totalAsset;
						this.productList = response.data.productList;
						this.prevProfit = response.data.prevProfit;
						this.totalProfit = response.data.totalProfit;
					}
					
				})
			},goto(){
				this.$router.push({path:'/mine/list'})
			}
		}
	}
	
</script>
<style lang="scss" scoped>
  .mine-main{
  	.top-header{
         color: #FFFFFF;
         text-align: center;
         background: #008CF3 100%;
         height: 6.1333rem;
  		.title{
  			opacity: 0.5;			
			font-size: 0.4267rem;		 
			letter-spacing: 0.0051rem;
			line-height: 0.5867rem;
			padding-top: 0.9067rem;
  		}
  		.count{
  			
			font-size: 1.44rem;
			letter-spacing: 0.0171rem;
			line-height: 75px;
  		}

  		.top-aeeset{
  			height: 4.0rem;
  		}
  	    .info{
  	    	display: flex;
  	    	flex-flow: row;
  	    	height: 2.1333rem;
  	    	background: #0087EB;
  	    	>div{
  	    		 
  	    	}
  	    	.line{
  	    		width: 0.0267rem;
  	    		vertical-align: middle;	 	    		
  	    		span{			
  	    			display: inline-block;
  	    			width: 0.0267rem;
  	    			height: 1.6rem;
  	    			border-left:1px solid #2696E9 ;
  	    			margin: 0 auto;
  	    			margin-top: 0.2667rem;
  	    		}

  	    	}
  	    	.left{
  	    		text-align: center;
  	    		flex: 1;
  	    	}
  	    	.right{
  	    		text-align: center;
  	    		flex: 1;
  	    		.name{
  	    			position: relative;
  	    		}
  	    		.name:after{
  	    			content: '>';
  	    			display: inline-block;
  	    			width: 0.5333rem;
  	    			height: 0.5333rem;
  	    			position: absolute;
  	    			top: 0.2667rem;
  	    			right: 0.5333rem;
  	    			opacity: 0.4;
					color: #FFFFFF;
  	    		}
  	    	}
  	    	.name{
  	    
				font-size: 0.4rem;
				letter-spacing: 0.0043rem;
				line-height: 0.5333rem;
				margin-top: 0.4rem;	 
				color: #88C8FE;
				 

				/* a{
					 
					 
					span{
					font-size: 0.32rem;
					line-height: 0.5333rem;
					}
					 
				} */
				
  	    	}
  	    	.value{ 	    		
 
				font-size: 0.6133rem;
				color: #FFFFFF;
				letter-spacing: 0.28px;
				letter-spacing: 0.0056rem;
				line-height: 1.0667rem;
  	    	}
  	    }

  	}

  	.item-list{
         padding-top: 0.12rem;
         .line{
         	/* margin: 0 0.3733rem;
         	height: 0.0267rem;
         	background: #E4E4E4; */
         }
  		.item{
  			
  			display: flex;
  			flex-flow: row;
  			margin: 0 0.3733rem;
  			padding: 0.2333rem 0;

  			border-bottom: 0.0267rem solid  #E4E4E4;
  			 
  			>div{
  				flex: 1;

  				&.left{
  					text-align: left;
					div:first-child{

						font-size:0.4267rem;
						color: #303030;
						letter-spacing: 0.0056rem;
						padding: 0.2067rem 0;

  					}
	  				div:last-child{
                        padding: 0.08rem 0;
						font-size: 0.32rem;
						color: #AAB0C0;
						letter-spacing: 0.0043rem;
	  				}
  				}
  				&.right{
					text-align: right;
					div:first-child{
						padding: 0.15rem 0;
						font-size: 0.48rem;
						color: #FD2601;
						letter-spacing: 0.0056rem;

  					}
	  				div:last-child{
						padding: 0.08rem 0;
						font-size: 0.32rem;
						color: #AAB0C0;
						letter-spacing: 0.0043remx;

	  				}
  	
  				}
                
  			
  			}



  		}
  	}

  	.show-more{
				line-height: 1.0667rem;
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

</style>