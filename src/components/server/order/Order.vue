<template>
    <div>
      <el-card class="box-card">
          <div>
              <el-row :gutter="10">
               <el-col :span="3">
                   <el-input v-model="id" placeholder="输入订单号">
                     <el-button type="primary" slot="append"  icon="el-icon-search" @click="fenye(1)" plain></el-button>
                   </el-input>
               </el-col>
              </el-row>
          </div>
      </el-card>
      <el-table
        :data="orderPage.list"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="订单编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="date"
          label="订单日期"
          width="180">
        </el-table-column>


        <el-table-column
          prop="user.name"
          label="下单人姓名">
        </el-table-column>


        <el-table-column
          prop="user.phone"
          label="下单人手机号">
        </el-table-column>

        <el-table-column
          prop="menu.name"
          label="购买菜品">
        </el-table-column>

        <el-table-column
          prop="menu.price"
          label="菜品价格">
        </el-table-column>
        <el-table-column
          prop="menu.description"
          label="菜品介绍">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="fenye"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="orderPage.total">
      </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Order",
        data(){
          return{
            orderPage:{},
            id:"",
            pageSize:2,
          }
        },
      methods:{
          fenye(curPage){
            this.$axios.get("serverorder/list?curPage="+curPage+"&pageSize="+this.pageSize+"&id="+this.id).then(
              resp=>{
                this.orderPage=resp.data;
              }
            )
        },
        handleSizeChange(pageSize){
            this.pageSize=pageSize;
          this.fenye(1)
        }
      },created() {
          this.fenye(1);
      }


    }
</script>
idid
<style scoped>

</style>
