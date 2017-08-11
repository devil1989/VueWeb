//全局配置
var pathConfig={//路径全局设定，以免以后全局迁移网站的时候，或者修改common和其他项目相对位置的时候，改起来麻烦
        sub1:"../commom",//vue-demo项目子文件访问common
        sub2:"../../common",//src内部子文件访问common
        sub3:"../../../common",//pages内部子文件访问common
        sub4:"../../../../common",//暂时还没那么深，用不到
};
// 备注：此时common和其他项目是平行，所以用这种结构，如果common放在项目第一层文件夹的时候，所有的配置都得往前修改一级
// common目录结构别随便改，好麻烦的（首先common内部相互引用得改【手动慢慢改】，其次其他所有项目对common中改变层级的某些文件的引用得修改【某些文件原来用sub2，得改成sub1或者其他变量】）

var ajax=require(pathConfig.sub3+"/libs/ajax");




export default {
    ajax:ajax,
    pathConfig:pathConfig
}