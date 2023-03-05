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
        <el-side :width="isCollapse ? '64px' : '300px'">
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
                <i class="el-icon-document"></i>
                <span>新闻管理</span>
              </template>
              <el-menu-item index="/ServerHome/server/new/News">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span >管理新闻</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/ServerHome/server/new/Fenlei">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span >管理分类</span>
                </template>
              </el-menu-item>
            </el-submenu>




            <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45-->
            <el-submenu :index="'2'">
              <template slot="title">
                <i class="el-icon-picture"></i>
                <span>多媒体管理</span>
              </template>
              <el-menu-item index="/ServerHome/server/scenic/video">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>管理视频</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/ServerHome/server/scenic/photo">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>管理图片</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45-->
            <el-submenu :index="'3'">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/ServerHome/server/user/Info">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>信息管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/ServerHome/server/user/Pinglun">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>评论管理</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <!--&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
            <el-submenu :index="'4'">
              <template slot="title">
                <i class="el-icon-edit-outline"></i>
                <span>赛程管理</span>
              </template>
                  <el-menu-item index="/ServerHome/server/schedule/Saicheng">
                    <template slot="title">
                      <i class="el-icon-menu"></i>
                      <span >赛程安排</span>
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
