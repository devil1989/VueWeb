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
// http://local.backend.hujiang.com/crm/org/GetNodeInfo?nodeId=2
// Response
{
  "data": {
    "btns": [{
      "txt": "新增职能组",
      "isSub": true
    }, {
      "txt": "新增下级职能单元",
      "isSub": false
    }],
    "info": {
      "id": 2,
      "parentId": 0,
      "nodeName": "沪江",
      "nodeAttr": [{
        "id": 2,
        "name": "沪江",
        "value": "4",
        "code": "nodeType",
        "sort": 0,
        "parentId": null,
        "type": null,
        "data": null
      }],
      "isActive": true,
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
  "data": [{
    "id": 1,
    "name": "职能类型",
    "value": null,
    "code": "functionCode",
    "sort": 1,
    "parentId": null,
    "type": "dropdownlist",
    "data": [{
      "id": 2,
      "name": "管理组织",
      "value": "222",
      "code": "fff",
      "sort": 0,
      "parentId": null,
      "type": null,
      "data": null
    }, {
      "id": 2,
      "name": "业务组织",
      "value": "333",
      "code": "333",
      "sort": 0,
      "parentId": null,
      "type": null,
      "data": null
    }]
  }, {
    "id": 1,
    "name": "组织位置",
    "value": "网校/沪江/口语/口语一组",
    "code": "nodePath",
    "sort": 1,
    "parentId": [
      1
    ],
    "type": "txt",
    "data": null
  }],
  "message": "",
  "status": 0
}

// 3.2 点击保存

// Request  url:http://local.backend.hujiang.com/crm/org/CreateNode
{
  "id": 0,
  "parentId": 0,
  "nodeName": "string",
  "isActive": true,
  "updateuserId": 0 "nodeAttr": []，“ isSub””： true
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
  "infos": {
    "id": 7,
    "isActive": true,
    "nodeAttr": {
      "businessUnitType": 1
    },
    "nodeAttrAll": {
      "businessUnitType": 1,
      "organizationType": 2
    },
    "nodeName": "成人口语",
    "nodePath": "/1/3/",
    "nodeType": 3,
    "parentId": 3
  },
  "attrs": {
    "nodePath": {
      "Text": "节点位置"
    },
    "nodeType": {
      "Text": "所属层",
      "code": 2,
      "name": "机构"
    },
    "organizationType": {
      "item": [{
        "code": "selfOperation",
        "name": "自营"
      }, {
        "code": "collaboration",
        "name": "合作"
      }, {
        "code": "otherOperation",
        "name": "他营"
      }],
      "name": "组织类型"
    }
  }
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
// {
//  nodeId:1，
// }
// Response
// {
//  status:0,
//  message:""
// }


//5、获取节点成员接口
//Type:Post
// Request  url:http://local.backend.hujiang.com/crm/org/GetMember
{
  {
    "pageNum": 1,
    "pageSize": 10,
    "paramData": {
      "groupId": 10138
    }
  }
}
// Response Body 
{
  "data": {
    "pagination": {
      "currentPageIndex": 1,
      "pageSize": 10,
      "sortEnum": 0,
      "totalCount": 36
    },
    "resultData": [{
      "businessRole": 1,
      "email": "lixiaofei@hujiang.com",
      "userCode": "up_snail",
      "userId": 205,
      "userName": "李小飞",
      "userRole": 2
    }, {
      "businessRole": 1,
      "email": "guoshuai@hujiang.com",
      "userCode": "classbob",
      "userId": 220,
      "userName": "郭帅",
      "userRole": 2
    }, {
      "businessRole": 1,
      "email": "zhangsuyun@hujiang.com",
      "userCode": "云若昕",
      "userId": 238,
      "userName": "张苏云",
      "userRole": 2
    }, {
      "businessRole": 1,
      "email": "3373952526@qq.com",
      "userCode": "郑钰凡",
      "userId": 2362,
      "userName": "郑钰凡",
      "userRole": 2
    }, {
      "businessRole": 1,
      "email": "jili@hujiang.com",
      "userCode": "olina_ji",
      "userId": 2367,
      "userName": "季丽",
      "userRole": 2
    }, {
      "businessRole": 1,
      "email": "lilin@hujiang.com",
      "userCode": "lilin0821",
      "userId": 2395,
      "userName": "李林",
      "userRole": 2
    }, {
      "businessRole": 1,
      "email": "crm10@hujiang.com",
      "userCode": "crm10",
      "userId": 322,
      "userName": "crm10",
      "userRole": 2
    }]
  },
  "message": "success",
  "status": 0
}