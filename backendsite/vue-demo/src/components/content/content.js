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
            var pop=this.$root.$children[2];//pop组件
            store.dispatch("getNodeData",{"param":this.getContetnParam(options)}).then(
                hj.request.success(this.render,this.requestFail,{pop:pop}),//this.requestFail:服务端接口返回失败的code，即status!=0
                hj.request.error("网络原因请求弹框数据失败"))//原因导致失败
        },


        
        /**********************页面对应的event事件 start**********************/
        //删除单元（可以使组织，机构，职能单元等）
        deleteUnit:function(e){
            var store=this.$store;
            var self=this;
            var pop=this.$root.$children[2];//pop组件
            var title=e.target.getAttribute("data-title")||"";
            var currentNodeId=e.target.parentNode.getAttribute("data-id");
            var delParam=this.getDeleteParam(currentNodeId);
            var checkParam=this.getCheckParam(currentNodeId);
            var extendObj={
                pop:pop,
                title:title,
                param:delParam
            };
            store.dispatch("checkChildActive",{param:checkParam}).then(
                hj.request.success(this.checkSuccess,this.checkFail,extendObj),
                hj.request.error("网络原因请求弹框数据失败")
            )
        },

        //编辑单元
        editUnit:function(e){
            var store=this.$store;
            var self=this;
            var pop=this.$root.$children[2];//pop组件
            var nodeId=e.target.parentNode.getAttribute("data-id")||"";
            var param=this.getEditParam(nodeId);
            var title=e.target.getAttribute("data-title")||"";
            var nodeName=e.target.getAttribute("data-parent-name")||"";
            store.dispatch("editNode",{"param":param}).then(
                hj.request.success(this.getEditUnitSuccess,this.requestFail,{title:title,pop:pop,title:title,nodeName:nodeName,nodeId:nodeId}),//this.requestFail:服务端接口返回失败的code，即status!=0
                hj.request.error("网络原因请求弹框数据失败"))
        },

        //点击pop事件
        createUnit:function(e){
            var target=e.target;
            var self=this;
            var title=target.getAttribute("data-content")||"";
            var nodeName=target.getAttribute("data-name")||"";
            var isSub=hj.hasClass(target,"js_baseic_sub_btn");
            var nodeId=target.getAttribute("data-id");
            var pop=this.$root.$children[2];//pop组件
            if(isSub||hj.hasClass(target,"js_basic_btn")){
                this.$store.dispatch("getPopInfo",{"param":this.getCreateParam({
                    isSub:isSub,
                    id:nodeId
                })}).then(
                    hj.request.success(this.getPopDataSuccess,this.requestFail,{title:title,pop:pop,nodeName:nodeName,isSub:isSub}),
                    hj.request.error("网络原因请求弹框数据失败")
                )
            }
        },
        /**********************页面对应的event事件 end**********************/
        

        /*************请求参数相关方法 start*************/

        getEditParam:function(nodeId){
            var nodeInfo=hj.getDataById(nodeId);
            return {
                'isMock':false,
                'mockUrl':"index-mock.js?case=case3",
                'url':"crm/OrganizationV2/GetNodeExtAttr",
                'type':'get',
                'data':{
                    "nodeId": nodeId,//新增的时候nodeId为0
                    "parentId": nodeInfo.info.parentId,//父级节点id
                    "isSub": false//是否是新增子级
                }
            }
        },

        getDeleteParam:function(nodeId){
            return {
                'isMock':false,
                'mockUrl':"index-mock.js?case=case2",
                'url':"crm/OrganizationV2/deleteNode",
                'type':"post",
                'data':{
                    'nodeId':nodeId//节点id
                }
            };
        },

        getCreateParam:function(opts){
            return {
                'isMock':false,
                'mockUrl':"index-mock.js?case=case3",
                'url':"crm/OrganizationV2/GetNodeExtAttr",
                "type":"get",
                "data":{
                    "nodeId": 0,//新增为0
                    "parentId": opts.id,//其实就是当前所在层的id，该层新增按钮添加的都是子节点
                    "isSub": opts.isSub
                }
            }
        },

        //获取右侧节点信息请求所需要的参数
        getContetnParam:function(id){
            return {
                'isMock':false,
                'mockUrl':"index-mock.js?case=case1",
                'type':"get",
                'url':"crm/OrganizationV2/GetNodeInfo",
                'data':{nodeId:id}//节点id
            };
        },

        getCheckParam:function(nodeId){
            return {
                'isMock':false,
                'mockUrl':"index-mock.js?case=case1",
                'url':"crm/OrganizationV2/CheckChild",
                'type':'get',
                "data":{
                    'nodeid':nodeId
                }
            }
        },
        

        /*************请求参数相关方法 end*************/


        /*****************ajax请求的处理函数 start*****************/

        //初始化请求成功后的render函数
        render:function(rst){
            if(rst.Data&&rst.Status==0){
                hj.setDataById(rst.Data.info.id,rst.Data);//保存数据到localstorage里面，后面统一从这里获取数据
                rst.Data.btns=rst.Data.btns||[];//以防template报错
                this.$store.commit({
                    type:"initDetail",
                    data:rst.Data||{},
                    store:this.$store
                });
            }else{
                console.log("获取节点数据失败");
            }
        },

        //点击新增按钮成功获取数据
        getPopDataSuccess:function(rst,opts){
            if(!rst.Data){//这个是服务端接口返回有问题的时候才出现；status为成功，但是却没有返回对应的data
                this.showAlert({
                    title:"提示",
                    message:rst.Message||"获取数据失败",
                    pop:opts.pop
                });
            }else{
                var formatedData=opts.pop.formatPopState(rst.Data,opts.nodeName);//这个是新增的元素的父级节点（也就是节点本身）
                this.$store.commit("updatePop",{
                    data:{//传入最新的弹框的state数据
                        title:opts.title,
                        btns:[{
                            type:"submit",//提交
                            txt:"保存",
                            callback:function(e){
                                var popInfo=this.getPopInfo(false,opts.isSUb);
                                this.saveUnitAction(e,popInfo);
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

        checkSuccess:function(rst,opts){
            var pop=this.$root.$children[2];//pop组件
            var store=this.$store;
            var self=this;

            store.commit("updatePop",{
                data:{//传入最新的弹框的state数据
                    title:opts.title,
                    btns:[{
                        type:"submit",//提交
                        txt:"删除",
                        callback:function(e){
                            this.hide();
                            store.dispatch("deleteNode",{"param":opts.param}).then(
                                hj.request.success(self.deleteSceneSucceed,self.requestFail,{nodeId:opts.param.nodeId,title:opts.title,pop:opts.pop}),
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

        //删除节点成功
        deleteSceneSucceed:function(rst,opts){
            hj.spaIns.deleteScene(opts.nodeId);
        },

        //点击编辑获取数据成功
        getEditUnitSuccess:function(rst,opts){
            if(!rst.Data||rst.Status!=0){
                this.showAlert({
                    title:"提示",
                    message:rst.Message||"获取数据失败",
                    pop:opts.pop
                });
            }else{
                var formatedData=opts.pop.formatPopState(rst.Data,opts.nodeName);//opts.nodeName是他父节点的nodeName
                this.$store.commit("updatePop",{
                    data:{//传入最新的弹框的state数据
                        title:opts.title,
                        btns:[{
                            type:"submit",//提交
                            txt:"保存",
                            callback:function(e){
                                var popInfo=this.getPopInfo(true,false);
                                this.saveUnitAction(e,popInfo);
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

        /* unfinish
         isEdit:是否是编辑框
         isSub：是否是新增子节点
         */
        getPopInfo:function(isEdit,isSub){
            return {
                isSub:false,
                id:hj.spaIns.getCurrentScene(),
                code:43,
                value:4354
            }
        },

        //获取pop数据失败
        requestFail:function(rst,opts){
            this.showAlert({
                title:opts.title,
                msg:rst.Message,
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
        },

        checkFail:function(rst,opts) {
            this.showAlert({
                title:"提示",
                pop:opts.pop,
                msg:rst.Message
            });
        }

    },
    template:templates
};

