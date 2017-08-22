require("./content.scss");
var templates=require("./content.html");

export default {
    data:function(){
    	return this.$store.state.Infos;
    },

    methods: {
    	//获取右侧节点信息并渲染
        init:function(options){//options中包含getNodeParam的中素有需要的数据
        	var store=this.$store;
        	var self=this;
            store.dispatch("getNodeData",{"param":this.getContetnParam(options)}).then(function(innerData){
                var conData=innerData.data;
                if(innerData.status==0){
                	self.render(conData);
                }
                else{
                    console.log("!!!请求节点数据失败");
                }
            },function(){
                console.log("网络原因请求节点数据失败");
            });//获取节点信息
        },

        render:function(data){
        	this.$store.commit({
                type:"updateContent",
                data:data||{},
                store:this.$store
            });
        },

        //获取右侧节点信息请求所需要的参数
        getContetnParam:function(options){
            return {
                isMock:true,
                mockUrl:"index-mock.js?case=case1",
                url:"crm/org/GetNodeInfo",
                nodeId:2//节点id
            };
        }
    },
    template:templates
};

