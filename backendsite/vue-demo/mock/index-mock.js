var data={

 	'crm/OrganizationV2/CheckChild':{
		'case1':{
			data:null,
			status:0,
			message:""
		},
		'case2':{}
	},


	"crm/OrganizationV2/GetNodeByUserId": {



		"case1": {
			"data": {
				"nodeList": [{
					"id": 1,
					"isActive": 1,
					"nodeName": "网校",
					"nodeType":"1",// 1：业务域，2：机构，3：业务单元，4：职能单元，5：职能组，6：职能小组(后面没有添加)
					"children": [{
						"id": 2,
						"isActive": 1,
						"nodeName": "机构-沿途",
						"parentId": 0,
						"nodeType":"4",// 1：业务域，2：机构，3：业务单元，4：职能单元，5：职能组，6：职能小组(后面没有添加)
						"children": [{
							"id": 3,
							"isActive": 1,
							"nodeName": "业务单元A",
							"parentId": 0,
							"children": [{
									"id": 4,
									"isActive": 0,
									"nodeName": "职能单元A",
									"parentId": 0,
									"children": [{
												"id": 5,
												"isActive": 1,
												"nodeName": "职能组A",
												"parentId": 0,
												"children": [
													{
														"id": 6,
														"isActive": 1,
														"nodeName": "职能小组1",
														"parentId": 0,
														"children": []
													},
													{
														"id": 7,
														"isActive": 1,
														"nodeName": "职能小组2",
														"parentId": 0,
														"children": []
													}
												]
											}, {
												"id": 8,
												"isActive": 1,
												"nodeName": "职能组B",
												"parentId": 0,
												"children": []
											}]
								}, {
									"id": 9,
									"isActive": 1,
									"nodeName": "职能单元B",
									"parentId": 0,
									"children": [{
												"id": 10,
												"isActive": 1,
												"nodeName": "职能组A",
												"parentId": 0,
												"children": [
													{
														"id": 11,
														"isActive": 1,
														"nodeName": "职能小组1",
														"parentId": 0,
														"children": []
													},
													{
														"id": 12,
														"isActive": 1,
														"nodeName": "职能小组2",
														"parentId": 0,
														"children": []
													}
												]
											}, {
												"id": 13,
												"isActive": 1,
												"nodeName": "职能组B",
												"parentId": 0,
												"children": []
											}]
								}]
						}, {
							"id": 14,
							"isActive": 1,
							"nodeName": "业务单元B",
							"parentId": 0,
							"children": []
						}]
					}, {
						"id": 15,
						"isActive": 1,
						"nodeName": "机构-2",
						"parentId": 0,
						"children": []
					}]
				}],
				"status": 0,
				"message": "组织机构设置"
			}
		},
		"case2": {
			"data": {
				"nodeList": [{
					"id": 1,
					"isActive": 1,
					"nodeName": "网校",
					"nodeAttr": [],
					"children": [{
						"id": 1,
						"isActive": 1,
						"nodeAttr": [],
						"nodeName": "机构-沿途",
						"parentId": 0,
						"children": [{
							"id": 1,
							"isActive": 1,
							"nodeName": "业务单元A",
							"nodeAttr": [],
							"parentId": 0,
							"children": []
						}, {
							"id": 1,
							"isActive": 1,
							"nodeAttr": [],
							"nodeName": "业务单元B",
							"parentId": 0,
							"children": []
						}]
					}, {
						"id": 1,
						"isActive": 1,
						"nodeAttr": [],
						"nodeName": "机构-2",
						"parentId": 0,
						"children": []
					}]
				}],
				"status": 0,
				"message": "组织机构设置"
			}
		}
	},


	'crm/OrganizationV2/DeleteNodeInfo':{
		'case2': {
			//额外节点的拓展信息
			// "data": {},
			"message": "",
			"status": 0
		},
		'case1': {
			//额外节点的拓展信息
			// "data": {},
			"message": "删除节点失败",
			"status": 1
		}
	},




	"crm/OrganizationV2/GetNodeInfo":{
		"case1":{
			"data": {
				"btns": [{//基本西右侧的btns
					"txt": "新增职能组",
					"isSub": false
				}, {
					"txt": "新增下级职能单元",
					"isSub": true//添加的是业务层级的下级
				}],
				"info": {

					//这些都是基本信息
					"id": 2,//组织代码
					"nodeName": "沪江",//组织名称
					"parentName":"父级",//父级组织名称
					"parentId": 0,//父级组织代码
					"isActive": true,//是否启用
					'busTypeText':"机构",//机构，职能单元，组织等，中文表示
					"children": null,
					"nodeAttr": [{//拓展信息
						"id": 2,
						"name": "沪江",//key名称
						"value": "沪江网校",//对应的值得名称（需要传给后端）
						"code": "nodeType",//对应的值得唯一标记（需要传给后端）
						"sort": 0,//排序，哪个前面哪个后面根据sort的大小 【后端没传给我，所以按照后端顺序排序】
						"data": {//相同拓展类型的浮层数据
							"sameNode": [{//sameNode表示相同拓展类型，以防以后有其他数据在浮层展示，所以需要定义sameNode这个key
								'data': [{
									'name': "组织代码",//组织代码
									'value': 452//组织代码对应的值
								}, {
									'name': "组织名称",//组织名称
									'value': 452//组织名称对应的值
								}]
							}]
						}
					},{//拓展信息
						"id": 2,
						"name": "沪江2",//key名称
						"value": "4",//对应的值得名称（需要传给后端）
						"code": "nodeType",//对应的值得唯一标记（需要传给后端）
						"sort": 0,//排序，哪个前面哪个后面根据sort的大小
						"data": {//相同拓展类型的浮层数据
							"sameNode": [{//sameNode表示相同拓展类型，以防以后有其他数据在浮层展示，所以需要定义sameNode这个key
								'data': [{
									'name': "zuhzidaima",//组织代码
									'value': 452//组织代码对应的值
								}, {
									'name': "zuzhimch",//组织名称
									'value': 452//组织名称对应的值
								},{
									'name': 12,
									'value': 452
								}]
							}]
						}
					}]
				}
			},
			"message": "success",
			"status": 0
		},
		"case2":{
			"data": {
				"btns": [{//基本西右侧的btns
					"txt": "新增职能组",
					"isSub": false
				}, {
					"txt": "新增下级职能单元",
					"isSub": true//添加的是业务层级的下级
				}],
				"info": {

					//这些都是基本信息
					"id": 2,//组织代码
					"nodeName": "沪江",//组织名称
					"parentName":"父级",//父级组织名称
					"parentId": 0,//父级组织代码
					"isActive": true,//是否启用
					'busTypeText':"机构",//机构，职能单元，组织等，中文表示
					"children": null,
					"nodeAttr": [{//拓展信息
						"id": 2,
						"name": "沪江",//key名称
						"value": "4",//对应的值得名称（需要传给后端）
						"code": "nodeType",//对应的值得唯一标记（需要传给后端）
						"sort": 0,//排序，哪个前面哪个后面根据sort的大小
						"parentId": null,//无用
						"type": null,//无用
						"data": {//相同拓展类型的浮层数据
							"sameNode": [{//sameNode表示相同拓展类型，以防以后有其他数据在浮层展示，所以需要定义sameNode这个key
								'data': [{
									'name': "zuhzidaima",//组织代码
									'value': 452//组织代码对应的值
								}, {
									'name': "zuzhimch",//组织名称
									'value': 452//组织名称对应的值
								},{
									'name': 12,
									'value': 452
								}]
							}]
						}
					}]
				}
			},
			"message": "success",
			"status": 0
		}
	},



	"crm/OrganizationV2/GetMember":{
		"case2": {
			"data": {
				"pagination": { //页码相关信息
					"currentPageIndex": 1, //当前页码（其实这个没什么用，请求的时候会发送请求第几页，所以返回的这个和请求的一样，没卵用）
					"pageSize": 1, //每页多少个
					"sortEnum": 0, //排序
					"totalCount": 36, //总条数[用不到，自己获取resultData.length最准确]
				},
				"resultData": [{
					// "businessRole": 1,
					// "email": "lixiaofei@baidu.com",
					"userCode": "up_snail", //用户名
					"userId": 205,
					"userName": "李小飞", //姓名
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				}, {
					"businessRole": 1,
					"email": "guoshuai@baidu.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅",
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				}, {
					"businessRole": 1,
					"email": "guoshuai@baidu.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅",
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				}, {
					"businessRole": 1,
					"email": "guoshuai@baidu.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅",
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				}, {
					"businessRole": 1,
					"email": "guoshuai@baidu.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅",
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				}, {
					"businessRole": 1,
					"email": "guoshuai@baidu.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅",
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				}, {
					"businessRole": 1,
					"email": "guoshuai@baidu.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅",
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				}, {
					"businessRole": 1,
					"email": "guoshuai@baidu.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅",
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				}]
			},
			"message": "success",
			"status": 0
		},
		"case1": {
			"data": {
				"pagination": { //页码相关信息
					"currentPageIndex": 1, //当前页码
					"pageSize": 10, //每页多少个
					"sortEnum": 0, //排序
					"totalCount": 36, //总条数[用不到，自己获取resultData.length最准确]
				},
				"resultData": [{
					"businessRole": 1,
					"email": "lixiaofei@baidu.com",
					"userCode": "up_snail", //用户名
					"userId": 205,
					"userName": "李小飞", //姓名
					"userRole": 2,
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				}, {
					"businessRole": 1,
					"email": "guoshuai@baidu.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "jiajiechen",
					"userRole": 2,
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				}, {
					"businessRole": 1,
					"email": "guoshuai@baidu.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅3",
					"userRole": 2,
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				}, {
					"businessRole": 1,
					"email": "guoshuai@baidu.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅4",
					"userRole": 2,
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				},{
					"businessRole": 1,
					"email": "guoshuai@baidu.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅5",
					"userRole": 2,
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				},{
					"businessRole": 1,
					"email": "guoshuai@baidu.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅6",
					"userRole": 2,
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				},{
					"businessRole": 1,
					"email": "guoshuai@baidu.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅7",
					"userRole": 2,
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				}, {
					"businessRole": 1,
					"email": "guoshuai@baidu.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅8",
					"userRole": 2,
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				}, {
					"businessRole": 1,
					"email": "guoshuai@baidu.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅9",
					"userRole": 2,
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				}, {
					"businessRole": 1,
					"email": "guoshuai@baidu.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅10",
					"userRole": 2,
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				}]
			},
			"message": "success",
			"status": 0
		},
		"formated": [//格式化以后的数据
			{
				pageIndex:1,
				pageContent:[{
					"businessRole": 1,
					"email": "lixiaofei@baidu.com",
					"userCode": "up_snail", //用户名
					"userId": 205,
					"userName": "李小飞", //姓名
					"userRole": 2,
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				}]
			},
			{
				pageIndex:2,
				pageContent:[{
					"businessRole": 1,
					"email": "lixiaofei@baidu.com",
					"userCode": "up_snail", //用户名
					"userId": 205,
					"userName": "李小飞", //姓名
					"userRole": 2,
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				}]
			},
			{
				pageIndex:3,
				pageContent:[{
					"businessRole": 1,
					"email": "lixiaofei@baidu.com",
					"userCode": "up_snail", //用户名
					"userId": 205,
					"userName": "李小飞", //姓名
					"userRole": 2,
					"roles": [{
						"roleName":"系统管理员A",
						"roleId":1,
						"roleCode":"Administor"
					},{
						"roleName":"系统管理员B",
						"roleId":1,
						"roleCode":"Administor"
					}]
				}]
			}
		]
	},




	"crm/OrganizationV2/GetNodeExtAttr": {
		'case1': {
			
			"data": {
				"metaData": {
					"name": "职能单元字典",
					"nodeType": 3,
					"parentId": null,
					"metadataCode":"",//需要上传的
					"extendAttrs": [//额外节点的拓展信息
					//一般额外节点，顶多三个，职能类型，组织类型，拓展类型，其中组织类型和拓展类型都依赖于职能类型，职能类型选择以后才会判断下面两个属性是否展示
					//有parentId的说明是级联下拉，需要在父级级联选项选中的时候才展示，父级没选中的时候就隐藏
					{//没有上级级联的得放在最前面，这个是基础，他没有isHide，下拉选项都展示
						"name": "职能类型",
						"code": "functionalType", //需要上传的key
						"sort": 1,//排序，按照sort的值得大小，可以随便排序
						"type": "dropdownList",//如果是string，那么data数组中只有一个对象，对象的text就是对应的字符串值
						"id": 1,//和下级做级联
						"parentId": null,//和上级做级联
						"editable": true,//是否可编辑【新增和编辑请求，都会有这个参数表示是否编辑】
						"needHide":true,//是否需要隐藏该拓展属性[这个服务端不会下发，需要自己赋值]！！
						"data": [{
							"id": 2,//没什么用
							"value": 1,//下拉列表展示字段的标识符，选中该字段后需要上传
							"text": "业务1",//下拉列表里面展示的字段
							"sort": 1,
							"optionCode": "",//和父级的nextOptionCode做级联
							"nextOptionCode": "A",//和子集的optionCode的值做级联
							"isSelected": true, //是否选中（下拉列表的时候还需要）
							"isHide":true//判断是否隐藏 [这个服务端不会下发，需要自己赋值]！！
						}]
					}, {//没有上级级联的得放在最前面，这个是基础，他没有isHide，下拉选项都展示
						"name": "职能类型",
						"code": "functionalType", //需要上传的key
						"sort": 1,//排序，按照sort的值得大小，可以随便排序
						"type": "string",//如果是string，那么data数组中只有一个对象，对象的text就是对应的字符串值
						"id": 1,//和下级做级联
						"parentId": null,//和上级做级联
						"editable": true,//是否可编辑【新增和编辑请求，都会有这个参数表示是否编辑】
						"needHide":true,//是否需要隐藏该拓展属性[这个服务端不会下发，需要自己赋值]！！
						"data": [{//string的话，data里面只有一个对象，里面只有value和text
							"value": 1,
							"text": "业务1"
						}]
					}]
				},

			    "rowData": {//包含了基本数据:组织名称,父级组织代码,是否启用,父级组织名称(这个的key前端写死，编辑的时候只有组织名称和组织状态可改，也是前端写死)
			    	"id":0,//对应的唯一的标识，新增的时候这个下发0,页面的nodeId
			    	"nodeName": "成人口语",//组织名称，【通用可编辑，服务端会下发】：新增的时候下发为0
				    'nodeCode':null,//node的唯一标识符
				    'nodeType':12,//类型
				    'children':null,//子集
				    "parentId": 3,//父级组织代码

				    //下面的都是自己添加的
				    "isActive": true,//是否启用【这个服务端不会下发，需要自己赋值】！！
				    "parentName":"父级组织A",//父级组织名称[这个服务端不会下发，需要自己赋值]！！
				    "type":"edit"||"create",//当前弹框类型，[这个服务端不会下发，需要自己赋值]！！
				    "isSub":false,//是否是新增子集[这个服务端不会下发，需要自己赋值]！！
				    "title":"编辑框名称",//[这个服务端不会下发，需要自己赋值]！！
				    "checkedBoxList":[{text:"启用",value:"true"},{text:"禁用",value:"false"}]//[这个服务端不会下发，需要自己赋值]！！
			    }
			},
			"message": "请求失败提示信息",
			"status": 0
		},
		'case2': {
			//额外节点的拓展信息
			"data": null,
			"message": "请求失败提示信息",
			"status": 1
		},
		'case3': {
			
			"data": {
				"metaData": {
					"name": "职能单元字典",
					"nodeType": 3,
					"parentId": null,
					"metadataCode":"",//需要上传的
					"extendAttrs": [//额外节点的拓展信息
					{//没有上级级联的得放在最前面，这个是基础，他没有isHide，下拉选项都展示
						"name": "职能类型",
						"code": "functionalType", //需要上传的key
						"sort": 1,
						"type": "dropdownList",
						"id": 1,
						"parentId": null,
						"editable": true,
						"data": [{
							"id": 2,
							"value": 1,
							"text": "业务1",
							"sort": 1,
							"optionCode": "",
							"nextOptionCode": "A",//和它级联的那个单元的属性optionCode的值
							"isSelected": true //是否选中（下拉列表的时候还需要）
							// "isHide":true//判断是否隐藏 这个属性在修改的时候才添加
						}, {
							"id": 3,
							"value": 1, //需要上传的值
							"text": "业务2", //文本
							"sort": 1,
							"optionCode": "",
							"nextOptionCode": "A",
							"isSelected": false //是否选中（下拉列表的时候还需要）
						}, {
							"id": 4,
							"value": 1,
							"text": "业务3",
							"sort": 1,
							"optionCode": "",
							"nextOptionCode": "A",
							"isSelected": false //是否选中（下拉列表的时候还需要）
						}]
					}, 
					//一般额外节点，顶多三个，职能类型，组织类型，拓展类型，其中组织类型和拓展类型都依赖于职能类型，职能类型选择以后才会判断下面两个属性是否展示
					//第二个拓展属性(一般最多三个，三级联动)
					{//有parentId的说明是级联下拉，需要在父级级联选项选中的时候才展示，父级没选中的时候就隐藏
						"name": "组织类型",
						"code": "functionalType", //需要上传的key
						"sort": 1,
						"type": "dropdownList",
						"id": 2,
						"parentId": 1,//这个parentId和其他对象的id做级联
						"editable": true,
						// "needHide":true,//这个后期添加
						"data": [{
							"id": 2,
							"value": 1,
							"text": "业务4",
							"sort": 1,
							"optionCode": "A",
							"nextOptionCode": "B",//和它级联的那个单元的属性optionCode的值
							"isSelected": false, //是否选中（下拉列表的时候还需要）
							// "isHide":true//判断是否隐藏
						}, {
							"id": 3,
							"value": 1, //需要上传的值
							"text": "业务5", //文本
							"sort": 1,
							"optionCode": "A",
							"nextOptionCode": "B",
							"isSelected": false, //是否选中（下拉列表的时候还需要）
							// "isHide":false//判断是否隐藏
						}, {
							"id": 4,
							"value": 1,
							"text": "业务6",
							"sort": 1,
							"optionCode": "C",
							"nextOptionCode": "B",
							"isSelected": false, //是否选中（下拉列表的时候还需要）
							// "isHide":false//判断是否隐藏
						}, {
							"id": 4,
							"value": 1,
							"text": "业务7",
							"sort": 1,
							"optionCode": "A",
							"nextOptionCode": "B",
							"isSelected": false, //是否选中（下拉列表的时候还需要）
							// "isHide":false//判断是否隐藏
						}]
					}]
				},

			    "rowData": {//包含了基本数据:组织名称,父级组织代码,是否启用,父级组织名称(这个的key前端写死，编辑的时候只有组织名称和组织状态可改，也是前端写死)
			    	"id":0,//对应的唯一的标识，新增的时候这个下发0,页面的nodeId
			    	"nodeName": "成人口语",//组织名称，【通用可编辑，服务端会下发】：新增的时候下发为0
				    "parentId": 3,//父级组织代码【这个服务端不会下发，需要赋值】！！
				    "isActive": true,//是否启用【这个服务端不会下发，需要自己赋值】！！
				    "parentName":"父级组织A",//父级组织名称[这个服务端不会下发，需要自己赋值]！！
				    "type":"edit"||"create",//当前弹框类型，[这个服务端不会下发，需要自己赋值]！！
				    "isSub":false,//是否是新增子集[这个服务端不会下发，需要自己赋值]！！
				    "title":"编辑框名称",//[这个服务端不会下发，需要自己赋值]！！
				    "checkedBoxList":[{text:"启用",value:"true"},{text:"禁用",value:"false"}]//[这个服务端不会下发，需要自己赋值]！！
			    }
			},
			"message": "请求失败提示信息",
			"status": 0
		}
	},




	"crm/OrganizationV2/SaveNode": {
		'case2': {
			//额外节点的拓展信息
			"Data": null,
			"Message": "",
			"Status": 0
		},
		'case1': {
			//额外节点的拓展信息
			"Data": null,
			"Message": "本层组织内已有业务型组织需将该组织职能类型修改为管理型",
			"Status": 1
		}
	}
}




export default {
	data:data
}




					