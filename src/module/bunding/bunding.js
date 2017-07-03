require('../../common/js/flexible');
 
 
import Vue from 'vue';
import App from './App';
import '../../common/css/reset.css';

import 'mint-ui/lib/style.css';
import '../../common/css/common.css';

import axios from 'axios'; 
import VueAxios from 'vue-axios';
import router from 'src/router/bind';
import ServerInfo from 'src/components/ServerInfo'
Vue.$ServerInfo = Vue.prototype.$ServerInfo = ServerInfo;
import Vuelidate from 'vuelidate';
import AxiosPro from 'src/common/js/AxiosPro'
AxiosPro(axios);

//axios.defaults.baseURL = 'http://localhost:8080/static/';  //数据地址
Vue.use(VueAxios, axios);
Vue.use(Vuelidate); //验证



new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  beforeCreate(){
    
  } ,
  router
  
})
