<template>
            <div class="box">
                <div class="logo">
                    <img src="img/wea_logo.png" alt="">
                </div>
                <div class="search">
                    <input type="search" name="" id="" v-model.trim="city" placeholder="请输入需要查询的城市" class="sch" maxlength="10" @keydown.enter="getWeather" ref="cinp">
                    <input type="button" value="搜索" class="btn" @click="getWeather">
                </div>
                <div class="hotcity">
                    <span @click="getCity('北京')">北京</span>
                    <span @click="getCity('上海')">上海</span>
                    <span @click="getCity('广州')">广州</span>
                    <span @click="getCity('深圳')">深圳</span>
                </div>
                <ul class="weather">
                    <li v-for="val in citydata" :key="val.id">
                        <h2>{{val.type}}</h2>
                        <p>{{val.high}}~{{val.low}}</p>
                        <span>{{val.date}}</span>
                    </li>
                </ul>
                <div class="ganmao">
                    <p>{{ganmao}}</p>
                </div>
            </div>
</template>

<style scoped>
    .box {
        margin-top: 50px;
    }
    .box .logo {
        width: 158px;
        height: 47px;
        margin: 0 auto;
    }
    .box .search {
        display: flex;
        width: 520px;
        margin: 30px auto 10px;
    }
    .box .sch {
        width: 400px;
        height: 50px;
        text-indent: 15px;
        border: 2px solid lightblue;
    }
    box .btn {
        width: 100px;
        color: #fff;
        background-color: lightskyblue;
        border: 0;
        cursor: pointer;
    }
    .box .hotcity {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        width: 480px;
        margin: 0 auto 40px;
    }
    .box .hotcity span {
        color: #999;
        cursor: pointer;
    }
    .box .weather {
        display: flex;
        width: 1000px;
        margin: 0 auto;
    }
    .box .weather li {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 25%;
        height: 150px;
        color: orange;
    }
    .box .weather li span {
        color: #999;
    }
    .box .ganmao p {
        color: red;
        margin-top: 40px;
        font-weight: bold;
        text-align: center;
    }
</style>

<script>
export default {
  data () {
    return {
      city: '邵阳',
      citydata: [],
      ganmao: ''
    }
  },
  methods: {
    getWeather () {
      var reg = /^[^u4E00-u9FA5]{0,}$/g
      const that = this
      if (this.city === '') {
        alert('请输入内容')
        this.$refs.cinp.focus()
      } else if (reg.test(this.city) === false) {
        alert('城市名的格式不对哦')
        this.$refs.cinp.select()
      } else {
        this.$axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + this.city)
        .then(function (response) {
            if (response.data.status === 1000) {
                that.citydata = response.data.data.forecast
                that.ganmao = response.data.data.ganmao
            } else {
                alert('查无此城市')
            }
        }).catch(function (error) {
            console.log(error)
        })
      }
    },
    getCity (text) {
      this.city = text
      this.getWeather()
    }
  },
  mounted () {
    this.getWeather()
  }
}
</script>