require("./table.scss");
var templates=require("./table.html");
export default {
    template:templates,
    data:function(){
        return this.$store.state.tables;
    },
    methods:{

    	//初始化，包含了数据请求
    	init:function(options){
    		var self=this;
    		var store=this.$store;
    		store.dispatch("getTableData",{"param":this.getTableParam(options)}).then(function(tableData){
                if(tableData.status==0){
                	self.render(options,tableData.data);
                }
                else{
                    console.log("!!!请求节点数据失败");
                }
            },function(){
                console.log("网络原因请求节点数据失败");
            });//获取节点信息
    	},

    	//请求数据直接render，如果有已经获取的数据，可以直接render
    	render:function(options,originData){
    		var data=this.formatData(originData);

    		//格式化传过来的数据
            this.$store.commit({
                type:"updateTableContent",
                data:data||{}
            });
    	},

    	//格式化数据，把需要展示的数据算出来
        formatData:function(data){
            if(!data||!data.pagination||!data.resultData){
                return {};
            }
            else if(data.pagination.currentPageIndex>Math.ceil(data.resultData.length/data.pagination.pageSize)){//当前页码大于总的页数
                data.pagination.currentPageIndex=1;
            }
            var pageSize=data.pagination.pageSize;
            var pageNum = Math.ceil(data.resultData.length/pageSize);
            var currentPage=data.pagination.currentPageIndex;
            var len=(data.resultData||[]).length;
            var displayRange=1;
            data.pagination.pageNum=pageNum;//一共有多少页
            data.pagination.jumpNum=1;//想要跳转到哪一页，input框中的数据
            data.formatedInfo=this.getPageArray(data.resultData,pageSize);
            this.mapData(data,currentPage);
            return data
        },

        //获取分页信息,把服务端的数组按照页面size分成多个数组
        getPageArray:function(data,pageSize){
            var cloneData=JSON.parse(JSON.stringify(data));
            var len=(cloneData||[]).length;
            var targetArray=[];
            var tempArray=[];
            var tempPageIndex=0;

            for(var i=0;i<len;i++){
                var pageIndex=Math.floor(i/pageSize);
                if(tempPageIndex!=pageIndex){
                    targetArray.push({
                        pageIndex:pageIndex,
                        pageContent:tempArray
                    });
                    tempArray=[];
                }
                tempPageIndex=pageIndex;
                
                tempArray.push(cloneData[i]);
            }

            targetArray.push({
                pageIndex:pageIndex+1,
                pageContent:tempArray
            });

            return targetArray;
        },

        /*
         description:核心函数，处理页码的展示规则
         @param
         	data:原来的table数据，所有信息都是在一个list
			currentPageIndex:当前页码
			displayRange：当前页码左右展示几个可见得页码
         */
        mapData:function(data,currentPageIndex,displayRange=1){
            var displayRange=displayRange;
            var pageNum=data.formatedInfo.length;//一共有多少页
            data.pagination.currentPageIndex = currentPageIndex;
            
            (data.formatedInfo||[]).forEach(function(tgs,index,input){
                var ele=input[index];
                var idx=index+1;//当前是第几页
                ele.jumpClass=true;//是否需要跳转的class
                ele.isCurrent=(idx==currentPageIndex)?true:"";//元素是否是当前页
                ele.noHover=false;//元素是否需要hover效果
                ele.isShow=false;//是否展示元素
                ele.txt="";//元素的展示内容

                if(currentPageIndex<=displayRange+2){//从1到currentPageIndex之间没有...,展示1~currentPageIndex+2，
                    if(idx>0&&(idx<=currentPageIndex+displayRange)){
                        ele.txt=idx;
                        ele.isShow=true;
                    }
                    else{//看剩下的页码怎么展示

                        if(idx==pageNum-1){
                            ele.txt="...";
                            ele.noHover=true;
                            ele.jumpClass="";
                            ele.isShow=true;
                        }
                        else{//中间隐藏的元素
                            ele.txt=idx;
                            ele.isShow=false;
                            if(idx==pageNum){
                                ele.isShow=true;
                            }
                        }
                    }
                }else{//大于4的时候，结构很稳定了1...current-2,current-1,current,current+1,current+2,
                    if(idx==1){
                        ele.txt=idx;
                        ele.isShow=true;
                    }
                    else if(idx==2){
                        ele.txt="...";
                        ele.isShow=true;
                        ele.noHover=true;
                        ele.jumpClass="";
                    }
                    else if((idx>=(currentPageIndex-displayRange)&&idx<=(currentPageIndex+displayRange))){//区间内都展示
                        ele.txt=idx;
                        ele.isShow=true;
                    }else{//区间外，如果后面还有2个或以上元素，第一个元素变...
                        if(pageNum>currentPageIndex+displayRange+1){//currentPageIndex在页面中间，那么最后面有...和最后一页
                            if(idx==pageNum-1){
                                ele.txt="...";
                                ele.noHover=true;
                                ele.isShow=true;
                                ele.jumpClass="";
                            }
                            else if(idx==pageNum){
                                ele.txt=idx;
                                ele.isShow=true;
                            }
                            else{//中间隐藏的元素
                                ele.txt=idx;
                                ele.isShow=false;
                            }
                        }else{//currentPageIndex在页面最后3个元素中的其中一个，中间没...,,所以最后的数字展示比较特殊
                            if((idx>=(currentPageIndex-displayRange)&&idx<=(currentPageIndex+displayRange+1))){
                                ele.txt=idx;
                                ele.isShow=true;
                            }
                            else{
                                ele.txt=idx;
                                ele.isShow=false;
                            }
                                
                        }
                    }
                }

            });
        },

        //跳转到table的某个tab分页
    	jumptopage:function(e){
    		var targetEle=e.target;
    		var hasClass=hj.hasClass;
    		var targetPageNum;
    		debugger
    		//点击有js_jump_to_page的li元素或者它的子元素，或者是确定按钮
    		if(hasClass(targetEle,"js_confirm_btn")){
    			targetPageNum=targetEle.getAttribute("data-num")-0;
    		}
    		else if(hasClass(targetEle,"js_jump_to_page")||hasClass(targetEle.parentNode,"js_jump_to_page")){//||hasClass(e.target,"js_jump_to_page")
    			targetPageNum=e.target.innerHTML.match(/\d{1,}/g)[0]-0;
    		}

    		if(targetPageNum&&targetPageNum>0&&targetPageNum<=this.data.pagination.pageNum){
				this.$store.commit("jumpToTargetPage",{
					currentPageIndex:targetPageNum,
					callback:this.mapData
				});
    		}
	    		
    	},
    	

    	//获取底部table请求所需要的参数
        getTableParam:function(options){
            return {
                "isMock":true,
                "mockUrl":"index-mock.js?case=case1",
                "url":"crm/org/GetMember",
                "pageNum": 1,//页码
                "pageSize": 10,//每页多少个
                "paramData": {
                  "groupId": 2 //节点id
                }
            }
        }
        
    }
};


