 var data={
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
									"children": []
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
		}
	}
}


export default {
	data:data
}

