<template>	
		<div id='app' class="notice pt-relative">
			<header  class="title" v-text='title'> </header>
			<div v-if='date' class="info">
				{{date}}  <span v-if='source'>|  {{source}}</span>	
			</div>
			<section class="content detail">
					详情请点击&nbsp;<a :href="downloadhref">下载</a>
			</section> 
			 
			<contact/>
			</div>
</template>
<script>
    import { basePath } from 'src/common/js/config';
    import contact from 'src/components/common/Contact';
    import {isEmpty} from 'src/common/js/unit';
    import * as Global from 'src/common/js/global';
    const baseDownloadUrl ='/wechat/file?reportId=';
      import { Bunding } from 'src/common/js/config';
      import  * as WeXin from 'src/common/js/WeXin';
	export default{
		name:'doc',
		data(){
			  return{
					 id:'',
					 date:"",
   					 title:"",
    				 source:"",
    				 content:"",
    				 downloadhref:''
			  }
		},
		mounted(){

           this.id = this.getQueryString('id');
           this.downloadhref = baseDownloadUrl + this.id + '&_dt=' + new Date().getTime();
           this.loadData();
           
		},
		components:{
			contact
		},
		methods:{
			loadData(){
				let _this = this;
				if(isEmpty(sessionStorage.token)){
		                  if(isEmpty(this.getQueryString(Global.OpenIdParam))){
			                 Global.Access.init( function(data){       
			                 sessionStorage.token = data.token;    
			                 sessionStorage.bindStatus = data.bindStatus;
			                    if(sessionStorage.bindStatus=='0'){
			                      location.href= 'bunding.html#/bunding'; 
			                    }else{
			                      _this.getInitData();             
			                    }       
			                })
			              }else{
			                this.axios.get(Bunding.getOpenId, {
			                    params:{
			                      code: this.getQueryString(Global.OpenIdParam)
			                    }
			                }).then((response)=>{
			               
			                  if(response.data.flag.code==0 || response.data.flag.code=="0"){
			                      sessionStorage.token = response.data.token;    
			                      sessionStorage.bindStatus = response.data.bindStatus;
			                      if(sessionStorage.bindStatus=="0"){
			                          location.href= 'bunding.html#/bunding'; 
			                      }else{
			                          _this.getInitData();            
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
				this.axios.get(basePath + '/weixin/asset_management/bulletin_detail',{params:{
		                _dt : new Date().getTime(),
		                id  : this.id
		              }})
		             .then((response) => {
		             	if(response.data){
		             		 if(response.data.flag.code==0){
		             		 	this.date = response.data.date;
		             		 	this.title = response.data.title;
		             		 	this.source = response.data.source;
		             		 //	this.content = response.data.content;
		             		 }
		             	}	
		             })

		             WeXin.init();
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
<style lang='scss'  >
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
			padding-bottom: 0.32rem;
			color: #AAB0C0;
			letter-spacing: 0;
		}
		.detail{
			padding: 0 0.4533rem;
			font-family: PingFangSC-Light;
			font-size: 0.4267rem;
			color: #444444;
			letter-spacing: 0;
			line-height: 0.64rem;
			p{
				text-indent: 2em !important;
			}

			p ,span , font {
					font-family: PingFangSC-Light !important;
				    font-size: 0.4267rem !important;
				    color: #444444 !important;
				    letter-spacing: 0 !important;
				    line-height: 0.64rem;
			}
			 

		}
	}
</style>
