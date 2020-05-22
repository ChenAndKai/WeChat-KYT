import Vue from 'vue'
import App from './App'

import pageHead from './components/page-head.vue'
import pageFoot from 'components/page-foot.vue'
import cmdCircle from "@/components/cmd-circle/cmd-circle.vue"
import cmdProgress from "@/components/cmd-progress/cmd-progress.vue"
// import testItems from "@/components/testItems.vue"
import common from 'common/common.js'
import setBar from 'common/setTabBarAndNavigationBar.js'
 
Vue.config.productionTip = false
Vue.prototype.$common = common;
Vue.prototype.$setBar = setBar;

Vue.component('page-head',pageHead)
Vue.component('page-foot',pageFoot)
Vue.component('cmd-circle',cmdCircle)
Vue.component('cmd-progress',cmdProgress)
// Vue.component('test-item',testItems)

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
