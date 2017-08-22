/*
 *author:chenjiajie
 *time:2017/08/22
 *description:给予webapck的单页面应用程序（SPA）
 */

//单页面应用程序history.pushstate,popState和window.onhashchange实现单页面
// 切换 tab（展示的隐藏，隐藏的展示）
// 添加，删除tab
// 展示，隐藏tab
// 场景动画
// 历史记录：修改hash的时候，浏览器支持前后跳转，需要pushstate

// 路由字符串#&scene=val-1 (
//   1.支持多条路：展开多个目录结构；road=value1&road=value2
//   2.支持场景话，一个场景对应某个页面):scene=value-1表示存在value这个key的场景，1表示展示，0表示隐藏（注意，一个场景必须是除了nav的一整个块）
//   3.支持nav隐藏&nav=hide的时候隐藏
  
// 点击事件都是触发url的change事件

//执行流程：
//点击 > 获取对应scene > 修改对应url的hash > 解析hash来渲染场景 > history.pushstate

//解析hash: 解析hash,获取所有scene，nav参数和值 > 根据scene和nav渲染左侧树（需要自己寻找路径） > 根据多个scene渲染当前展示的tab内容和隐藏tab的内容
/*scene渲染: 每个scene=value的value值都不相同，每个value值作为localstorage中的key，该scene的当前内容作为value保存在localstorage中，用于缓存，没缓存就等于新开页面
             url例子:scene=jeffrey-1--jeffrey2-1--jeffrey3-1; //当前场景,获取hash的值为1的最后一个scene，此时jeffrey3为当前场景， jeffrey3 作为场景名称，
             会mapping一个对应的url地址的组件，引用jeffrey3这个场景，就是require.ensure对应的场景的url
 */

import Vue from 'vue';//vue框架的对象
import storeInfo from '../../vue-demo/src/pages/index.store.js';//包含了当前页面对应的store信息（以及记过了vue封装）


var SPA = function() {
  var outputData = {};
  window.onhashchange = function(e) {
    var oldUrl = e.oldURL;
    var newUrl = e.newURL;
    var obj = hj.queryStringBuilder(location.hash.substr(1)).get();
    var sceneStr = obj.scene;
    var sceneArray=[];
    var currentScene="";

    if (obj.scene) {
      var arr = obj.scene.split("--");
      for (var i = 0, len = arr.length; i < len; i++) {
        var val = arr[i].split("-");
        if(val[1]){
          currentScene=val[0];
        }
        sceneArray.push({
          key:val[0],//场景的类型
          value:val[1]//场景对应的唯一的值
        });
      }
    }
    outputData.nav = obj.nav;
    outputData.scene=sceneArray;
    sceneArray.forEach(function(ele){//渲染所有场景
      renderScene(ele);
    });

  }


  //history.go和history.back时候执行
  window.onpopstate = function(e){
  }

  //渲染scene
  function renderScene(ele){

      var name=SPA.mapping[ele.key]?SPA.mapping[ele.key].replace(/\.js/g,""):"";
      if(!name){return;}
      var targetName=name[0].toUpperCase()+name.substr(1);
      var wrapper=document.querySelector(".internet-school-content");//场景插入地址，暂时不做可配置
      var divEle=document.createElement("div");
      divEle.id=ele.value;
      var innerEle=document.createElement("combine");
      wrapper&&wrapper.appendChild(divEle);//插件命名是js文件名字的大写命名
      divEle&&divEle.appendChild(innerEle);

      require.ensure([],function(require){
        // debugger
        var scenes=require('../../vue-demo/src/components/combine/'+SPA.mapping[ele.key]);

        debugger
        var conbineVue=new Vue({
            el: '#'+ele.value,
            store: storeInfo.store,//注入vuex的store
            components: {
                "combine":scenes.default
            },
            data:function(){
                return {}
            },
            mounted:function(){
                var self=this;
                var options=this.$options;
                var params=options.methods.getParams();

                this.$store.dispatch("getInitData",{"param":params}).then(function(data){
                    if(data.data.status==0){
                        self.$children[0].init(data.data);
                    }else{
                        console.log("!!!请求导侧边航栏数据失败");
                    }
                },function(){
                    console.log("网络原因请求导侧边航栏数据失败");
                });
            },
            methods:{//this.$options.methods来获取

                //获取页面初始信息请求所需要的参数
                getParams:function(){
                    return {
                        isMock:true,
                        mockUrl:"index-mock.js?case=case1",
                        url:"crm/org/CreateNode",
                        type:"get",
                        data:{userid:1},
                    };
                }
            }
        });
      });
  }

  //对外的接口
  return {
    data:outputData,
    renderScene:renderScene
  };
}

SPA.mapping={//components下面的相对路径，这个异步加载器只加载此路径下，暂时不做可配置
  "jeffrey":"combine.js",
  "jeffreyss":"combine.js",
}

SPA();

export default SPA
