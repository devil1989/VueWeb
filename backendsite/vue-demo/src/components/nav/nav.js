require("./nav.scss");
var templates=require("./nav.html");



export default {
    data:function(){
    	return this.$store.state.nav;
    },

    methods: {
        genarateTemplate:function(nodeList){//目录结构层数没有限制，所以得动态拼接了，这个导航的template太坑（用vue的template完全没法写）
            var startStr=''+
                '<div class="school-nav school-nav-sub1">'+
                    '<h2>'+nodeList[0].nodeName+'<i class="direction-icon"></i></h2>'+
                    '<ul class="school-content-item">';

            var endStr='</ul> </div>';
            return startStr + this.getUnitHtml(nodeList[0].children||[]) + endStr;
        },
        getUnitHtml:function(nodeList){
                var htmlStr="";
                var len=nodeList.length;
                for (var i = 0; i < len; i++) {
                    var ele=nodeList[i];
                    var hasChild=ele.children&&ele.children.length;//没有子节点的时候，不需要展示+号
                    var isCurrent;//是否当前选中tab
                    var isFold;//该栏目是否折叠
                    var liClass;//是否是第一个元素
                    var endStr="</ul></li>";
                    if(i==0){
                        liClass="line-start";
                    }else if(i==len-1){
                        liClass="line-end"
                    }

                    isCurrent = "";//此逻辑后续不删 unfinish||"current-nav"
                    isFold = "";//此逻辑后续不删 unfinish ||"fold-item"

                    htmlStr+='<li class="'+liClass+' '+isFold+(!hasChild?" have-no-child":"")+'">'+
                                '<div class="school-nav '+isCurrent+' ">'+
                                    '<i class="dashline-absolute-top"></i>'+
                                    '<i class="dashline-absolute-bottom"></i>'+
                                    '<i class="dashline-absolute-left"></i>'+
                                    '<span class="reduce-icon float-left fold-icon">-</span>'+
                                    '<span class="plus-icon float-left fold-icon">+</span>'+
                                    '<h3 class="float-left">'+ele.nodeName+'</h3>'+
                                '</div>'+
                                '<ul class="school-content-item space-indent-1 ">';
                    htmlStr+=(hasChild?(this.getUnitHtml(ele.children||[])):"")+endStr;//递归调用，核心代码
                    // if(!hasChild){
                    //     htmlStr+=endStr;
                    // }else{
                    //     htmlStr+=arguments.callee(ele.children||[]);
                    //     htmlStr+=endStr;
                    // }
                }
                return htmlStr
        },

        updateComponent:function(){
            //父组件中手动调用子组件的更新，这个比较坑，没遇到vuex和vue，因为目录组件结构是未知的，不知道他丫的有几层
            var ele=document.querySelector(".internet-school-nav");
            var htmlStr=this.genarateTemplate(this.$data.data.nodeList);
            debugger
            ele.innerHTML=htmlStr;
        }

    },
    template:templates
};

