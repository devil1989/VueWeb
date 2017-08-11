<script>
import store from '../pages/index.store';

export default {
    vuex: {
        actions: store.actions,
        getters: {
            // 过滤后的会话列表
            sessions: ({ sessions, filterKey }) => {
                let result = sessions.filter(session => session.user.name.includes(filterKey));
                return result;
            },
            // 当前会话index
            currentId: ({ currentSessionId }) => currentSessionId
        }
    }
};
</script>

<template>
<div class="list">
    <ul>
        <li v-for="item in sessions" :class="{ active: item.id === currentId }" >
            <img class="avatar"  width="30" height="30" :alt="item.user.name" :src="item.user.img">
            <p class="name">{{item.user.name}}</p>
        </li>
    </ul>
</div>
</template>

<style scoped lang="sass">

</style>