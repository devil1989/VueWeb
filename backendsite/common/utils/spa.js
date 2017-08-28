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

/*
 执行流程：
  1.hashchange事件触发
  2.判断hash是否存在scene场景，存在的话继续
  3.根据hash或去或有的场景类型，每种场景类型有多个场景;获取场景的同时，还会判断是否有场景数量限制，每种类型的场景的数量超过最大值，会截断场景到10个，并标注场景数量超标
  4.场景数量超标的话，调用changedHash重新设置hash
  5.场景数量未超标，就循环创建每一个场景
    5.1创建场景的时候，hash的最后一个值为展示的场景，其他场景虽然创建好了，但得隐藏
    5.2创建场景的时候，需要把创建的所有场景的id保存到currentSceneArray这个数组中
    5.3拿currentSceneArray中保存的场景元素的id和hash的场景作对比，删除hash中不存在，但是页面中却存在的场景

 
 待做功能：？？
  1.单页生命周期没写
  2.场景切换动画可配置没写
  3.nav展示隐藏功能没写
  4.很多可配置项没抽离出来
  5.各个场景之间那些公用的资源抽离出来，做一个公共资源接口提供调用；各个场景的独立资源各自不相互影响
 */
var SPA = function(opts) {
  var outputData = {};
  var wrapper=opts.wrapper;//场景插入地址
  var maxNum=opts.maxNum;//最多保存10个场景，多出来的场景删除，先入先出顺序删除

  window.onhashchange = function(e) {
    var obj = hj.buildUrl(location.hash.substr(1)).get();
    var lastIndex;
    if (obj.scene) {
      outputData.nav = obj.nav;
      outputData.scene=getScene();
      
      if(outputData.scene.isOutOfRange){
        changedHash(outputData.scene.sceneArray);//根据最新的array重新拼接hash
      }
      else{
        lastIndex=outputData.scene.sceneArray.length-1;
        (outputData.scene&&outputData.scene.sceneArray||[]).forEach(function(ele,idx){//渲染所有场景
          renderScene(ele,outputData.scene.currentScene);
        });
      }
    }
  }

  //history.go和history.back时候执行
  window.onpopstate = function(e){}


  //删除页面中存在，但是在url中却不存在的场景，比如说我把combine-1-2修改为combine-1-3,那么原来的2场景还是继续展示，3场景也会展示，所以需要把原来的场景2场景删除，因为不在url里面
  function removeOtherChild(sceneArray,outerEle){
    var childNotes=wrapper.children||[];
    if(childNotes.length){
      //outerEle中所有元素，一个个去匹配arr中的每个id（arr中的id是根据hash中的场景值列出来的，如果不在arr数组中，那么就应该删除）
      for (var i = 0; i < childNotes.length; i++) {
        var tgEle=childNotes[i];//这个东西是nodeList，动态改变的，这里会有坑
        if(tgEle){
          var isInHash=sceneArray.some((unit)=>{

            //1.id名称中包含这个场景类型的字符串，因为id命名规则是：场景类型-场景值
            //2.unit.tagIdArray中有一个和tgEle.id相同，说明tgEle.id在url上
            var hasSceneTyep=((tgEle&&tgEle.id || "").indexOf(unit.key) != -1);
            var hasTargetId=(unit.value || []).some(function(tgId) {
              return ((unit.key+"-"+tgId)== tgEle.id)
            });

            return hasSceneTyep&&hasTargetId;
          });
          if(!isInHash){//因为childNotes是nodeList，会动态改变
            outerEle.removeChild(tgEle);
            i--;
          }
        }
      }
    }
  }

  //判断是否存在合法的场景str,不传参数表示，只要有任意一个场景即可
  function hasScene(str){
    var obj = hj.buildUrl(location.hash.substr(1)).get();
    return obj.scene&&(obj.scene.split("|")||[]).some(function(unit){//场景类型-值
      var arr2=unit.split("-")||[];
      return (arr2.slice(1)||[]).some(function(subUnit){
        return str?(subUnit==str):subUnit
      });
    });
  }

  //原来存在场景就，把场景拿到最后面作为展示场景；如果没有，就在后面添加
  function addScene(sceneId) {
    var obj = hj.buildUrl(location.hash.substr(1)).get();
    var tgIndex=null;
    var arr = (obj.scene||"").split("|");
    var targetArray=[];
    var targetHashArray=[];
    for (var i = 0, len = arr.length; i < len; i++) {
        var sceneType=(arr[i].split("-")||[])[0];
        var val = (arr[i].split("-")||[]).slice(1);
        for(var j=0;j<val.length;j++){
          if(val[j]==sceneId){
            tgIndex=j;
          }
        }
        if(tgIndex!==null){
          val.splice(tgIndex,1);
          tgIndex=null;
        }
        targetArray.push(sceneType+"-"+val.join("-")+"-"+sceneId);
    }
    ;

    for (var key in obj){
      if(key=="scene"){
        targetHashArray.push(key+"="+targetArray.join("|"));
      }else{
        targetHashArray.push(key+"="+obj[key]);
      }
    }

    location.hash="#"+targetHashArray.reverse().join("&");

  }

  //获取所有场景
  function getScene(){
    var obj = hj.buildUrl(location.hash.substr(1)).get();
    var arr = (obj.scene||"").split("|");//combine等不同的场景类型，后续可扩展
    var currentScene;
    var sceneArray=[];
    var isOutOfRange=false;
    for (var i = 0, len = arr.length; i < len; i++) {
        var val = arr[i].split("-");//combine-fdfuisuius-fdfuisuius-sd:场景类型combine，场景名称fdfuisuius（确保场景唯一性，多个场景用-连接），最后一个是需哟啊展示的场景
        var itemOutOfRange=(val.slice(1).length>maxNum);
        var len2=val.slice(1).length;
        currentScene=val[val.length-1];
        isOutOfRange=isOutOfRange||itemOutOfRange;

        val[0]&&currentScene&&sceneArray.push({
          key:val[0],//场景的类型
          value:(maxNum&&itemOutOfRange)?val.slice(1).slice(len2-maxNum):val.slice(1)
        });
    }

    return {
      sceneArray:sceneArray,
      currentScene:currentScene||"",
      isOutOfRange:isOutOfRange//任何一个类型的场景的场景数量超过maxNum，就设为ture，超过最大场景数限制
    }
  }

  //场景数量超过最大值，需要重新设置hash
  function changedHash(arr){
    var obj = hj.buildUrl(location.hash.substr(1)).get();
    var targetHashArray=[];
    var sceneArr=[];

    for (var i = 0; i < arr.length; i++) {
      sceneArr.push(arr[i].key+"-"+arr[i].value.join("-"));
    }

    for (var key in obj){
      if(key=="scene"){
        targetHashArray.push(key+"="+sceneArr.join("|"));
      }else{
        targetHashArray.push(key+"="+obj[key]);
      }
    }

    location.hash="#"+targetHashArray.reverse().join("&");
  }

  //给wrapper添加<div id="key"><combine></combine></div>元素
  function addElement(wrapper,key,val,tagName){
    if(wrapper){
      var divEle=document.createElement("div");
      var innerEle=document.createElement(tagName);//创建的组件tag名称和js文件相同
      divEle.id=key+"-"+val;
      divEle.style.display="none";
      wrapper&&wrapper.appendChild(divEle);//插件命名是js文件名字的大写命名
      divEle&&divEle.appendChild(innerEle);

      return divEle;
    }
  }

  //渲染scene(渲染某个类型场景下的所有场景)
  function renderScene(ele,currentScene){
      var name=SPA.mapping[ele.key]?SPA.mapping[ele.key].replace(/\.js/g,""):"";//文件名
      if(!name){return;}//不存在对应mapping就不渲染
      
      var val=ele.value;
      var warpperSelector=ele.key+"-";
      for (var i = 0; i < val.length; i++) {

        var tgEle=document.getElementById(warpperSelector+val[i]);
        if(!tgEle){
          tgEle=addElement(wrapper,ele.key,val[i],name);//场景插入位置+场景类型+场景值+标签名称（组件标签不是正常的html标签名）
          addVueComponent(ele.key,val[i],warpperSelector);//插入对应的标签以后，再创建对应的Vue实例
        }
        else{
          window.hj.counter++;
        }
        if(val[i]==currentScene){//展示当前场景
          tgEle.style.display="";
        }else{
          tgEle.style.display="none";
        }

        if((val.length-1)==i){//到最后一个的时候，删除原来所有多出来的scene（在页面中有，但是url中没有）
          setTimeout(function(){
            removeOtherChild(outputData.scene.sceneArray,wrapper);
          },0);
        }
      }
  }

  //添加对应vue组件
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
              this.$children[0].init(value);
          }
      });
    });
  }

  var outPutApu=hj.spaIns = {
    data:outputData,
    renderScene:renderScene,
    getScene:getScene,
    hasScene:hasScene,
    addScene:addScene
  }
  //对外的接口
  return outPutApu;
}

SPA.mapping={//场景类型和js一一对应
  "combine":"combine.js"
}

hj.spa=SPA;

export default SPA
