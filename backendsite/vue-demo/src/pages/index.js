// polyfill
// import 'babel-polyfill';

import Vue from 'vue';//vue框架的对象
import storeInfo from './index.store.js';//包含了当前页面对应的store信息（以及记过了vue封装）
import Card from '../components/card.vue';//页面需要的组件
import List from '../components/list.vue';//页面需要的组件
import Text from '../components/text.vue';
import Message from '../components/message.vue';
require("../assets/styles/index.scss");

Vue.config.devtools = true;
var IndexPage={
    components: { Card, List, Text, Message },
    vuex: {
        actions: storeInfo.actions
    },
    created () {
        this.initData();
    }
}


new Vue({
    el: 'body',
    components: { IndexPage },
    store: storeInfo.store
});
export default IndexPage



