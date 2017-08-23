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
             url例子: #scene=combine-key1-key2|con-key3-key4&nav=0
                  &符号为1级分隔符，分隔最大单元，scene是场景单元，nav是左侧导航单元，后续可以拓展其他单元
                  |符号是2级分隔符，以scene的值为例，场景分为多中类型，combine是一种场景，con也是一种场景；
                  -符号是3级分隔符，以combine-key1-key2为例，表示combine类型场景下的值有key1和key2两个相同类型的场景，最后的那个场景（key2）属于需要展示的场景，其他都隐藏
 */

import Vue from 'vue';//vue框架的对象
import storeInfo from '../../vue-demo/src/pages/index.store.js';//包含了当前页面对应的store信息（以及记过了vue封装）


var SPA = function(opts) {
  var outputData = {};
  var wrapper=opts.wrapper;//场景插入地址

  window.onhashchange = function(e) {
    var obj = hj.buildUrl(location.hash.substr(1)).get();
    if (obj.scene) {
      outputData.nav = obj.nav;
      outputData.scene=getScene();
      removeChild();
      (outputData.scene&&outputData.scene.sceneArray||[]).forEach(function(ele){//渲染所有场景
        renderScene(ele,outputData.scene.currentScene);
      });
    }
  }

  //history.go和history.back时候执行
  window.onpopstate = function(e){}


  //删除页面中存在，但是在url中却不存在的场景，比如说我把combine-1-2修改为combine-1-3,那么原来的2场景还是继续展示，3场景也会展示，所以需要把原来的场景2场景删除，因为不在url里面
  function removeChild(){
    // wrapper=
  }

  //判断是否存在合法的场景str,不传参数表示，只要有任意一个场景即可
  function hasScene(str){
    debugger
    var obj = hj.buildUrl(location.hash.substr(1)).get();
    return obj.scene&&(obj.scene.split("|")||[]).some(function(unit){//场景类型-值
      var arr2=unit.split("-")||[];
      return (arr2.slice(1)||[]).some(function(subUnit){
        return str?(subUnit==str):subUnit
      });
    });
  }

  //获取所有场景
  function getScene(){
    var obj = hj.buildUrl(location.hash.substr(1)).get();
    var arr = obj.scene.split("|");//combine等不同的场景类型，后续可扩展
    var currentScene;
    var sceneArray=[];
    for (var i = 0, len = arr.length; i < len; i++) {
        var val = arr[i].split("-");//combine-fdfuisuius-fdfuisuius-sd:场景类型combine，场景名称fdfuisuius（确保场景唯一性，多个场景用-连接），最后一个是需哟啊展示的场景
        currentScene=val[val.length-1];
        val[0]&&currentScene&&sceneArray.push({
          key:val[0],//场景的类型
          value:val.slice(1)
        });
    }

    return {
      sceneArray:sceneArray,
      currentScene:currentScene||""
    }
  }

  //给wrapper添加<div id="key"><combine></combine></div>元素
  function addElement(wrapper,key,val,tagName){
    if(wrapper){
      var divEle=document.createElement("div");
      var innerEle=document.createElement(tagName);//创建的组件tag名称和js文件相同
      divEle.id=key+"-"+val;
      debugger
      divEle.style.display="none";
      wrapper&&wrapper.appendChild(divEle);//插件命名是js文件名字的大写命名
      divEle&&divEle.appendChild(innerEle);

      return divEle;
    }
  }

  //渲染scene
  function renderScene(ele,currentScene){

      var name=SPA.mapping[ele.key]?SPA.mapping[ele.key].replace(/\.js/g,""):"";//文件名
      if(!name){return;}//不存在对应mapping就不渲染
      
      var val=ele.value;
      var warpperSelector=ele.key+"-";

      for (var i = 0; i < val.length; i++) {
        var tgEle=document.getElementById(warpperSelector+val[i]);
        if(!tgEle){
          tgEle=addElement(wrapper,ele.key,val[i],name);//场景插入位置+场景类型+场景值
          addVueComponent(ele.key,val[i],warpperSelector);
        }

        if(val[i]==currentScene){//展示当前场景
          tgEle.style.display="";
        }else{
          tgEle.style.display="none";
        }
      }
  }

  function addVueComponent(key,value,warpperSelector){
    require.ensure([],function(require){

      var scenes=require('../../vue-demo/src/components/combine/'+SPA.mapping[key]);//

      var conbineVue=new Vue({
          el: "#"+warpperSelector+value,
          store: storeInfo.store,//注入vuex的store
          components: {
              "combine":scenes.default
          },
          data:function(){
              return {}
          },
          mounted:function(){
            debugger
              this.$children[0].init(value);
          }
      });
    });
  }

  //对外的接口
  return {
    data:outputData,
    renderScene:renderScene,
    getScene:getScene,
    hasScene:hasScene
  };
}

SPA.mapping={//场景类型和js一一对应
  "combine":"combine.js"
}

hj.spa=SPA;

export default SPA
