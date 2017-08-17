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
	}
}


export default {
	data:data
}

