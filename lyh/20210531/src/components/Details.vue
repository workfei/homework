<template>
    <ul>
        <li v-for="(val,k) in data" :key="k">{{k}}: <span v-if="k == 'img'"><img v-if="k == 'img'" :src="geturl(val)" /></span>
            <span v-else>{{val}}</span>
        </li>
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
        this.$http.get('/oneUser?id=' + this.$route.params.id).then(res => {
            this.data = res[0]
        })
    },
    methods: {
        geturl (url) {
            return this.imgURL + url
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}
ul,li {
    list-style: none;
}
img {
    width: 500px;
}
</style>
