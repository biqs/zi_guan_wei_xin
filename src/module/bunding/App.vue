<template>
	<div class="main">
	
	<!-- 	<unbunding></unbunding> -->
	 <transition  name="component-fade"  mode="out-in" appear>
         <router-view></router-view>  
     </transition>
		<!-- <bunding></bunding> -->
	 	<!-- <bunding-info></bunding-info> -->
	 
	</div>
</template>

<script>
	import bunding from 'components/bunding/bunding' ;
	import bundingInfo from 'components/bunding/bundingInfo' ;
	import unbunding from 'components/bunding/unbunding';
	import {Bunding } from 'src/common/js/config';
 
	import {isEmpty} from 'src/common/js/unit'
 
	export default{
		name:'main',
		data(){
			return{
			 
				ecifId:'',
				access_code :''
			}
		},mounted(){
			   
			   
		},
		components:{
			bunding,bundingInfo,unbunding
		},
		methods:{
			 
		} 
	}
</script>
<style scoped lang="scss">
	body ,.main{
		height: 100%;
		overflow: hidden;
		background: #f5f5f5;
	}
</style>