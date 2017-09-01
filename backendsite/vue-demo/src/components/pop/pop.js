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
		                			attrList:null
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
	    }
    },
    template:newTemplate//第一个是自己的template，后面的是继承父组件的tempalte，第三个参数表示，默认的继承都是把父组件中的{{content}}
};


export default Pop

