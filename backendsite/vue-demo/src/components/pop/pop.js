/*
 组件如何插入到业务代码中去：
    1.html中添加组件的标签
    2.业务代码的components中把组件名字插入
    3.业务代码中调用组件的init方法（init方法中传入组件需要的数据结构，以及需要的callback，callback中包含了对应的mutation和action）
    4.vuex中添加组件的mutation

 组件应该是一个类，可以创建多个实例（vue中多个实例，其实就是吧这个component放在各个vue组件或者vue对象中引入）
 */
require("./pop.scss");
var templates=require("./pop.html");



export default {
    data:function(){

        //example
    	return {
            title:"默认标题",
            closeName:"×",
            btns:[{
                type:"submit",//提交
                txt:"默认确认",
                callback:function(e){
                    debugger
                    // this.hide()
                }
            },{
                type:"cancel",//取消
                txt:"默认取消",
                callback:function(e){
                    debugger
                }
            }],
            content:{},//中间的数据
            closePop:function(e){//关闭功能
                debugger
                // this.hide();
            },
            isHide:true//默认隐藏
        }
    },

    methods: {

        init:function(opts){
            debugger
            var data=opts.data;//保存传输的数据
            var targetObj=_.extend(this.$data,data);
            opts.callback(targetObj);//调用回调函数
        },

        hidePop:function(){

        }
    },
    template:templates
};

