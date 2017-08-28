import Pop from '../pop/pop.js'
require("./alert.scss");
var templates=require("./alert.html");

var Alert=hj.extendVue(Pop,{
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
            content:{},//中间的数据

            //隐藏之前执行
            beforeHide:function(e){
            	
            },
            isHide:true//默认隐藏
        }
    },

    // beforeCreate ：创建之前，this.$data和$el都为空
	// created：this.$data采集数据
	// beforeMount：this.$el被初始化
	// mounted：元素挂载结束
	// beforeUpdate：
	// updated：
	// beforeDestroy
	// destroyed

    methods: {
    },
    template:templates//第一个是自己的template，后面的是继承父组件的tempalte，第三个参数表示，默认的继承都是把父组件中的{{content}}
});


export default Alert

