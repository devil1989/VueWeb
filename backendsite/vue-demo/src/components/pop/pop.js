import Alert from '../alert/alert.js'
require("./pop.scss");
var templates=require("./pop.html");

var newTemplate=hj.inheritHtml(templates,Alert.template);
var Pop={
    extends:Alert,//继承自Alert
	data:function(){
        return this.$store.state.pops;
    },
    methods: {
    },
    template:newTemplate//第一个是自己的template，后面的是继承父组件的tempalte，第三个参数表示，默认的继承都是把父组件中的{{content}}
};


export default Pop

