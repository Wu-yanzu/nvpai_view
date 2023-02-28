<template>
  <div>

    <!--============================顶部开始============================-->
    <div class="wrapper">
      <div class="top">
        <div class="top_left">
          <a @click="toHome"><span class="iconfont icon-changyonglogo34"></span><span class="logoText">到哪儿</span></a>
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
                                                                         @click="reload">搜 索</button>
          </span>
        <div class="MyHome" @click="toSelf">
          我的主页 <span class="iconfont icon-xiangyou"></span>
        </div>
      </div>
    </div>
    <br>
    <!--============================搜索框结束============================-->


    <!--============================主体内容开始============================-->
    <div class="wrapper">
      <br>
      <el-carousel :interval="3000" arrow="always" height="60px">
        <el-carousel-item v-for="item in adPhotos" :key="item">
          <img :src="item" width="1200px"/>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="bodyer">
      <div class="wrapper">
        <div class="bodyer_line" v-if="fpage.flag">
          <h1>相关美食</h1>
          <div class="bodyer_list">
            <div v-for="food in fpage.list" class="bodyer_list_item" @click="toFood(food)">
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
        <el-pagination
          @size-change="fHandleSizeChange"
          @current-change="getFenyeFoodList"
          :current-page="fpage.pageNum"
          :page-sizes="[4, 8, 12]"
          :page-size="fpage.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="fpage.total"
          v-if="fpage.flag">
        </el-pagination>
        <br>


        <div class="bodyer_line" v-if="spage.flag">
          <h1>相关店铺</h1>
          <div class="bodyer_list">
            <div v-for="store in spage.list" class="bodyer_list_item_dian" @click="toStore(store)">
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
                    📞 {{store.phone}}
                  </span><br>
                  <span>
                    📍 {{store.address}}
                  </span><br>
                </div>
              </div>
            </div>
          </div>
          <el-pagination
            @size-change="sHandleSizeChange"
            @current-change="getFenyeStoreList"
            :current-page="spage.pageNum"
            :page-sizes="[4, 8, 12]"
            :page-size="spage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="spage.total"
            v-if="spage.flag">
          </el-pagination>
        </div>

        <div class="bodyer_line" v-if="scpage.flag">
          <h1>相关景点</h1>
          <div class="bodyer_scenic_list">
            <div class="bodyer_scenic_item" v-for="scenic in scpage.list" @click="toScenic(scenic)">
              <img class="bodyer_scenic_item_img" :src="'http://localhost:8080/'+scenic.photo">
              <span class="bodyer_scenic_item_text">{{scenic.description}}</span>
            </div>
          </div>
          <el-pagination
            @size-change="scHandleSizeChange"
            @current-change="getFenyeStoreList"
            :current-page="scpage.pageNum"
            :page-sizes="[4, 8, 12]"
            :page-size="scpage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="scpage.total"
            v-if="scpage.flag">
          </el-pagination>
        </div>


        <div v-if="!fpage.flag&&!spage.flag" style="padding: 40px 0px">
          <el-empty description="无匹配结果"></el-empty>
        </div>

      </div>
      <div class="wrapper">
        <div class="foot">
          <img src="../assets/img/foot.png">
        </div>
      </div>
    </div>


    <!--============================主体内容结束 ============================-->


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
  import city from '../assets/js/city'

  export default {
    name: "List",
    data() {
      return {
        adPhotos: ['https://pic5.40017.cn/i/ori/1bgrmPCXheM.jpg', 'https://pic5.40017.cn/i/ori/1aT1oYnyhTa.jpg', 'https://pic5.40017.cn/i/ori/RK6oxCYWUE.jpg'],
        name: '',
        fpage: {pageSize: 4},
        spage: {pageSize: 4},//店铺
        scpage: {pageSize: 4},//景点
        user: {},

        //地址选择
        address: '',
        options: city.options
      }
    }
    , methods: {
      changeAddress(addr) {
        sessionStorage.setItem('address', addr.join(" "))
        // console.log(sessionStorage.getItem('address'))
      }
      ,
      getFenyeFoodList(curPage) {
        this.$axios.get('food/getFoodFenye?curPage=' + curPage + '&pageSize=' + this.fpage.pageSize + '&name=' + this.name)
          .then(resp => {
            this.fpage = resp.data
            if (this.fpage.list.length > 0) {
              this.fpage.flag = true
            }
          })
      }
      ,
      getFenyeStoreList(curPage) {
        this.$axios.get('store/getStoreFenye?curPage=' + curPage + '&pageSize=' + this.spage.pageSize + '&name=' + this.name)
          .then(resp => {
            this.spage = resp.data
            if (this.spage.list.length > 0) {
              this.spage.flag = true
            }
          })
      }
      ,
      getFenyeScenicList(curPage) {
        this.$axios.get('scenic/getScenicFenye?curPage=' + curPage + '&pageSize=' + this.scpage.pageSize + '&name=' + this.name)
          .then(resp => {
            this.scpage = resp.data
            if (this.scpage.list.length > 0) {
              this.scpage.flag = true
            }
          })
      }
      ,
      reload() {
        this.getFenyeFoodList(1);
        this.getFenyeStoreList(1);
        this.getFenyeScenicList(1);
      }
      ,
      fHandleSizeChange(newSize) {
        this.fpage.pageSize = newSize
        this.getFenyeFoodList(1);
      }
      ,
      sHandleSizeChange(newSize) {
        this.spage.pageSize = newSize
        this.getFenyeStoreList(1);
      }
      ,
      scHandleSizeChange(newSize) {
        this.scpage.pageSize = newSize
        this.getFenyeScenicList(1)
      }
      ,
      toHome() {
        this.$router.push('/')
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
    }
    ,
    created() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      this.name = this.$route.query.name;
      this.address = sessionStorage.getItem('address').split(" ")
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

<style scoped src="../assets/css/list.css"></style>
<style scoped src="../assets/css/top.css"></style>
<style scoped src="../assets/css/iconfont.css"></style>
