import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import { Indicator,MessageBox} from 'mint-ui';
 
//首页

//const Index = r => require.ensure([], () => r(require('src/components/index/index')), 'index');
import Index from 'src/components/index/index';
//产品
//const CashManager = r => require.ensure([], () => r(require('src/components/production/cashManager')), 'product');
//const PrdtCategory = r => require.ensure([], () => r(require('src/components/production/categoryPrdt')), 'product')
import CashManager from 'src/components/production/cashManager';
import PrdtCategory from 'src/components/production/categoryPrdt';

 
//我的
import Mine from 'src/components/mine/index';
import mineMain from 'src/components/mine/main';
import mineList from 'src/components/mine/list';
import mineDetial from 'src/components/mine/detial';

//const Mine = r => require.ensure([], () => r(require('src/components/mine/index')), 'mine');
//const mineMain = r => require.ensure([], () => r(require('src/components/mine/main')), 'mine');
//const mineList = r => require.ensure([], () => r(require('src/components/mine/list')), 'mine');
//const mineDetial = r => require.ensure([], () => r(require('src/components/mine/detial')), 'mine');
 
//保持位置
const scrollBehavior = (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
} 
let router = new Router({
  linkActiveClass:'active',
  scrollBehavior,
  routes: [
   
	{
	  path: '/index',
		component: Index
	},
  {   
    path: '/product',
    redirect: '/product/1'  //重定向
  },
	{
    name: "product",
		path: '/product/:type',
		component: CashManager
	},
  {
    name: "prdtCategory",
    path: '/product/:type/:category/:name',
    component: PrdtCategory
  },
	{
		path: '/mine',
		component: Mine,
		children:[
			{		
				path: '',
				component: mineMain
        
			},
      {   
        path: 'list',
        component: mineList      
      },       
			{		
        name:'mineDetial',
				path: 'mineDetial/productCode/:product_code/month/:month',
				component: mineDetial       
			}
		]
	} 
 	 
  ]
});

 
import {isEmpty} from 'src/common/js/unit';
import * as Global from 'src/common/js/global';
 
sessionStorage.OPNEID = isEmpty(sessionStorage.OPNEID) ? '' : sessionStorage.OPNEID
router.beforeEach((to, from, next) => {
      
    

      let path = to.path
      if(path.indexOf('index') != -1){
           document.title='首页';  
      }else      
      if(path.indexOf('product') != -1){
           document.title='产品'; 
      }else   
      if(path.indexOf('mine') != -1){
            document.title='我的资产'; 
      }

      if(isEmpty(sessionStorage.OPNEID) || isEmpty(sessionStorage.ECIFId)){
        
         
         if(isEmpty(sessionStorage.OPNEID)){
              Global.Access.init( function(_openId,msg){       
              if(!isEmpty(_openId)){
                  sessionStorage.OPNEID = _openId;    
                  if(isEmpty(sessionStorage.ECIFId)){
                             loadEcifId(function(){
                               next();
                  });
                            
                  }      
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
             
          }

        

      }else{
        Indicator.open({
                spinnerType: 'fading-circle'
        });
        next();                
      }
      

})

function loadEcifId(callback){
      Indicator.open({
         spinnerType: 'fading-circle'
      });

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
                    MessageBox.confirm('您暂未绑定资产账户，点击确定绑定?').then(action => {
                        if(action =='confirm'){
                           sessionStorage.OPNEID = '';
                           sessionStorage.ECIFId = '';
                           location.href= 'bunding.html#/bunding'; 
                        }
                    }); 
                }
           })
         }
}
export default router; 