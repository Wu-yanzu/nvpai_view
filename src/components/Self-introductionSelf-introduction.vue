<template>
  <div class="all">
    <div >

      <el-menu
        :router="true"
        :default-active="$router.path"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#44A7F8"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
        </el-menu-item>
        <el-menu-item class="head_a" index="/" >
          <span class="head_zi"> <span class="iconfont">&#xe71b;</span> </span> <span class="head_zi2">到哪儿</span>

        </el-menu-item>

        <el-menu-item index="/first">会员首页</el-menu-item>

        <el-submenu  index="3" >
          <template slot="title" >账户设置</template>
          <el-menu-item  index="/showmy" >个人信息</el-menu-item>
          <el-menu-item >站内信息</el-menu-item>
          <el-menu-item >银行卡</el-menu-item>
          <el-submenu index="3-4">
            <template slot="title">地址设置</template>
            <el-menu-item >常用地址</el-menu-item>
            <el-menu-item >配送地址</el-menu-item>
            <el-menu-item index="/order">订单查看</el-menu-item>
          </el-submenu>
        </el-submenu>

        <el-menu-item >社区互动</el-menu-item>
        <el-menu-item >会员俱乐部 </el-menu-item>
        <el-menu-item >积分商城 </el-menu-item>


        <el-menu-item class="head_b" index="/"> 返回首页<span class="iconfont">&#xe8a4;</span>
        </el-menu-item>
      </el-menu>
    </div>
      <div class="banner" >
        <div >
      <el-row class="tac">
        <el-col :span="4">
          <el-menu
              :router="true"
              :default-active="$router.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#6FBCFF"
            text-color="#fff"
            :unique-opened="true"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="iconfont icon-dingdan"></i>
                <span class="caption">我的订单</span>
              </template>
              <el-menu-item-group>
                <template slot="title"></template>
                <el-menu-item class="a"   index="/order">我的订单</el-menu-item>
                <el-menu-item  class="a" >旅游券订单</el-menu-item>
              </el-menu-item-group>
            </el-submenu>


            <el-submenu index="2">
              <template slot="title">
                <i class="iconfont icon-changyonglogo34 "></i>
                <span class="caption">个人资料</span>
              </template>
              <el-menu-item-group>
                <el-menu-item class="a" index="/showmy">个人资料</el-menu-item>
                <el-menu-item  class="a" >安全设置</el-menu-item>
                <el-menu-item  class="a" >修改密码</el-menu-item>
                <el-menu-item  class="a" >我的提问</el-menu-item>
              </el-menu-item-group>
            </el-submenu>


            <el-submenu index="3">
              <template slot="title">
                <i class="iconfont icon-xiecheng"></i>
                <span class="caption">常用信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item class="a" >游客信息</el-menu-item>
                <el-menu-item class="a" >常用配送地址</el-menu-item>
                <el-menu-item class="a" >常用发票信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>


            <el-submenu index="7">
              <template slot="title">
                <i class="iconfont icon-jinqian "></i>
                <span class="caption">我的资产</span>
              </template>
              <el-menu-item-group>
                <el-menu-item class="a"  >优惠券</el-menu-item>
                <el-menu-item class="a" >旅游券</el-menu-item>
                <el-menu-item class="a" >第三方卷</el-menu-item>
                <el-menu-item class="a" >马龙头</el-menu-item>
                <el-menu-item class="a" >现金资产</el-menu-item>
                <el-menu-item class="a" >我的银行卡</el-menu-item>
              </el-menu-item-group>
            </el-submenu>



            <el-submenu index="4">
              <template slot="title">
                <i class="iconfont icon-wxbgongju "></i>
                <span class="caption">常用工具</span>
              </template>
              <el-menu-item-group>
                <template slot="title"></template>
                <el-menu-item class="a"  index="collect">我的收藏</el-menu-item>
                <el-menu-item class="a" index="/evaluate">我的点评</el-menu-item>
              </el-menu-item-group>
            </el-submenu>



            <el-submenu index="5">
          <template slot="title">
            <i class=" iconfont icon-shequ"></i>
            <span class="caption">社区互动 </span>
          </template>
          <el-menu-item-group>
            <template slot="title"></template>
            <!--改成 主页路径   index-->
            <el-menu-item class="a" index="first">我的主页</el-menu-item>
          </el-menu-item-group>
        </el-submenu>



            <el-submenu index="6">
              <template slot="title">
                <i class="iconfont icon-huiyuan"></i>
                <span class="caption">会员俱乐部 </span>
              </template>
            </el-submenu>
          </el-menu>
        </el-col>

        <div class="center_right" >
          <router-view></router-view>
        </div>
      </el-row>
          <div class="banner_left_s">
            <div class="banner_left_last" >
              <img src="../assets/img/2022-07-25_195921.png">
            </div>
          </div>
        </div>


      </div>


    <div class="last">
      <img src="../assets/img/last.png" alt="">
    </div>
      <div>


    </div>
  </div>
</template>

<script>
    export default {
        name: "Self-introductionSelf-introduction",
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>
<style src="../assets/css/mjh/iconfont.css"></style>
<style scoped>
.all{
  background-color:#F5F5F5;
}
.head_zi{
  list-style: none;
}
 /*最上面的导航栏*/

  .head_b{
 float: right;
  }
  .head_zi span{
    font-size: 40px;
    line-height: 40px;
    color: #297CF0;
  }
  .head_zi2{
    font-weight: bold;
    font-size: 23px;
    font-family: '幼圆';
    color: #297CF0;
  }


/*侧边搜索栏目 */
  .caption{
    font-size: 16px;
    cursor: pointer
  }
  .a{
    font-family: "微软雅黑" !important;
  }
  .a:hover{
    font-size: 15px;
  }
.banner{
  width: 1290px;
  margin: auto;
  margin-top: 30px;
}
.banner_left_s{
  height: 400px;
}

  .banner_left_last{
float: left;
  }
.center_right{
  float: right;
  height: 748px;
  width: 960px
}
  .last img{
    width: 100%;
    height: 564px;
  }
  .tac{
    height: 440px;

  }

</style>


