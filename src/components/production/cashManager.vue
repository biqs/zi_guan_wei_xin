<template>
<div class="manager-wrapper">
	<div class="top-bar">
		<div class="nav-bar">
			<div class="item" @click='change(1)' :class="{'active': type==1}">现金理财</div>
			<div class="item" @click='change(2)' :class="{'active': type==2}">固定收益</div>
			<div class="item" @click='change(3)' :class="{'active': type==3}">浮动收益</div>
		</div>
		<div class="item-info text-left"  v-if='type==1'>低风险，适合保守型投资用户</div>
		<div class="item-info text-center" v-if='type==2'>中低风险，收益稳健，适合稳健投资用户</div>
		<div class="item-info text-right" v-if='type==3'>高风险，适合激进型投资用户</div>
	</div>
	<div class="bar-contaniner">
		
		<type-list :type='type'/>
		 
	</div>

</div>
	
</template>
<script >

	import typeList from './typeList';
	import contact from 'src/components/common/Contact';
	export default {
		name: "cashManager",

		data(){
			return {
				type : this.$route.params.type
			}
		},components:{
			typeList,contact
		},mounted(){
			 
		},
		methods:{
              change(_type){
                  this.type  = _type;            
                  this.$router.push({ name: 'product', params: { type:  _type }})
              }

		},watch:{
			'$route': function(){
				this.type = this.$route.params.type
			}
		}
	};

</script>
<style lang="scss" scoped>

@mixin box-sizing ($sizing) {
    -webkit-box-sizing:$sizing;     
       -moz-box-sizing:$sizing;
            box-sizing:$sizing;
}
@mixin row-height ($height){
  height: $height;
  line-height: $height;
}
.text-left{
	text-align: left;
}

.text-right{
	text-align: right;
}

.text-center{
	text-align: center;
}

.top-bar{
			height: 2.24rem;

			.nav-bar{
				padding-top: 0.4267rem;
				margin: 0 1.3867rem;
				display: flex;
				flex-flow: row;
				font-size: 0.3733rem;
				color: #0076FF;
				text-align: center;
				
				.item{
					width: 2.4rem;
					@include row-height(0.8rem);
					border: 0.0267rem solid #0076FF;
                    flex: 1;
                    cursor: pointer;
                    transition: .5s all ease-in;

                    &.active{
                    	background: #0076FF;
						color: #FAFAFA;
                    }
                    
                    &:first-child{
                    	border-right:0;
                    	border-top-left-radius: 0.1067rem;
                    	border-bottom-left-radius: 0.1067rem;
                    }

                    &:last-child{
                    	border-left:0;
                    	border-top-right-radius: 0.1067rem;
                    	border-bottom-right-radius: 0.1067rem;
                    }

				}

			}
			.item-info{
                    margin: 0 1.3867rem;
					font-size: 0.32rem;
					color: #AAB0C0;
					padding-top: 0.2133rem;
					@include row-height(0.48rem);
			}
		}


</style>