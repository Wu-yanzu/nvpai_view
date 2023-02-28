<template>
  <div style="width: 100%;text-align: left;">
    <div style="width: 1180px;margin: auto;">
      <!--      <el-carousel :interval="3000" arrow="always" height="75px">-->
      <!--        <el-carousel-item v-for="item in photos" :key="item">-->
      <!--          <img :src="item" width="1200px"/>-->
      <!--        </el-carousel-item>-->
      <!--      </el-carousel>-->

      <!--      <el-breadcrumb separator-class="el-icon-arrow-right">-->
      <!--        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
      <!--        <el-breadcrumb-item :to="{ path: '/' }">景区</el-breadcrumb-item>-->
      <!--        <el-breadcrumb-item>{{ scenic.name }}</el-breadcrumb-item>-->
      <!--      </el-breadcrumb>-->
      <!--      <br/>-->
      <el-card class="box-card">
        <!--        <div style="width: 50%;float: left;margin-bottom: 15px">-->
        <!--          <img :src=scenic.photo width="80%">-->
        <!--        </div>-->
        <el-carousel :interval="2000" height="310px" style="float: left ;width: 40%;">
          <el-carousel-item v-for="item in food.photoList" style="text-align: center">
            <img :src="'http://localhost:8080/'+item.path" width="100%"/>
          </el-carousel-item>
        </el-carousel>
        <div style="float: right;width: 55%;">
          <h1>{{ food.name }}</h1>
          <br/>
          <span style="font-size: 15px">{{ food.description }}</span>
          <br/><br/><br/>
        </div>
      </el-card>

      <el-card class="box-card" style="margin-top: 30px ">
        <div slot="header" class="clearfix">
          <span style="font-size: 20px ;font-weight: normal;">哪里吃</span>
        </div>
        <div class="ss">
          <div v-for="o in store" class="text item">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <img :src="'http://localhost:8080/'+o.photo" width="200" height="150" class="img_c" @click="jump(o)">
                <p style="font-size: 18px;margin-top: 8px"> 🍴{{ o.name }}</p>
                <el-rate
                  v-model="o.scope"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                  style="margin-left: -110px">
                </el-rate>
                <dd>
                  <p style="margin-left: -50px;text-align: left;padding: 0px 10px">
                    <em>地址：</em>{{ o.address }}</p>
                  <div style="margin-left: -50px;text-align: left;padding: 0px 10px">
                    <em>简介：</em>{{ o.description }}
                  </div>
                </dd>
              </div>
            </el-card>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        food: {},
        store: [],
        linshi: {},
      }
    },

      methods: {
      jump(o) {
        if (sessionStorage.getItem('store') != null) {
          sessionStorage.removeItem('store')
        }
        sessionStorage.setItem('store', JSON.stringify(o))
        this.$router.push('StoreDetails')
      },
    }
    ,
    created() {
      this.linshi = JSON.parse(sessionStorage.getItem('food'))
      console.log(this.linshi)
      //获取店铺信息
      this.$axios.post('store/getStoreList?name=' + this.linshi.name).then(e => {
        this.store = e.data
      })
      //获取美食信息
      this.$axios.post('store/getFood?id=' + this.linshi.id + '&name=' + this.linshi.name).then(e => {
        this.food = e.data
      })
    }
  }
</script>

<style scoped>
  .ss {
    text-align: center;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }


  .clearfix {
    display: block;
    transition: all 1.2s;
  }

  .img_c {
    cursor: pointer;
    transition: all 1.2s;
  }

  .img_c:hover {
    transform: scale(1.1);
  }

</style>
