require("./nav.scss");
// var templates=require("./nav.html");

function genarateTemplate(){//目录结构成熟没有限制，所以得动态拼接了，这个导航的template太坑
    var startStr='<div class="internet-school-nav">'+
                '<div class="school-nav school-nav-sub1"><!-- 业务域层级 -->'+
                    '<h2>网校<i class="direction-icon"></i></h2>'+
                    '<ul class="school-content-list">';
    var endStr='</ul> </div> </div>';
}

export default {
    data:function(){
    	// return {};
    	return this.$store.state.nav;
    },
	
    // methods: {
    // },
    template:genarateTemplate()
};

