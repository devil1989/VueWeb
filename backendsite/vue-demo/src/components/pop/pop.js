import Alert from '../alert/alert.js'
require("./pop.scss");
var templates=require("./pop.html");

var newTemplate=hj.inheritHtml(templates,Alert.template);
var Pop={
    extends:Alert,//继承自Alert
	data:function(){
        return this.$store.state.pops;
    },


    methods: {
    	 //点击保存
	    saveUnit:function(e,isAdd){
            this.isAdd=isAdd;
	        var param=this.getSaveParam();
	        var self=this;
            this.checkValid(param);
	    },

        saveUnitRequest:function(){
            var param=this.getSaveParam();
            this.$store.dispatch('saveUnit',{param:param}).then(
                hj.request.success(this.saveSuccess,this.saveFail,{id:param.id}),
                hj.request.error("网络原因请求弹框数据失败")
            );
        },

        saveSuccess:function(rst,opts){
            if(this.isAdd){//新增的保存
                hj.spaIns.addScene(opts.id);
            }else{//编辑的保存
                hj.spaIns.updateScene();
            }
            
        },

        saveFail:function(rst,opts){
            this.showAlert({
                title:"提示",
                msg:rst.message
            });

            // this.$store.commit({
            //     type:"updatePop",
            //     data:{
            //         btns:[{
            //             type:"submit",//取消
            //             txt:"知道了",
            //             callback:function(e){
            //                 this.hide();
            //             }.bind(self)
            //         }],
            //         content:{
            //             isTxt:true,
            //             msg:rst.message,
            //             contentInfo:null
            //         },
            //         needShow:true
            //     }
            // })
        },

        //title
        checkValid:function(param){
            if(!param.isActive){
                var param=this.getCheckParam();
                this.$store.dispatch("checkChildActive",{param:param}).then(
                    hj.request.success(this.checkSuccess,this.checkFail),
                    hj.request.error("网络原因请求弹框数据失败")
                )
            }else{
                return;
            }
        },

        checkSuccess:function(rst,opts){
            if(rst.message){//有提示信息，说明不能禁用，这个有待商量
                var pop=this.$root.$children[2];//pop组件
                var originTitle=this.$store.state.pops.data.title;
                var targetTitle="禁用"+originTitle.substring(2);

                store.commit("updatePop",{
                    data:{//传入最新的弹框的state数据
                        title:targetTitle,
                        btns:[{
                            type:"submit",//提交
                            txt:"确认",
                            callback:function(e){
                                this.hide();
                                this.saveUnitRequest();
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
                            msg:rst.message,
                            contentInfo:null
                        }
                    }
                });
            }else{//没有提示说明可以直接禁用，直接调用保存接口即可
                this.saveUnitRequest();
            }
        },

        checkFail:function(rst,opts) {
            var targetTitle="禁用"+originTitle.substring(2);
            this.showAlert({
                title:"提示",
                pop:this.$root.$children[2],
                msg:"保存失败，请重新保存"
            });
        },

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

        getCheckParam:function(){
            return {
                'isMock':true,
                'mockUrl':"index-mock.js?case=case1",
                'url':"crm/org/CheckChild",
                "id": 3
            }
        },

	    //保存参数
	    getSaveParam:function(){
	        return {
	            'isMock':true,
	            'mockUrl':"index-mock.js?case=case2",
	            'url':"crm/org/SaveNode",
	            "id": 3,
	            "parentId": 0,
	            "nodeName": "string",
	            "isActive": true,
	            "updateuserId": 0,
	            "nodeAttr": [],
	            "isSub": true
	        }
	    },

        //选择弹框的下拉列表
        selectedItem:function(e){
        	var target=e.target;
    		var optionsid=target.selectedOptions[0].getAttribute("data-optionid");
            var id=target.getAttribute("data-id");
        	var cloneContent=JSON.parse(JSON.stringify(this.$store.state.pops.data.content));
            this.markSelectedItem(cloneContent.contentInfo,id,optionsid);
            this.formatPopState(cloneContent.contentInfo);//this.$store.state.pops.data.content.contentInfo是接口返回的data

        	this.$store.commit({
        		type:"updatePop",
        		data:{
        			content:cloneContent
        		}
        	});
        },

        markSelectedItem:function(cloneData,id,optionsid){
            var extendAttrs=cloneData.metaData.extendAttrs||[];//请求返回的data
            cloneData.metaData.extendAttrs.forEach(function(ele,idx,input){
                if (ele.id==id) {
                    (input[idx].data||[]).forEach(function(unit,index,subInput){
                        if (unit.id==optionsid) {
                            subInput[index].isSelected=true;
                        }
                    });
                }
            });
        },

        //有parentId的，如果他的父级没有选中，就需要隐藏；如果父级选中了一个选项，那么就要把对应的所有和它级联的对象的元素控制显示隐藏：isHide
        //数据结构件见：index-mock.js的crm/org/ GetNodeExtAttr 属性的case3
        //1.父级有选中，展示对应选项
        //2.父级没有选中||没有父级，隐藏所有子项
        //给extendAttrs的对象单元添加needHide，控制是否展示这个元素节点
        //给extendAttrs的对象单元中的data的单元添加isHide，控制option元素是否展示
        formatPopState:function(cloneData){
        	var extendAttrs=cloneData.metaData.extendAttrs||[];//请求返回的data
        	var tgOption=this.getNextOptionCode(extendAttrs);
        	if(tgOption){
        		this.displaySubUnit(extendAttrs,tgOption);
        	}
        	else{
        		this.hideSubUnit(extendAttrs);
        	}
        	return cloneData;
        },

        //父级有对应的子节点的对应值，说明需要展示子节点
        getNextOptionCode:function(extendAttrs){
            var nextOptionCode,targetId;
            var parentNodeList=extendAttrs.filter(function(ele,idx,input){
                return !ele.parentId
            });
            var parentNode=parentNodeList?parentNodeList[0]:null;
            if(parentNode){//存在职能类型
                var targetId=parentNode.id;
                var filterList=(parentNode.data||[]).filter(function(ele){
                    return ele.isSelected
                });
                if(filterList&&filterList.length){//存在选中选项
                    nextOptionCode=filterList[0].nextOptionCode;
                }
                
            }
            return nextOptionCode?{
                nextOptionCode:nextOptionCode,
                id:targetId
            }:null;
        },

        //展示组织类型和拓展类型对应匹配的那些项
        /*
            opts:{
                nextOptionCode:nextOptionCode,//关联的子节点code
                id:targetId，该选项所在的对象的id（外层id，不是该选项的id）
            }
         */
        displaySubUnit:function(extendAttrs,opts){
        	(extendAttrs||[]).forEach(function(ele,idx,input){
                if(ele.id==opts.id){
                    input[idx].needHide=false;
                    return;
                }else{
                    if(ele.parentId==opts.id){
                        input[idx].needHide=false;
                        var unit=input[idx].data;
                        (unit||[]).forEach(function (subEle,index,subInput) {
                            subInput[index].isHide=(subEle.optionCode==opts.nextOptionCode)?false:true;
                        });
                    }
                    else{//不是关联的那个，就需要隐藏
                        input[idx].needHide=true;
                        return;
                    }
                }
        		
            		
        	});
        },

        //隐藏子节点（隐藏组织类型和拓展类型）
        hideSubUnit:function(extendAttrs){
        	(extendAttrs||[]).forEach(function(ele,idx,input){
        		if(ele.parentId){
        			input[idx].needHide=true;
        		}
        	});
        }
        
    },
    template:newTemplate//第一个是自己的template，后面的是继承父组件的tempalte，第三个参数表示，默认的继承都是把父组件中的{{content}}
};


export default Pop

