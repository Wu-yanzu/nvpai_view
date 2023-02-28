<template>
  <div>
    <el-container class="head">
      <!--头部-->
      <el-header>
        <span>首页</span>
        <el-button type="info" @click="loginOut">退出</el-button>
      </el-header>
      <!--主体-->
      <el-container>
        <!--左侧菜单-->
        <el-side :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu
            background-color="#313743"
            text-color="#fff"
            active-text-color="#409FFF"
            :unique-opened="true"
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true">
            <!--:default-active="activePath">-->
            <!--<el-menu-item>菜单</el-menu-item>-->


            <!--&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45-->
            <el-submenu :index="'1'">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>门店管理</span>
              </template>
              <el-menu-item index="/ServerHome/server/store/Store">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span >管理店铺</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/ServerHome/server/store/menu">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span >管理菜品</span>
                </template>
              </el-menu-item>
            </el-submenu>




            <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45-->
            <el-submenu :index="'2'">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>景区管理</span>
              </template>
              <el-menu-item index="/ServerHome/server/scenic/Scenic">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>景区列表</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45-->
            <el-submenu :index="'3'">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>美食管理</span>
              </template>
              <el-menu-item index="/ServerHome/server/food/Food">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>美食列表</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <!--&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
            <el-submenu :index="'4'">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
                  <el-menu-item index="/ServerHome/server/order/Order">
                    <template slot="title">
                      <i class="el-icon-menu"></i>
                      <span >订单列表</span>
                    </template>
                  </el-menu-item>
            </el-submenu>

          </el-menu>
        </el-side>
        <!--右侧栏-->
        <el-main >
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>


  </div>
</template>

<script>

  export default {
    name: "ServerHome",
    data() {
      return {
        flag: false,
        isCollapse: false,
      }
    },

    methods: {
      show() {
        this.flag = !this.flag
      },
      //退出
      loginOut() {
        sessionStorage.removeItem('user');
        this.$router.push('/login');
      },
      // 点击按钮切换左侧菜单的折叠与展开
      toggleCollapse() {
        this.isCollapse = !this.isCollapse;
      }

    }
  }

</script>

<style scoped>
  .header {
    height: 100%;
  }

  .el-header {
    background-color: rgb(54, 61, 64);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
  }

  /* 左侧菜单 */
  .el-aside {
    height: 100%;
    background-color: rgb(49, 55, 67);
    color: white;
    user-select: none;
    transition: width 0.3s;
  }

  .toggle-button {
    background-color: #4A5064;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    letter-spacing: 2px;
    cursor: pointer;
  }

  /* 右侧内容区 */
  .el-main {
    background-color: rgb(233, 237, 241);
  }

</style>
