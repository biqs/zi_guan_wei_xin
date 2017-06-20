 <template>
 	<div class="main">
 		 
          <transition  name="component-fade"  mode="out-in" appear>
              <router-view></router-view>  
          </transition>
 	</div>
 </template>
 <script >
 	export default {
 		name:"index"
 	}
 </script>
 <style scoped>
 .main{

  .component-fade-enter-active, .component-fade-leave-active {
      transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-active {
      opacity: 0;
  }

 }


 </style>
