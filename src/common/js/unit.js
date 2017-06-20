
module.exports = {

	loadScript : function(url, callback){
					var $script = require("scriptjs");
						$script(url, function() {
  						/* alert(1)*/
					});
 
	},
	isEmpty(ob){
			if(ob == null || ob == 'null' || ob== '' || ob== 'undefined'){
				return true
			}else{
				return false
			}
	}
	,
	isWeiXin: function is_weixn(){  
    			var ua = navigator.userAgent.toLowerCase();  
			    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
			        return true;  
			    } else {  
			        return false;  
			    }  
    }, 
    getQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null)
			return unescape(r[2]);
			return null; 
	},
    getDateList :function(length){
        /*收益页面使用*/ 
    	let cur_month = new Date().getMonth() ; // 0 ~ 11
		let cur_year  = new Date().getFullYear();
		//let all = [{year: 2017, month: 3},{year: 2017, month: 2}]
		let list = [];
		let next_month = cur_month;
		for (var i = 0; i < length; i++) {
			if(next_month < 9){
				list.push({
					year: cur_year,
					month: "0"+(next_month + 1)
				})	
			}else{
				list.push({
						year: cur_year,
						month: next_month + 1
				})
			}
		  
		   if(--next_month == -1){
                	next_month = 11;
                	cur_year --;
            }
		
          
		}
		return list;
			
	

    },
    IdentityCodeValid(code) { 
            var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
            var tip = "";
            var pass= true;
            
            if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
                tip = "身份证号格式错误";
                pass = false;
            }
            
            else if(!city[code.substr(0,2)]){
                tip = "地址编码错误";
                pass = false;
            }
            else{
                //18位身份证需要验证最后一位校验位
                if(code.length == 18){
                    code = code.split('');
                    //∑(ai×Wi)(mod 11)
                    //加权因子
                    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                    //校验位
                    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                    var sum = 0;
                    var ai = 0;
                    var wi = 0;
                    for (var i = 0; i < 17; i++)
                    {
                        ai = code[i];
                        wi = factor[i];  
                        sum += ai * wi;
                    }
                    var last = parity[sum % 11];
                    if(parity[sum % 11] != code[17].toUpperCase()){
                        tip = "校验位错误";
                        pass =false;
                    }
                }
            }
            //if(!pass) alert(tip);
            return pass;
        }
}