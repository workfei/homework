<template>
  <div class="exit">
    <button @click="getExit">退出系统</button>
  </div>
</template>

<style>
.exit button {
  width: 200px;
  height: 50px;
  margin-top: 100px;
  font-size: 18px;
  border: 0;
  background-color: #999;
  cursor: pointer;
}

.exit button:hover {
  color: red;
}
</style>

<script>
export default {
    methods: {
        getExit () {
            this.$router.push('/login')
        }
    }
}
</script>