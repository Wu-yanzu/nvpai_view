<template>
    <div>
      <el-card class="box-card">
        <div>
             <el-row :gutter="10">
              <el-col :span="3">
                  <el-input v-model="name" placeholder="请输入美食名称">
                       <el-button slot="append" icon="el-icon-search" @click="fenye(1)" type="primary"></el-button>
                  </el-input>
              </el-col>
               <el-col :span="1">
                 <el-button type="primary" plain @click="tjAdd">添加</el-button>
               </el-col>
             </el-row>
        </div>
      </el-card>
        <el-table
          :data="foodPage.list"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="序号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="美食名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述名称">
          </el-table-column>
          <el-table-column
            label="美食图片">
            <template slot-scope="scope">
                 <img v-for="item in scope.row.photos" :src="'http://localhost:8080/'+item.path"  width="60px"/>
            </template>
          </el-table-column>

          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-tooltip content="修改美食">
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="update(scope.row)" circle plain></el-button>
              </el-tooltip>
              <el-tooltip content="删除美食">
                <el-button size="mini" type="primary" icon="el-icon-delete" @click="del(scope.row.id)" circle plain></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="fenye"
        :page-sizes="[1,2,3,4]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="foodPage.total">
      </el-pagination>
      <!--添加美食*********************************************************************************************************-->
      <!--删除美食*********************************************************************************************************-->
      <el-dialog title="添加美食" :visible.sync="adddialogFormVisible" v-if="adddialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="美食名称">
      <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="描述信息">
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


      <!--修改美食*********************************************************************************************************-->
      <!--修改美食*********************************************************************************************************-->
      <el-dialog title="修改美食" :visible.sync="updatedialogFormVisible"  v-if="updatedialogFormVisible">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="美食名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="描述信息">
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
      <!--修改美食结束*********************************************************************************************************-->
      <!--修改美食结束*********************************************************************************************************-->

    </div>
</template>

<script>
    export default {
        name: "food",
      data(){
          return{
             foodPage:{},
             pageSize:2,
             name:"",
            form:{},
            adddialogFormVisible:false,
            fileList:[],
            updatedialogFormVisible:false
        }
      },
      methods:{
        handleRemove(file,fileList){
          this.fileList=[]
          this.fileList=fileList
        },
        handleChange(file){
          this.fileList.push(file);
        }
        ,
          fenye(curPage){
            this.$axios.post("serverfood/list?curPage="+curPage+"&pageSize="+this.pageSize+"&name="+this.name).then(
              resp=>{
                this.foodPage=resp.data;
              }
            )
          },
        handleSizeChange(pageSize){
            this.pageSize=pageSize;
        },del(id){
            this.$axios.get("serverfood/del?id="+id).then(
              resp=>{
                if(resp.data){
                  this.$message.success("删除成功");
                  this.fenye(this.foodPage.pageNum)
                }else{
                  this.$message.error("删除失败");
                }
              }
            )
        },
        elseAdd(){
         this.getinit();
         this.adddialogFormVisible=false
        },
        tjAdd(){
          this.fileList=[]
         this. adddialogFormVisible=true
          this.form={}
        },
        saveAdd(){

          var fh=new FormData();
          Object.keys(this.form).forEach(key=>{
            fh.append(key,this.form[key]);
          });

          this.fileList.forEach(item=>{
              fh.append("photo",item.raw);
          })
          this.$axios.post("serverfood/add",fh).then(
            resp=>{
              if(resp.data){
                this.$message.success("添加成功")
                this.fenye(this.foodPage.pageNum)
                this.getinit();
                this.adddialogFormVisible=false;

              } else{
                this.$message.error("添加失败")
              }
            }
          )
        },
        update(row){
          this.fileList=[];
          this.form=row;
           this.form.photos.forEach(item=>{
               this.fileList.push({"url":"http://localhost:8080/"+item.path})
             }
           );
          this.updatedialogFormVisible=true;
        },
        elseupdate(){
          this.updatedialogFormVisible = false
          this.getinit();
        },
      saveupdate(){
          var fh=new FormData();
        console.log(this.form);
        delete  this.form.photoList
        Object.keys(this.form).forEach(
            key=>{
              if(key!="photos"){
              fh.append(key,this.form[key]);
              }
            }
          )
        var arr=[];
        this.fileList.forEach(
          item=>{
            if(!item.raw && item.url.indexOf("blob:") == -1){  //1.旧的
              arr.push(item.url.substring(item.url.lastIndexOf("/")+1));
            }else{
              fh.append("multipartFiles",item.raw);
            }
          }
        )

        var paths=arr.join(",");
        fh.append("paths",paths);
        console.log(paths);
        this.$axios.post("serverfood/update",fh).then(
          resp=>{
            if(resp.data){
              this.$message.success("修改成功");
              this.updatedialogFormVisible = false;
              this.fenye(this.foodPage.pageNum)
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
        this.fenye(1)
      }

    }
</script>

<style scoped>

</style>
