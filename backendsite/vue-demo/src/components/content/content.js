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
            store.dispatch("getNodeData",{"param":this.getContetnParam(options)}).then(
                hj.request.success(this.render,this.requestFail),//this.requestFail:服务端接口返回失败的code，即status!=0
                hj.request.error("网络原因请求弹框数据失败"))//原因导致失败
        },


        
        /**********************页面对应的event事件 start**********************/
        //删除单元（可以使组织，机构，职能单元等）
        deleteUnit:function(e){
            var store=this.$store;
            var self=this;
            var pop=this.$root.$children[2];//pop组件
            var title=e.target.getAttribute("data-title")||"";
            var param=this.getDeleteParam();
            store.commit("updatePop",{
                data:{//传入最新的弹框的state数据
                    title:title,
                    btns:[{
                        type:"submit",//提交
                        txt:"删除",
                        callback:function(e){
                            this.hide();
                            store.dispatch("deleteNode",{"param":param}).then(
                                hj.request.success(self.deleteSceneSucceed,self.requestFail,{nodeId:param.nodeId,title:title}),
                                hj.request.error("网络原因请求弹框数据失败")
                            )
                        }.bind(pop)
                    },{
                        type:"cancel",//取消
                        txt:"取消",
                        callback:function(e){
                            this.hide();
                        }.bind(pop)
                    }],
                    needShow:true,
                    content:{
                        isTxt:true,
                        msg:"删除本组织后将不能回复,确定删除本组织吗？",
                        contentInfo:null
                    }
                }
            });
                        
        },

        //编辑单元
        editUnit:function(e){
            var store=this.$store;
            var self=this;
            var pop=this.$root.$children[2];//pop组件
            var param=this.getEditParam();
            var title=e.target.getAttribute("data-title")||"";

            store.dispatch("editNode",{"param":param}).then(
                hj.request.success(this.getEditUnitSuccess,this.requestFail,{title:title,pop:pop,title:title}),//this.requestFail:服务端接口返回失败的code，即status!=0
                hj.request.error("网络原因请求弹框数据失败"))
        },

        //点击pop事件
        createPop:function(e){
            var target=e.target;
            var self=this;
            var title=target.getAttribute("data-content")||"";
            var isSub=hj.hasClass(target,"js_baseic_sub_btn");
            var pop=this.$root.$children[2];//pop组件
            if(isSub||hj.hasClass(target,"js_basic_btn")){
                this.$store.dispatch("getPopInfo",{"param":this.getParam()}).then(
                    hj.request.success(this.getPopDataSuccess,this.requestFail,{title:title,pop:pop}),
                    hj.request.error("网络原因请求弹框数据失败")
                )
            }
        },
        /**********************页面对应的event事件 end**********************/
        

        /*************请求参数相关方法 start*************/

        getEditParam:function(){
            return {
                'isMock':true,
                'mockUrl':"index-mock.js?case=case3",
                'url':"crm/org/GetNodeExtAttr",
                "id": 0,
                "parentId": 0,
                "nodeName": "string",
                "isActive": true,
                "createuserId": 0,
                "nodeAttr": {},
                "isSub”": true
            }
        },

        getParam:function(){
            return {
                'isMock':true,
                'mockUrl':"index-mock.js?case=case3",
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
                url:"crm/org/deleteNode",
                nodeId:2//节点id
            };
        },

        /*************请求参数相关方法 end*************/


        /*****************ajax请求的处理函数 start*****************/

        //初始化请求成功后的render函数
        render:function(rst){
            this.$store.commit({
                type:"initDetail",
                data:rst.data||{},
                store:this.$store
            });
        },

        //点击新增按钮成功获取数据
        getPopDataSuccess:function(rst,opts){
            if(!rst.data){//这个是服务端接口返回有问题的时候才出现；status为成功，但是却没有返回对应的data
                this.showAlert({
                    title:"提示",
                    message:rst.message||"获取数据失败",
                    pop:opts.pop
                });
            }else{
                var formatedData=opts.pop.formatPopState(rst.data);
                this.$store.commit("updatePop",{
                    data:{//传入最新的弹框的state数据
                        title:opts.title,
                        btns:[{
                            type:"submit",//提交
                            txt:"保存",
                            callback:function(e){
                                this.saveUnit(e,true);
                            }.bind(opts.pop)
                        },{
                            type:"cancel",//取消
                            txt:"取消",
                            callback:function(e){
                                this.hide();
                            }.bind(opts.pop)
                        }],
                        needShow:true,
                        content:{
                            isTxt:false,
                            msg:"",
                            contentInfo:formatedData
                        }
                    }
                });
            }
        },

        //删除节点成功
        deleteSceneSucceed:function(rst,opts){
            hj.spaIns.deleteScene(opts.nodeId);
        },

        //点击编辑获取数据成功
        getEditUnitSuccess:function(rst,opts){
            if(!rst.data){
                this.showAlert({
                    title:"提示",
                    message:rst.message||"获取数据失败",
                    pop:opts.pop
                });
            }else{
                var formatedData=opts.pop.formatPopState(rst.data);
                this.$store.commit("updatePop",{
                    data:{//传入最新的弹框的state数据
                        title:opts.title,
                        btns:[{
                            type:"submit",//提交
                            txt:"保存",
                            callback:function(e){
                                this.saveUnit(e);
                            }.bind(opts.pop)
                        },{
                            type:"cancel",//取消
                            txt:"取消",
                            callback:function(e){
                                this.hide();
                            }.bind(opts.pop)
                        }],
                        needShow:true,
                        content:{
                            isTxt:false,
                            msg:"",
                            contentInfo:formatedData
                        }
                    }
                });
            }
        },

        //获取pop数据失败
        requestFail:function(rst,opts){
            this.showAlert({
                title:"提示",
                message:rst.message,
                pop:opts.pop
            });
        },

        
        /*****************ajax请求的处理函数 end*****************/


        //通用提示框
        showAlert:function(opts){
            this.$store.commit("updatePop", {
                data: { //传入最新的弹框的state数据
                    title: opts.title,
                    btns: [{
                        type: "submit", //提交
                        txt: "知道了",
                        callback: function(e) {
                            this.hide();
                        }.bind(opts.pop)
                    }],
                    needShow: true,
                    content: {
                        isTxt: true,
                        msg: opts.msg,
                        contentInfo: null
                    }
                }
            });
        }

    },
    template:templates
};

