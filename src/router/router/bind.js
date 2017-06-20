import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
	
import bunding from 'components/bunding/bunding' ;
import bundingInfo from 'components/bunding/bundingInfo' ;
import unbunding from 'components/bunding/unbunding' 
import success from 'components/bunding/success' 

import {isEmpty} from 'src/common/js/unit';
import * as Global from 'src/common/js/global';
 
let router = new Router({

  linkActiveClass:'active',

  routes: [
     {
      
      path:'/',
      redirect: '/bunding'
      
     } 
     ,
     {
     	name:'bunding',
     	path:'/bunding',
     	component:bunding,
      beforeEnter: (to, from, next) => {
         if(!isEmpty(sessionStorage.OPNEID) && !isEmpty(sessionStorage.ECIFId))
         {
           next({name:'bundingInfo'});
           // next();
         }else{
           next();
         }
         
      }
     },
     {
     	name:'bundingInfo',
     	path:'/bundingInfo',
     	component: bundingInfo,
      beforeEnter: (to, from, next) => {
         
         if(isEmpty(sessionStorage.ECIFId))
         {
           next({name:'bunding'});
         }else{
           next();
         }
         
      
        }
      },
      {
       	name:'unbunding',
       	path:'/unbunding',
       	component: unbunding,
        beforeEnter: (to, from, next) => {
           document.title='账户解绑'; 
           next();
        }
      },
      {
      name:'success',
      path:'/success',
      component: success
     },
  ]
});
sessionStorage.OPNEID = isEmpty(sessionStorage.OPNEID) ? '' : sessionStorage.OPNEID
 
router.beforeEach((to, from, next) => {
      console.log('to: ' + to)
      document.title='绑定/解绑';  
      if(to.path=='/success'){
        next();
      }else{
        if(isEmpty(sessionStorage.OPNEID)){
              Global.Access.init( function(_openId,msg){    
                    if(!isEmpty(_openId)){
                       sessionStorage.OPNEID = _openId;
                       if(isEmpty(sessionStorage.ECIFId)){
                             loadEcifId(function(){
                               next();
                             })
                       }else{
                          next();
                       }
                       
                    }else{
                      next(false);
                      alert('获取OpenId失败！')
                    }
         
              })
         }else{
                 if(isEmpty(sessionStorage.ECIFId)){
                     loadEcifId(function(){
                        next();
                     }) 
                 }else{
                     next();
                 }
                 
                // next();
               
                 
        }
      }
      
     

     

})
function loadEcifId(callback){
    
      if(isEmpty(sessionStorage.ECIFId)){
           
           Global.Access.getECIFId(sessionStorage.OPNEID, function(data){  
                if(data.flag.code==0){
                  if(!isEmpty(data.ecifId)){                 
                      sessionStorage.ECIFId = data.ecifId;
                      if (typeof callback === "function"){
                         + callback();  
                      }
                      
                  }
                }else if(data.flag.code==1){  
                      sessionStorage.ECIFId = '';
                      if (typeof callback === "function"){
                         + callback();  
                      }
                }
           })
         }
}
      
export default router;
