<template>

      <div>
        <div class="first">
          <div class="head">
            <div class="first_one" @click="choose(1)">景点收藏</div>
            <div class="first_one" @click="choose(2)">店铺收藏</div>
          </div>
        </div>
        <div v-if="flag==1">
          <div class="head_two">
            <div>
              <el-table
                :data="page.list"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="景点名称"
                  width="90">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="详细地址"
                  width="150">
                </el-table-column>
                <el-table-column
                  label="景点等级"
                 prop="level">
                </el-table-column>

                <el-table-column
                  prop="description"
                  label="景点描述"
                  width="180">
                </el-table-column>

                <el-table-column
                  header-align="center"
                  align="center"
                  label="景点图片">
                  <template slot-scope="scope">
                    <img  width="60px" :src="'http://localhost:8080/'+scope.row.photo" v-image-preview>
                  </template>
                </el-table-column>

                <el-table-column
                  header-align="center"
                  align="center"
                  label="操作">
                  <template slot-scope="scope">
                  <el-button type="primary" @click="deljd(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>

              </el-table>

              <el-pagination
                @size-change="handleSizeChange"
                @current-change="fenyejd"
                :current-page="page.currentPage"
                :page-sizes="[1, 2, 3, 4]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
              </el-pagination>
            </div>
          </div>
        </div>

          <div v-if="flag==2">
            <div class="head_two">
              <div>
                <el-table
                  :data="page.list"
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="店铺名称"
                    width="90">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="详细地址"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    label="店铺等级">
                    <template slot-scope="scope">
                      <el-rate
                        disabled
                        v-model="scope.row.score"
                        show-text>
                      </el-rate>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="description"
                    label="店铺描述"
                    width="180">
                  </el-table-column>

                  <el-table-column
                    header-align="center"
                    align="center"
                    label="店铺图片">
                    <template slot-scope="scope">
                      <img  width="60px" :src="'http://localhost:8080/'+scope.row.photo">
                    </template>
                  </el-table-column>
                  <el-table-column
                    header-align="center"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                      <el-button type="primary" @click="deldp(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>




                </el-table>

                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="fenyems"
                  :current-page="page.currentPage"
                  :page-sizes="[1, 2, 3, 4]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="page.total">
                </el-pagination>
              </div>
            </div>
          </div>

    </div>
</template>

<script>
    export default {
        name: "collect",
      data(){
          return{
            //用来判断到底是那种 收藏
            flag:1,
            pageSize:2,
            page:{},
            value:"",
            user:{}
          }
      },
      methods:{
        deldp(id){
          this.$axios.post("collect/deldp?dpid="+id+"&id="+this.user.id).then(resp=>{
           this.$message("删除成功");
           location.reload()
          })
        },
        deljd(id){
          console.log(id);
          this.$axios.post("collect/deljd?jdid="+id+"&id="+this.user.id).then(resp=>{
            this.$message("删除成功");
            location.reload()
          })
        },
        handleSizeChange(pageSize) {
          this.pageSize = pageSize;
          if (this.flag==1){
            this.fenyejd(1)
          } else if(this.flag==2) {
            this.fenyems(1)
          }
        },
        choose(flag){
          this.flag=flag
          console.log(flag)
          if (flag==1){
           this.fenyejd(1);
          } else if (flag==2) {
         this.fenyems(1);
          }
        },
        fenyejd(current){
          this.$axios.post("collect/listjd?currPage="+current+"&pageSize="+this.pageSize+"&id="+this.user.id).then(resp=>{
            this.page=resp.data
          })
        },
        fenyems(current){
          this.$axios.post("collect/listms?currPage="+current+"&pageSize="+this.pageSize+"&id="+this.user.id).then(resp=>{
            this.page=resp.data
          })
        },
        toLogin() {
          this.$router.push('/Login')
        }
      }
      ,created() {
        //这里有一个口子我们到这里要获取 用户的id
        this.user = JSON.parse(sessionStorage.getItem('user'));
        if (this.user == null) {
          this.toLogin();
        }
          this.fenyejd(1);
      }
    }
</script>

<style scoped>
  .first{
    width: 100%;
  }
  .head{

  }
  .first_one:hover{
    transform: scale(1.2);
  }
  .first_one{
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
    margin-left: 10px;
  }
  .head_two {
    margin-top: 20px;
    width: 100%;
    float: left;
  }
</style>
