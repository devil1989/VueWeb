<script>
export default {
    vuex: {
        getters: {
            user: ({ user }) => user,
            session: ({ sessions, currentSessionId }) => sessions.find(session => session.id === currentSessionId)
        }
    },
    filters: {
        // 将日期过滤为 hour:minutes
        time (date) {
            if (typeof date === 'string') {
                date = new Date(date);
            }
            return date.getHours() + ':' + date.getMinutes();
        }
    },
    directives: {
        // 发送消息后滚动到底部
        'scroll-bottom' () {
            this.vm.$nextTick(() => {
                this.el.scrollTop = this.el.scrollHeight - this.el.clientHeight;
            });
        }
    }
};
</script>

<template>
<div class="message" v-scroll-bottom="session.messages">
    <ul v-if="session">
        <li v-for="item in session.messages">
            <p class="time">
                <span>{{ item.date | time }}</span>
            </p>
            <div class="main" :class="{ self: item.self }">
                <img class="avatar" width="30" height="30" :src="item.self ? user.img : session.user.img" />
                <div class="text">{{ item.content }}</div>
            </div>
        </li>
    </ul>
</div>
</template>

<style lang="sass" scoped>

</style>