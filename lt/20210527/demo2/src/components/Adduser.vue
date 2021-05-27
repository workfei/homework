<template>
    <div>
        {{$route.params.id}}
    </div>
</template>
<style>
    h3{
        text-align: center;
    }
    td {
        text-align: center;
    }
</style>
<script>
export default {
    data () {
        return {
            msg: ''
        }
    },
    mounted () {
        this.$http.get('/test').then(res => {
            console.log(res)
        })
    }
}
</script>