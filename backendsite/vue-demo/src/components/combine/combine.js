//右侧内容集合，因为多个单元右侧模块展示不尽相同，所以单独拉出来，点击左侧nav的时候，更新右侧这个模块

var templates=require("./combine.html");
import SchoolTable from '../table/table.js';//页面需要的组件
import Contents from '../content/content.js';//页面需要的组件

export default {
    data:function(){
    	return {};
    },

    components: {
        "Contents":Contents,
        "Cont":SchoolTable
    },
    methods: {
        init:function(data){
            this.$children[0].init(data);//右上角内容块
            this.$children[1].init(data);//右下角table
        }
    },

    template:templates
};

