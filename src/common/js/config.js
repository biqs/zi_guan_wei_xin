let server = ''///development
let BASE_PATH = server +  "/wechat"

module.exports = {
		basePath : BASE_PATH,
		jsPath: 'http://d.zhangle.com/pic/cft/econtract/collection/jihua-',
		Bunding: {
			getImgCode: BASE_PATH + '/get_image',
			getMsgCode : BASE_PATH + "/get_sms_code",
			getOpenId : BASE_PATH + '/get_openid',
			bind:  BASE_PATH + '/bind',
			unbind : BASE_PATH + '/unbind',
			getECIFId: BASE_PATH + '/get_ecifid'
		},
		Sign : {
			getSign : BASE_PATH + '/get_sign'
		}
}