const ECIF_ID = '941005749379,99F856313653';
const C_TYPES = [	
						{code:'103100','name':'身份证'},
						{code:'103142','name':'护照'},
						{code:'103112','name':'军官证'},
						{code:'103111','name':'解放军士兵证'},
						{code:'103121','name':'武警士兵证'},
						{code:'103161','name':'港澳居民来往内地通行证'},
						{code:'103130','name':'户口簿'},
						{code:'103140','name':'外国护照'},
						{code:'103113','name':'解放军文职干部证'},
						{code:'103123','name':'武警文职干部证'},
						{code:'103122','name':'警官证'},
						{code:'103162','name':'台湾居民来往大陆通行证'},
						{code:'103165','name':'外国人永久居留证 '},
						{code:'103210','name':'全国组织机构代码'},
						{code:'103200','name':'营业执照'},
						{code:'103260','name':'行政机关'},
						{code:'103223','name':'社会团体'},
						{code:'103240','name':'军队'},
						{code:'103250','name':'武警'},
						{code:'103280','name':'下属机构'},
						{code:'103290','name':'基金会'}
					]
const WEI_XIN = 'https://open.weixin.qq.com/connect/oauth2/authorize?';
const APP_ID = 'wx57313019abd38b6e';  // wx1d7bd0479ef285fb (g.zhangle.com)  //wx57313019abd38b6e(145) wx57313019abd38b6e

import store from 'src/store/bunding';
import axios from 'axios'; 
import AxiosPro from './AxiosPro';
AxiosPro(axios);
import { Bunding } from './config';
import { isEmpty } from 'src/common/js/unit';
 
//sessionStorage.ECIFId =  ECIF_ID;//ECIF_ID;
//sessionStorage.OPNEID  ='';
//sessionStorage.OPNEID =   'ohmg11QIMPERc1nY68ypzobbGGlY' //'oNUnUwwFsEzOst9utK_vK2buJ0z0'

 
module.exports = {
 	EcifId : function(){
 		return  sessionStorage.ECIFId;
 	},
 	OpenId : function(){
 		return  sessionStorage.OPNEID;
 	},
 	 
 	clearStorage:function(){
 		        sessionStorage.OPNEID = '';
				sessionStorage.ECIFId = ''
 	},
 	Certificates :{  //证件
 		name:function(){
 			let names =[]
 			for (var i = 0 ; i < C_TYPES.length ; i++) { 
 			 	names.push(C_TYPES[i].name)
 			}
 			return names; 
 		},
 		getCode(name){
 			for (var i = 0 ; i < C_TYPES.length ; i++) {
 			 	 if(C_TYPES[i].name == name){
 			 	 	return C_TYPES[i].code
 			 	 }
 			}
 		}
 	},
 	Access:{

 		getAccessWXUrl: function(){
 			let _href = location.href
		        if((_href.indexOf('?') != -1) && (_href.indexOf('#') !=-1)){
		           	_href = _href.replace(/\?.*\#/,'#');  //替换失效时路径里面包含的旧code
		        }
		    let redirect_uri = encodeURIComponent(_href);//
 	 
 			let _href_1 = WEI_XIN + 'appid=' +APP_ID + '&redirect_uri=' + redirect_uri +
 			'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'		   
 			return _href_1  
 		},
 		getQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null)
			return unescape(r[2]);
			return ''; 
		},
		getLocationCode(){
			return this.getQueryString('code')
		},
		hasOpenId(){
            return !isEmpty(sessionStorage.OPNEID);			 
		},
		hasToken(){
			return !isEmpty(sessionStorage.token);	
		},
		init(fn){
				 
				/*if(!this.hasOpenId()){
					let _access_code = this.getLocationCode()
					if(_access_code == null){
						 location.href =  this.getAccessWXUrl()
					}else{
						   
						 this.getOpenId(_access_code,fn)
					}
				}*/

				if(!this.hasToken()){
					let _access_code = this.getLocationCode()
					if(isEmpty(_access_code)){
						 location.href =  this.getAccessWXUrl()
					}else{  
						 this.getOpenId(_access_code,fn)
					}
				}

		},
		getOpenId(_code,fn){
		    //let testUrl = 'http://ec2-54-223-194-136.cn-north-1.compute.amazonaws.com.cn'
			axios.get(Bunding.getOpenId,{
				params:{
					code: _code
				}
			}).then((response)=>{
				if(response.data.flag.code==0){
					 
					if (typeof fn === "function"){
            			+fn(response.data); 
        			}
				 
				}else{
					 alert(response.data.flag.msg);
					 
				}
			}).catch((error)=>{
				//alert('getOpenId 请求异常！');
 				console.log(error);
			})
		},
		getECIFId(_openId, fn){
			
			 if(!isEmpty(_openId)){
				    axios.get(Bunding.getECIFId,{
				      params:{
					      openId: _openId 
				   	  }
				    }).then((response)=>{
					 
						if(response.data){

							 if (typeof fn === "function"){
            						+fn(response.data); 
        					 }
        				}
						
				   }) 
			 } 
		}
 	}  


 }