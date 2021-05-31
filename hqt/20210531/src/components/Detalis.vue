<template>
    <ul>
        <li v-for="(val,k) in data" :key="k">{{k}}<span v-if="k == 'img'"><img :src="val" alt=""></span>
        <span v-else>{{val}}</span></li>
    </ul>
</template>
<script>
export default {
    data () {
        return {
            data: null
        }
    },
    mounted () {
        var id = this.$route.params.id
        this.$http.get('/oneUser?id=' + id).then(res => {
            this.data = res[0]
        })
    }
}
</script>