require("./table.scss");
var templates=require("./table.html");
export default {
    data:function(){
        return this.$store.state.tables;
    },
    template:templates
};


