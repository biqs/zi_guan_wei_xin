<template>
  <div id="app" >
    <mt-navbar v-model="selected">
  <mt-tab-item id="1">option A</mt-tab-item>
  <mt-tab-item id="2">option B</mt-tab-item>
  <mt-tab-item id="3">option C</mt-tab-item>
  </mt-navbar>
   <div class='tab_body'>
    <mt-tab-container v-model="selected">
    <mt-tab-container-item id="1">
      <mt-cell v-for="n in 10" :title="'content ' + n" />
    </mt-tab-container-item>
    <mt-tab-container-item id="2">
      <mt-cell v-for="n in 4" :title="'content ' + n" />
    </mt-tab-container-item>
    <mt-tab-container-item id="3">
      <mt-cell v-for="n in 6" :title="'content ' + n" />
    </mt-tab-container-item>
    </mt-tab-container>

   </div>
 
  
     
  </div>
</template>

<script>
  import 'common/css/reset.css';
  import 'mint-ui/lib/style.css'
  import Vue from 'vue';
  import { Navbar, TabItem ,Cell} from 'mint-ui';
 import { TabContainer, TabContainerItem } from 'mint-ui';

Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component(Cell.name, Cell);

  export default {
    name: 'app',
    
    components: {
      
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    height: 800px;
  }
  .tab_body{
  width: 100%;
  height: 600px;
  }
</style>