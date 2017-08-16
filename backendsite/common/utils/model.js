/*
 *author:chenjiajie
 *date:2017/08/11
 *description:和后端交互的ajax请求的基础封装，用于对所有请求的统一监控，以及请求url的统一管理
 *该模块依赖utils文件,所以在common文件中，应该先require utils.js，再require model.js
 */
// import Animal from './ajax.js';

(function(){
	window.hj=window.hj||{};
	var url=location.host||"";
	if(url.indexOf("localhost:")==0){
		hj.env="dev";//本地开发环境
		hj.baseUrl="192.168.132.23";
	}
	else if(url.match(/qa\d{1}backend\.hujiang.com/gi)){
		hj.env="branch";//分支环境
		hj.baseUrl="192.168.132.23";
	}
	else if(url.indexOf("qa.backend.hujiang.com")!=-1){
		hj.env="qa";//测试环境
		hj.baseUrl="192.168.132.23";
	}
	else if(url.indexOf("yz.backend.hujiang.com")!=-1){
		hj.env="yz";//验证环境（生产环境数据，数据和线上一样）
		hj.baseUrl="192.168.132.23";
	}
	else if(url.indexOf("backend.hujiang.com")==0){
		hj.env="online";//生产环境（线上环境）
		hj.baseUrl="192.168.132.23";
	}
	else{
		hj.env="dev";//本地开发环境
		hj.baseUrl="192.168.132.23";
	}
})();


/*
 *mock数据用法：hj.request()
 */
function model(opts){//对ajax进行二次封装，添加环境区分和mock请求
	if(opts.isMock){//是否需要mock

		//mockUrl是直接到pages文件夹下，只要指定文件名加参数即可，例如
		var mockUrl=opts.mockUrl;
		var url=mockUrl.replace(/\?[\s\S]*/,"");//url是对于的index.store.js这个mock数据的js文件，后面的key和case分别是页面中对于的那个请求，以及该请求的某个case，有时候我们需要保存一个请求的多个mock数据以便切换
		var key=opts.url;//mock数据的时候，真实的url变成了mock数据中的key
		var detailCase=(mockUrl.match(new RegExp("[\?\&]" + "case" + "=([^\&]+)", "i")) || [])[1];

		//少年们千万注意，json是不支持任何注释的，不支持//和/**/，千万别犯傻
        require.ensure(["../../vue-demo/mock/index-mock.js"],function(require){//require.ensure以当前文件地址为基准，而不是打包合并后的地址+url

        	var backData=require("../../vue-demo/mock/index-mock.js");
        	var data=backData.default.data;

        	if(!data){
        		console.log("mock请求url不对，mock数据的url以pages文件夹为base文件夹;mock url例子:index.store.js?case=casename");
        	}

        	var targetData=data&&data[key]||{};
        	var caseName="";

        	if(!key){
        		console.log("mock数据不存在，请在"+url+"这个文件中添加对应的"+key+"属性以及它的mock数据");
        		opts.success(data[key]);
        	}

        	if(!detailCase){
        		for (attr in targetData){
        			caseName=attr;
        			break;
        		}
        		if(!caseName){//如果没有case属性，name下面的各
        			console.log("mock数据不存在，请在"+url+"的"+key+"属性中添加对应mock数据");
        		}
        		opts.success(data[key][caseName]);
        	}
        	else{
        		opts.success(data[key][detailCase]);
        	}
        });
    }
    else{
    	if(Object.prototype.toString.call(opts.buildUrl) === "[object Function]"){
			opts.url=opts.buildUrl(opts);index.store.js
		}
		else{
			opts.url=hj.baseUrl+opts.url;
			hj.ajax&&hj.ajax(opts);
		}
    }
}

hj.request=model;

export default model