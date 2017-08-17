/**
 * Vuex
 * http://vuex.vuejs.org/zh-cn/intro.html
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// 一般而言，我们需要将store下的state放在computed中，将组件自身的state，不需要像vuex这样动态的、传递的放在 data 下即可。
const store = new Vuex.Store({
    state: {//看看https://cn.vuejs.org/v2/guide/reactivity.html，别乱加默认值
        nav:{
            hasInit:false,//是否以及初始化，初始化以后会有data属性
            data:null
        },
        // nav:{
        //     status:0,
        //     nodeList:[{nodeName:"jeffrey"}]
        // },//左侧树
        tables:{
            hasInit:false,
        },//底部table（多个）
        Infos:{
            hasInit:false,
        },//右侧具体信息（多个）
        pops:{
            hasInit:false,
        }//弹框（多个）
    },
    mutations: {//store.commit
        "INIT_DATA":function(state,payload){
            state.nav.data=payload.initData;//属性一定要存在，不存在没法变更
            state.nav.hasInit=true;
        },
        "UPDATENAV":function(state,payload){
            state.nav.status++;
        }
        // SET_FILTER_KEY (state, value) {
        //     state.filterKey = value;
        // }
    },
    actions:{//action支持异步；action中还是调用对应的mutations中的行为（mutations可以理解为所有的触发state突变的集合，每个key代表对state的某种操作） store.dispatch
        initData:function(store,payload){
            return new Promise(function(resolve,reject){
                var param=payload.param;//不用自动调用
                param.success=resolve;
                param.error=reject;
                hj.request(param);
            });
        },

        getNodeData:function(store,payload){
            return new Promise(function(resolve,reject){
                var param=payload.param;//不用自动调用
                param.success=resolve;
                param.error=reject;
                hj.request(param);
            });
        }
    },
    getters:{//getters里面的函数会自动调用 
        // getParams:function(){
        //     //因为getParams会自动执行，所以里面需要返回一个funciton，这样才能从外面传参数进来，而且传进来的参数只能有一个
        //     return function (objA){//这个objA就是上面
        //         return {
        //             isMock:true,
        //             mockUrl:"index-mock.js?case=case1",
        //             url:"crm/org/CreateNode",
        //             type:"get",
        //             data:{userid:1},
        //         };
        //     } 
        // }
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

