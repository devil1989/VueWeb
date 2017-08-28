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
                    // this.hide()
                }
            },{
                type:"cancel",//取消
                txt:"默认取消",
                callback:function(e){
                }
            }],
            inheritContent:"",//中间的字符串数据，如果想拓展功能，具体看alert，他是pop的具体拓展的实现
            // closePop:function(e){//关闭功能
            //     // this.hide();
            // },

            //

            //隐藏之前执行
            beforeHide:function(e){

            },
            needShow:false//默认隐藏
        }
    },

    /*生命和周期 start*/
    // beforeCreate:function(){
    //     // this.$data和this.$el为null
    // },
    // created:function(){
    //     //this.$data 已经保存
    // },
    // //this.$el被初始化
    // beforeMount:function(){
    //     this.$data.closePop.bind(this);
    // },
    // mounted:function(){
    //     this.$data.closePop.bind(this);
    // },
    // beforeUpdate:function(){

    // },
    // updated:function(){

    // },
    // beforeDestroy:function(){

    // },
    // destroyed:function(){

    // },
    /*生命和周期 end*/

    methods: {

        //创建：
            // beforeCreate：创建之前，this.$data和$el都为空
            // created：this.$data采集数据偶家
            // beforeMount：this.$el被初始化
            // mounted：元素挂载结束
            // beforeUpdate：
            // updated：
            // beforeDestroy
            // destroyed


        init:function(opts){
            var data=opts.data;//保存传输的数据
            var targetObj=_.extend(this.$data,data);
            
            opts.callback(targetObj);//调用回调函数
        },

        show:function(){
            this.$el.hidden=false;
        },

        closePop:function(e){
            this.$data.beforeHide&&this.$data.beforeHide.bind(this)(e);
            this.$el.hidden=true;
        }
    },
    template:templates
};

