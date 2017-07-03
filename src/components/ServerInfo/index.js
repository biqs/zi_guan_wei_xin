import Vue from 'vue';
const ServerInfo = Vue.extend(require('./ServerInfo.vue'));
let instance;
 
export default {

	open(options = {}) {
   
    if (!instance) {
      instance = new ServerInfo({
        el: document.createElement('div')
      });
    }

    if (instance.visible) return;
 
	    instance.text = typeof options === 'string' ? options : options.text || '';
        document.body.appendChild(instance.$el);
	    Vue.nextTick(() => {
	      instance.visible = true;
	    });
  },

  close() {
    if (instance) {
      instance.visible = false;
    }
  }

}