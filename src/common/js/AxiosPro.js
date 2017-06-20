/*配置axios*/
 
import {Indicator,MessageBox} from 'mint-ui';
const WEI_XIN = 'https://open.weixin.qq.com/connect/oauth2/authorize?';
const APP_ID = 'wx57313019abd38b6e';  // wx1d7bd0479ef285fb (g.zhangle.com)  //wx57313019abd38b6e(145) wx57313019abd38b6e

export default function(axios){
		axios.defaults.timeout = 5000;
		// 在发送请求之前做些什么
		axios.interceptors.request.use(function (config) {
		    //Open请求加载...

		    Indicator.open(); 	
		    config.params.token = sessionStorage.token        
		    return config;
		  },function (error) {
		    Indicator.close();
		    return Promise.reject(error);
		}) 
		// 添加响应拦截器
		axios.interceptors.response.use(function (response) {

		    Indicator.close();
		    if(response.data){
		      if(response.data.flag){
		        if(response.data.flag.code){
		        		let _code = response.data.flag.code;
		          		if( _code== -1 || _code== -2 ){   // ecifId 错误
				              MessageBox.alert('系统错误！', '提示');     
				                 
		           		}else if(_code == -504){  //没有绑定

		           			MessageBox.confirm('您暂未绑定资产账户，点击确定绑定?').then(action => {
		                        if(action =='confirm'){
		                           location.href= 'bunding.html#/bunding'; 
		                        }
                    		}); 

		           		}else if(_code == -502){  //超时 ？ 
		           			sessionStorage.token = '';
		           			let _href = location.href;
		           			if((_href.indexOf('?') != -1) && (_href.indexOf('#') !=-1)){
		           				_href = _href.replace(/\?.*\#/,'#');
		           			};
		           			let redirect_uri = encodeURIComponent(_href); 
 							location.href = WEI_XIN + 'appid=' + APP_ID + '&redirect_uri=' + redirect_uri +'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';		
		           		 
		           		} 

		          
		          }  
		      }
		    }
		    //Colse请求加载...
		   
		    return response;
		  }, function (error) {   
		    Indicator.close(); 
		    return Promise.reject(error);
		});


}