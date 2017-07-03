<template>
  <div id="app">
        
        <div class='tab-contanier'>
          <transition  name="component-fade"  mode="out-in" appear>
              <router-view></router-view>  
          </transition>
          <contact/>
        </div>
        <div class='tab-bar'>
              <div class='flex-box'>
                <div>
                 <router-link to="/index">
                        <img src="../../common/images/index@2x_active.png" />
                        <img class='common' src="../../common/images/index@2x.png" />
                        <span>首页</span>
                  </router-link>  
             
               
                </div>
                <div  >
                <router-link :to="{path:'/product'  , exact: true}" >
                  <img  src="../../common/images/product@3x_active.png" />
                        <img class='common' src="../../common/images/product@3x.png" />
                     
                    <span>产品</span>
                </router-link>  
                  
                </div>
                <div  >
                    <router-link to="/mine">
                        <img  src="../../common/images/mine@2x_active.png" />
                        <img  class='common' src="../../common/images/mine@2x.png" />
                      
                      <span>我的</span>
                   </router-link>  
                  
                 </div>
              </div>
        </div>
  </div>
</template>

<script>

  import {Access,OpenId} from 'src/common/js/global';
  import {Bunding} from 'src/common/js/config';
  import {isEmpty} from 'src/common/js/unit';
   import contact from 'src/components/common/Contact';
    
  export default {
    name: 'app',
    data(){
      return{
        openId: '',
        ecifId:'',
        flag: true
      }
    },
    mounted(){
      
    },
    methods:{
    
       
    },
    watch:{
      
    },components:{
       contact
    }
  }


</script>
<style lang="scss" scoped>
 

@mixin box-sizing ($sizing) {
    -webkit-box-sizing:$sizing;     
       -moz-box-sizing:$sizing;
            box-sizing:$sizing;
}

 

.tab-contanier{
  min-height: 100%;
  padding-bottom:  2.4167rem; //1.0667rem +
  @include box-sizing(border-box);
  position: relative;

  .component-fade-enter-active, .component-fade-leave-active {
      transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-active {
      opacity: 0;
  }
}
.tab-bar{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.35rem;  
    background: rgba(255,255,255,0.95);
    box-shadow: inset 0 0 0 0 #F2F2F2;
    font-family: PingFangSC-Regular;
    font-size: 0.2667rem; 
    letter-spacing: 0.0029rem;
    color: #929292;

    .flex-box{
       display: flex; 
       flex-flow: row; 
       height: 100%;
       >div{
         flex: 1 ;

         text-align: center;
        img{
          width: 0.6667rem;
          height: 0.6667rem;
          margin: 0 auto;
          display: block;
          padding: 0.21rem 0 0.08rem 0;

        }
        a{
          display: block;
          width: 100%;
          height: 100%;
          color: #929292;
          img{
            &:first-child{
              display: none;
            }

            &.common{
              display: block;
            }
           }

        
        
          
        }
        a.active {
             color: #0076FF;
              img{
                &:first-child{
                  display: block !important;
                }

               
                &.common{
                  display: none !important;
                }
              }
          }
      
         
       }

    
       span{     
         display: block;
        height: 0.32rem;
        line-height: 0.32rem;
       }
    }
 
  }
 





 </style>
