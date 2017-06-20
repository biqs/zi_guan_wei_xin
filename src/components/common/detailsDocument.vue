<template>
	<div>
		            <footer class="footer">
             
               <!--     <div class="panel" >
                      <div class="panel-header" @click='show(1)'>
                           <div>交易规则</div> 
                           <div><img   :class="{'active': isActive1}" src="../../common/images/down@2x.png"></div>
                           
                      </div>
                      <div class="panel-body"  :class="{'active': isActive1}">
                         <div class="rule">
                  

                            <div class="rule-item">
                                  <div class="title">
                                    销售起始时间
                                  </div>   

                                  <div class="line-spoint">
                                    <div class="line"></div>   
                                    <div class="spoint"></div> 
                                  </div>
                                  <div class="name">
                                    T日
                                  </div>
                  
                            </div>

                              <div class="rule-item">
                                  <div class="title">
                                    享受收益
                                  </div>

                                  <div class="line-spoint">
                                    <div class="line"></div>   
                                    <div class="spoint"></div> 
                                  </div>
                                  <div class="name">
                                    T+1日
                                  </div>
                  
                            </div>

                         </div>
 
                      </div>

                  </div>
                   -->
                    <div class="panel" >
                      <div class="panel-header" @click='show(2)' :class="{'p-header-active': isActive2}">
                           <div>计划公告</div> 
                           <div><img   :class="{'active': isActive2}" :src="imgUrl"></div>
                           
                      </div>
                      <div class="panel-body" :class="{'active': isActive2  }">
                                <div v-if="!isEmpty(product.planList)">
                                    <div class="p-item" v-for="(item,index) in product.planList" @click='goto(item.reportId)'>
                                       {{item.reportTitle}}  
                                       <div class="p-item-time"> {{item.reportDate}} </div>
                                    </div >
                                </div>
                                <div class="text-center p-empty" v-else> 暂无数据！</div>

                      </div>

                  </div>
                      <div class="panel" >
                      <div class="panel-header" @click='show(3)' :class="{'p-header-active': isActive3}">
                           <div>法律文件</div> 
                           <div><img  :class="{'active': isActive3  }" :src="imgUrl"></div>
                           
                      </div>
                      <div class="panel-body "    :class="{'active': isActive3  }" >
                                <div v-if="!isEmpty(product.legalList)" >
                                    <div class="p-item" v-for="(item,index) in product.legalList" @click='goto(item.reportId)'>
                                       {{item.reportTitle}}  
                                       <div class="p-item-time"> {{item.reportDate}} </div>
                                    </div >
                                </div>
                                <div class="text-center p-empty" v-else> 暂无数据！</div>
                      </div>

                  </div>


                    <div class="panel" >
                      <div class="panel-header" @click='show(1)' :class="{'p-header-active': isActive1}">
                           <div>投资主办</div> 
                           <div><img  :class="{'active': isActive1  }" :src="imgUrl"></div>
                           
                      </div>
                      <div class="panel-body "    :class="{'active': isActive1  }" >
                                <div v-if="!isEmpty(product.managerList)" >
                                    <div class="p-item" v-for="(item,index) in product.managerList" >
                                      
                                       <header>
                                       	<img :src="userPicUrl" class="user-header">   <div class="user-info">
                                       	    <div class="user-name">{{item.name}}</div>
                                       	   <div class="user-degree">{{item.degree}}</div>
                                       	   </div>
                                       </header>

                                       <p class="user-intro">{{item.introduction}}</p> 
                                      
                                    </div >
                                </div>
                                <div class="text-center p-empty" v-else> 暂无数据！</div>
                      </div>

                  </div>

        </footer>

	</div>
</template>
<script>
import downPic from 'src/common/images/down@2x.png';
import userPic from 'src/common/images/user.png'

export default{
			name:'docList',
			props:['product'],
			data(){
				return{
					isActive1 : false,
			        isActive2 : false,
			        isActive3 : false,
			        imgUrl : downPic,
			        userPicUrl : userPic  
				}
			},
			methods:{
		 	  isEmpty(arr){
		        if(arr && arr.length > 0){
		          return false
		        }else{
		          return true
		        }
		      },
			   show(type){
			          if(type ==1){
			            this.isActive1 = !this.isActive1;
			          }
			          if(type ==2){
			            this.isActive2 = !this.isActive2;
			          }
			          if(type ==3){
			            this.isActive3 = !this.isActive3;
			          }
      			},
      			goto(id){
      				 window.location.href =  'doc_detial.html?id=' + id + "&_dt=" + new Date().getTime() ;   
      			}

			}

		}
</script>
<style lang="scss">
 @mixin box-sizing ($sizing) {
    -webkit-box-sizing:$sizing;     
       -moz-box-sizing:$sizing;
            box-sizing:$sizing;
}
@mixin row-height ($height){
  height: $height;
  line-height: $height;
}
 

$borderColor :  #efeff5;
	  .panel{

        .panel-header{
           @include row-height(1.3333rem);
           font-size: 0.4267rem;
           color: #303030;
           padding: 0  0.4267rem;
           display: flex;
           flex-flow: row;
           >div{
            flex: 1;

            &:last-child{
              text-align: right;
            }
           }

           img{
            width: 0.4rem;
            transition: all .3s ease; 
           }
           img.active{
            transform:rotate(-180deg);   
           }

        }
        .panel-body{

          font-size: 0.3733rem;
          padding: 0  0.4267rem;
          transition: all 1s ease; 
          height: 0;
          overflow: hidden;

           
          &.active{
             height: auto;
          }
          header{
          	padding: 0.1333rem 0;
          }
          .user-header{
          	display: inline-block;
          	width: 0.9067rem;
          }
          .user-info{
          	display: inline-block;
          }
          .user-name{
          	font-size: 0.3733rem;
          	color: #7b7b7b;
          }
          .user-degree{
          	font-size: 0.32rem;
          	color: #afafaf;
          }
          .user-intro{
          	text-indent: 2em;
          	margin: 0.1333rem 0;
          	line-height: 0.5333rem;
          }

        }
        border-bottom: 0.0267rem solid $borderColor;

    }


/* 交易规则 */
.rule{

  display: flex;
  flex-flow: row;
  padding: 0 0.9867rem;
      .rule-item{
        flex: 1;

      }
          .title{
            @include row-height(0.9333rem);
            font-family: PingFangSC-Regular;
            font-size: 0.32rem;
            color: #808080;
            margin-top: 0.24rem;
            text-align: center;
          }
          .name{
            font-family: PingFangSC-Regular;
            font-size: 10px;
            color: #AAB0C0;
            @include row-height(0.9067rem);
            text-align: center;
          }

        .line-spoint{
            height: 0.2667rem;
            position: relative;
            width: 100%;

               .line{
                    height: 0.0533rem;
                    background:rgba(148,180,221,1);
                   
                    position: absolute;
                    top: 0.1067rem;
                    width: 100%;
          

          /*   padding: 0.1333rem 0;
       */
            
          }
        .spoint{
            background: #FFFFFF;
            border: 0.0533rem solid #94B4DD;
            height: 0.2667rem;
            width: 0.2667rem;
            border-radius:50%;
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -0.1333rem;
            @include box-sizing(border-box);
        }


    }
}      
</style>