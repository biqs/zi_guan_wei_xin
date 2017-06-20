require('../../common/js/flexible');
import Vue from 'vue';
import App from './App';
import '../../common/css/reset.css';

import 'mint-ui/lib/style.css';
import '../../common/css/common.css';
 
import axios from 'axios'; 
import VueAxios from 'vue-axios';
import AxiosPro from 'src/common/js/AxiosPro'
AxiosPro(axios);

Vue.use(VueAxios, axios);
 
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
