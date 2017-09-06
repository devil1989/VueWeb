 var data={



 	//获取左侧的树状结构
	"crm/GetNodeByUserId": {

		"case1": {
			"data": {
				"nodeList": [{
					"id": 1,
					"isActive": 1,
					"nodeName": "网校",
					"nodeAttr": [],
					"children": [{
						"id": 2,
						"isActive": 1,
						"nodeAttr": [],
						"nodeName": "机构-沿途",
						"parentId": 0,
						"children": [{
							"id": 3,
							"isActive": 1,
							"nodeName": "业务单元A",
							"nodeAttr": [],
							"parentId": 0,
							"children": [{
									"id": 4,
									"isActive": 1,
									"nodeName": "职能单元A",
									"nodeAttr": [],
									"parentId": 0,
									"children": [{
												"id": 5,
												"isActive": 1,
												"nodeName": "职能组A",
												"nodeAttr": [],
												"parentId": 0,
												"children": [
													{
														"id": 6,
														"isActive": 1,
														"nodeAttr": [],
														"nodeName": "职能小组1",
														"parentId": 0,
														"children": []
													},
													{
														"id": 7,
														"isActive": 1,
														"nodeAttr": [],
														"nodeName": "职能小组2",
														"parentId": 0,
														"children": []
													}
												]
											}, {
												"id": 8,
												"isActive": 1,
												"nodeAttr": [],
												"nodeName": "职能组B",
												"parentId": 0,
												"children": []
											}]
								}, {
									"id": 9,
									"isActive": 1,
									"nodeAttr": [],
									"nodeName": "职能单元B",
									"parentId": 0,
									"children": [{
												"id": 10,
												"isActive": 1,
												"nodeName": "职能组A",
												"nodeAttr": [],
												"parentId": 0,
												"children": [
													{
														"id": 11,
														"isActive": 1,
														"nodeAttr": [],
														"nodeName": "职能小组1",
														"parentId": 0,
														"children": []
													},
													{
														"id": 12,
														"isActive": 1,
														"nodeAttr": [],
														"nodeName": "职能小组2",
														"parentId": 0,
														"children": []
													}
												]
											}, {
												"id": 13,
												"isActive": 1,
												"nodeAttr": [],
												"nodeName": "职能组B",
												"parentId": 0,
												"children": []
											}]
								}]
						}, {
							"id": 14,
							"isActive": 1,
							"nodeAttr": [],
							"nodeName": "业务单元B",
							"parentId": 0,
							"children": []
						}]
					}, {
						"id": 15,
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

	"crm/org/GetNodeInfo":{//获取节点信息
		"case1":{
			"data": {
				"btns": [{
					"txt": "新增职能组",
					"isSub": false
				}, {
					"txt": "新增下级职能单元",
					"isSub": true
				}],
				"info": {
					"id": 2,
					"parentId": 0,
					"nodeName": "沪江",
					'busTypeText':"机构",//机构，职能单元，组织等，中文表示
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
		},
		"case2":{
			"data": {
				"btns": [{
					"txt": "新增机构",
					"isSub": false
				}, {
					"txt": "新增下级机构",
					"isSub": true
				}],
				"info": {
					"id": 2,
					"parentId": 0,
					"nodeName": "jeffry",
					'busTypeText':"机构",//机构，职能单元，组织等，中文表示
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
	},
	"crm/org/GetMember":{//分页表结构请求，获取组织成员数据（用户名，姓名，系统角色）
		"case2": {
			"data": {
				"pagination": { //页码相关信息
					"currentPageIndex": 1, //当前页码（其实这个没什么用，请求的时候会发送请求第几页，所以返回的这个和请求的一样，没卵用）
					"pageSize": 1, //每页多少个
					"sortEnum": 0, //排序
					"totalCount": 36, //总条数[用不到，自己获取resultData.length最准确]
				},
				"resultData": [{
					"businessRole": 1,
					"email": "lixiaofei@hujiang.com",
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
					"email": "guoshuai@hujiang.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅",
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
					"email": "guoshuai@hujiang.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅",
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
					"email": "guoshuai@hujiang.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅",
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
					"email": "guoshuai@hujiang.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅",
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
					"email": "guoshuai@hujiang.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅",
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
					"email": "guoshuai@hujiang.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅",
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
					"email": "guoshuai@hujiang.com",
					"userCode": "classbob",
					"userId": 220,
					"userName": "郭帅",
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
					"email": "lixiaofei@hujiang.com",
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
					"email": "guoshuai@hujiang.com",
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
					"email": "guoshuai@hujiang.com",
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
					"email": "guoshuai@hujiang.com",
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
					"email": "guoshuai@hujiang.com",
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
					"email": "guoshuai@hujiang.com",
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
					"email": "guoshuai@hujiang.com",
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
					"email": "guoshuai@hujiang.com",
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
					"email": "guoshuai@hujiang.com",
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
					"email": "guoshuai@hujiang.com",
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
					"email": "lixiaofei@hujiang.com",
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
					"email": "lixiaofei@hujiang.com",
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
					"email": "lixiaofei@hujiang.com",
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

	//新增职能单元
	"crm/org/GetNodeExtAttr": {
		'case1': {
			
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
			    	"nodeName": "成人口语",//组织名称，【通用可编辑，服务端会下发】
				    "parentId": 3,//父级组织代码【这个服务端不会下发，需要赋值】！！
				    "isActive": true,//是否启用【这个服务端不会下发，需要自己赋值】！！
				    "parentName":"父级组织A"//父级组织名称[这个服务端不会下发，需要自己赋值]！！
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
						// "needHide":true,//这个后期添加
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
			    	"nodeName": "成人口语",//组织名称，【通用可编辑，服务端会下发】
				    "parentId": 3,//父级组织代码【这个服务端不会下发，需要赋值】！！
				    "isActive": true,//是否启用【这个服务端不会下发，需要自己赋值】！！
				    "parentName":"父级组织A"//父级组织名称[这个服务端不会下发，需要自己赋值]！！
			    }
			},
			"message": "请求失败提示信息",
			"status": 0
		}
	},

	//保存信息
	"crm/org/CreateNode": {
		'case2': {
			//额外节点的拓展信息
			// "data": {},
			"message": "",
			"status": 0
		},
		'case1': {
			//额外节点的拓展信息
			// "data": {},
			"message": "本层组织内已有业务型组织需将该组织职能类型修改为管理型",
			"status": 1
		}
	},

	'crm/org/DeleteNodeInfo':{
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

	'crm/org/CheckChild':{
		'case1':{
			data:null,
			status:0,
			message:""
		},
		'case2':{}
	}
}




export default {
	data:data
}




					