<template>
    <div>
      <el-card class="box-card">
        <div>
          <el-row :gutter="5" style="margin-left: 200px;">
            <el-col :span="4">
<!--              <el-input v-model="name" placeholder="请输入店铺名称">-->
<!--                <el-button type="primary" slot="append"  icon="el-icon-search" @click="fenye(1)" plain></el-button>-->
<!--              </el-input>-->
            </el-col>
          </el-row>
        </div>
        <br>
      <table width="75%" border="1" cellspacing="0" cellpadding="5" style="margin: 10px auto" align="center" v-for="list in storePage.list">
        <tr>
          <td>店铺名称：{{list.name}}</td>
          <td>店长姓名：{{list.pname}}</td>
          <td>  <span>门店图：</span></td>

          <td rowspan="2">
           <img :src="'http://localhost:8080/'+list.photo"  width="80px"/>
          </td>
        </tr>
        <tr>
          <td>联系电话：{{list.phone}}</td>
          <td>联系电话：{{list.address}}</td>
          <el-tooltip content="添加菜品">
            <td> <el-button  size="mini" type="info" circle icon="el-icon-plus" plain @click="tJia(list.id)"></el-button></td>
          </el-tooltip>

        </tr>
        <tr>
          <td colspan="4">
          <el-table
            :data="list.menu"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="菜品名称"
              >
            </el-table-column>
            <el-table-column
              prop="price"
              label="菜品价格">
            </el-table-column>

            <el-table-column
              prop="description"
              width="300px"
              label="菜品描述">
            </el-table-column>

            <el-table-column
              label="菜品图片">
              <template slot-scope="scope">
                <img v-for="item in scope.row.photoList" :src="'http://localhost:8080/'+item.path" width="60px" style="margin: auto 5px;"/>
              </template>
            </el-table-column>

            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-tooltip content="修改菜品">
                  <el-button size="mini" type="primary" icon="el-icon-edit" @click="update(scope.row)" circle plain></el-button>
                </el-tooltip>
                <el-tooltip content="删除菜品">
                  <el-button size="mini" type="primary" icon="el-icon-delete" @click="del(scope.row.id)" circle plain></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          </td>
        </tr>
      </table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="fenye"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="storePage.total">
        </el-pagination>

        <!--添加*********************************************************************************************************-->
        <!--删除美食*********************************************************************************************************-->
        <el-dialog title="添加菜品" :visible.sync="adddialogFormVisible"  v-if="adddialogFormVisible">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="菜品名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="菜品价格">
              <el-input v-model="form.price"></el-input>
            </el-form-item>

            <el-form-item label="菜品描述">
              <el-input v-model="form.description"></el-input>
            </el-form-item>


            <el-upload
              class="upload-demo"
              action=""
              :on-remove="handleRemove"
              :on-change="handleChange"
              multiple
              list-type="picture-card"
              :limit="3"
              :file-list="fileList"
              :auto-upload="false"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="elseAdd">取 消</el-button>
            <el-button type="primary" @click="saveAdd">确 定</el-button>
          </div>
        </el-dialog>
        <!--添加美食结束*********************************************************************************************************-->
        <!--添加美食结束*********************************************************************************************************-->


        <!--添加*********************************************************************************************************-->
        <!--删除美食*********************************************************************************************************-->
        <el-dialog title="修改菜品" :visible.sync="updatedialogFormVisible"  v-if="updatedialogFormVisible">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="菜品名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="菜品价格">
              <el-input v-model="form.price"></el-input>
            </el-form-item>

            <el-form-item label="菜品描述">
              <el-input v-model="form.description"></el-input>
            </el-form-item>


            <el-upload
              class="upload-demo"
              action=""
              :on-remove="handleRemove"
              :on-change="handleChange"
              multiple
              list-type="picture-card"
              :limit="3"
              :file-list="fileList"
              :auto-upload="false"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="elseupdate">取 消</el-button>
            <el-button type="primary" @click="saveupdate">确 定</el-button>
          </div>
        </el-dialog>
        <!--添加美食结束*********************************************************************************************************-->
        <!--添加美食结束*********************************************************************************************************-->


      </el-card>
    </div>

</template>

<script>
    export default {
        name: "Menu",
      data(){
          return{
            storePage:{},
            name:"",
            pageSize:1,
            adddialogFormVisible:false,
            fileList:[],
            form:{},
            id:"",
            updatedialogFormVisible:false
          }
      },
      methods:{
          tJia(id){
            this.id=id;
            this.adddialogFormVisible=true
          },
        handleRemove(file,fileList){
          this.fileList=[]
          this.fileList=fileList
        },
        handleChange(file){
          this.fileList.push(file);
        },
        handleSizeChange(pageSize){
            this.pageSize=pageSize;
            this.fenye(1);
        }
        ,
          fenye(curPage){
            this.$axios.get("servermenu/list?name="+this.name+"&curPage="+curPage+"&pageSize="+this.pageSize).then(resp=>{
              console.log(resp.data);
              this.storePage=resp.data;

            })
          },
        elseAdd(){
          this.getinit();
          this.adddialogFormVisible=false
        }, saveAdd(){
          var fh=new FormData();
          console.log(this.form);
          Object.keys(this.form).forEach(key=>{
            fh.append(key,this.form[key]);
          });

          this.fileList.forEach(item=>{
            fh.append("photo",item.raw);
          })
          fh.append("id",this.id);
          this.$axios.post("servermenu/add",fh).then(
            resp=>{
              if(resp.data){
                this.$message.success("添加成功")
                this.fenye(1);
                this.getinit();
                this.adddialogFormVisible=false;

              } else{
                this.$message.error("添加失败")
              }
            }
          )
        },
        del(id){
          this.$axios.get("servermenu/del?id="+id).then(
            resp=>{
              if(resp.data){
                this.$message.success("删除成功");
                this.fenye(1)
              }else{
                this.$message.error("删除失败");
              }
            }
          )
        },
        update(row){
            this.form=row;
            this.updatedialogFormVisible=true;
          console.log(this.form);
          this.form.photoList.forEach(item=>{
            this.fileList.push({"url":"http://localhost:8080/"+item.path})
          })

        },
         elseupdate(){
            this.getinit();
            this.updatedialogFormVisible=false;
         },
        saveupdate(){
            var fh=new FormData();
            Object.keys(this.form).forEach(
              key=>{
                if(key!="photoList"){
                fh.append(key,this.form[key]);
                }
              }
            )
          var arr=[]
           this.fileList.forEach(item=>{
               if(!item.raw && item.url.indexOf("blob:")==-1){
                 arr.push(item.url.substring(item.url.lastIndexOf("/")+1));
               }else{
                 fh.append('photos',item.raw);
               }
           })
          var s=arr.join(",")
          fh.append("paths",s);
            this.$axios.post("servermenu/update",fh).then(
              resp=>{
                if(resp.data){
                  this.$message.success("修改成功");
                  this.updatedialogFormVisible = false;
                  this.fenye(this.storePage.pageNum)
                  this.getinit();
                }else{
                  this.$message.success("修改失败");
                }
              }
            )





        },

        getinit(){
          this.form={}
          this.fileList=[]
        }
      },created() {
          this.fenye(1);
      }

    }
</script>

<style scoped>

</style>
