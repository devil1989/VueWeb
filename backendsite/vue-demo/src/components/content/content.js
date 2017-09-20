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
            debugger
            store.dispatch("checkChildActive",{param:checkParam}).then(
                hj.request.success(this.checkSuccess,this.checkFail,extendObj),
                hj.request.error("网络原因请求弹框数据失败")
            )
        },

        //编辑单元
        editUnit:function(e){
            debugger
            var isActive=(e.target.getAttribute("data-isactive")||"1")==1?true:false;//默认启用
            var store=this.$store;
            var self=this;
            var pop=this.$root.$children[2];//pop组件
            var nodeId=e.target.parentNode.getAttribute("data-id")||"";
            var param=this.getEditParam(nodeId);
            var title=e.target.getAttribute("data-title")||"";
            var nodeName=e.target.getAttribute("data-parent-name")||"";
            var typeDes="edit";
            var opts = {
                type: typeDes,
                isSub: false
            };
            pop.setLocalstorage(opts);
            store.dispatch("editNode",{"param":param}).then(
                hj.request.success(this.getEditUnitSuccess,this.requestFail,{
                    title: title,
                    parentName: nodeName,
                    isSub:false,
                    isActive:isActive,
                    type:typeDes,
                    pop:pop
                }),
                hj.request.error("网络原因请求弹框数据失败"))
        },

        //点击pop事件
        createUnit:function(e){
            var target=e.target;
            var self=this;
            var title=target.getAttribute("data-content")||"";
            var nodeName=target.getAttribute("data-name")||"";//新增pop的时候，父级节点名称就是pop本身的节点名称
            var isSub=hj.hasClass(target,"js_baseic_sub_btn");
            var nodeId=target.getAttribute("data-id");
            var pop=this.$root.$children[2];//pop组件
            var typeDes="create";
            pop.setLocalstorage({
                type: typeDes,
                isSub: isSub
            });
            if(isSub||hj.hasClass(target,"js_basic_btn")){
                this.$store.dispatch("getPopInfo",{"param":this.getCreateParam({
                    isSub:isSub,
                    parentId:nodeId
                })}).then(
                    hj.request.success(this.getPopDataSuccess,this.requestFail,{
                        title: title,
                        parentName: nodeName,//弹框展示的父级名称后端不下发，需要自己从之前的节点请求接口获取
                        type: "create",
                        isSub: isSub,
                        isActive:true,//新增默认启用
                        pop:pop
                }),
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
                    "nodeId": nodeId+"",//新增的时候nodeId为0
                    "parentId": nodeInfo.info.parentId+"",//父级节点id
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
                    "parentId": opts.parentId,//其实就是当前所在层的id，该层新增按钮添加的都是子节点
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
                var detailPop=opts.pop;
                opts.pop=null;//这个要保存到localStorage里面，不需要把那么大的pop也保存进去
                var formatedData=detailPop.formatPopState(rst.Data,opts);//这个是新增的元素的父级节点（也就是节点本身）
                this.$store.commit("updatePop",{
                    data:{//传入最新的弹框的state数据
                        title:opts.title,
                        btns:[{
                            type:"submit",//提交
                            txt:"保存",
                            callback:function(e){
                                this.saveUnitAction(e);
                            }.bind(detailPop)
                        },{
                            type:"cancel",//取消
                            txt:"取消",
                            callback:function(e){
                                this.hide();
                            }.bind(detailPop)
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
            //有数据修改的时候，status为0表示操作成功，
            //没有数据修改的时候，status表示数据操作查询或者check成功，但是check是否成功或者查询是否有时间，需要通过Data来验证，check成功的时候，Data为true否则为false；
            if(rst.Data==false){//表示校验这个操作成功，但是校验没通过，因为有子节点启用
                opts.pop.checkFail(rst,opts);
            }
            else{
                var pop=this.$root.$children[2];//pop组件
                var store=this.$store;
                var self=this;
                debugger
                store.commit("updatePop",{
                    data:{//传入最新的弹框的state数据
                        title:opts.title,
                        btns:[{
                            type:"submit",//提交
                            txt:"删除",
                            callback:function(e){
                                this.hide();
                                store.dispatch("deleteNode",{"param":opts.param}).then(
                                    hj.request.success(self.deleteSceneSucceed,self.requestFail,{nodeId:opts.param.data.nodeId,title:opts.title,pop:opts.pop}),
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
            }
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
                var detailPop=opts.pop;
                opts.pop=null;
                var formatedData=detailPop.formatPopState(rst.Data,opts);//opts.nodeName是他父节点的nodeName
                this.$store.commit("updatePop",{
                    data:{//传入最新的弹框的state数据
                        title:opts.title,
                        btns:[{
                            type:"submit",//提交
                            txt:"保存",
                            callback:function(e){
                                // var popInfo=this.getPopInfo(opts);
                                this.saveUnitAction(e);
                            }.bind(detailPop)
                        },{
                            type:"cancel",//取消
                            txt:"取消",
                            callback:function(e){
                                this.hide();
                            }.bind(detailPop)
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

