/*winxin */
import wx from 'weixin-js-sdk';
import * as Global from 'src/common/js/global';

/*传播类
		发送给朋友: "menuItem:share:appMessage"
		分享到朋友圈: "menuItem:share:timeline"
		分享到QQ: "menuItem:share:qq"
		分享到Weibo: "menuItem:share:weiboApp"
		收藏: "menuItem:favorite"
		分享到FB: "menuItem:share:facebook"
		分享到 QQ 空间/menuItem:share:QZone
*/

/*
界面操作
	关闭当前网页窗口接口
	wx.closeWindow();


	批量隐藏功能按钮接口
	wx.hideMenuItems({
	    menuList: [] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
	});


	批量显示功能按钮接口
	wx.showMenuItems({
	    menuList: [] // 要显示的菜单项，所有menu项见附录3
	});



*/
 module.exports={
    Options:{
    		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: '', // 必填，公众号的唯一标识
		    timestamp: '', // 必填，生成签名的时间戳
		    nonceStr: '', // 必填，生成签名的随机串
		    signature: '',// 必填，签名，见附录1
		    jsApiList: ['hideMenuItems', 'closeWindow', 'hideOptionMenu'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    },
	init: function(){
        let _this = this
		this.getParam().then(function(){
			 
			wx.config(_this.Options);

			wx.ready(function () {
				console.log('hide menu!!!')
				_this.hideShareMenu();
    		 	wx.hideOptionMenu();
        	});
	
 			
			//_this.hideShareMenu();
		})
			
	},
	closeWindow(){
		wx.closeWindow();
	},
	hideShareMenu(){
		wx.hideMenuItems({
	    		menuList: ['menuItem:share:appMessage', "menuItem:share:timeline","menuItem:share:qq",'menuItem:share:QZone',"menuItem:share:weiboApp"] 
		});
	},
	getParam:function(){

		let url =    encodeURIComponent(location.href.split('#')[0]);
		var _this = this;
		return  new Promise(function (reslove, reject) {
			    Global.Access.getSign(url, function(data){
			    	let temp ={}
			    	if(data.code == 0){
			    		temp.timestamp = data.timestamp;
			    		temp.appId = data.appId;
			    		temp.nonceStr = data.nonceStr;
			    		temp.signature = data.signature;
			    		Object.assign(_this.Options, _this.Options, temp);
			    	}else{
			    		console.log(_this.Options)
			    	}
					reslove();
				  	
				})     
    	});
		
	}


}