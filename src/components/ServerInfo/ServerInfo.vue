 <template>
 	<div  class="mint-indicator server-info" v-show="visible">
      <div class="wrapper" >
      	<div class="info">提示：链接已过期，请返回微信重新获取菜单进入</div>
        <div class="btn-box">
        	<div class="btn btn-default" @click='closeWindow'>
        	关闭页面
        	</div>
	        <div class="btn btn-success btn-2"  @click='reloadWindow'>
	        	重新加载
	        </div>
	       
        </div>
      </div>
       
     
      <div class="mask">
      	<contact/>
      </div>
    </div>
 </template>
 <script>
  	import contact from 'src/components/common/Contact';
  	import  * as WeXin from 'src/common/js/WeXin';
  
 	export default{

 		name:'error-info',
 		props: {
	      text: String,
	    },
 		data(){
 			return {
 				visible : false
 			}
 		},
 		mounted(){
 			WeXin.init(); 
 		},
 		methods:{
 			closeWindow(){
 				WeXin.closeWindow(); 
 				
 			},
 			reloadWindow(){
 				location.reload();
 			}

 		},components:{
       		contact
    	}


 	}

 </script>
 <style lang='scss' scoped>
 	.wrapper {
	    top: 30%;
	    width: 100%;
	    position: fixed;
	    text-align: center;
	    box-sizing: border-box;
	    
	    z-index: 1001;
	    .info{
	    	min-height: 1.0667rem;
	    	font-size: 0.3733rem;
	    }
	    .btn-box{
	    	margin:  0 auto;
	    	text-align: center;
	    }
	}
	.mask{
		top: 0;
	    left: 0;
	    position: fixed;
	    width: 100%;
	    height: 100%;
	    opacity: 1;
	    background: #fff;
	    z-index: 100
	}
	.btn{

		display: inline-block;
		height: 0.8rem;
		line-height: 0.8rem;
		 
		text-align: center;
	    padding: 0 0.4rem;
		border-radius: 0.1067rem;
    	border:1px solid transparent;
    	box-sizing: content-box;
    	font-size: 0.32rem;

	}
	.btn-default{
		     color: #333;
	    background-color: #fff;
	    border-color: #ccc;

	 
	}
	.btn-success{
		color: #fff;
	    background-color: #0076FF;
	    border-color: #70a2f1;
	   
	}
	.btn-2{
		margin-left: 0.5333rem;
	}

	.server-info .footer-tel{
	bottom: 0;
	}

 </style>