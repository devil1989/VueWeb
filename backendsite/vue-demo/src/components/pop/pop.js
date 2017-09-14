import Alert from '../alert/alert.js'
require("./pop.scss");
/*
 流程: saveUnit[点击事件] > checkValid[验证是否可以保存,有的节点不能禁用] >
       checkSuccess>saveUnitRequest[发送保存请求] > saveSuccess
 */

var templates = require("./pop.html");
var newTemplate = hj.inheritHtml(templates, Alert.template);
var Pop = {
    extends: Alert, //继承自Alert
    data: function() {
        return this.$store.state.pops;
    },


    methods: {
        //点击保存事件
        saveUnitAction: function(e, opts) {//后续很多数据都是从这个入口传进来的
            this.isSub = isSub;
            this.checkValid(opts);
        },

        //title
        checkValid: function(opts) {
            if (!param.isActive) {
                var param = {
                    'isMock': true,
                    'mockUrl': "index-mock.js?case=case1",
                    'url': "crm/org/CheckChild",
                    "id": opts.id
                };
                this.$store.dispatch("checkChildActive", {
                    param: param
                }).then(
                    hj.request.success(this.checkSuccess, this.checkFail,opts),
                    hj.request.error("网络原因请求弹框数据失败")
                )
            } else {
                return;
            }
        },

        checkSuccess: function(rst, opts) {
            if (rst.message) { //有提示信息，说明不能禁用，这个有待商量
                var pop = this.$root.$children[2]; //pop组件
                var originTitle = this.$store.state.pops.data.title;
                var targetTitle = "禁用" + originTitle.substring(2);

                store.commit("updatePop", {
                    data: { //传入最新的弹框的state数据
                        title: targetTitle,
                        btns: [{
                            type: "submit", //提交
                            txt: "确认",
                            callback: function(e) {
                                this.hide();
                                this.saveUnitRequest(opts);
                            }.bind(pop)
                        }, {
                            type: "cancel", //取消
                            txt: "取消",
                            callback: function(e) {
                                this.hide();
                            }.bind(pop)
                        }],
                        needShow: true,
                        content: {
                            isTxt: true,
                            msg: rst.message,
                            contentInfo: null
                        }
                    }
                });
            } else { //没有提示说明可以直接禁用，直接调用保存接口即可
                this.saveUnitRequest();
            }
        },

        saveUnitRequest: function(opts) {
            var param = this.getSaveParam(opts);
            this.$store.dispatch('saveUnit', {
                param: param
            }).then(
                hj.request.success(this.saveSuccess, this.saveFail, {
                    id: param.id
                }),
                hj.request.error("网络原因请求弹框数据失败")
            );
        },

        saveSuccess: function(rst, opts) {
            if (this.isSub) { //新增的保存
                hj.spaIns.addScene(opts.id);
            } else { //编辑的保存
                hj.spaIns.updateScene();
            }

        },

        saveFail: function(rst, opts) {
            this.showAlert({
                title: "提示",
                msg: rst.message
            });
        },


        checkFail: function(rst, opts) {
            var targetTitle = "禁用" + originTitle.substring(2);
            this.showAlert({
                title: "提示",
                pop: this.$root.$children[2],
                msg: "保存失败，请重新保存"
            });
        },

        //通用提示框
        showAlert: function(opts) {
            this.$store.commit("updatePop", {
                data: { //传入最新的弹框的state数据
                    title: opts.title,
                    btns: [{
                        type: "submit", //提交
                        txt: "知道了",
                        callback: function(e) {
                            this.hide();
                        }.bind(opts.pop)
                    }],
                    needShow: true,
                    content: {
                        isTxt: true,
                        msg: opts.msg,
                        contentInfo: null
                    }
                }
            });
        },


        //保存参数[后续数据统一放到localstorage中，操作数据也是，写一个统一的数据中心]
        getSaveParam: function(opts) {
            var id, nodeName, parentId, isActive, parentName, extendAttrs, isSub;
            isSub = opts ? opts.isSub : false;
            id = isSub ? 0 : hj.spaIns.getCurrentScene();
            var unitData = hj.getDataById(id);

            return {
                'isMock': false,
                'mockUrl': "index-mock.js?case=case2",
                'url': "crm/OrganizationV2/SaveNode",
                "data": { //包含了基本数据:组织名称,父级组织代码,是否启用,父级组织名称(这个的key前端写死，编辑的时候只有组织名称和组织状态可改，也是前端写死)
                    "id": id, //对应的唯一的标识，新增的时候这个下发0
                    "nodeName": unitData.info.nodeName, //组织名称，【通用可编辑，服务端会下发】：新增的时候下发为0
                    "parentId": unitData.info.parentId, //父级组织代码【这个服务端不会下发，需要赋值】！！
                    "isActive": unitData.info.isActive, //是否启用【这个服务端不会下发，需要自己赋值】！！
                    "parentName": unitData.info.parentName, //父级组织名称[这个服务端不会下发，需要自己赋值]！！
                    'isSub': isSub
                },
                'extendAttrs': [{
                    "code": opts.code, //新增和编辑请求接口的extendAttrs中的元素的code属性
                    "value": opts.value //新增和编辑请求接口的extendAttrs中的data下拉选项数组中的选中元素的value
                }]
            }
        },

        //选择弹框的下拉列表
        selectedItem: function(e) {
            debugger
            var target = e.target;
            var optionsValue = target.selectedOptions[0].getAttribute("data-val"); //选中项的id
            var id = target.getAttribute("data-id"); //本选项的id
            var cloneContent = JSON.parse(JSON.stringify(this.$store.state.pops.data.content));
            this.markSelectedItem(cloneContent.contentInfo, id, optionsValue);
            this.formatPopState(cloneContent.contentInfo, hj.getDataById(hj.spaIns.getCurrentScene()).info.parentName); //this.$store.state.pops.data.content.contentInfo是接口返回的data

            this.$store.commit({
                type: "updatePop",
                data: {
                    content: cloneContent
                }
            });
        },

        //给该栏目的选中的属性做标记【选中属性是个list】
        /*
         cloneData:ajax下发的data数据
         id:拓展信息的那个项的id
         optionsid：拓展信息那个项展开的list中，点击选中的那个子项的id
         */
        markSelectedItem: function(cloneData, id, optionsValue) {
            debugger
            var extendAttrs = cloneData.metaData.extendAttrs || []; //请求返回的data
            cloneData.metaData.extendAttrs.forEach(function(ele, idx, input) {
                if (ele.id == id) { //遍历拓展属性，找到自己
                    (input[idx].data || []).forEach(function(unit, index, subInput) {
                        if (unit.value == optionsValue) { //自己的拓展属性id和选中的那个属性id做匹配，添加选中标记isSelected
                            subInput[index].isSelected = true;
                        }
                    });
                }
            });
        },

        //有parentId的，如果他的父级没有选中，就需要隐藏；如果父级选中了一个选项，那么就要把对应的所有和它级联的对象的元素控制显示隐藏：isHide
        //数据结构件见：index-mock.js的crm/org/ GetNodeExtAttr 属性的case3
        //1.父级有选中，展示对应选项
        //2.父级没有选中||没有父级，隐藏所有子项
        //给extendAttrs的对象单元添加needHide，控制是否展示这个元素节点
        //给extendAttrs的对象单元中的data的单元添加isHide，控制option元素是否展示
        formatPopState: function(cloneData, parentName) {
            debugger
            var self = this;
            var extendAttrs = cloneData.metaData.extendAttrs || []; //请求返回的data
            if (parentName && cloneData.rowData) { //因为后台不会返回父节点名称，需要从之前的请求获取，然后到这里赋值
                cloneData.rowData.parentName = parentName;
            }

            //这里的逻辑复杂了，【用ajax选择后获取级联信息，就没那么多事情了，哎，暂时这么做吧，以后决不能妥协】
            // 1.按照顺序对每个object做解析（每一个对象对应一行拓展属性）
            // 2.如果是顶级级联属性（parentId为null）就直接展示，如果不是顶级级联项就直接隐藏
            // 3.寻找每个顶级级联项的1级关联项，（顶级级联项的nextOptionCode和其他的optionCode匹配），展示他们
            // 4.寻找1级机联项的2级机联项，（1级机联项的nextOptionCode和2级机联项optionCode匹配），展示他们
            // 5.依次类推，直到最后一级，那一级没有nextOptionCode或者找不到optionCode
            extendAttrs.forEach(function(ele, idx, input) { //联动的顶级节点
                if (!ele.parentId) { //顶层展示
                    input[idx].needHide = false;
                } else { //非顶层元素需要判断是否需要展示
                    input[idx].needHide = self.checkHasRelated(input[idx],extendAttrs) ? true : false;
                }
            });

            return cloneData;
        },

        //验证该元素是否需要展示，如果需要展示，找到他的上级级联元素，拿到上级的selected，处理该元素的isHide
        //target：拓展属性1级子元素，也就是extendAttrs数组中的那个对象，判断这个对象是否需要展示
        checkHasRelated: function(target,extendAttrs) {
            var self = this;
            var needHide = true;
            extendAttrs.forEach(function(ele, idx, input) {
                if (target && target.parentId == input[idx].id) { //找到input级联项（遍历最外层的对象数组）

                    //找到父级选中的那个选中项
                    var tgEle = (input[idx].data || []).filter(function(unit) {
                        return unit.isSelected
                    });
                    var nextOptionCode = tgEle[0]?tgEle[0].nextOptionCode:null;//找到下拉选中的那个nextOptionCode

                    if (nextOptionCode) { //父级有isSelected

                        //判断是否和父级级联选中的那个项有关联
                        var hasRelated = (target.data || []).some(function(subUnit) {
                            return subUnit.optionCode == nextOptionCode
                        });

                        if (hasRelated) { //该元素有级联的父级级联元素
                            if (!input[idx].parentId) { //同时父级级联是最顶级的
                                needHide = false;
                                (target.data || []).forEach(function(sub, index, subInput) {
                                    if (subInput[index].optionCode != nextOptionCode) { //没有和父级关联就需要隐藏
                                        subInput[index].isHide = true
                                    }
                                });
                            } else { //父级不是顶级级联项，需要再往上找，万一最上层的级联不是顶级级联项，就不需要展示了
                                needHide = self.checkHasRelated(input[idx]);
                            }
                        }
                    }
                }
            });
            return needHide;
        }

    },
    template: newTemplate //第一个是自己的template，后面的是继承父组件的tempalte，第三个参数表示，默认的继承都是把父组件中的{{content}}
};


export default Pop