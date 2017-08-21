 var data={



 	//获取左侧的树状结构
	"crm/org/CreateNode": {

		"case1": {
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
							"children": [{
									"id": 1,
									"isActive": 1,
									"nodeName": "职能单元A",
									"nodeAttr": [],
									"parentId": 0,
									"children": [{
												"id": 1,
												"isActive": 1,
												"nodeName": "职能组A",
												"nodeAttr": [],
												"parentId": 0,
												"children": [
													{
														"id": 1,
														"isActive": 1,
														"nodeAttr": [],
														"nodeName": "职能小组1",
														"parentId": 0,
														"children": []
													},
													{
														"id": 1,
														"isActive": 1,
														"nodeAttr": [],
														"nodeName": "职能小组2",
														"parentId": 0,
														"children": []
													}
												]
											}, {
												"id": 1,
												"isActive": 1,
												"nodeAttr": [],
												"nodeName": "职能组B",
												"parentId": 0,
												"children": []
											}]
								}, {
									"id": 1,
									"isActive": 1,
									"nodeAttr": [],
									"nodeName": "职能单元B",
									"parentId": 0,
									"children": [{
												"id": 1,
												"isActive": 1,
												"nodeName": "职能组A",
												"nodeAttr": [],
												"parentId": 0,
												"children": [
													{
														"id": 1,
														"isActive": 1,
														"nodeAttr": [],
														"nodeName": "职能小组1",
														"parentId": 0,
														"children": []
													},
													{
														"id": 1,
														"isActive": 1,
														"nodeAttr": [],
														"nodeName": "职能小组2",
														"parentId": 0,
														"children": []
													}
												]
											}, {
												"id": 1,
												"isActive": 1,
												"nodeAttr": [],
												"nodeName": "职能组B",
												"parentId": 0,
												"children": []
											}]
								}]
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
	},
	"crm/org/GetMember":{//分页表结构请求，获取组织成员数据（用户名，姓名，系统角色）
		// "case2": {
		// 	"data": {
		// 		"pagination": { //页码相关信息
		// 			"currentPageIndex": 2, //当前页码
		// 			"pageSize": 1, //每页多少个
		// 			"sortEnum": 0, //排序
		// 			"totalCount": 36, //总条数[用不到，自己获取resultData.length最准确]
		// 		},
		// 		"resultData": [{
		// 			"businessRole": 1,
		// 			"email": "lixiaofei@hujiang.com",
		// 			"userCode": "up_snail", //用户名
		// 			"userId": 205,
		// 			"userName": "李小飞", //姓名
		// 			"userRole": 2,
		// 			"roles": [{
		// 				"roleName":"系统管理员A",
		// 				"roleId":1,
		// 				"roleCode":"Administor"
		// 			},{
		// 				"roleName":"系统管理员B",
		// 				"roleId":1,
		// 				"roleCode":"Administor"
		// 			}]
		// 		}, {
		// 			"businessRole": 1,
		// 			"email": "guoshuai@hujiang.com",
		// 			"userCode": "classbob",
		// 			"userId": 220,
		// 			"userName": "郭帅",
		// 			"userRole": 2,
		// 			"roles": [{
		// 				"roleName":"系统管理员A",
		// 				"roleId":1,
		// 				"roleCode":"Administor"
		// 			},{
		// 				"roleName":"系统管理员B",
		// 				"roleId":1,
		// 				"roleCode":"Administor"
		// 			}]
		// 		}, {
		// 			"businessRole": 1,
		// 			"email": "guoshuai@hujiang.com",
		// 			"userCode": "classbob",
		// 			"userId": 220,
		// 			"userName": "郭帅",
		// 			"userRole": 2,
		// 			"roles": [{
		// 				"roleName":"系统管理员A",
		// 				"roleId":1,
		// 				"roleCode":"Administor"
		// 			},{
		// 				"roleName":"系统管理员B",
		// 				"roleId":1,
		// 				"roleCode":"Administor"
		// 			}]
		// 		}, {
		// 			"businessRole": 1,
		// 			"email": "guoshuai@hujiang.com",
		// 			"userCode": "classbob",
		// 			"userId": 220,
		// 			"userName": "郭帅",
		// 			"userRole": 2,
		// 			"roles": [{
		// 				"roleName":"系统管理员A",
		// 				"roleId":1,
		// 				"roleCode":"Administor"
		// 			},{
		// 				"roleName":"系统管理员B",
		// 				"roleId":1,
		// 				"roleCode":"Administor"
		// 			}]
		// 		}, {
		// 			"businessRole": 1,
		// 			"email": "guoshuai@hujiang.com",
		// 			"userCode": "classbob",
		// 			"userId": 220,
		// 			"userName": "郭帅",
		// 			"userRole": 2,
		// 			"roles": [{
		// 				"roleName":"系统管理员A",
		// 				"roleId":1,
		// 				"roleCode":"Administor"
		// 			},{
		// 				"roleName":"系统管理员B",
		// 				"roleId":1,
		// 				"roleCode":"Administor"
		// 			}]
		// 		}, {
		// 			"businessRole": 1,
		// 			"email": "guoshuai@hujiang.com",
		// 			"userCode": "classbob",
		// 			"userId": 220,
		// 			"userName": "郭帅",
		// 			"userRole": 2,
		// 			"roles": [{
		// 				"roleName":"系统管理员A",
		// 				"roleId":1,
		// 				"roleCode":"Administor"
		// 			},{
		// 				"roleName":"系统管理员B",
		// 				"roleId":1,
		// 				"roleCode":"Administor"
		// 			}]
		// 		}, {
		// 			"businessRole": 1,
		// 			"email": "guoshuai@hujiang.com",
		// 			"userCode": "classbob",
		// 			"userId": 220,
		// 			"userName": "郭帅",
		// 			"userRole": 2,
		// 			"roles": [{
		// 				"roleName":"系统管理员A",
		// 				"roleId":1,
		// 				"roleCode":"Administor"
		// 			},{
		// 				"roleName":"系统管理员B",
		// 				"roleId":1,
		// 				"roleCode":"Administor"
		// 			}]
		// 		}, {
		// 			"businessRole": 1,
		// 			"email": "guoshuai@hujiang.com",
		// 			"userCode": "classbob",
		// 			"userId": 220,
		// 			"userName": "郭帅",
		// 			"userRole": 2,
		// 			"roles": [{
		// 				"roleName":"系统管理员A",
		// 				"roleId":1,
		// 				"roleCode":"Administor"
		// 			},{
		// 				"roleName":"系统管理员B",
		// 				"roleId":1,
		// 				"roleCode":"Administor"
		// 			}]
		// 		}]
		// 	},
		// 	"message": "success",
		// 	"status": 0
		// },
		"case1": {
			"data": {
				"pagination": { //页码相关信息
					"currentPageIndex": 6, //当前页码
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
				},{
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
				},{
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
				},{
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
		"formated": {
			"data": {
				"pagination": { //页码相关信息
					"currentPageIndex": 1, //当前页码
					"pageSize": 10, //每页多少个
					"sortEnum": 0, //排序
					"totalCount": 36, //总条数
					"pageNum":"总页数"
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
				}]
			},
			"message": "success",
			"status": 0
		}
	}
}


export default {
	data:data
}

