// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '../',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 80,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {   //跨域设置
        '/wechat/weixin/': {
            target: 'http://192.168.70.216',  //直接调取网管层
            changeOrigin: true,
            pathRewrite: {
                '^/wechat/weixin': '/weixin'
            }    
          },
        '/development': {
            target: 'http://160.6.78.7:8080',  //开发环境
            changeOrigin: true,
            pathRewrite: {
                '^/development/': '/'
            }    
        },
        '/test': {
            target: 'http://ec2-54-223-194-136.cn-north-1.compute.amazonaws.com.cn',  //测试环境
            changeOrigin: true,
            pathRewrite: {
                '^/test/': '/'
            }    
        }
        ,
         '/test-2': {
            target: 'https://wx.htscamc.com',  //测试环境
            changeOrigin: true,
            pathRewrite: {
                '^/test-2/': '/'
            }    
        }

    
    },
    //http://ec2-54-223-194-136.cn-north-1.compute.amazonaws.com.cn
    //https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1d7bd0479ef285fb&redirect_uri=http://61.132.51.145/wechat/get_openid&response_type=code&scope=snsapi_base&state=123#wechat_redirect 


    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
