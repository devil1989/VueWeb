// polyfill
// import 'babel-polyfill';

// 三种import方式
// import { createStore, applyMiddleware,bindActionCreators } from 'redux'//redux 基础
// import store from './store/detail'//该页面对应的store
// import * as DetailActions from './actions/detail'//该页面对应的action

import Vue from 'vue';//vue框架的对象
import storeInfo from './index.store.js';//包含了当前页面对应的store信息（以及记过了vue封装）
import SchoolTable from '../components/table/table.js';//页面需要的组件
import Nav from '../components/nav/nav.js';//页面需要的组件
import Contents from '../components/content/content.js';//页面需要的组件
require("../assets/styles/index.scss");//每个js对应该页面的一个css

Vue.config.devtools = true;


var indexPage=(function(){

    var IndexPageVue=new Vue({
        el: '#app',
        store: storeInfo.store,
        components: {
            "Navigation":Nav,
            "Contents":Contents,
            "Cont":SchoolTable
        },
        data:function(){
            return {}
        },
        computed:{
            nav:function(){
                return state.nav;
            }
        },
        mounted:function(){
            var options=this.$options;
            var component=this.$children[0];
            var store=this.$store;
            var params=options.methods.getParams();
            //dispatch支持promise，但是前提是把initData这个action封装成promise
            this.$store.dispatch("getInitData",{"param":params}).then(function(data){//传入需要更新的插件this.$children[0]，左侧导航栏结构太复杂需要递归调用，不适合用vue的template写
                if(data.data.status==0){
                    options.methods.init(store,data.data,component);
                    options.methods.renderNodeData(store,options);
                    options.methods.renderTable(store,options);
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
                    isMock:true,
                    mockUrl:"index-mock.js?case=case1",
                    url:"crm/org/CreateNode",
                    type:"get",
                    data:{userid:1},
                };
            },

            //获取右侧节点信息请求所需要的参数
            getNodeParam:function(){
                return {
                    isMock:true,
                    mockUrl:"index-mock.js?case=case1",
                    url:"crm/org/GetNodeInfo",
                    nodeId:2//节点id
                };
            },

            //获取底部table请求所需要的参数
            getTableParam:function(){
                return {
                    "isMock":true,
                    "mockUrl":"index-mock.js?case=case1",
                    "url":"crm/org/GetMember",
                    "pageNum": 1,//页码
                    "pageSize": 10,//每页多少个
                    "paramData": {
                      "groupId": 2 //节点id
                    }
                }
            },

            //获取页面初始信息并渲染
            init:function(store,targetData,component){
                store.commit({
                    type:"initData",
                    initData:targetData,
                    store:store
                });//执行mutations中的对应行为
                component.updateComponent(targetData);
            },

            //获取右侧节点信息并渲染
            renderNodeData:function(store,options){
                store.dispatch("getNodeData",{"param":this.getNodeParam()}).then(function(innerData){
                    var conData=innerData.data;
                    if(innerData.status==0){
                        store.commit({
                            type:"updateContent",
                            data:conData||{},
                            store:store
                        });
                    }
                    else{
                        console.log("!!!请求节点数据失败");
                    }
                },function(){
                    console.log("网络原因请求节点数据失败");
                });//获取节点信息
            },

            //获取底部用户信息表格数据并渲染
            renderTable:function(store,options){
                store.dispatch("getTableData",{"param":this.getTableParam()}).then(function(tableData){
                    var conData=tableData.data;
                    if(tableData.status==0){
                        debugger;
                        store.commit({
                            type:"updateTableContent",
                            data:options.methods.formatData(conData)||{},
                            store:store
                        });
                    }
                    else{
                        console.log("!!!请求节点数据失败");
                    }
                },function(){
                    console.log("网络原因请求节点数据失败");
                });//获取节点信息
            },

            //格式化数据，把需要展示的数据算出来
            formatData:function(data){
                var pageNum = Math.ceil(data.pagination.totalCount/data.pagination.pageSize);
                var currentPage=data.pagination.currentPageIndex;
                var len=(data.resultData||[]).length;
                data.pagination.pageNum=pageNum;//一共有多少页
                (data.resultData||[]).forEach(function(ele,index){
                    var idx=index+1;
                    ele.isCurrent=(idx==pageNum)?true:"";
                    if(currentPage<4){//从1到currentPage之间没有...,展示1~currentPage+2，
                        if(idx>0&&(idx<=currentPage+2)){
                            ele.txt=idx;
                            ele.isShow=true;
                        }
                        else{//看剩下的页码怎么展示
                            if(currentPage+3<pageNum){//idx到最后一页之间有...
                                if(pageNum==idx){//展示最后一页
                                    ele.txt=idx;
                                    ele.isShow=true;
                                }else{
                                    if(idx==pageNum-1){
                                        ele.txt="...";
                                        ele.isShow=true;
                                    }
                                    else{//中间隐藏的元素
                                        ele.txt=idx;
                                        ele.isShow=false;
                                    }
                                }
                            }
                            else{//所有idx都没有...
                                ele.txt=idx;
                                ele.isShow=true;
                            }
                        }
                    }else{//大于4的时候，结构很稳定了1...current-2,current-1,current,current+1,current+2,
                        if(idx==1){
                            ele.txt=idx;
                            ele.isShow=true;
                        }
                        else if(idx==2){
                            ele.txt="...";
                            ele.isShow=true;
                        }
                        else if((idx>=(currentPage-2)&&idx<=(currentPage+2))){//区间内都展示
                            ele.txt=idx;
                            ele.isShow=true;
                        }else{//区间外，如果后面还有2个或以上元素，第一个元素变...
                            if(pageNum>currentPage+3){//中间有...
                                if(idx==pageNum-1){
                                    ele.txt="...";
                                    ele.isShow=true;
                                }
                                else if(idx==pageNum){
                                    ele.txt=idx;
                                    ele.isShow=true;
                                }
                                else{//中间隐藏的元素
                                    ele.txt=idx;
                                    ele.isShow=false;
                                }
                            }else{//中间没...
                                ele.txt=idx;
                                ele.isShow=true;
                            }
                        }
                    }

                });

                console.log(data.resultData);
                debugger

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

//unfinish： vue组件定义时的数据结构（和创建vue对象一样，多了props属性,少了el）