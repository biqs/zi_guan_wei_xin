<template>
  <div class="index" >
      <div class="my-info">
        <div class="title">我的总资产(元)</div>
        <div class="count" v-text='totalAsset'></div>
        <div class="yCount">昨日收益 
           <router-link to="/mine" class="more">{{prevProfit}} ></router-link>
        </div>
      </div>
<!--       <div class="" v-for='(nItem ,i) in notice' v-if='nItem.isShow'  >
             <img class="noticeIcon" :src="noticeIcon">   {{nItem.title | subStr(15)}}   
             <a class="more-info" :href="nItem.linkUrl">详情</a>
      </div>
       -->
    
       <swiper :options="swiperOption" class="swiper-box top-header">
            <swiper-slide class="swiper-item"  v-for='(nItem ,i) in notice'>
                <img class="noticeIcon" :src="noticeIcon">   {{nItem.title | subStr(15)}}   
                 <a class="more-info" :href="nItem.linkUrl">详情</a>
            </swiper-slide>     
        </swiper>
    
     

    
     
      <div class="index-banner" v-if='bannerList.length !=0' @touchmove.stop='stopMove($event)' >
        <mt-swipe :auto="4000" class='index-swipe'>
            <mt-swipe-item v-for="banner in bannerList">
              <div class="banner-item">
                <a :href="banner.linkUrl">
                   <img :src="banner.imgUrl">
                </a>              
              </div>
            </mt-swipe-item>
          
        </mt-swipe>
      </div>
      <div class="list-view">
        <header class="list-header">热门</header>
        <section>

            <div class="hot-item" v-for='item in items' :key="$index" @click="goTo(item.prdtCode,item.prdtType)" >
           
              <div class="left">
                  <span class="pre_num">{{item.yieldValue | subLength(2)}}<font v-if='item.yieldValue'>%</font></span>
                  <span class="name">{{item.yieldDesc}}</span>
              </div>
              <div class="right">
                
                <div class="title">{{item.name | sub-str(12)}}</div>
                <div class="type-item">
                   <div v-if='item.labelList' v-for="type in item.labelList">{{type.title}}</div>    
                </div>
              </div> 

            </div>  

        <!--     <contact/> -->



        </section>
      </div>

  </div>
</template>

<script>

  import 'mint-ui/lib/style.css'
  import Vue from 'vue';
  import { Swipe, SwipeItem } from 'mint-ui';
  import { basePath } from 'src/common/js/config';

 
  import VueAwesomeSwiper from 'vue-awesome-swiper'

  Vue.component(Swipe.name, Swipe); 
  Vue.component(SwipeItem.name, SwipeItem);
/*  Vue.use(VueAwesomeSwiper)*/
  import {isEmpty} from 'src/common/js/unit';

  import noticeImg from 'src/common/images/iconfont-webtubiaoku08@3x.png';

  import contact from 'src/components/common/Contact';
  import { EcifId } from 'src/common/js/global';

import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'index',
  data () {
    return {
      num: 10,
      hasData: true,
      items:[],
      bannerList:[],
      bulletinList:[],
      notice:Object,
      noticeUrl :'',
      noticeIcon: noticeImg,
      totalAsset: '' , //总资产
      prevProfit :'' , //昨日收益
      swiperOption: {
          direction: 'vertical',
          
          autoplay: 3500,
          initialSlide: 0,
          loop: true
    
        }
    }
  },created(){
          this.loadData();
    
  },filters:{
      subLength:function(val,len){
        if(isEmpty(val)){
           return '--';
        }else{
           return  parseFloat(val).toFixed(len);
        }
       
      },
      subStr: function(val, len){
        if(val){ 
          if(val.length < len){
            return val
          }else{
            return val.substring(0, len) + '...'
          }
        }
       
      }

  },components:{
    contact,swiper,
    swiperSlide
  } 
  ,
  methods:{
       loadData (){
      
             this.axios.get(basePath + '/weixin/asset_management/index',{params:{
                '_dt' : new Date().getTime(),
                ecifId: EcifId()
              }})
             .then((response) => {
              if(response.data){
                 if(response.data.flag.code==0){
                  this.items = response.data.productList;
                  this.bannerList = response.data.bannerList;
                  this.bulletinList = response.data.bulletinList; 
                  this.totalAsset = response.data.totalAsset;
                  this.prevProfit = response.data.prevProfit;   
               } 
              }
            
                 
             })


   /*      this.axios.get(basePath+'/weixin/asset_management/myAccount' ,
          {
            params:{
              ecifId: EcifId(),
              '_dt' : new Date().getTime()
            }
          }).then((response)=>{
          if(response.data.flag.code==0){
            this.totalAsset = response.data.totalAsset;
            this.prevProfit = response.data.prevProfit;
            
          }
          
        })*/
      },goTo(_code, _type){
        
        let _href  =''
        if(_type == 1){
           _href = 'pro_cash_detail.html?prdtCode=' + _code  + '&type='  + _type;
        }else if( _type == 2){
          _href = 'pro_static_detail.html?prdtCode=' + _code  + '&type='  + _type;
        } else if(_type == 3){
          _href = 'pro_float_detail.html?prdtCode=' + _code  + '&type='  + _type;
        }
        window.location.href =  _href ;        
      },
      stopMove(event){
          event.preventDefault();
          event.stopPropagation()
           
      } 
  },watch:{
    bulletinList:function(val,old){
      
      if(val.length > 0){
        this.notice = val
        for (var i = this.notice.length - 1; i >= 0; i--) {
            if(isEmpty(this.notice.linkUrl)){
                 this.notice[i].linkUrl = 'notice.html?index=' + i //跳转        
              }
        }    
        
      }
    }
  }
}
</script>

 
<style lang="scss">
 
.banner-item{
  height: 100%;
  width: 100%;
}
.banner-item{
  img {
    width: 100%;
    height: 100%;
  }
}

@mixin box-sizing ($sizing) {
    -webkit-box-sizing:$sizing;     
       -moz-box-sizing:$sizing;
            box-sizing:$sizing;
}
@mixin row-height ($height){
  height: $height;
  line-height: $height;
}

  .swiper-box {
   
  }
  .swiper-item {
   
  }

$border-color: #e4e4e4;

.index{

  .my-info{
    height: 4.0rem;
    background: #008CF3;
    text-align: center;

    .title{
      font-size: 0.4rem;
      color: #88C8FE;
      letter-spacing: 0.0048rem;
      padding-top: 0.6933rem;
      line-height: 0.48rem;
    }
    .count{
      line-height: 0.96rem;
      font-size: 1.12rem;
      color: #FFFFFF;
      letter-spacing: 0.0133rem;
      padding-top: 0.1867rem;
       
    }
    .yCount{

      font-size: 0.4rem;
      color: #88C8FE;
      letter-spacing: 0.18px;
      line-height: 0.48rem;
      padding-top:0.5333rem;
      .more{

        font-size: 15px;
        color: #FFFFFF;
        letter-spacing: 0.18px;
      }
    }
  }
   /* header */
  
  .top-header{

     .noticeIcon{
        width: 0.48rem;
        vertical-align: middle;
        position: relative;
        top: -0.0267rem;
        margin-right: 0.08rem;
     }
    height: 0.88rem;
     line-height: 0.88rem; 

     /* height: 0.9333rem;
     line-height: 0.9333rem;  */ 
     font-size:0.3733rem;
     color: #808080;
     text-indent: 0.2667rem;
     border-top: 0.1333rem solid #efeff5;
     border-bottom: 0.1333rem solid #efeff5;
     padding: 0 0.0533rem;
     @include box-sizing(content-box);

     .more-info{
      float: right;
      height: 0.9333rem;
      line-height: 0.9333rem;
      color: #808080;
      padding-right: 15px;
     }

  }

  /* banner */

  .index-banner{
     height: 3rem;

     .index-swipe {
         height: 3rem;
           .mint-swipe-indicators {
            bottom: 0.16rem;
           }
           .mint-swipe-indicator{
            width: 0.2133rem;
            height:0.2133rem;
            opacity: .8;
            margin: 0 0.1rem;
            background: #e8e8e8;
           }

           .mint-swipe-indicators .is-active{
              background : #1E7EE8  !important;
           }


     }
}



   /* hot list */
  .list-view{

    .list-header{
      color: #808080;
      line-height: 0.8rem;
      border-top: 0.1333rem solid  #efeff5;
      border-bottom: 0.0267rem solid $border-color;
      line-height: 0.8rem;
      font-size: 0.3733rem;
      text-indent: 16px;
      @include box-sizing(content-box);

    }

    .hot-item{
      margin: 0 0.3733rem;
      border-bottom: 0.0267rem solid $border-color;
      @include box-sizing(border-box);
      //height: 2.2933rem;
      padding: 0.56rem 0;
      display: flex;
      height: 2.56rem;
      
      /* flex-flow: row; */
   
      .left{
        width: 2.6933rem;
        padding-right: 0.3067rem;
        @include box-sizing(content-box);
        border-right: 0.0267rem solid $border-color;

        .pre_num{
        
          font-size: 0.6933rem;
          color: #FD2601;
          display: block;
       
          @include row-height( 1.0133rem);
          font{
            font-size: 0.4267rem;
          }
        }
        .name{
          display: block;
          font-size: 0.32rem;
          color: #AAB0C0;
          //@include row-height(0.48rem);
          line-height: .45rem;
        }
      }
      .right{
          padding: 0 0 0 0.5067rem;
        /*   flex: auto; */
          width: 6.8rem;
          //@include box-sizing(border-box);
         .title{
            @include row-height(0.9333rem);
            font-family: PingFangSC-Regular;
            font-size: 0.4267rem;
            color: #303030;

         }
         .type-item{
            line-height:0.4267rem; 
            @include box-sizing(border-box);
            font-size:0.2667rem;
            color: #FE9D83;     
            display: box;
            flex-direction: row;
            display: -webkit-box;
    
          /*   flex-flow:row wrap;       */
            div{
               display: inline-block;
 
               border: 1px solid #FE9D83;
 
               border-radius: 0.0533rem;              
               padding: 0 0.0533rem;
               margin: 0 0.1rem 0.08rem 0;

            }
         }
      }
    }
  
  }


} 


</style>
