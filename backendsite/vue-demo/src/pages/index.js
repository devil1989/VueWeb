// polyfill
// import 'babel-polyfill';

import Vue from 'vue';
import IndexPage from './index';//对也的页面的vue文件
// import store from './store/.vue';//包含了vuex对也的所有内容，返回一个封装好的store

Vue.config.devtools = true;
window.age=44566;

// new Vue({
//     el: 'body',
//     components: { IndexPage },
//     store: store
// });
export default IndexPage

// require("../assets/css/reset.css");