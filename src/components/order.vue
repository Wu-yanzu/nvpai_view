<template>
    <div>
      <div class="first">
        <div class="head">
          <el-card class="box-card">

            <el-row :gutter="10">
             <el-col :span="6"> <div class="first_one">全部订单</div></el-col>

              <el-col :span="6">
               <el-input class="a" v-model="name" placeholder="请输入单号">
            <el-button slot="append" icon="el-icon-search" @click="all()"></el-button>
               </el-input>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </div>
      <div class="head_two">
        <el-table
          :data="order"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="订单编号"
            width="180">
          </el-table-column>

          <el-table-column
            prop="menu.name"
            label="菜品名字">
          </el-table-column>

          <el-table-column
            prop="menu.description"
            label="菜品描述">
          </el-table-column>


          <el-table-column
            prop="date"
            label="下单日期"
            width="180">
          </el-table-column>

          <el-table-column
            prop="price"
            label="价格">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            label="专属二维码">
            <template slot-scope="scope">
             <el-button type="primary" @click="look(scope.row.id)">二维码</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div>
        <el-dialog  title="专属二维码"
                    width="20%"
                    :visible.sync="dialogFormVisible">
          <img  :src="'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+id">
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>

    </div>
</template>

<script>
    export default {
        name: "order",
      data(){
          return{
            id:"",
            order:[],
            name:"",
        dialogFormVisible:false,
           user:{}
          }
      },
      methods:{
          look(id){
            console.log(id);
            this.id=id;
            this.dialogFormVisible=true;
          },
     all(){
   this.$axios.post("order/list?name="+this.name+"&id="+this.user.id).then(resp=>{
     this.order=resp.data;
   })
     },
        toLogin() {
          this.$router.push('/Login')
        }
      },created() {
        //这里有一个口子我们到这里要获取 用户的id
        this.user = JSON.parse(sessionStorage.getItem('user'));
        if (this.user == null) {
          this.$message.error('登录状态有误！请重新登录！')
        }
        this.all()
      }
    }
</script>

<style scoped>
  .first{
    width: 100%;
  }
  .head{
  }
  .first_one{
    border-top: 3px solid #22c233;
    color: #22c233;
    background: #fff;
    float: left;
    padding: 10px 25px;
    font-size: 16px;
    font-weight: 600;
    list-style: none;
  }
  .head_two {
    margin-top: 20px;
    width: 100%;
   float: left;
  }

</style>
