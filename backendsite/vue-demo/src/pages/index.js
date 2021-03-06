// polyfill
// import 'babel-polyfill';

// 三种import方式
// import { createStore, applyMiddleware,bindActionCreators } from 'redux'//redux 基础
// import store from './store/detail'//该页面对应的store
// import * as DetailActions from './actions/detail'//该页面对应的action

import Vue from 'vue';//vue框架的对象
import storeInfo from './index.store.js';//包含了当前页面对应的store信息（以及记过了vue封装）
import Nav from '../components/nav/nav.js';//左侧导航栏
import Pop from '../components/pop/pop.js';//弹框
import Scenes from '../components/combine/combine.js';//中间场景集合（单页切换的就是这些场景）
require("../assets/styles/index.scss");//每个js对应该页面的一个css

/*
 *执行流程：
    1.mounted > dispatch("getInitData") [获取初始化的基础数据] > 初始化左侧树和右侧场景，
    2.changeHash > hi.spa根据返回数据构建url的hash信息 ，同时传入修改location.hash的回调函数
    3.changeHash修改hash值，触发hashchange事件，调用spa中的函数处理hash，把返回的数据传入commit("initScenes")
    4.接下来多有的行为，都是修改hash,然后调用spa的函数处理hash，把返回的数据传入commit("initScenes")再次重新渲染场景

 */



Vue.config.devtools = true;


var indexPage=(function(){

    var IndexPageVue=new Vue({
        el: '#app',
        store: storeInfo.store,

        //vuex的管理store，只存在一个store,所以即使某些组件的数据是需要异步获取的，也不能异步加载组件（异步加载组建的话，它的state没法用vuex管理，因为vuex包装的store是应该是就注入到根节点的vue的）
        components: {
            "Navigation":Nav,//全局左侧导航
            "Pop":Pop,//全局的弹框
            "Scenes":Scenes
        },
        data:function(){
            return {}
        },
        computed:{
            // nav:function(){
            //     return state.nav;
            // }
        },
        mounted:function(){
            
            // var component=this.$children[0];
            // var store=this.$store;
            var self=this;
            var options=this.$options;
            var params=options.methods.getParams();
            //dispatch支持promise，但是前提是把getInitData这个action封装成promise
            this.$store.dispatch("getInitData",{"param":params}).then(function(data){//传入需要更新的插件this.$children[0]，左侧导航栏结构太复杂需要递归调用，不适合用vue的template写
                if(data&&data.Data&&data.Status==0){
                    var popData=self.formatedPopData({})||{};
                    self.$children[0].init(data.Data);//左侧树组件：调用子元素的更新方法更新左边导航栏

                    self.$children[1].init(data.Data);//场景容器初始化，其实里面刚开始没啥东西，只是占个坑，以保证里面所有子组件都是和vuex的store绑定

                    //传入data，根据data处理hash，触发onhashchange事件来获取所有场景信息，最后调用回调函数，触发场景更新
                    self.changeHash(data.Data,function(outputData){
                        var data=outputData.scene;

                        //重新渲染场景
                        self.$store.commit({
                            type:"initScenes",
                            data:{
                                sceneType:data.sceneArray[0].key,//场景类型
                                sceneList:data.sceneArray[0].value,//场景id数组[8,1,2,3,4,7]
                                currentScene:data.currentScene//当前场景
                            }
                        });

                        //重新渲染左侧树
                        self.$children[0].update();
                    });
                }else{
                    console.log("!!!请求导侧边航栏数据失败");
                }
            },function(){
                console.log("网络原因请求导侧边航栏数据失败");
            });
        },
        methods:{//this.$options.methods来获取

            //获取页面初始信息请求所需要的参数
            getParams:function(){
                return {
                    isMock:false,
                    mockUrl:"index-mock.js?case=case1",
                    // url:"crm/GetNodeByUserId",
                    url:"crm/OrganizationV2/GetNodeByUserId",//实际url
                    type:"get",
                    data:{userid:330}
                };
            },

            changeHash:function(data,func){
                var SPA=hj.spa({
                    wrapper:document.querySelector(".internet-school-content"),
                    maxNum:10,
                    callback:func
                });

                if(!SPA.hasScene()){
                    location.hash="#scene=combine-"+data.nodeList[0].id+"&hashchange=0";//默认用combine类型场景，值为默认的第一个节点的key
                }else{
                    hj.spaIns.updateScene();
                }
            },

            //格式化数据，变成弹框组件所需要的数据结构【当然，也可以不格式化数据，把数据格式化放到组件里面，只要定义的数据结构，格式化在组件里面做】
            //不过组件内最好不要处理业务逻辑相关的东西，数据格式化最好也是在外面做掉，如果某个组件是个业务组件，数据可视化和所有其他处理倒可以在组件内做
            formatedPopData:function(data){
                return data
            }
        }

    });

    return IndexPageVue;
})();

export default {}




/******Vue 使用简易指南******/

// //自定义指令，表单指令先不介绍，不怎么用
// 属性绑定：v-bind:(可以直接简写成：) ; 如何传入变量（<span v-bind:class="'ui-'+pop"></span>）//其中ui-在引号内，是字符串，pop是变量  
// 事件绑定：v-on:（可以直接简写成@）；如何绑定事件（<span @click.="'ui-'+pop"></span>），//.stop表示事件修饰符，
//                 //事件修饰符
//                     .stop：stopPropagation
//                     .prevent：preventDefault
//                     .capture：只当事件在该元素本身（而不是子元素）触发时执行
//                     .self
//                     .once：

//                 //按键修饰符
//                 <span @keyup.13="getname"></span>，只有在keycode为13的时候才执行，键盘每一个按键都有对应的keycode，
//                 按键修饰符也支持键名的人性化书写，例如
//                     .enter
//                     .tab
//                     .delete (捕获 "删除" 和 "退格" 键)
//                     .esc
//                     .space
//                     .up
//                     .down
//                     .left
//                     .right
//                     .ctrl
//                     .alt
//                     .shift
//                     .meta

// vue调用options说明
// new Vue({
//     el: 'body',//插入到哪个元素里面
//     data:"",//数据

//     //计算属性的集合方法，引用的时候只要用{{massage1}}即可，不需要像methods里面的方法一样后面添加（）来执行
//     computed:{
//         massage1:function(){

//         },
//         message2{
//             get:function(){},//默认的get方法
//             set:function(){}//默认没有set方法，这里自己定义了set方法
//         }
//     },

//     //computed是基于它的依赖缓存，只有相关依赖发生改变时才会重新取值。而使用 methods ，在重新渲染的时候，函数总会重新调用执行
//     //而且调用methods内的方法得自己调用，即funcA（），而computed方法调用的时候不需要添加括号，vue自己会处理执行
//     methods:{
//         funcA:function(){

//         }
//     },
//     components: { Table },//包含的组件
//     store: storeInfo.store,//对应的store
// });

// vue组件使用（重点）
// 定义：
//     全局组件：Vue.component(组件名称, options)
//     局部组件：new Vue({
//                   el: '#app',
//                   components: {
//                     // runoob是组件名称
//                     'runoob': Child
//                   }
//                 })；
//                 var Child={//组件内容定义方法
//                   template: '<h1>自定义组件!</h1>'
//                 }
// 调用：在html中直接嵌入<组件名称></组件名称>

// 父子组件通信：props，例如：
// Vue.component('child', {
//   // 声明 props
//   // props: ['message'],//可以是简单的数组，也可以是对象
//   props:{//这里声明的props就是父组件的属性，这样，父组件对应的属性值变了，子组件的props中如何有声明的话，子组件也会变（父组件信息更新，自动更新子组件信息）
//     // 基础类型检测 （`null` 意思是任何类型都可以）
//     propA: Number,
//     // 多种类型
//     propB: [String, Number],
//     // 必传且是字符串
//     propC: {
//       type: String,
//       required: true
//     },
//     // 数字，有默认值
//     propD: {
//       type: Number,
//       default: 100
//     },
//     // 数组／对象的默认值应当由一个工厂函数返回
//     propE: {
//       type: Object,
//       default: function () {
//         return { message: 'hello' }
//       }
//     },
//     // 自定义验证函数
//     propF: {
//       validator: function (value) {
//         return value > 10
//       }
//     }
//   }

//   // 同样也可以在 vm 实例中像 “this.message” 这样使用,message和上面的propA，propB
//   template: '<span>{{ message }}</span>'
// })
// // 创建根实例
// new Vue({
//   el: '#app'
// })


// 每个 Vue 实例都实现了事件接口：使用 $on(eventName) 监听事件；使用 $emit(eventName) 触发事件


// 子组件更新信息，如何同步到父组件（通过父组件自定义事件，该自定义事件和子组件对应的mothods事件绑定）
// 例如：父组件的自定义事件incrementTotal（如果incrementTotal是原生事件，那么在下面的代码需要修改成<button-counter v-on:increment.native="incrementTotal"></button-counter>），和子组件的increment绑定了，increment方法里面手动写更新父组件对应信息的代码
// <div id="app">
//     <div id="counter-event-example">
//       <p>{{ total }}</p>
//       <button-counter v-on:increment="incrementTotal"></button-counter>
//       <button-counter v-on:increment="incrementTotal"></button-counter>
//     </div>
// </div>
 
// <script>
// Vue.component('button-counter', {
//   template: '<button v-on:click="increment">{{ counter }}</button>',
//   data: function () {
//     return {
//       counter: 0
//     }
//   },
//   methods: {
//     increment: function () {
//       this.counter += 1
//       this.$emit('increment')
//     }
//   },
// })
// new Vue({
//   el: '#counter-event-example',
//   data: {
//     total: 0
//   },
//   methods: {
//     incrementTotal: function () {
//       this.total += 1
//     }
//   }
// })
// </script>

