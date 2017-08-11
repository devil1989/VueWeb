<script>
import store from '../pages/index.store';

export default {
    vuex: {
        actions: store.actions
    },
    data () {
        return {
            content: ''
        };
    },
    methods: {
        onKeyup (e) {
            if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
                this.sendMessage(this.content);
                this.content = '';
            }
        }
    }
};
</script>

<template>
<div class="text">
    <textarea placeholder="按 Ctrl + Enter 发送" v-model="content"></textarea>
</div>
</template>

<style lang="sass" scoped>

</style>