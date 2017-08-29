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
                type:"initDetail",
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
        },

        createPop:function(e){
            var target=e.target;
            if(hj.hasClass(target,"js_baseic_sub_btn")){
                var title=target.getAttribute("data-content")||"";
                this.$store.commit("addSubPop",{
                    data:{//传入最新的弹框的state数据
                        title:title,
                        btns:[{
                            type:"submit",//提交
                            txt:"新增",
                            callback:function(e){
                                // this.hide()
                            }
                        },{
                            type:"cancel",//取消
                            txt:"取消",
                            callback:function(e){
                            }
                        }],
                        needShow:true,
                        // inheritContent:"",

                        //隐藏之前执行
                        beforeHide:function(e){

                        },
                    }
                });
            }else if(hj.hasClass(target,"js_basic_btn")){
            }
        }
    },
    template:templates
};

