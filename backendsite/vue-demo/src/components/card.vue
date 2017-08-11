<script>
import store from '../pages/index.store';

export default {
    vuex: {
        actions: store.actions,
        getters: {
            user: ({ user }) => user,
            filterKey: ({ filterKey }) => filterKey
        }
    },
    methods: {
        onKeyup (e) {
            this.search(e.target.value);
        }
    }
};
</script>

<template>
<div class="card">
    <header>
        <img class="avatar" width="40" height="40" :alt="user.name" :src="user.img">
        <p class="name">{{user.name}}</p>
    </header>
    <footer>
        <input class="search" type="text" placeholder="search user..." >
    </footer>
</div>
</template>

<style scoped lang="sass">

</style>