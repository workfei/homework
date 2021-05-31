<template>
    <div>
        <h1>111</h1>
        {{$route.params.testid}}
    </div>
</template>

<script>
export default {
    data () {
        return {
            name: 'xx'
        }
    },
    beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用,不能获取组件实例 `this`
        console.log(this.$route, this.name)
    },
    beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用,可以访问组件实例 `this`
        console.log(this.$route, this.name)
    },
    beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用,可以访问组件实例 `this`
        console.log(this.$route, this.name)
    }
}
</script>