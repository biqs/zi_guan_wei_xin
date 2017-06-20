<template>	
		<div id='app' class="notice pt-relative">
			<header  class="title text-center">{{notice.title}}</header>
			<div class="info">
			<!-- 2017-04-18  I  华泰理财	 -->
			</div>
			<section class="content" v-html='notice.content'></section> 
			<contact/>
			</div>
</template>
<script>
    import { basePath } from 'src/common/js/config';
    import { EcifId } from 'src/common/js/global';
    import contact from 'src/components/common/Contact';
      import {isEmpty} from 'src/common/js/unit';
    import * as Global from 'src/common/js/global';
    import { Bunding } from 'src/common/js/config';
	export default{
		name:'notice',
		data(){
				return{
					content:  sessionStorage.content ,
                    title: sessionStorage.title ,
                    notice:Object,
                    index:0

			  }
		},
		beforeCreate(){
			// this.loadData();
		},
		created(){
			 
		},
		mounted(){
           this.index = this.getQueryString('index');
           this.loadData();
		},
		components:{
			contact
		},
		methods:{
			loadData(){

			  	if(isEmpty(sessionStorage.token)){
		                  if(isEmpty(this.getQueryString('code'))){
			                 Global.Access.init( function(data){       
			                 sessionStorage.token = data.token;    
			                 sessionStorage.bindStatus = data.bindStatus;
			                    if(sessionStorage.bindStatus=='0'){
			                      location.href= 'bunding.html#/bunding'; 
			                    }else{
			                      this.getInitData();             
			                    }       
			                })
			              }else{
			           this.axios.get(Bunding.getOpenId, {
                    params:{
                      code: this.getQueryString('code')
                    }
                }).then((response)=>{
                  
                  if(response.data.flag.code==0 || response.data.flag.code=="0"){
                      sessionStorage.token = response.data.token;    
                      sessionStorage.bindStatus = response.data.bindStatus;
                      if(sessionStorage.bindStatus=="0"){
                          location.href= 'bunding.html#/bunding'; 
                      }else{
                          this.getInitData();            
                      }
                  }else{
                    alert(response.data.flag.msg)
                  }
                }).catch(function (error) {
                    console.log(error);
                });
              }  
		        }else{
		        	this.getInitData();		        	
		        }	
		
			},
			getInitData(){
				 this.axios.get(basePath + '/weixin/asset_management/index',{params:{
			                '_dt' : new Date().getTime(),
			                ecifId: EcifId()
			              }})
			              .then((response) => {
			             	if(response.data){
			             		if(response.data.flag.code==0){
			             			if(response.data.bulletinList.length>0){
			                  				this.notice = response.data.bulletinList[this.index];  
			             			}
			             		}
			             	}
			             	
			              })
			},
			getQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null)
				return unescape(r[2]);
				return null; 
		    }
		}
	}
</script>
<style lang='scss' scoped>
	.notice{
		.title{
	 
			line-height: 0.64rem;
			padding:0.6667rem 0.4533rem 0.4rem 0.4533rem;



		font-size: 0.5333rem;
		color: #303030;
		letter-spacing: 0;
		}
		.info{
			border-bottom: 0.0267rem solid #e4e4e4;
			margin: 0  0.4533rem;
			/*padding: 0.25rem 0;*/
			margin-bottom: 0.4rem;
			line-height: 0.64rem;
			font-size: 0.3467rem;

	 
	color: #AAB0C0;
	letter-spacing: 0;
		}
		.content{
			padding: 0 0.4533rem;

		}
	}
</style>
