<template>
  <div id="app" class="showMask pt-relative" :class="{'showAll' : showAll}">
     
  <div class="top-header"   >
      <div class="name" v-text="product.name" v-cloak>
     
      </div>
      <div>
 
        <span class="tag" v-if='!isOpEmpty(product.labelList)' >{{product.labelList.length>0 ? product.labelList[0].label : ''}}</span>
      
        
      </div>
      <div class="more">
          <div class="left">
             <div>业绩比较标准</div>
             <div> {{product.yieldValue}}</div>
          </div>
          <div class="right">
              <div>销售起始日：{{product.startDate}} </div>
              <div>销售终止日：{{product.endDate}} </div>
              <div>产品到期日：{{product.maturityDate ? product.maturityDate : '--'}} </div>
          </div>
                    
      </div>
  </div>

  <div class="center-container ">
    <div class="header">往期产品收益</div>
    <div class="list-view">
     <!--    <div class="main-box">  --> 
        <div class="item-header">
           <!--    <div class="name">产品名称</div> -->
              <div class="start-date"> 销售起始日 </div>
              <div class="end-date text-center">销售终止日  </div>
              <div class="days text-center" > 存续期</div>
              <div class="score text-center">业绩比较标准</div>
        </div>
        <div class="item" v-for="item in tempItems" v-if='item.startDate'>  
          <!--     <div class="name">{{item.prdtName}} </div> -->
              <div class="start-date">{{item.startDate}} </div>
              <div class="end-date text-center">{{item.endDate}}</div>
              <div class="days text-center"> {{item.timeLimit ? item.timeLimit : '--'}}</div>
              <div class="score text-center">{{item.yieldValue ? item.yieldValue : '--'}}</div>
        </div>

       <!--  </div> -->
      </div>
      <div class="show-more" v-if='showMore' @click='loadMore()'>
          展开更多 <img src="../../common/images/double_down_arrow@2x.png">
      </div>
  </div>



  <doc :product='product'/>
  <contact/>
   
 
  
     
  </div>
</template>

<script>

  import { basePath , jsPath } from 'src/common/js/config';
  import { getQueryString } from 'src/common/js/unit';
  import contact from 'src/components/common/Contact';
  import Doc from 'src/components/common/detailsDocument';
  import {isEmpty} from 'src/common/js/unit';
  import * as Global from 'src/common/js/global';
  import { Bunding } from 'src/common/js/config';
  import  * as WeXin from 'src/common/js/WeXin';
  
  const PAGE = 1;
  const PAGE_SIZE = 6;
 
  
  export default {
    name: 'app',
    data(){
      return{
            
        showAll: false,
        code : getQueryString("prdtCode"),
        type :  getQueryString('type'),
        page: PAGE,
        pageSize: PAGE_SIZE,
        showMore: true,
        product: Object,
        pastCount: 0,
        tempItems:[],
        pastList: []
   

      }
    },watch:{
      pageSize: function(){
         this.filterItems();  
      },
      product: function(){
         this.showAll = true;
      }
    },mounted(){
                       
                  
         this.loadData();
         
  
    } ,
     
    components: {
            contact , Doc
    },
    methods:{
      isOpEmpty(arr){
        if(arr && arr.length > 0){
          return false
        }else{
          return true
        }
      },
      loadData(){

        var _this = this;

        if(isEmpty(sessionStorage.token)){
              if(isEmpty(getQueryString(Global.OpenIdParam))){
                 Global.Access.init( function(data){  
                 sessionStorage.token = data.token;    
                 sessionStorage.bindStatus = data.bindStatus;
                    if(sessionStorage.bindStatus=='0'){
                      location.href= 'bunding.html#/bunding'; 
                    }else{
                      _this.loadData();             
                    }       
                })
              }else{
               
                this.axios.get(Bunding.getOpenId, {
                    params:{
                      code: getQueryString(Global.OpenIdParam)
                    }
                }).then((response)=>{
                       
                  if(response.data.flag.code==0 || response.data.flag.code=="0"){
                      sessionStorage.token = response.data.token;    
                      sessionStorage.bindStatus = response.data.bindStatus;
                    
                      if(sessionStorage.bindStatus=="0"){
                          location.href= 'bunding.html#/bunding'; 
                      }else{
                          _this.getInitData();            
                      }
                  }else{
                    alert(response.data.flag.msg)
                  }
                }).catch(function (error) {
                    console.log(error);
                });
              }  
        }else{             
            this.getInitData();
        }
    
       
      },
      getInitData(){
              this.axios.get(basePath+'/weixin/asset_management/product_details',{
                  params:{
                    prdtCode: this.code,
                    type : this.type,
                    timeType: 1,
                    page: this.page,
                    pageSize :100,
                    planBulletion: 6502,
                    legalBulletion: 11,
                    _dt: new Date().getTime()
                  }
                }).then((response)=>{
                   if(response.data){
                     if(response.data.flag.code ==0){
                       this.product = response.data.productInfo;
                       this.pastCount = response.data.productInfo.pastCount;
                       this.pastList = response.data.productInfo.pastList;
                       this.showMore =  this.product.pastList.length == this.pageSize ? true : false;  
                       this.filterItems();
                    }
                   }   
                })
                WeXin.init();
      },
      loadMore(){
        this.pageSize += PAGE_SIZE;
      },
      filterItems(){
            this.showMore =  this.pageSize < this.pastCount ? true : false;
            this.tempItems =  this.pastList.slice(0,this.pageSize);
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
 



$borderColor :  #efeff5;

 .top-header{
      padding: 0 0.4rem;
      
      border-bottom: 0.1333rem solid $borderColor;

      .name{

        font-size: 0.48rem;
        color: #303030;
        line-height: .8rem;
        padding: .25rem 0;
        
      }
      .tag{
        border: 1px solid #FE9D83;
        border-radius: 0.0533rem;
        color: #FE9D83;
        padding: 0.0267rem 0.0533rem;
        display: inline-block;
        font-size: 12px;
        line-height: .4267rem;
      }

      .more{
        display: flex;
        flex-flow: row;
        margin-top: 0.64rem; 

        >div{
          flex:1;
          
          &.left{
            div:first-child{
              font-family: PingFangSC-Regular;
              font-size: 0.3733rem;
              color: #808080;
              @include row-height(0.5867rem);
            }
            div:last-child{
               @include row-height(1.3333rem);
               font-family: PingFangSC-Regular;
               font-size: 0.9067rem;
               color: #FD2601;
            }
          }
          &.right{
            text-align: right;
            div{
              @include row-height(0.5333rem);
              font-size: 0.32rem;
              color: #AAB0C0;
            }
          }
        }
      }

 }

 .center-container{
    border-bottom: 0.1333rem solid $borderColor;
  
    .header{
        padding: 0 0.4267rem;
        font-size: 0.4267rem;
        color: #303030;
        @include row-height(1.3333rem);
        @include box-sizing(content-box);
        border-bottom: 0.0267rem solid $borderColor;
    }

    .list-view{
/*        overflow-x: auto;
      .main-box{
          width: 150%;
      } */
      .item , .item-header{
         padding: 0 0.4267rem;
         @include row-height(1.0667rem);
         @include box-sizing(border-box);
         border-bottom: 0.0267rem solid $borderColor;
         display: flex;
         flex-flow: row;
         div{
              flex:1;
              white-space:nowrap;
        
         }
         div.name{
          flex: 2;
         }
       
         .days{
              width:0.96rem;
         }
      }
      .item-header{
           
            font-size: 0.32rem;
            color: #AAB0C0;
      }
      .item{
            font-size: 0.3733rem;
        .start-date , .end-date ,.days{ 
            color: #808080;
        }
        .score{
            color: #FD2601;
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


  
</style>