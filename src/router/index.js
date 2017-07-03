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
import  * as WeXin from 'src/common/js/WeXin'; 

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

      if(isEmpty(sessionStorage.token)){

              Global.Access.init( function(data){       
                sessionStorage.token = data.token;
                sessionStorage.bindStatus = data.bindStatus;
                if(sessionStorage.bindStatus == '0'){   //1是绑定 0是未绑定

                   MessageBox.confirm('您暂未绑定资产账户，点击确定绑定?').then(action => {
                        if(action =='confirm'){
                           location.href= 'bunding.html#/bunding'; 
                        }
                    }); 
                }else{
                  next();
                }             
              })
      }else{
         
           if(sessionStorage.bindStatus == '0'){   //1是绑定 0是未绑定

                   MessageBox.confirm('您暂未绑定资产账户，点击确定绑定?').then(action => {
                        if(action =='confirm'){
                           location.href= 'bunding.html#/bunding'; 
                        }
                    }); 
            }else{
                next();
            }    


      }
    
   
      

})

router.afterEach(route => {
  WeXin.init();
})

 
export default router; 