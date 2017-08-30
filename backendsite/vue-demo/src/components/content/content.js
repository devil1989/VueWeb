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
            var self=this;
            var title=target.getAttribute("data-content")||"";
            var isSub=hj.hasClass(target,"js_baseic_sub_btn");
            var pop=this.$root.$children[2];//pop组件
            if(isSub||hj.hasClass(target,"js_basic_btn")){
                this.$store.dispatch("getPopInfo",{"param":this.getParam()}).then(function(rst){
                    if(rst.status==0&&rst.data){
                        var formatedData=self.formatData(rst.data);

                        self.$store.commit("updatePop",{
                            data:{//传入最新的弹框的state数据
                                title:title,
                                btns:[{
                                    type:"submit",//提交
                                    txt:"保存",
                                    callback:function(e){
                                        this.saveUnit(e);
                                        // this.hide()
                                    }.bind(pop)
                                },{
                                    type:"cancel",//取消
                                    txt:"取消",
                                    callback:function(e){
                                        this.hide();
                                    }.bind(pop)
                                }],
                                needShow:true,
                                content:formatedData,

                                //隐藏之前执行
                                beforeHide:function(e){

                                },
                            }
                        });
                    }else{
                        console.log("请求弹框数据失败");

                    }

                        
                },function(rst){
                    console.log("网络原因请求弹框数据失败");
                });
                    
            }
        },
        formatData:function(data){
            return data;
        },
        getParam:function(){
            return {
                'isMock':true,
                'mockUrl':"index-mock.js?case=case1",
                'url':"crm/org/GetNodeExtAttr",
                "id": 0,
                "parentId": 0,
                "nodeName": "string",
                "isActive": true,//新增的时候，都为true，添加的时候默认启用组织
                "createuserId": 0,
                "nodeAttr": {},//?
                "isSub”": true
            }
        },

        //点击保存
        saveUnit:function(e){  
            var param=this.getSaveParam();
            this.$store.dispatch('saveUnit',{param:param}).then(function(rst){
                if(rst.status==0&&rst.data){
                    hj.spaIns.addScene(param.id);
                }else{
                    console.log("保存数据失败");
                }
            },function(){
                console.log("网络原因请求数据失败");
            });
        },

        getSaveParam:function(){
            return {
                'isMock':true,
                'mockUrl':"index-mock.js?case=case1",
                'url':"crm/org/CreateNode",
                "id": 3,
                "parentId": 0,
                "nodeName": "string",
                "isActive": true,
                "updateuserId": 0,
                "nodeAttr": [],
                "isSub": true
            }
        }
    },
    template:templates
};

