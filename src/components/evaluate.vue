<template>
  <div>
    <div class="first">
      <div class="head">
        <div class="first_one">我的评价</div>
      </div>
    </div>
    <div class="head_two">
      <template>

        <el-radio v-model="radio" @change="all()" label="1">好评</el-radio>
        <el-radio v-model="radio" @change="all()" label="2">中评</el-radio>
        <el-radio v-model="radio"  @change="all()" label="3">差评</el-radio>
      </template>
    </div>
       <div v-if="radio==1" class="three">

       <div class="three_one" v-for="item in ping">
         <div >
           <div>店铺名称：{{item.store.name}}</div>
           <div>店铺评价：{{item.content}}</div>
           <div>店铺评分 ：
             <el-rate
               v-model="item.score"
               disabled
               show-score
               text-color="#ff9900"
               score-template="{value}">
             </el-rate>
           </div>
         </div>

         <div v-if="item.commentphotos.length>0">
         评价图片: <br>
         <span class="tp"  v-for="val in item.commentphotos">
           <img style="height: 80px" :src="'http://localhost:8080/'+val.path" v-image-preview>
         </span>
         </div>
         <div  v-if="item.commentphotos.length==0">
           暂无图片
         </div>


         <el-button class="button" icon="el-icon-delete" @click="del(item.id)">删除</el-button>
       </div>
         <div v-if="!flag">
           <span class="iconfont">&#xe662;暂无数据</span>
         </div>
       </div>


    <div v-if="radio==2" class="three">
      <div class="three_one"  v-for="item in ping">
        <div>
          <div>店铺名称：{{item.store.name}}</div>
          <div>店铺评价：{{item.content}}</div>
          <div>店铺评分 ：
            <el-rate
              v-model="item.score"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </div>
        </div>
        <div v-if="item.commentphotos.length>0">
          评价图片: <br>
          <span class="tp"  v-for="val in item.commentphotos">
         <img style="height: 80px" :src="'http://localhost:8080/'+val.path" v-image-preview>
         </span>
        </div>
        <div v-if="item.commentphotos.length==0">
          暂无图片
        </div>

        <el-button class="button" icon="el-icon-delete" @click="del(item.id)">删除</el-button>
      </div>
      <div v-if="!flag">
        <span class="iconfont">&#xe662;暂无数据</span>
      </div>
    </div>

    <div v-if="radio==3" class="three">

      <div class="three_one"  v-for="item in ping">
          <div >
          <div>店铺名称：{{item.store.name}}</div>
          <div>店铺评价：{{item.content}}</div>
          <div>店铺评分 ：
            <el-rate
              v-model="item.score"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </div>
        </div>
        <div v-if="item.commentphotos.length>0">
          评价图片: <br>
          <span class="tp"  v-for="val in item.commentphotos">
              <img style="height: 80px" :src="'http://localhost:8080/'+val.path" v-image-preview>
         </span>
        </div>
        <div v-if="item.commentphotos.length==0">
          暂无图片
        </div>
      </div>
      <div v-if="!flag">
        <span class="iconfont">&#xe662;暂无数据</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "evaluate",
    data() {
      return {
        radio: "1",
        ping: [],
        flag:true,
        user:""
      }
    },
    methods: {
      del(id){
        this.$axios.post('evaluate/del?id='+this.user.id).then(resp=>{
          location.reload()
        })
      },
      all() {
        //这是一个口子用来传送用户的id
        this.$axios.post('evaluate/list?flag=' + this.radio + "&id=" + this.user.id).then(resp => {
          this.ping = resp.data;
          console.log(this.ping)
          if (this.ping.length==0){
            this.flag=false
          } else {
            this.flag=true
          }
        })
      },
      toLogin() {
        this.$router.push('/Login')
      }
    }, created() {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      if (this.user == null) {
        this.toLogin();
      }
      this.all();
    }
  }
</script>

<style scoped>
  .first {
    width: 100%;
  }

  .head {
  }
  .button{
    float: right;
    position: relative;
    top: -60px;
  }

  .first_one {
    border-top: 3px solid #22c233;
    color: #22c233;
    background: #fff;
    float: left;
    padding: 10px 25px;
    font-size: 16px;
    font-weight: 600;
    border-right: 1px solid #ddd;
    list-style: none;
    border-bottom: 1px solid #ddd;
  }

  .head_two {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    float: left;
    border: #DDD 1px solid;
    background: #FCFCFC;
    color: #404040;
    line-height: 50px;
  }

  .three {
    float: left;
    width: 100%;
    border: #DDD 1px solid;
    background: #FCFCFC;
    height: 670px;
    overflow: auto;
    text-align: left;
  }

.three_one{
  margin-top: 20px;
  width: 100%;
  background-color: #f9f9f9;
}
  .tp{
    margin-left: 30px;
  }
  .iconfont{
    position: relative;
     top: 230px;
    left: 380px;
    font-size: 50px;
  }
  .tps{
    width: 50px;
    height: 60px;
  }
 
</style>
