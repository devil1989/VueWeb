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
		'case2': {
			//额外节点的拓展信息
			"data": [{ //纯展示文本
						"name": "管理组织", //对应的属性名
						"code": "fff", //唯一标识符，某个标签内容的唯一性，保存的时候需要
						"sort": 0, //排序??
						"parentId": null, //没有上级联动
						"data": {
							"type": "string", ////下拉框，纯文本，【string,dropdownlist】
							"content": "452", //data:[]
						}
					},
					{ //纯下拉
						"name": "职能类型", //对应的属性名
						"code": "fff", //唯一标识符，某个标签内容的唯一性，保存的时候需要
						"sort": 0, //排序,大小,每个数值都不一样
						// "parentId": null, //表示没有上级联动
						"data": {
							"type": "dropdownlist", ////下拉框，纯文本，【string,dropdownlist】
							"content": [{ //下拉列表中的内容，和其他级有联动
								"value": "1", //文本对应的唯一性 （上传时候需要）
								"txt": "业务", //对应文本
								"id": "2", //和其他的parentId对应， added
								"sort": 0, //大小，每个数值都不一样,排序用
								"isSelected": true
							}, {
								"value": "2", //文本对应的唯一性 （上传时候需要）
								"txt": "内容", //对应文本
								"id": "1", //和其他的parentId对应， added
								"sort": 0, //大小，每个数值都不一样,排序用
								"isSelected": false
							}]
						}
					},
					{ //级联下拉，因为有parentId
						"name": "组织类型", //对应的属性名
						"code": "fff", //唯一标识符，某个标签内容的唯一性，保存的时候需要
						"sort": 0, //排序
						// "parentId": 2, //表示有联动，需要父元素的选中状态是2，这个才展示list，否则展示的是其他的list,最外级别没有
						"data": [{
							"isSelected":true,//接口没有，需要自己转化数据添加 addinfo
							"parentId": [1, 2],
							"type": "dropdownlist", ////下拉框，纯文本，【string,dropdownlist】
							"content": [{
								"value": "1", //文本对应的唯一性 （上传时候需要）
								"txt": "选择内容", //对应文本
								"id": "12", //和其他的parentId对应， added
								"sort": 0, //大小，每个数值都不一样,排序用
								"isSelected": true
							}, {
								"value": "2", //文本对应的唯一性 （上传时候需要）
								"txt": "选择内容2", //对应文本
								"id": "12", //和其他的parentId对应， added
								"sort": 0, //大小，每个数值都不一样,排序用
								"isSelected": true,
							}],
						},{
							"parentId": [1, 2],
							"type": "dropdownlist", ////下拉框，纯文本，【string,dropdownlist】
							"content": [{
								"value": "1", //文本对应的唯一性 （上传时候需要）
								"txt": "选择内容3", //对应文本
								"id": "12", //和其他的parentId对应， added
								"sort": 0, //大小，每个数值都不一样,排序用
								"isSelected": true
							}, {
								"value": "2", //文本对应的唯一性 （上传时候需要）
								"txt": "选择内容4", //对应文本
								"id": "12", //和其他的parentId对应， added
								"sort": 0, //大小，每个数值都不一样,排序用
								"isSelected": true,
							}],
						}]
					}
					],
			"message": "",
			"status": 0
		},
		'case1': {
			//额外节点的拓展信息
			"data": null,
			"message": "请求失败提示信息",
			"status": 1
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
	}
}




export default {
	data:data
}




					