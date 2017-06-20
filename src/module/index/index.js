require('src/common/js/flexible');
import Vue from 'vue';
import App from './App';
import 'src/common/css/reset.css';
import 'src/common/css/common.css'; 
import 'mint-ui/lib/style.css';
import 'src/common/css/index.css'; 



import router from 'src/router/index';
import axios from 'axios'; 
import VueAxios from 'vue-axios';
import AxiosPro from 'src/common/js/AxiosPro'

AxiosPro(axios);

Vue.use(VueAxios, axios);
 

//axios.defaults.baseURL = 'http:/localhost:8080/';  //数据地址

 // 注册
Vue.filter('sub-str', function (val , len=40) {
  // 返回处理后的值

   if(val){ 
          if(val.length < len){
            return val
          }else{
            return val.substring(0, len) + '...'
          }
   }
})
sessionStorage.openId = Math.random()*(20-10)+10; 
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  beforeCreate(){
    console.log('app create!~!')
  } 
  
})

