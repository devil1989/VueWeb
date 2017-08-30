/**
 * Vuex
 * http://vuex.vuejs.org/zh-cn/intro.html
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// 一般而言，我们需要将store下的state放在computed中，将组件自身的state，不需要像vuex这样动态的、传递的放在 data 下即可。
const store = new Vuex.Store({

    //不用vuex的state的时候，组件的数据初始化是放在vue组件的data中的
    state: {//看看https://cn.vuejs.org/v2/guide/reactivity.html，别乱加默认值
        nav:{
            hasInit:false,//是否以及初始化，初始化以后会有data属性
            data:null
        },

        //scenes是tables和Infos集合，组合组件如何使用，就拿这个为例子
        scenes:{//data是一个list，里面每个item包含table和info
            hasInit:false,
            data:null
        },
        tables:{//底部table（多个）
            hasInit:false,
            data:null//data里面是具体的ajax数据，这个ajax数据结构又是{data:""}这样的
        },
        Infos:{//右侧具体信息（多个）
            hasInit:false,
            data:null
        },
        pops:{
            hasInit:false,
            data:null
        }//弹框（多个）
    },

    /*注意了，store必须注册在所有的componnet的根节点上，如果是把store分开注入到各个组件中，那么就不能统一管理了*/
    mutations: {//store.commit

        //初始化左侧导航栏信息（这个信息是基础，右侧信息都是根据左侧导航栏的点击id来请求对应的数据的
        "initNav":function(state,payload){
            state.nav.hasInit=true;
            state.nav.data=payload.initData;//属性一定要存在，不存在没法变更
        },

        "initScenes":function(state,payload){
            state.scenes.hasInit=true;
            state.scenes.data=payload.data;
        },

        //初始化右侧页面基本信息数据
        "initDetail":function(state,payload){
            state.Infos.hasInit=true;
            state.Infos.data=payload.data;
        },

        //初始化表格数据
        "initTable":function(state,payload){//第一次初始化的时候，tm必须把最详细的数据结构定义出来，后续操作添加的时候，会有各种问题，千奇百怪
            state.tables.hasInit=true;
            state.tables.data=payload.data;
        },

        // //初始化弹框
        // "initPop":function(state,payload){
        //     state.pops.hasInit=true;
        //     state.pops.data=payload.data;
        // },

        //新增下级单元弹框
        "updateSubPop":function(state,payload){
            state.pops.hasInit=true;
            state.pops.data=_.extend(state.pops.data,payload.data);
        },

        //新增当前单元弹框
        "updatePop":function(state,payload){
            state.pops.hasInit=true;
            state.pops.data=_.extend(state.pops.data||{
                title:"默认标题",
                closeName:"×",
                btns:[{
                    type:"submit",
                    txt:"默认确认",
                    callback:function(e){
                        // this.hide()
                    }
                },{
                    type:"cancel",//取消
                    txt:"默认取消",
                    callback:function(e){
                    }
                }],
                content:{
                    hasInit:false,
                    data:null
                },//中间的数据，就是pop自己的template中需要的数据，pop的template是alert的壳+自己的template，数据支持重定义title等alert的基本信息，也支持内部内容拓展

                //隐藏之前执行
                beforeHide:function(e){
                    
                },
                needShow:true
            },payload.data);
            console.log(state.pops.data);
        },

        /*
         *desc：设置页码的展示区间，当前页面的左右2页都需要展示的话，displayRange设置为2
         *@param
            payload.data：页码数组
            payload.currentPageIndex：当前是第几页
            payload.displayRange ：展示当前左右的displayRange页都需要展示
         */
        "jumpToTargetPage":function(state,payload){
            payload.callback(state.tables.data,payload.currentPageIndex);
        }

        
    },
    actions:{//action支持异步；action中还是调用对应的mutations中的行为（mutations可以理解为所有的触发state突变的集合，每个key代表对state的某种操作） store.dispatch
        
        //获取左侧导航数据
        getInitData:function(store,payload){
            return new Promise(function(resolve,reject){
                var param=payload.param;//不用自动调用
                param.success=resolve;
                param.error=reject;
                hj.request(param);
            });
        },

        //获取节点数据
        getNodeData:function(store,payload){
            return new Promise(function(resolve,reject){
                var param=payload.param;//不用自动调用
                param.success=resolve;
                param.error=reject;
                hj.request(param);
            });
        },

        //后去分页表格数据
        getTableData:function(store,payload){
            return new Promise(function(resolve,reject){
                var param=payload.param;//不用自动调用
                param.success=resolve;
                param.error=reject;
                hj.request(param);
            });
        },

        //点击弹框，获取新增节点数据
        getPopInfo:function(store,payload){
            return new Promise(function(resolve,reject){
                var param=payload.param;//不用自动调用
                param.success=resolve;
                param.error=reject;
                hj.request(param);
            });
        },
    },
    getters:{//getters里面的函数会自动调用 
    }
    
});


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

