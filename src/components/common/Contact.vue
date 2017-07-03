<template>
	<div class="footer-tel"> 
		<div class="cantact">
		 <img :src="tel" class="telIcon">华泰证券资管客服电话 <a class="tel" href="tel:95597">95597</a> 
		</div>
	</div>
</template>
<script type="text/javascript">
	import telImg from 'src/common/images/tel@2x.png';
	export default{
		name:'footer-tel',
		data(){
			return{
				tel: telImg
			}
		}
	}
</script>
<style lang='scss'>
	.footer-tel{
		position: absolute;
		bottom: 1.35rem;
		left: 0;
		width: 100%;
	}
	.cantact{	 
		font-size: 0.3733rem;
		color: #999999;
		line-height: 1.0667rem;
		background: #F5F5F5;
		text-align: center;
		margin-top: 0.0533rem;
		
	}
	.tel{
		color:#5491fd !important;	
	}
	.telIcon{
		width: 0.4rem;
		vertical-align: middle;
		position: relative;
		top: -0.0533rem;
	}
</style>