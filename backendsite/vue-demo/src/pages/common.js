//全局配置
var pathConfig={//路径全局设定，以免以后全局迁移网站的时候，或者修改common和其他项目相对位置的时候，改起来麻烦
        sub1:"../commom",//vue-demo项目子文件访问common
        sub2:"../../common",//src内部子文件访问common
        sub3:"../../../common",//pages内部子文件访问common
        sub4:"../../../../common",//暂时还没那么深，用不到
};
// 备注：此时common和其他项目是平行，所以用这种结构，如果common放在项目第一层文件夹的时候，所有的配置都得往前修改一级
// common目录结构别随便改，好麻烦的（首先common内部相互引用得改【手动慢慢改】，其次其他所有项目对common中改变层级的某些文件的引用得修改【某些文件原来用sub2，得改成sub1或者其他变量】）

// var ajaxPath=pathConfig.sub4+"/libs/ajax.js";
// var vuePath=pathConfig.sub4+"/libs/vue/vue.js";
require("../../../common/libs/underscore.js");//引入underscore
require("../../../common/utils/utils.js");//为什么这行屌代码总是报错，因为common这个文件在webpack所安装的项目之外，而js中的require和impor又依赖webpack；需要把weipack安装到common目录同级
require("../../../common/utils/model.js");//公共的model模块，依赖于utils.js，需要放后面
require("../../../common/utils/spa.js");//单页面应用程序
// require("../../../common/styles/bootstrap.min.css");//报错是因为bootstrap.min.css引入了，但是相对路径下面的eot，svg，woff文件没有放进来，不是打包脚本的问题
require("../../../common/styles/base.scss");
require("../../../common/styles/reset.css");

export default {
    pathConfig:pathConfig
}