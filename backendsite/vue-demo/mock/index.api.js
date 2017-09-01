//组织结构升级API

// 一、组织架构
// 1、获取所有节点
//    1.1 获取所有节点接口（给前端树形结构）
//    Type:Get
//    Request url:http://local.backend.hujiang.com/crm/GetNodeByUserId?userid=1
{
  userId: 1
}
// Response
{
  data: {
    nodeList: [{
      "id": 1,
      "isActive": 1,
      "nodeName": "",
      "nodeAttr": [],
      "children": [{
        "id": 1,
        "isActive": 1,
        "nodeAttr": [],
        "nodeName": "",
        "parentId": 0,
        "children": []
      }, {
        "id": 1,
        "isActive": 1,
        "nodeAttr": [],
        "nodeName": "",
        "parentId": 0,
        "children": []
      }]

    }, {
      "id": 1,
      "isActive": 1,
      "nodeName": "",
      "nodeAttr": [],
      "parentId": 0,
      "children": [{
        "id": 1,
        "isActive": 1,
        "nodeName": "",
        "nodeAttr": [],
        "parentId": 0,
        "children": []
      }, {
        "id": 1,
        "isActive": 1,
        “nodeAttr”: []
        "nodeName": "",
        "parentId": 0,
        "children": []
      }]

    }],
    "status": 0,
    "message": ""
  }
}



//  2、 获取节点详细信息
// url ：
// http://local.backend.hujiang.com/crm/org/GetNodeInfo?nodeId=2 (这里的nodeId就是上面节点的id)
// Response
{
  "data": {

    //基本西右侧的btns
    "btns": [{
      "txt": "新增职能组",
      "isSub": true//添加的是业务层级的下级
    }, {
      "txt": "新增下级职能单元",
      "isSub": false
    }],
    "info": {

      //这些都是基本信息
      "id": 2,//组织代码
      "nodeName": "沪江",//组织名称
      "parentName":"父级",//父级组织名称
      "parentId": 0,//父级组织代码
      "isActive": true,//是否启用

      //拓展属性，基本信息展示只需要key和value，点击新增的时候才需要其他key的信息
      "nodeAttr": [{
        "id": 2,
        "name": "沪江",//组织所属层 （key）
        "value": "4",//组织所属层 （value）
        "code": "nodeType",
        "sort": 0,
        "parentId": null,
        "type": null,
        "data": null
      }],
      
      "children": null
    }
  },
  "message": "success",
  "status": 0
}


// 3、新增节点（业务域，机构，业务单元、职能单元、职能组、职能小组）
//subLevel标识是新增同业务层节点还是下级业务节点
//  3.1 点击新增按钮
// Request（父级节点） url:http://local.backend.hujiang.com/crm/org/GetNodeExtAttr
{
  "id": 0,
  "parentId": 0,
  "nodeName": "string",
  "isActive": true,
  "createuserId": 0 "nodeAttr": {},
  "isSub”": true
}
// Response
{
	"data": [{ //新增的时候拿这个
			"id": 2, //无用
			"name": "管理组织", //对应的属性名
			"code": "fff", //唯一标识符，某个标签内容的唯一性，保存的时候需要
			"sort": 0, //排序
			"parentId": null, //联动
			"data": {
				"type": "string", ////下拉框，纯文本，【string,dropdownlist】
				"content": "452", //data:[]
			}
		}, { //新增的时候拿这个
			"id": 2, //无用

			"name": "管理组织", //对应的属性名
			"code": "fff", //唯一标识符，某个标签内容的唯一性，保存的时候需要
			"sort": 0, //排序
			"parentId": null, //联动
			"data": {
				"type": "dropdownlist", ////下拉框，纯文本，【string,dropdownlist】
				"content": [{
					"value": "fsdfds"
					"isSelected": true,

				}]
			}],
		"message": "",
		"status": 0
	}
}

// 3.2 点击保存

// Request  url:http://local.backend.hujiang.com/crm/org/CreateNode
{
  "id": 0,
  "parentId": 0,
  "nodeName": "string",
  "isActive": true,
  "updateuserId": 0,
  "nodeAttr": [],
  "isSub": true
}
// Response
{
  "status": 0,
  "message": ""
}


// 3、编辑节点
// 3.1 获取拓展信息
// Request url:http://local.backend.hujiang.com/crm/org/GetNodeExtAttr
{
  "id": 0,
  "parentId": 0,
  "nodeName": "string",
  "isActive": true,
  "createuserId": 0 "nodeAttr": {}

}
// Response
{
	"data":{
	  "infos": {//

	    "nodeName": "成人口语",//组织名称
	    "parentId": 3//父级组织代码
	    "isActive": true,//是否启用
	    "parentName":""//父级组织名称
	  },
	  "attrs": [{//新增的时候拿这个
	      "id": 2,//无用
	      "name": "管理组织",//对应的属性名
	      "code": "fff",//唯一标识符，某个标签内容的唯一性，保存的时候需要
	      "sort": 0,//排序
	      "parentId": null,//联动
	      "data": {
	        type:string,////下拉框，纯文本，【string,dropdownlist】
	        content:"452",//data:[]
	      }
	    },{//新增的时候拿这个
	      "id": 2,//无用

	      "name": "管理组织",//对应的属性名
	      "code": "fff",//唯一标识符，某个标签内容的唯一性，保存的时候需要
	      "sort": 0,//排序
	      "parentId": null,//联动
	      "data": {
	        type:dropdownlist,////下拉框，纯文本，【string,dropdownlist】
	        content:[
	          {
	            value:"fsdfds"
	            isSelected:true,

	          }
	        ]
	    }]
	},
	"status": 0
}

// 3.2 获取节点信息  url:http://local.backend.hujiang.com/crm/org/GetNodeInfo??nodeId=1
   // Response
{
  "data": {
    "btns": {
      "txt": "aaa",
      "isSub": false
    }
    "info": {
      "id": 1,
      "nodeName": "",
      "nodeAttr": {}
    }
  }
}


// 4、删除节点
// Request
{
 nodeId:1,
}
// Response
{
 status:0,//
 message:""//包含错误信息
}


//5、获取节点成员接口【分页表结构】
//Type:Post
// Request  url:http://local.backend.hujiang.com/crm/org/GetMember
{
  {
    "pageNum": 1,//页码
    "pageSize": 10,//每页多少个
    "paramData": {
      "groupId": 10138 //节点id
    }
  }
}
// Response Body 
{
  "data": {
    "pagination": {//页码相关信息
      "currentPageIndex": 1,//当前页码
      "pageSize": 10,//每页多少个
      "sortEnum": 0,//？
      "totalCount": 36//总页数
    },
    "resultData": [{
      "businessRole": 1,
      "email": "lixiaofei@hujiang.com",
      "userCode": "up_snail",//用户名
      "userId": 205,
      "userName": "李小飞",//姓名
      "userRole": 2,
      "userRoleName":"SFA-系统管理员"
    }, {
      "businessRole": 1,
      "email": "guoshuai@hujiang.com",
      "userCode": "classbob",
      "userId": 220,
      "userName": "郭帅",
      "userRole": 2,
      "userRoleName":"SFA-系统管理员"
    }, {
      "businessRole": 1,
      "email": "zhangsuyun@hujiang.com",
      "userCode": "云若昕",
      "userId": 238,
      "userName": "张苏云",
      "userRole": 2,
      "userRoleName":"SFA-系统管理员"
    }, {
      "businessRole": 1,
      "email": "3373952526@qq.com",
      "userCode": "郑钰凡",
      "userId": 2362,
      "userName": "郑钰凡",
      "userRole": 2,
      "userRoleName":"SFA-系统管理员"
    }, {
      "businessRole": 1,
      "email": "jili@hujiang.com",
      "userCode": "olina_ji",
      "userId": 2367,
      "userName": "季丽",
      "userRole": 2,
      "userRoleName":"SFA-系统管理员"
    }, {
      "businessRole": 1,
      "email": "lilin@hujiang.com",
      "userCode": "lilin0821",
      "userId": 2395,
      "userName": "李林",
      "userRole": 2,
      "userRoleName":"SFA-系统管理员"
    }, {
      "businessRole": 1,
      "email": "crm10@hujiang.com",
      "userCode": "crm10",
      "userId": 322,
      "userName": "crm10",
      "userRole": 2,
      "userRoleName":"SFA-系统管理员"
    }]
  },
  "message": "success",
  "status": 0
}




