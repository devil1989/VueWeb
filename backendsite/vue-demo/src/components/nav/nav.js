require("./nav.scss");
var templates=require("./nav.html");



export default {
    data:function(){
        return {}
    	// return this.$store.state.nav;
    },
    methods: {
        
        genarateTemplate:function(nodeList){//目录结构层数没有限制，所以得动态拼接了，这个导航的template太坑（用vue的template完全没法写）
            var startStr=''+
                '<div class="school-nav school-nav-sub1">'+
                    '<h2>'+nodeList[0].nodeName+'<i class="direction-icon"></i></h2>'+
                    '<ul class="school-content-item">';

            var endStr='</ul> </div>';

            return startStr + this.getUnitHtml(nodeList[0].children||[],this.getCurrentScene()) + endStr;
        },

        getCurrentScene:function (argument) {
            var hash=location.hash;
            var sceneId;
            var match=hash.match(/combine(\-[\s\S]*)/);
            if(match&&match[1]&&match[1].split("&")[0]){
                var arr=match[1].split("&")[0].split("-")||[];
                var len=arr.length;
                sceneId=arr[len-1];
            }
            return sceneId;
        },
        getUnitHtml:function(nodeList,currentScene){//树是递归嵌套的，html也需要递归嵌套
                var htmlStr="";
                var len=nodeList.length;
                
                for (var i = 0; i < len; i++) {
                    var ele=nodeList[i];
                    var hasChild=ele.children&&ele.children.length;//没有子节点的时候，不需要展示+号
                    var isCurrent;//是否当前选中tab
                    var isFold;//该栏目是否折叠
                    var liClass;//是否是第一个元素
                    var activeClass;
                    var endStr="</ul></li>";
                    var typeClass=this.getTypeClass(ele.nodeType).className||"";//获取类型对应的class
                    if(i==0){
                        liClass="line-start";
                    }else if(i==len-1){
                        liClass="line-end"
                    }
                    isCurrent = (currentScene==ele.id )?" current-nav":"";//url没有sceneid，默认都选择第一个否则根据url还判断选中哪个

                    isFold = ele.isFold?"fold-item":"unfold-item";
                    activeClass=ele.isActive?"":" unactive"

                    htmlStr+='<li class="'+liClass+' '+isFold+(!hasChild?" have-no-child":"")+activeClass+'">'+
                                '<div class="school-nav js_current_scene'+activeClass+isCurrent+typeClass+' " data-id="'+ele.id +'" >'+
                                    '<i class="dashline-absolute-top'+activeClass+'"></i>'+
                                    '<i class="dashline-absolute-bottom'+activeClass+'"></i>'+
                                    '<i class="dashline-absolute-left'+activeClass+'"></i>'+
                                    '<span class="reduce-icon float-left fold-icon'+activeClass+' js_fold_icon js_reduce_icon">-</span>'+
                                    '<span class="plus-icon float-left fold-icon'+activeClass+' js_fold_icon js_plus_icon">+</span>'+
                                    '<h3 class="float-left js_current_scene'+activeClass+'" data-id="'+ ele.id +'">'+ele.nodeName+'</h3>'+
                                '</div>'+
                                '<ul class="school-content-item space-indent-1 ">';

                    this.$options.treeLevel++;
                    htmlStr+=(hasChild?(this.getUnitHtml(ele.children||[],currentScene)):"")+endStr;//递归调用，核心代码
                }

                return htmlStr
        },

        // 1： 业务域 ，2： 机构 ，3： 业务单元 ，4： 职能单元 ，5： 职能组 ，6： 职能小组
        getTypeClass:(nodeType)=>{
            var nameMapping={
                "1":"业务域",
                "2":"机构",
                "3":"业务单元",
                "4":"职能单元",
                "5":"职能组",
                "6":"职能小组"
            };
            var classMapping={
                "1":" ",
                "2":"",
                "3":"",
                "4":" tagIcon",
                "5":" tagIcon",
                "6":" tagIcon"
            }
            return {
                name:nameMapping[nodeType],
                className:classMapping[nodeType]
            };
        },


        init:function(options){
            // this.$store.commit({//初始化的时候传入ajax数据，后期数据都通过this.$data获取
            //     type:"initNav",
            //     initData:options,
            //     store:this.$store
            // });//执行mutations中的对应行为

            //父组件中手动调用子组件的更新，这个比较坑，没遇到vuex和vue，因为目录组件结构是未知的，不知道他丫的有几层
            this.opts=options;
            this.update(options);
            this.bindEvents();
        },

        //只更新内容，不绑定事件
        update:function(){
            var options=this.opts;
            if(options){
                this.formatData(options.nodeList||[]);
                var ele=document.querySelector(".internet-school-nav");
                var htmlStr=this.genarateTemplate(options.nodeList);
                ele.innerHTML=htmlStr;
            }
        },

        //递归调用，把父元素isActive为0 ，则设置所有子元素isAcitve 为0
        formatData:function(nodeList){
            var self=this;
            nodeList.forEach(function(ele,idx,input){
                var hasChild=input[idx].children&&input[idx].children.length;//没有子节点的时候，不需要展示+号
                if(hasChild){
                    if(!input[idx].isActive){//禁用所有子元素
                        input[idx].children.forEach(function(unit,index,subInput){
                            subInput[index].isActive=false;
                        });
                    }
                    self.formatData(input[idx].children);
                }
            });
        },

        checkValidClick:function(e){
            var target=e.target;
            return !hj.hasClass(target,"unactive");
        },
        //绑定事件
        bindEvents:function(){
            var ele=document.querySelector(".internet-school-nav");
            var self=this;
            ele.addEventListener("click",function(e){
                if(self.checkValidClick(e)){
                    self.toggleFold(e.target);
                    self.toggleScene(e);
                }
            });
        },

        toggleFold:function(target){
            var ele=target;
            var id=ele.parentNode.getAttribute("data-id");
            if(hj.hasClass(ele,"js_fold_icon")){
                var isFold=hj.hasClass(ele,"js_plus_icon")?false:true
                this.updateOptions(this.opts.nodeList,id,isFold);
                this.update();
            }
        },
        toggleScene:function(e){
            var target=e.target;
            if(hj.hasClass(target,"js_current_scene")){
                var sceneId=target.getAttribute("data-id")||"";
                hj.spaIns.addScene(sceneId);
            }
        },

        //把树结构中所有节点id为传入id的时候，设置这个节点为折叠
        updateOptions:function(nodeList,id,isFold){
            var self=this;
            if(nodeList||[]){
                nodeList.forEach(function(ele,idx,input){
                    if (ele.id==id) {
                        input[idx].isFold=isFold;
                    }
                    if(ele.children&&ele.children.length){
                        self.updateOptions(ele.children,id,isFold);
                    }
                });
            }
        }

    },
    template:templates
};

