/**
 * Vuex
 * http://vuex.vuejs.org/zh-cn/intro.html
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {

    },
    mutations: {
        // SET_FILTER_KEY (state, value) {
        //     state.filterKey = value;
        // }
    },
    actions:{//action支持异步；action中还是调用对应的mutations中的行为（mutations可以理解为所有的触发state突变的集合，每个key代表对state的某种操作）
        // initData: ({ dispatch }) => dispatch('INIT_DATA'),
        // sendMessage: ({ dispatch }, content) => dispatch('SEND_MESSAGE', content),
        // selectSession: ({ dispatch }, id) => dispatch('SELECT_SESSION', id),
        // search: ({ dispatch }, value) => dispatch('SET_FILTER_KEY', value)
    }
});

// store.watch(
//     (state) => state.sessions,
//     (val) => {
//         console.log('CHANGE: ', val);
//         localStorage.setItem('vue-chat-session', JSON.stringify(val));
//     },
//     {
//         deep: true
//     }
// );


export default {
    store:store//还可以放其他属性
};



// vuex使用指南
// Vue.use(Vuex);
// const store = new Vuex.Store({//这个store可以通过this.$store来获取
//     state:{},//state数据
//     mutations:{},//定义触发访问状态的方法    触发方法为同步执行 ，用store.commit('increment')调用对应mutations中的increment行为；mutations中添加新的属性需要Vue.set(obj, 'newProp', 123)
//     actions:{},//异步触发方法
//     getters:{}//多个组件需要公用某一些方法，公用方法就放在这里，getters中的方法，第一个参数是state
// });

//如果store太臃肿，允许分块
// const moduleA = {
//   state: { ... },
//   mutations: { ... },
//   actions: { ... },
//   getters: { ... }
// }

// const moduleB = {
//   state: { ... },
//   mutations: { ... },
//   actions: { ... }
// }

// const store = new Vuex.Store({
//   modules: {
//     a: moduleA,
//     b: moduleB
//   }
// });
// store.state.a // -> moduleA 的状态
// store.state.b // -> moduleB 的状态
// module中的具体使用详见：https://vuex.vuejs.org/zh-cn/modules.html

