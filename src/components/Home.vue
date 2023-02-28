<template>
  <div>

    <!--============================顶部开始============================-->
    <div class="wrapper">
      <div class="top">
        <div class="top_left">
          <a><span class="iconfont icon-changyonglogo34"></span><span class="logoText">到哪儿</span></a>
        </div>

        <div class="top_right">
          <el-cascader class="top_address" v-model="address" @change="changeAddress" :options="options"
                       placeholder="选择地址"></el-cascader>
          <a type="text" v-if="userIsEmpty"><span class="spanIcon iconfont icon-weidenglutouxiang"></span><span
            class="spanText" @click="toLogin">请登录</span> </a>
          <a type="text" v-if="userIsEmpty" @click="toLogin"><span class="spanText">注册</span></a>
          <a type="text" v-if="!userIsEmpty" @click="toSelf"><span
            class="spanIcon iconfont icon-weidenglutouxiang"></span><span
            class="spanText">个人中心</span> </a>
          <a type="text" v-if="!userIsEmpty" @click="exitLogin"><span class="spanText">退出登录</span></a>
          <a type="text"><span class="spanText">|</span></a>
          <a type="text" @click="toOrder"><span class="spanIcon iconfont icon-dingdandingdanmingxishouzhimingxi"></span><span
            class="spanText">我的订单</span></a>
          <a type="text"><span class="spanText">|</span></a>
          <a type="text" class="top_kefu"><span class="spanIcon iconfont icon-kefu"></span>
            <div class="top_kefu_list">
              <p class="top_kefu_list_p">访问客服中心 ></p>
              <p>境内： 95010 或 400-830-6666 <br>
                中国香港：+852-3008-3295 <br>
                中国澳门：+86-21 3406-4888 <br>
                中国台湾：+86-21 3406-4888 <br>
                其他国家和地区：+86-21 3406-4888</p>
            </div>
          </a>
          <a type="text" class="top_app"><span class="spanIcon iconfont icon-shouji"></span>
            <div class="top_app_list">
              <div class="top_app_list_img">
                <img src="../assets/img/app1.jpg" width="140px">
                <img src="../assets/img/app2.png" width="140px">
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!--============================顶部结束============================-->


    <!--============================搜索框开始============================-->

    <div class="wrapper">
      <div class="head">
          <span class="search">
          <input v-model="name" class="search_input" type="text"><button class="search_button"
                                                                         @click="toList">搜 索</button>
          </span>
        <div class="MyHome" @click="toSelf">
          我的主页 <span class="iconfont icon-xiangyou"></span>
        </div>
      </div>
    </div>
    <br>
    <!--============================搜索框结束============================-->


    <!--============================导航栏开始============================-->

    <div class="menu">
      <div class="wrapper">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item class="menu_item" index="1">人气推荐</el-menu-item>
          <el-menu-item class="menu_item" index="2">精品店铺</el-menu-item>
          <el-menu-item class="menu_item" index="3">景点旅游</el-menu-item>
        </el-menu>
      </div>
    </div>

    <div class="lunbo">
      <el-carousel :interval="3000" type="card" height="400px">
        <el-carousel-item v-for="item in menuList" :key="item.id">
          <div class="lunbo_div">
            <img :src="'http://localhost:8080/'+item.photo" width="100%">
            <div class="lunbo_text" @click="lunboClick(item)">
              <span class="lunbo_text1">{{item.name}}</span><br>
              <span class="lunbo_text2">{{item.description}}</span>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--============================导航栏结束============================-->


    <!--============================主体内容开始============================-->

    <div class="bodyer">
      <div class="wrapper">

        <div class="bodyer_line" v-if="addrStoreList.length">
          <h3 @click="getStoreByAddr">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fujin"></use>
            </svg>
            附近好店
            <hr>
          </h3>
          <div class="bodyer_list">
            <div v-for="store in addrStoreList" class="bodyer_list_item_dian" @click="toStore(store)">
              <div class="bodyer_list_item_dian_img">
                <img :src="'http://localhost:8080/'+store.photo">
              </div>
              <div class="bodyer_list_item_dian_text">
                <div class="bodyer_list_item_dian_text1">
                  <span style="font-weight: bold">{{store.name}}</span><br>
                  <div class="bodyer_list_item_dian_score"><span>{{store.count}}人评论</span><span
                    style="color: #0e6fef"><span
                    class="score_style">{{store.score.toFixed(1)}}</span> 分</span></div>
                </div>
                <div class="bodyer_list_item_dian_text2">
                  <span>
                    <svg style="font-size: 20px" class="icon" aria-hidden="true">
                      <use xlink:href="#icon-dianhua"></use>
                    </svg>
                    {{store.phone}}
                  </span><br>
                  <span>
                    <svg style="font-size: 20px" class="icon" aria-hidden="true">
                      <use xlink:href="#icon-dizhi"></use>
                    </svg>
                    {{store.address}}
                  </span><br>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bodyer_line">
          <h3 @click="getRandFoodList">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-renqi"></use>
            </svg>
            美食推荐
            <hr>
          </h3>
          <div class="bodyer_list">
            <div v-for="food in randFoodList" class="bodyer_list_item" @click="toFood(food)">
              <div class="bodyer_list_item_img">
                <img :src="'http://localhost:8080/'+food.photoList[0].path">
              </div>
              <div class="bodyer_list_item_text">
                <span>{{food.name}}</span>
              </div>
              <div class="bodyer_list_item_desc">
            <span>
            {{food.description}}
            </span>
              </div>
            </div>

          </div>
        </div>


        <div class="bodyer_line">
          <h3 @click="getRandStoreList">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-8"></use>
            </svg>
            店铺精选
            <hr>
          </h3>
          <div class="bodyer_list">
            <div v-for="store in randStoreList" class="bodyer_list_item_dian" @click="toStore(store)">
              <div class="bodyer_list_item_dian_img">
                <img :src="'http://localhost:8080/'+store.photo">
              </div>
              <div class="bodyer_list_item_dian_text">
                <div class="bodyer_list_item_dian_text1">
                  <span style="font-weight: bold">{{store.name}}</span><br>
                  <div class="bodyer_list_item_dian_score"><span>{{store.count}}人评论</span><span
                    style="color: #0e6fef"><span
                    class="score_style">{{store.score.toFixed(1)}}</span> 分</span></div>
                </div>
                <div class="bodyer_list_item_dian_text2">
                  <span>
                    <svg style="font-size: 20px" class="icon" aria-hidden="true">
                      <use xlink:href="#icon-dianhua"></use>
                    </svg>
                    {{store.phone}}
                  </span><br>
                  <span>
                    <svg style="font-size: 20px" class="icon" aria-hidden="true">
                      <use xlink:href="#icon-dizhi"></use>
                    </svg>
                    {{store.address}}
                  </span><br>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bodyer_line">
          <h3 @click="getRandScenicList">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jingdian2"></use>
            </svg>
            打卡圣地
            <hr>
          </h3>
          <div class="bodyer_list">
            <div class="bodyer_scenic_item" v-for="scenic in randScenicList" @click="toScenic(scenic)">
              <img class="bodyer_scenic_item_img" :src="'http://localhost:8080/'+scenic.photo">
              <span class="bodyer_scenic_item_text">{{scenic.description}}</span>
            </div>
          </div>
        </div>

      </div>
      <div class="wrapper">
        <div class="foot">
          <img src="../assets/img/foot.png">
        </div>
      </div>
    </div>
    <!--============================主体内容结束============================-->


    <!--============================右下固定栏开始============================-->

    <div class="right_fixed">
      <a class="right_fixed_a right_fixed_app">
        <span class="iconfont icon-app"></span>
        <div class="right_fixed_app_list">
          <div class="right_fixed_app_list_img">
            <img src="../assets/img/app1.jpg" width="140px">
            <img src="../assets/img/app2.png" width="140px">
          </div>
        </div>
      </a>
      <a class="right_fixed_a" @click="toSelf">
        <span class="iconfont icon-gerenzhongxin"></span>
        <span class="right_fixed_a_text">个人中心</span>
      </a>
      <a class="right_fixed_a" @click="toOrder">
        <span class="iconfont icon-dingdandingdanmingxishouzhimingxi"></span>
        <span class="right_fixed_a_text">我的订单</span>
      </a>
      <a class="right_fixed_a">
        <span class="iconfont icon-wodekefu"></span>
        <span class="right_fixed_a_text">在线客服</span>
      </a>
      <a class="right_fixed_a" @click="toFav">
        <span class="iconfont icon-shoucangjia"></span>
        <span class="right_fixed_a_text">我的收藏</span>
      </a>
      <a class="right_fixed_a" href="#">
        <span class="iconfont icon-fanhuidingbu1"></span>
        <span class="right_fixed_a_text">回到顶部</span>
      </a>
    </div>
    <!--============================右下固定栏结束============================-->

  </div>
</template>

<script>
  import local from '../assets/css/iconfont.js'
  import city from '../assets/js/city'

  export default {
    name: "Home",
    data() {
      return {
        //顶部栏用到的变量
        name: '',//传给list页面的关键词
        randFoodList: [],
        randStoreList: [],
        randScenicList: [],
        addrStoreList: [],
        activeIndex: '1',
        menuList: [],

        //地址选择
        address: '',
        options: city.options,

        //用户
        user: {}

      }
    }
    ,
    methods: {
      changeAddress(addr) {
        sessionStorage.setItem('address', addr.join(" "))
        this.address = addr
        // console.log(sessionStorage.getItem('address'))
        this.getStoreByAddr();
      }
      ,
      handleSelect(index) {
        this.activeIndex = index
        if (index == '1') {//人气推荐  获取六个美食
          this.$axios.get('food/getFoodMenu').then(resp => {
            this.menuList = resp.data
            this.menuList.forEach(item => {
              item.photo = item.photoList[0].path
            })
          })
        }
        if (index == '2') {//精品店铺 获取评分最高的六个店铺
          this.$axios.get('store/getStoreMenu').then(resp => {
            this.menuList = resp.data
          })
        }
        if (index == '3') {//景点旅游 获取六个景点
          this.$axios.get('scenic/getScenicMenu').then(resp => {
            this.menuList = resp.data
          })
        }
      }
      ,
      getRandFoodList() {
        this.$axios.get('food/getFood').then(resp => {
          this.randFoodList = resp.data
          // console.log(this.randFoodList)
        })
      }
      ,
      getRandStoreList() {
        this.$axios.get('store/getStore').then(resp => {
          this.randStoreList = resp.data
          // console.log(this.randStoreList)
        })
      }
      ,
      getRandScenicList() {
        this.$axios.get('scenic/getScenic').then(resp => {
          this.randScenicList = resp.data
          // console.log(this.randScenicList)
        })
      }
      ,
      getStoreByAddr() {
        console.log(this.address)
        this.$axios.get('store/getStoreByAddr?addr=' + this.address[0]).then(resp => {
          this.addrStoreList = resp.data
          // console.log(this.addrStoreList)
        })
      }
      ,
      lunboClick(sel) {
        console.log(this.activeIndex)
        if (this.activeIndex == '1') {//去往美食详情
          this.toFood(sel)
        }
        if (this.activeIndex == '2') {//去往店铺详情
          this.toStore(sel)
        }
        if (this.activeIndex == '3') {//去往景点详情
          this.toScenic(sel)
        }
      }
      ,
      toList() {
        this.$router.push('/List?name=' + this.name)
      }
      ,
      toLogin() {
        this.$router.push('/Login')
      }
      ,
      exitLogin() {
        this.user = null;
        sessionStorage.removeItem('user');
      }
      ,
      toSelf() {
        if (this.userIsEmpty) {
          this.toLogin()
        } else {
          this.$router.push("/first")
        }
      }
      ,
      toOrder() {
        if (this.userIsEmpty) {
          this.toLogin()
        } else {
          this.$router.push("/order")
        }
      }
      ,
      toFav() {
        if (this.userIsEmpty) {
          this.toLogin()
        } else {
          this.$router.push("/collect")
        }
      }
      ,
      toScenic(scenic) {
        scenic.video = scenic.video.replaceAll('&', '%26');
        if (sessionStorage.getItem('scenic') != null) {
          sessionStorage.removeItem('scenic')
        }
        sessionStorage.setItem('scenic', JSON.stringify(scenic))
        // console.log(scenic)
        this.$router.push('ScenicDetails')
      }
      ,
      toStore(store) {
        // console.log(store)
        // this.$router.push('StoreDetails?store=' + JSON.stringify(store))
        if (sessionStorage.getItem('store') != null) {
          sessionStorage.removeItem('store')
        }
        sessionStorage.setItem('store', JSON.stringify(store))
        this.$router.push('StoreDetails')
      }
      ,
      toFood(food) {
        // this.$router.push('Search?food=' + JSON.stringify(food))
        if (sessionStorage.getItem('food') != null) {
          sessionStorage.removeItem('food')
        }
        sessionStorage.setItem('food', JSON.stringify(food))
        this.$router.push('Search')
      }
      ,
      reload() {
        this.getRandFoodList();
        this.getRandStoreList();
        this.getRandScenicList();
        this.handleSelect(this.activeIndex)
        if (this.address.length > 0) {
          // console.log(this.address.length)
          this.getStoreByAddr();
        }
      }
    }
    ,
    created() {
      var addr = sessionStorage.getItem('address');
      if (addr != null) {
        this.address = sessionStorage.getItem('address').split(" ")
      }
      this.user = JSON.parse(sessionStorage.getItem('user'));
      // console.log(this.user.address)
      // if (this.user != null && this.user.address != null) {
      //   this.address = this.user.address.split(" ");
      //   sessionStorage.setItem('address', this.address.join(" "))
      // }

      this.reload();
    }
    ,
    computed: {
      userIsEmpty() {
        return this.user == null;
      }
    }

  }
</script>

<style scoped src="../assets/css/home.css"></style>
<style scoped src="../assets/css/top.css"></style>
<style scoped src="../assets/css/iconfont.css"></style>
