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
         if( sessionStorage.bindStatus == "1")
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
         if(sessionStorage.bindStatus == "0")
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
      
      document.title='绑定/解绑';  
      if(to.path=='/success'){
        next();
      }else{
            if(isEmpty(sessionStorage.token)){

              Global.Access.init( function(data){       
                sessionStorage.token = data.token;
                sessionStorage.bindStatus = data.bindStatus;
                next();          
              })
            }else{
              next();
            }
      }
      
     

     

})
 
      
export default router;
