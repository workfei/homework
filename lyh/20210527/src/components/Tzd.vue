<template>
  <div class="tzd">
    <img src="img/0.png" alt="" />
    <div class="pox">
      <input type="text" v-model="uname" id="uname" />
      <input type="button" @click="getData" id="btn" value="搜索" />
    </div>
    <div class="top">{{ top }}</div>
    <div class="city">{{ city }}</div>
    <ul class="box2">
      <li v-for="val in books" :key="val.id">
        <h2>{{ val.type }}</h2>
        <p>{{ val.high }}-{{ val.low }}</p>
        <p>{{ val.fengxiang }}</p>
        <span>{{ val.date }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      uname: '邵阳',
      books: [],
      top: '',
      city: '',
      box2: ''
    }
  },
  methods: {
    async getData () {
      this.$http.get(
        'http://wthrcdn.etouch.cn/weather_mini?city=' + this.uname
      ).then(data => {
        return data
      }).then(data => {
        this.books = data.data.forecast
        this.top = data.data.ganmao
        this.city = data.data.city
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>
.tzd {
  position: relative;
  text-align: center;
  background-color: #fff;
}
img {
  margin: 30px 0;
}
.pox {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  border: 1px solid #4e6ef2;
}
.top {
  height: 30px;
  width: 100%;
  text-align: center;
  margin-top: 80px;
  font-size: 25px;
  color: skyblue;
}
#uname {
  text-indent: 10px;
  color: #333;
  border: 0;
  width: 100%;
  height: 40px;
}
#btn {
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  width: 100px;
  height: 100%;
  background-color: #4e6ef2;
  color: #fff;
}
ul,
li {
  list-style: none;
}
.box2 {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.box2 li {
  text-align: center;
  border-right: 1px solid #ccc;
  color: orange;
  padding: 10px;
  flex: 1;
}

.box2 li:last-child {
  border: 0;
}

.box2 li span {
  color: #666;
}
.box2 li p {
  margin: 10px 0;
}
.btns {
  position: absolute;
  top: 40px;
  left: 0px;
  height: 20px;
  color: #666;
  font-size: 12px;
  margin-top: 5px;
}
.btns li {
  float: left;
  margin-left: 5px;
}
.city {
  margin-top: 10px;
  font-size: 30px;
  color: orange;
}
</style>
