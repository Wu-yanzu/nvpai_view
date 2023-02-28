<template>
  <div>
    <div class="first">
      <div class="head">
        <div class="head_one">
          <div class="head_one_one">
            <img v-if="info.userphoto" :src="'http://localhost:8080/'+info.userphoto.path">
          </div>
          <div class="head_one_two">
            <div>姓名：{{info.name}}</div>
            <div>账号：{{info.phone}}</div>
            <div class="block">
              <span class="demonstration"></span>
              <el-rate></el-rate>
            </div>
          </div>
        </div>
        <div class="head_two">
          <img src="../assets/img/21.png">
        </div>
      </div>
      <div class="two">
        <div class="two_one">
          <div class="two_one_one"> </div>
          <div class="two_one_two">
            <span class="iconfont">&#xe662;暂无数据</span><br>
          </div>
        </div>
        <div class="two_two">
          <div class="block">
            <span class="demonstration"></span>
            <el-carousel trigger="click" height="220px">
              <el-carousel-item v-for="item in tps">
                <h3 class="small">
                  <img class="img" :src="'http://localhost:8080/'+item.photo">
                </h3>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>


      <div class="three">
        <div class="three_one">您感兴趣的地方 <span @click="hyh()" class="iconfont">&#xe71b;换一换</span></div>
        <div class="three_two">
          <div v-for="item in tps">
            <img :src="'http://localhost:8080/'+item.photo">
            <div class="a1">
              {{item.name}}
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "first",
    data() {
      return {
        tps: {},
        info: {}
      }
    }, methods: {
      tp() {
        this.$axios('first/tp').then(resp => {
          this.tps = resp.data
        })

      }, hyh() {
        this.tp();
        location.reload()
      },
      all() {
        // 这里是一个口子 可以传送id  拿到所有信息
        console.log(this.info.id)
        this.$axios.post("muser/list?id=" + this.info.id).then(resp => {
          this.info = resp.data
        })
      }
      ,
      toLogin() {
        this.$router.push('/Login')
      }
    },
    created() {
      this.info = JSON.parse(sessionStorage.getItem('user'));
      console.log(this.info)
      if (this.info == null) {
        this.$message.error('登录状态有误！请重新登录！')
      }

      this.tp();
      this.all();
    }
  }
</script>

<style scoped>
  .img {
    width: 288px;
    height: 220px;
  }

  .first {
    width: 100%;
  }

  .head {
    height: 170px;
  }

  .head_one {
    width: 60%;
    height: 170px;
    float: left;
  }

  .head_one_one {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    margin-left: 70px;
    float: left;
  }

  .head_one_one img {
    width: 150px;
    height: 170px;
    border-radius: 100%;
    border: 2px #d0d0d0;
  }

  .head_one_two {
    width: 200px;
    height: 150px;
    margin-left: 40px;
    float: left;
  }

  .head_one_two div {
    font-size: 20px;
    color: #333333;
    text-align: left;
  }

  .three_one span {
    font-size: 12px;
    color: #2DBB55;
    line-height: 24px;
    cursor: pointer;
    text-align: right;
  }

  .head_two {
    width: 40%;
    height: 170px;
    float: right;
  }

  .two {
    min-height: 360px;
    width: 100%;
  }

  .two_one {
    width: 70%;
    min-height: 360px;
    float: left;
  }

  .two_one_one {
    height: 72px;
    width: 20%;
    text-align: left;
    font-size: 23px;
    line-height: 72px;
  }

  .two_one_two {
    height: 260px;
    width: 100%;
    border-top-style: solid;
    border-top-color: #dfdfdf;
  }

  .two_one_two span {
    line-height: 260px;
    font-size: 32px;
    color: #979797;
  }

  .two_two {
    width: 30%;
    min-height: 360px;
    float: right;
  }

  .block {
    margin-top: 40px;
  }

  .three {
    margin-top: 20px;
    min-height: 200px;
    width: 100%;
  }

  .three_one {
    height: 24px;
    width: 100%;
    border-left: 5px solid #4c5a65;
    color: #333;
    font-size: 16px;
    background: #fff;
    text-align: left;
  }

  .three_two {
    min-height: 176px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .three_two div {
    min-height: 40px;
    width: 210px;
  }

  .a1 {
    background-color: #d7d7d7;
    width: 210px;
    position: relative;
    opacity: 0.4;
    top: -45px;
    color: #333;
    font-size: 18px;
  }

  .three_two div img {
    width: 210px;
    height: 215px;
  }

  .three_two div img:hover {
    transform: scale(1.05);
    box-shadow: 1px 1px 5px 2px #ffddd1;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
