<template>
   <div>
        <ul>
        <li v-for="(val,k) in data" :key="k">{{k}}: <span v-if="k == 'img'"><img v-if="k == 'img'" :src="geturl(val)" /></span>
            <span v-else>{{val}}</span>
        </li>
        <li>123</li>
    </ul>
    <div>
        123
    </div>
   </div>
</template>
<script>
export default {
    data () {
        return {
            data: null
        }
    },
    mounted () {
        console.log(this.$route)
        var id = this.$route.params.id
        console.log(id)
        this.$http.get('/oneUser?id=' + id).then(res => {
            console.log(res)
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