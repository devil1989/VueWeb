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

                        debugger
                        self.$store.commit("updatePop",{
                            data:{//传入最新的弹框的state数据
                                title:title,
                                btns:[{
                                    type:"submit",//提交
                                    txt:"保存",
                                    callback:function(e){
                                        this.saveUnit(e);
                                    }.bind(pop)
                                },{
                                    type:"cancel",//取消
                                    txt:"取消",
                                    callback:function(e){
                                        this.hide();
                                    }.bind(pop)
                                }],
                                needShow:true,
                                content:formatedData
                            }
                        });
                    }else if(rst.status!=0){//请求失败
                        self.$store.commit("updatePop",{
                            data:{//传入最新的弹框的state数据
                                title:"提示",
                                btns:[{
                                    type:"submit",//提交
                                    txt:"知道了",
                                    callback:function(e){
                                        this.hide();
                                    }.bind(pop)
                                }],
                                needShow:true,
                                content:{
                                    isTxt:true,
                                    msg:rst.message||"获取数据失败",
                                    attrList:null
                                }
                            }
                        });

                    }else{
                        console.log("返回数据为空");
                    }

                        
                },function(rst){
                    console.log("网络原因请求弹框数据失败");
                });
                    
            }
        },

        //删除单元（可以使组织，机构，职能单元等）
        deleteUnit:function(e){
            debugger
            var store=this.$store;
            var self=this;
            var pop=this.$root.$children[2];//pop组件
            var param=this.getDeleteParam();
            store.dispatch("deleteNode",{"param":param}).then(function(rst){
                if(rst&&rst.status==0){
                    hj.spaIns.deleteScene(param.nodeId);
                }
                else{
                    self.$store.commit("updatePop",{
                        data:{//传入最新的弹框的state数据
                            title:"提示",
                            btns:[{
                                type:"submit",//提交
                                txt:"知道了",
                                callback:function(e){
                                    this.hide();
                                }.bind(pop)
                            }],
                            needShow:true,
                            content:{
                                isTxt:true,
                                msg:rst.message||"删除节点失败",
                                attrList:null
                            }
                        }
                    });                }
            },function(){
                console.log("网络原因请求节点数据失败");
            });//获取节点信息
        },

        editUnit:function(){

        },


        //格式化弹框数据
        formatData:function(data){
            return {
                isTxt:false,
                msg:"",
                attrList:data||null
            };
        },

        getParam:function(){
            return {
                'isMock':true,
                'mockUrl':"index-mock.js?case=case2",
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
        //获取右侧节点信息请求所需要的参数
        getContetnParam:function(options){
            return {
                isMock:true,
                mockUrl:"index-mock.js?case=case2",
                url:"crm/org/GetNodeInfo",
                nodeId:2//节点id
            };
        },

        getDeleteParam:function(options){
            return {
                isMock:true,
                mockUrl:"index-mock.js?case=case2",
                url:"crm/org/DeleteNodeInfo",
                nodeId:2//节点id
            };
        },

        //选择弹框的下拉列表
        selectedItem:function(e){
            debugger
            console.log(1)
        }

        
    },
    template:templates
};

