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
	    saveUnit:function(e){  
	    	debugger
	        var param=this.getSaveParam();
	        var self=this;
	        this.$store.dispatch('saveUnit',{param:param}).then(function(rst){
	            if(rst.status==0){
	            	debugger
	                hj.spaIns.addScene(param.id);
	                self.hide();
	            }else{
	                self.hide();
	                debugger

	                setTimeout(function(){
	                	self.$store.commit({
		                	type:"updatePop",
		                	data:{
		                		btns:[{
                                    type:"submit",//取消
                                    txt:"知道了",
                                    callback:function(e){
                                        this.hide();
                                    }.bind(self)
                                }],
		                		content:{
		                			isTxt:true,
		                			msg:rst.message,
		                			contentInfo:null
		                		},
		                		needShow:true
		                	}
		                })
	                },0);
	            }
	        },function(){
	            console.log("网络原因请求数据失败");
	        });
	    },

	    //保存参数
	    getSaveParam:function(){
	        return {
	            'isMock':true,
	            'mockUrl':"index-mock.js?case=case2",
	            'url':"crm/org/CreateNode",
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
        	debugger
        	var target=e.target;
    		var val=target.selectedOptions[0].getAttribute("data-value");
        	var cloneContent=JSON.parse(JSON.stringify(this.$store.state.pops.data.content));
        	var newContent=this.formatPopState(cloneContent,val);
        	debugger
        	this.$store.commit({
        		type:"updatePop",
        		data:{
        			content:newContent
        		}
        	});
        },

        //有parentId的，如果他的父级没有选中，就需要隐藏；如果父级选中了一个选项，那么就要把对应的所有和它级联的对象的元素控制显示隐藏：isHide
        //数据结构件见：index-mock.js的crm/org/GetNodeExtAttr属性的case3
        //1.父级有选中，展示对应选项
        //2.父级没有选中||没有父级，隐藏所有子项
        formatPopState:function(cloneContent,val){
        	var extendAttrs=cloneContent.contentInfo.metaData.extendAttrs||[];//请求返回的data
        	var nextOptionCode=this.getNextOptionCode(extendAttrs);
        	if(nextOptionCode){
        		this.displaySubUnit(extendAttrs,nextOptionCode);
        	}
        	else{
        		this.hideSubUnit(extendAttrs);
        	}
        	return cloneContent;
        },

        //展示组织类型和拓展类型对应匹配的那些项
        displaySubUnit:function(extendAttrs,nextOptionCode){
        	(extendAttrs||[]).forEach(function(ele,idx,input){
        		input[idx].needHide=false;
        		var unit=input[idx].data;
        		(unit||[]).forEach(function function_name(subEle,index,subInput) {
        			subInput[index].isHide=(subEle.optionCode==nextOptionCode)?false:true;
        		});
        	});
        },

        //隐藏子节点（隐藏组织类型和拓展类型）
        hideSubUnit:function(extendAttrs){
        	(extendAttrs||[]).forEach(function(ele,idx,input){
        		if(ele.parentId){
        			input[idx].needHide=true;
        		}
        	});
        },

        //父级有对应的子节点的对应值，说明需要展示子节点
        getNextOptionCode:function(extendAttrs){
        	var nextOptionCode;
        	var parentNodeList=extendAttrs.filter(function(ele,idx,input){
        		return !ele.parentId
        	});
        	var parentNode=parentNodeList?parentNodeList[0]:null;
        	if(parentNode){//存在职能类型
        		var filterList=(parentNode.data||[]).filter(function(ele){
        			return ele.isSelected
	        	});
	        	if(filterList&&filterList.length){//存在选中选项
	        		nextOptionCode=filterList[0].nextOptionCode;
	        	}
	        	
        	}
        	return nextOptionCode;

        }
    },
    template:newTemplate//第一个是自己的template，后面的是继承父组件的tempalte，第三个参数表示，默认的继承都是把父组件中的{{content}}
};


export default Pop

