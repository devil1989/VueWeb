/*
 组件如何插入到业务代码中去：
    1.html中添加组件的标签
    2.业务代码的components中把组件名字插入
    3.业务代码中调用组件的init方法（init方法中传入组件需要的数据结构，以及需要的callback，callback中包含了对应的mutation和action）
    4.vuex中添加组件的mutation

 组件应该是一个类，可以创建多个实例（vue中多个实例，其实就是吧这个component放在各个vue组件或者vue对象中引入）
 */
require("./alert.scss");
var templates=require("./alert.html");
var Alert={
    data:function(){
        return this.$store.state.pops;
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


        init:function(opts){
            var data=opts.data;//保存传输的数据
            var targetObj=_.extend(this.$data,data);
            
            opts.callback(targetObj);//调用回调函数
        },

        show:function(){
            this.$store.commit("updatePop",{
                data:{//传入最新的弹框的state数据
                    needShow:true
                }
            });
        },

        hide:function(){
            this.$store.commit("updatePop",{
                data:{//传入最新的弹框的state数据
                    needShow:false
                }
            });
        },

        //unfinish
        destroy:function(){

        },

        closePop:function(e){
            this.$data.beforeHide&&this.$data.beforeHide.bind(this)(e);
            this.hide();
        }
    },
    template:templates
};


export default Alert

