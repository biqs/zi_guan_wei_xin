/*配置axios*/
 
import {Indicator,MessageBox} from 'mint-ui';
const WEI_XIN = 'https://open.weixin.qq.com/connect/oauth2/authorize?';
const APP_ID = '';   
 
 
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
		           		/*	MessageBox.confirm('抱歉您当前访问的页面?').then(action => {
		                        if(action =='confirm'){
		                           
		                        }
                    		}); */

                    		location.reload(); 
		           			
		           		 
		           		}else if(_code == -503){
		           			alert(response.data.flag.msg)
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