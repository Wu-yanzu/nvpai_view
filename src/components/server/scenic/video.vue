<template>
  <div>
    <el-card class="box-card">
      <div>
        <el-row :gutter="10">
          <el-col :span="3">
            <!--               <el-input v-model="name" placeholder="请输入景区名称">-->
            <!--                 <el-button type="primary" slot="append"  icon="el-icon-search" @click="fenye(1)" plain></el-button>-->
            <!--               </el-input>-->
          </el-col>

          <el-col :span="1">
            <el-button type="primary" @click="adddialogFormVisible=true" >添加</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-table
      :data="page.list"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="图片标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="图片链接">
      </el-table-column>

      <el-table-column
        prop="level"
        label="图片描述">
      </el-table-column>


<!--      <el-table-column-->
<!--        label="视频">-->
<!--        <template slot-scope="scope">-->

<!--          &lt;!&ndash;//player.bilibili.com/player.html?aid=601283631&bvid=BV1KB4y1h7Up&cid=784496576&page=1&ndash;&gt;-->
<!--          <iframe :src="scope.row.video" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>-->

<!--        </template>-->
<!--      </el-table-column>-->

      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-tooltip content="修改景区">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="update(scope.row)" circle plain></el-button>
          </el-tooltip>
          <el-tooltip content="删除景区">
            <el-button size="mini" type="primary" icon="el-icon-delete" @click="del(scope.row.id)" circle plain></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="fenye"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>


    <!--添加景区*********************************************************************************************************-->
    <!--添加景区*********************************************************************************************************-->
    <el-dialog title="添加景区" :visible.sync="adddialogFormVisible" v-if="adddialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="景区名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="景区级别">
          <el-input v-model="form.level"></el-input>
        </el-form-item>

        <el-upload
          class="upload-demo"
          action=""
          :on-change="handleChange"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture-card"
          :auto-upload="false"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <el-form-item label="景区介绍">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="选择城市">
          <el-select v-model="prov" style="width:167px;margin-right: 25px;">
            <el-option v-for="option in arr" :value="option.name" class="el-address-text">
              {{ option.name }}
            </el-option>
          </el-select>

          <el-select v-model="city" style="width:167px;margin-right: 25px;">
            <el-option v-for="option in cityArr" :value="option.name" class="el-address-text">
              {{ option.name }}
            </el-option>
          </el-select>

          <el-select v-model="district" v-if="district" style="width:167px;">
            <el-option v-for="option in districtArr" :value="option.name" class="el-address-text">
              {{ option.name }}
            </el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="address" placeholder="请输入详细地址" class="el-address-input"></el-input>
          </el-form-item>
        <el-form-item label="视频地址">
          <el-input v-model="form.video" placeholder="请输入视频地址" class="el-address-input"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="elseAdd">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </div>
    </el-dialog>

    <!--添加景区结束*********************************************************************************************************-->
    <!--添加景区结束*********************************************************************************************************-->

    <!--修改景区*********************************************************************************************************-->
    <!--修改景区*********************************************************************************************************-->
    <el-dialog title="修改景区" :visible.sync="updatedialogFormVisible" v-if="updatedialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="景区名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="景区级别">
          <el-input v-model="form.level"></el-input>
        </el-form-item>

        <el-upload
          class="upload-demo"
          action=""
          :on-change="handleChange"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture-card"
          :auto-upload="false"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <el-form-item label="景区介绍">
          <el-input v-model="form.description"></el-input>
        </el-form-item>

        <el-form-item label="视频地址">
          <el-input v-model="form.video" placeholder="请输入视频地址" class="el-address-input"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="elseUpdate">取 消</el-button>
        <el-button type="primary" @click="saveUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改景区结束*********************************************************************************************************-->
    <!--修改景区结束*********************************************************************************************************-->




  </div>


</template>

<script>
  import area from '../../../assets/area'  //这里引入城市信息
    export default {
        name: "Scenic",
      data(){
          return{
            //对话框用到的变量
            arr: area.arrAll,
            prov: '省份',
            city: '城市',
            district: '区域',
            cityArr: [],
            districtArr: [],
            addressList: [], //地址列表
            address: '',      //详细地址
            page:{},
            pageSize:2,
            name:"",
            adddialogFormVisible:false,
            updatedialogFormVisible:false,
            form:{},
            fileList:[]
          }

      },
      methods:{
        //地址对话框方法
        updateCity: function () {
          for (var i in this.arr) {
            var obj = this.arr[i];
            if (obj.name) {
              if (obj.name == this.prov) {
                this.cityArr = obj.sub;
                break;
              }
            }
          }
          this.city = this.cityArr[1].name;
        }
        ,
        updateDistrict: function () {
          for (var i in this.cityArr) {
            var obj = this.cityArr[i];
            if (obj.name == this.city) {
              this.districtArr = obj.sub;
              break;
            }
          }
          if (this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
            this.district = this.districtArr[1].name;
          } else {
            this.district = '';
          }
        }
        ,
        //地址对话框方法  结束

          fenye(curPage){
            this.$axios.get("serverscenic/list?curPage="+curPage+"&pageSize="+this.pageSize+"&name="+this.name).then(
              resp=>{
                this.page=resp.data;
                console.log(resp.data);
              }
            )
          },
        handleSizeChange(pageSize){
            this.pageSize=pageSize;
            this.fenye(1)
        },
        handleChange(file){
          this.fileList=[];
          this.fileList[0]=file;
        },
        handleRemove(file,fileList){
          this.fileList=fileList;
        },
        elseUpdate(){
             this.updatedialogFormVisible=false;
             this.getinit();
        },
        saveUpdate(){

            var fh=new FormData();
          console.log(this.form);
          console.log(this.fileList);
          Object.keys(this.form).forEach(
              key=>{
                fh.append(key,this.form[key])
              }
            )
          if(!this.fileList.raw && this.fileList[0].url.indexOf("blob:")==-1){
            fh.append("paths",this.fileList[0].url.substring(this.fileList[0].url.lastIndexOf("/")+1));
          } else{
            fh.append("multipartFile",this.fileList[0].raw);
          }
          this.$axios.post("serverscenic/update",fh).then(
            resp=>{
              if(resp.data){
                this.$message.success("修改成功");
                this.updatedialogFormVisible=false;
                this.fenye(1)
                this.getinit();
              }else{
                this.$message.success("修改失败");
              }
            }
          )
        },
      update(item){
        console.log(item);
        this.form=item;
        this.fileList.push({"url":'http://localhost:8080/'+this.form.photo})
        this.updatedialogFormVisible=true;
      },
      //添加景区
      elseAdd(){
        this.adddialogFormVisible = false
        this.getinit()
      }
      ,
      saveAdd(){
        //判断地址是否填写完整
        if (this.prov == '省份' || this.city == '城市' || this.district == '区域' || this.city == '请选择' || this.district == '请选择'
          || this.city == '' || this.district == '' || this.address == '' || this.addrName == '' || this.addrPhone == '') {
          this.$message.error('地址填写不完整')
        } else {
          var addr = this.prov + this.city + this.district + this.address;
          this.adddialogFormVisible = false
          var fh=new FormData();

          Object.keys(this.form).forEach(key=>{
            fh.append(key,this.form[key])
          })

          fh.append("address",addr)//地址
          fh.append('multipartFile',this.fileList[0].raw)//图片

          this.$axios.post("serverscenic/add",fh).then(
            resp=>{
              if(resp.data){
                this.$message.success("添加成功")
                this.getinit();
                this.fenye(1);

              } else{
                this.$message.error("添加失败")
              }
            }
          )}
      },
        del(id){
            this.$axios.get("serverscenic/del?id="+id).then(
              resp=>{
                if(resp.data){
                  this.$message.success("删除成功");
                  this.fenye(1);
                }else {
                  this.$message.error("删除失败")
                }
              }
            )
        },
        getinit(){
          this.form={};
          this.prov="省份";
          this.city="城市";
          this.district="区域";
          this.address="";
          this.fileList=[]
        }
      },created() {
          this.fenye(1);
      } ,
      beforeMount() {
        this.updateCity();
        this.updateDistrict();
      }
      ,
      watch: {
        prov: function () {
          this.updateCity();
          this.updateDistrict();
        }
        ,
        city: function () {
          this.updateDistrict();
        }
      }

    }
</script>

<style scoped>

</style>
