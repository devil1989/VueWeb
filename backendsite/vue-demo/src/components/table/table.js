require("./table.scss");
var templates=require("./table.html");
export default {
    template:templates,
    data:function(){
        return this.$store.state.tables;
    },
    methods:{//被自己蠢哭了，methods.不是mothods
    	"youjumpijump":function(e){
    		//点击有js_jump_to_page的li元素或者它的子元素，或者是确定按钮
    		if(hj.hasClass(e.target,"js_jump_to_page")||hj.hasClass(e.target.parentNode,"js_jump_to_page")){
    			debugger
    			var targetPageNum=++e.target.innerHTML.match(/\d{1,}/g)[0]-1;
    			this.$store.commit("jumpToTargetPage",{
    				currentPageIndex:targetPageNum,
    				callback:this.$parent.mapData
    			});
    		}
    	}
    }
};


