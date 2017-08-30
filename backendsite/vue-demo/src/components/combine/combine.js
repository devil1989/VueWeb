//右侧内容集合，因为多个单元右侧模块展示不尽相同，所以单独拉出来，点击左侧nav的时候，更新右侧这个模块

var templates=require("./combine.html");
import SchoolTable from '../table/table.js';//页面需要的组件
import Contents from '../content/content.js';//页面需要的组件

var combine={
    data:function(){
        return this.$store.state.scenes;//所有场景

        //默认数据结构
        // {
    	//    hasInit:true,
        //    
        //    data:{
        //       sceneList:[3,4,2,1,5,7],
        //       sceneType:"",
        //       currentScene:""
        //    }
        // }
    },

    components: {//创建的时候，就需要把Contents和Cont解析出来,所以会执行到子组件里面的代码，得注意子组件的data函数
        "Contents":Contents,
        "Cont":SchoolTable
    },

    updated:function(){
        var stateData=this.$data;
        if(this.$data.hasInit&&this.$data.data&&this.$data.data.sceneList){
            var dataArray=this.$data.data.sceneList||[];
            for (var i = 0; i < dataArray.length; i++) {
                this.$children[0].init(dataArray[i]);//右上角内容块
                this.$children[1].init(dataArray[i]);//右下角table
            }
        }
    },
    methods: {
        //这里的数据来自this.$store.state.scenes ; 而this.$store.state.scenes的数据来自url的hash ; url的hash数据来自点击页面左侧导航获得数据
        //（初始化的时候没有数据，默认获取左侧导航的第一个节点数据）
        init:function(){
            
        }
    },

    template:templates
};

export default combine