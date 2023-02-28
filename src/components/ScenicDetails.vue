<template>
  <div style="width: 100%;text-align: left;">
    <div style="width: 1180px;margin: auto;">
      <el-carousel :interval="3000" arrow="always" height="75px">
        <el-carousel-item v-for="item in adPhotos" :key="item">
          <img :src="item" width="1200px"/>
        </el-carousel-item>
      </el-carousel>

      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">景区</el-breadcrumb-item>
        <el-breadcrumb-item>{{scenic.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <br/>
      <el-card class="box-card">
        <div style="width: 50%;float: left;margin-bottom: 15px">
          <img :src="'http://localhost:8080/'+scenic.photo" width="100%">
        </div>
        <div style="float: left;width: 45%;padding-left: 20px;">
          <h1>{{scenic.name}}<span style="font-size: 15px;color: red"> {{scenic.level}}</span></h1>
          <span style="font-size: 14px"><b>景点地址：</b>{{scenic.address}}</span>
          <br/>
          <br/>
          <span style="font-size: 14px"><b>开放时间：</b>7:30-17:00</span>
          <br/>
          <br/>
          <span style="font-size: 14px">{{scenic.description}}</span>
          <br/>
          <br/>
        </div>
        <el-button type="text" style="color: #006DAE;" @click="collect">收藏</el-button>
      </el-card>
      <br/>
      <el-menu :default-active="activeIndex" class="el-menu-demo" background-color="#0086f6" text-color="#303133"
               mode="horizontal" active-text-color="#ffd04b">
        <el-menu-item index="1">
          <el-button style="color: aliceblue" type="text" @click="getAnchor('explain')">景区介绍</el-button>
        </el-menu-item>
        <el-menu-item index="2">
          <el-button style="color: aliceblue" type="text" @click="getAnchor('notice')">游客须知</el-button>
        </el-menu-item>
      </el-menu>

      <el-card>
        <div id="explain">
          <div style="width: 100%">
            <div>
              <h3>景区介绍</h3>
            </div>
            <div style="width: 100%;text-align: center;">
              <iframe :src="scenic.video" width="800px" height="530px" allowfullscreen="true"></iframe>
            </div>
          </div>
        </div>
      </el-card>
      <br/>
      <el-card>
        <div id="notice">
          <div>
            <h3>游客须知</h3>
          </div>
          <div>
            <table border="thin solid #ECEFF2" cellspacing="0" style="font-size: 14px;color: #666666">
              <tr>
                <td width="150px">&nbsp;{{scenic.name}}预订说明</td>
                <td>
                  <div style="margin-left: 10px">
                    <h4>特惠政策</h4>
                    <p>【免费政策】<br>
                      ①儿童：身高1.4米（含1.4米）以下或6周岁（含6周岁）以下，凭有效证件免费入园；<br/>
                      ②老人：70周岁（含70周岁）以上，凭有效居民身份证或《高龄证》免费入园；<br/>
                      ③军人：中华人民共和国现役军人凭军人证等有效证件、军队离退休干部凭离退休干部证免费入园；<br>
                      ④残疾人：残疾人员凭《残疾证》免费入园，重度残疾人员需要陪护的，可由一名陪护人员免费陪同入园。</p>
                    <p>【优惠政策】<br>
                      ①未成年人：6周岁（不含6周岁）-18周岁（含18周岁）实行半价优惠；<br>
                      ②学生：全日制大学本科及以下学历在校学生凭居民身份证或学生证等有效证件实行半价优惠；<br>
                      ③老人：60周岁（含60周岁）-70周岁（不含70周岁），凭有效居民身份证或《老年人优待证》实行半价优惠；<br>
                      ④本市、省内老人：60周岁（含）-70周岁（不含）的老年人凭《老年人优待证》或身份证等有效证件免费入园，景点举办大型园事活动期间，实行半价优惠政策；<br>
                      ⑤其他：法律、法规规定的其他门票价格优惠政策。
                    </p>
                    <p align="left">以上信息仅供参考，具体以景区公示为准。</p>
                    <p></p></div>
                  <div style="margin-left: 10px">
                    <h4>温馨提示</h4>
                    <p>
                      <strong>1.预定说明：</strong>全网限制实名制购票，一证一码，为保证入园顺利，预订时请务必填写真实姓名、手机号码号等信息；<br>
                      <strong>2.退订说明：</strong>门票在未使用的情况下，可申请退单，退单需整单退订，不得退订整单中部分门票；网络预订票仅预约当天有效，游客可持预售登记的身份证及预订成功后收到的短信二维码快速入园。预定门票一经使用不可退订；若游客因景区闸机误刷检票，而实际并未入园，需要退订，请现场联系景区检票人员开具退款说明书，联系客服核实退款。<br>
                      <strong>3.入园须知：</strong>景区门票价格严格执行国家价格规定，为了您的合法权益，请从正规渠道购买景区门票，切勿相信景区门口黄牛及野导；<br>
                      <strong>4.园内服务：</strong> <br>
                      ①景区讲解：景区为游客提供每逢半点和整点定时免费讲解、收费讲解、自助导游机租赁服务。<br>
                      ②手机充电：景区游客中心配备充电电源插座，可提供手机充电服务。工作时间:7:30-16:00。<br>
                      ③行李寄存：游客中心提供行李寄存服务。工作时间:7:30-16:00。费用:免费。<br>
                      ④卫生间：景区内设有多个卫生间。<br>
                      ⑤便利店：景区有多个便利店。
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>&nbsp;活动提醒</td>
                <td>
                  <div style="margin-left: 10px">
                    <h4>最佳游玩时间</h4>
                    <p>四季皆宜<br/>景区淡旺季：旺季为4-5月、7-10月；淡季为1-3月、6月、11-12月；</p>
                  </div>
                  <div style="margin-left: 10px">
                    <h4>建议游玩时长</h4>
                    <p>1-2小时</p>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </el-card>
      <br/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ScenicDetails",
    data() {
      return {
        adPhotos: ['https://pic5.40017.cn/i/ori/1bgrmPCXheM.jpg', 'https://pic5.40017.cn/i/ori/1aT1oYnyhTa.jpg', 'https://pic5.40017.cn/i/ori/RK6oxCYWUE.jpg'],
        scenic: {
          // id: 1,
          // name: '苏州狮子林',
          // address: '江苏省苏州市姑苏区园林路23号',
          // level: 'AAAA景区',
          // descriptior: '狮子林的假山之多让他有假山王国之誉，它以叠石取胜，洞壑宛转，怪石林立，水池萦绕。依山傍水还有有指柏轩、真趣亭、问梅阁、石舫、卧云室这样的古典建筑，让游客一次看见真趣。',
          // video: '//player.bilibili.com/player.html?aid=251121863&bvid=BV1Lv41137uh&cid=425700638&page=1',
        },
        activeIndex: '1',
      }
    },
    methods: {
      getAnchor(e) {
        document.querySelector("#" + e).scrollIntoView(true);
      },
      toLogin() {
        this.$router.push('/Login')
      }
      ,
      collect() {
        if (this.user == null) {
          this.toLogin();
        } else {
          this.$axios.get('/scenic/collect?uid=' + this.user.id + '&sid=' + this.scenic.id + '&state=1')
            .then(resp => {
              if (resp.data == true) {
                this.$message.success("添加成功!")
              } else {
                this.$message.error("添加失败!")
              }
            })
        }
      }
    },
    created() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      this.scenic = JSON.parse(sessionStorage.getItem("scenic"));
      console.log(this.scenic)
    }
  }
</script>

<style scoped>
</style>
