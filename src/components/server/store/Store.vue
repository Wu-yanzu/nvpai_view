<template>
    <!--差修改店铺-->
     <!--差菜单增删改查-->
    <div>
      <el-card class="box-card">
          <div>
              <el-row :gutter="5">
               <el-col :span="3">
                 <el-input v-model="name" placeholder="请输入店铺名称">
                   <el-button type="primary" slot="append"  icon="el-icon-search" @click="fenye(1)" plain></el-button>
                 </el-input>
               </el-col>
                <el-col :span="1">
                    <el-button type="primary" plain @click="adddialogFormVisible=true">添加</el-button>
                </el-col>
              </el-row>
            </div>
      </el-card>
            <el-table
              :data="page.list"
              stripe
              style="width: 100%;">
              <el-table-column
                prop="id"
                label="店铺序号"
                width="100">
              </el-table-column>

              <el-table-column
                prop="name"
                label="店铺名称"
                width="180">
              </el-table-column>

              <el-table-column
                prop="address"
                label="门店地址"
                width="180">
              </el-table-column>

              <el-table-column
                label="门店图">
                  <template slot-scope="scope">
                <img :src="'http://localhost:8080/'+scope.row.photo" width="60px" />
                  </template>
              </el-table-column>

              <el-table-column
                prop="pname"
                label="店长姓名">
              </el-table-column>

              <el-table-column
                prop="phone"
                label="联系电话">
              </el-table-column>


              <el-table-column
                width="400px"
                prop="description"
                label="店铺介绍">
              </el-table-column>

              <el-table-column
                prop="score"
                label="评分">
              </el-table-column>

              <el-table-column
                label="操作">
                 <template slot-scope="scope">
                   <el-tooltip content="店铺评论">
                     <el-button type="primary" size="mini" icon="el-icon-s-comment" @click="discu(scope.row.id)" circle plain></el-button>
                   </el-tooltip>
                   <el-tooltip content="修改店铺">
                   <el-button size="mini" type="primary" icon="el-icon-edit" @click="update(scope.row)" circle plain></el-button>
                   </el-tooltip>
                     <el-tooltip content="删除店铺">
                   <el-button size="mini" type="primary" icon="el-icon-delete" @click="del(scope.row.id)" circle plain></el-button>
                     </el-tooltip>
                 </template>
              </el-table-column>
            </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="fenye"
        :current-page="page.pageNum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>


      <!--店铺评论*********************************************************************************************************-->
      <!--店铺评论*********************************************************************************************************-->
      <el-dialog
        title="店铺评论"
        :visible.sync="discussdialogVisible" v-if="discussdialogVisible"
        width="25%"
        >
          <div>
            <table  style="width:80%;border: 1px silver solid; margin:10px auto;" cellpadding="5" cellspacing="0" v-for="item in discusspage.list">
                <tr>
                  <td width="100px">用户:<i>{{item.user.name}}</i></td>
                  <td>评论手机号:<i>{{item.user.phone}}</i></td>
                  <td>评分:<span style="color: coral">{{item.score}}☆</span></td>
                </tr>
                 <tr>
                   <td><span style="font-size: 6px">评论内容：<br><b>{{item.content}}</b></span></td>
                    <td colspan="2">
                      <img v-for="imgitem in item.commentphotos" :src="'http://localhost:8080/'+imgitem.path" width="60px"/>

                   </td>
                 </tr>
            </table>
            <el-pagination
              @size-change="discusshandleSizeChange"
              @current-change="discussfenye"
              :current-page="discusspage.pageNum"
              :page-sizes="[1, 2, 3]"
              :page-size="discusspageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="discusspage.total">
            </el-pagination>

          </div>
          <span slot="footer" class="dialog-footer">
             <el-button circle type="primary" size="mini" icon="el-icon-close" @click="discussdialogVisible = false"></el-button>
             <el-button  circle  type="primary" size="mini" icon="el-icon-check" @click="discussdialogVisible = false"></el-button>
           </span>
      </el-dialog>
      <!--店铺评论结束*********************************************************************************************************-->
      <!--店铺评论结束*********************************************************************************************************-->

      <!--添加店铺*********************************************************************************************************-->
      <!--添加店铺*********************************************************************************************************-->
      <el-dialog title="添加店铺" :visible.sync="adddialogFormVisible" v-if="adddialogFormVisible">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="店铺名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-upload
            class="upload-demo"
            action=""
            :on-change="handleChange"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture-card"
            multiple
            :limit="3"
            :auto-upload="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>

          <el-form-item label="店长姓名">
            <el-input v-model="form.pname"></el-input>
          </el-form-item>


          <el-form-item label="联系电话">
            <el-input v-model="form.phone"></el-input>
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


          <el-form-item label="店铺介绍">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button  @click="elseAdd">取 消</el-button>
          <el-button type="primary" @click="saveAdd">确 定</el-button>
        </div>
      </el-dialog>

      <!--添加店铺结束*********************************************************************************************************-->
      <!--添加店铺结束*********************************************************************************************************-->



      <!--修改店铺*********************************************************************************************************-->
      <!--修改店铺*********************************************************************************************************-->
      <el-dialog title="修改店铺" :visible.sync="updatedialogFormVisible" v-if="updatedialogFormVisible">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="店铺名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-upload
            class="upload-demo"
            action=""
            :on-change="handleChange"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture-card"
            multiple
            :limit="3"
            :auto-upload="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>

          <el-form-item label="店长姓名">
            <el-input v-model="form.pname"></el-input>
          </el-form-item>


          <el-form-item label="联系电话">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>

          <el-form-item label="店铺介绍">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button  @click="elseupdate">取 消</el-button>
          <el-button type="primary" @click="saveupdate">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改店铺结束*********************************************************************************************************-->
      <!--修改店铺结束*********************************************************************************************************-->

    </div>
</template>

<script>
  import area from '../../../assets/area'  //这里引入城市信息
    export default {
        name: "Store",
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
            optionsList:[],
            fileList:[],
            form:{},
           imgUrl:"",
            //店铺评论
           discussdialogVisible:false,
           discusspage:{},
            discusspageSize:1,
            discuid:"", //判断店铺评论  店铺的id
            updaterow:{},
            updatedialogFormVisible:false,

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

        //显示店铺列表
          fenye(curPage){
              this.$axios.get('serverstore/list?curPage='+curPage+"&pageSize="+this.pageSize+"&name="+this.name).then(
                resp=>{
                  this.page=resp.data;
                }
              )
          },
        handleSizeChange(pageSize){
            this.pageSize=pageSize;
            this.fenye(1)
        },
        handleChange(file){
            this.fileList.push(file);
        },
        handleRemove(file,fileList){
            this.fileList=[];
            this.fileList=fileList
        },

        discussfenye(curPage){
          //店铺评论
          this.$axios.get("serverdiscuss/discusslist?id="+this.discuid+'&curPage='+curPage+"&pageSize="+this.discusspageSize).then(
            resp=>{
              if(resp.data.list.length==0){
                this.$message.error("该店铺没有评论")
              }else{
                this.discusspage=resp.data;
                this.discussdialogVisible=true;
              }
            }
          )
        },
        //店铺分页
        discusshandleSizeChange(pageSize){
          this.discusspageSize=pageSize;
          this.discussfenye(1);
        }
        //店铺分页结束
        ,discu(id){
          this.discuid=id;
          this.discussfenye(1)
        }
        ,
        //删除店铺
        del(id){
          this.$axios.get("serverstore/del?id="+id).then(
            resp=>{
              if(resp.data){
                this.$message.success("删除成功")
                this.fenye(1);
              } else{
                this.$message.error("删除失败")
              }
            }
          )
        },
        //修改店铺
        elseupdate(){
          this.updatedialogFormVisible = false
          this.getinit()
        },
        //修改店铺
        update(item){
          this.fileList=[];
          this.form=item;
          console.log(this.form);
          console.log(this.form.id);
          //得到门店的其他图片
          this.$axios.post("serverstore/imgList?id="+this.form.id).then(
            resp=>{
              resp.data.forEach(item=>{
                this.fileList.push({"url":"http://localhost:8080/"+item.path});
              })

            }
          )
          this.updatedialogFormVisible=true
        },
        saveupdate(){
          var fh=new FormData();
          Object.keys(this.form).forEach(key=>{
               fh.append(key,this.form[key]);
          })

          var arr=[]
          this.fileList.forEach(item=> {
            if (!item.raw && item.url.indexOf("blob:") == -1) {
              arr.push(item.url.substring(item.url.lastIndexOf("/") + 1));
            } else {
              fh.append("photos", item.raw);
            }
        })
            var s = arr.join(",");
            fh.append("paths", s)
          console.log(s);
          console.log(this.form);
          //提交请求
            this.$axios.post("serverstore/update",fh).then(
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

        }
        ,
        //添加店铺
        elseAdd(){
          this.adddialogFormVisible = false
          this.getinit()
        },
         saveAdd(){
            //判断地址是否填写完整
            if (this.prov == '省份' || this.city == '城市' || this.district == '区域' || this.city == '请选择' || this.district == '请选择'
              || this.city == '' || this.district == '' || this.address == '' || this.addrName == '' || this.addrPhone == '') {
              this.$message.error('地址填写不完整')
            } else {
                  var addr = this.prov + this.city + this.district + this.address;
                  this.adddialogFormVisible = false
                  var fh=new FormData();
                  console.log(this.form);
                  Object.keys(this.form).forEach(key=>{
                    fh.append(key,this.form[key])
                  })

                  fh.append("address",addr)//地址
                  fh.append('multipartFile',this.fileList[0].raw)//图片
                   this.fileList.forEach(item=>{
                     fh.append("photos",item.raw)
                   })
                  this.$axios.post("serverstore/add",fh).then(
                    resp=>{
                      if(resp.data){
                        this.$message.success("添加成功")
                        this.fenye(1);
                        this.getinit();

                      } else{
                        this.$message.error("添加失败")
                      }
                    }
               )
            }
         },
        getinit(){
          this.form={};
          this.prov="省份";
          this.city="城市";
          this.district="区域";
          this.address="";
          this.fileList=[]
        }
      },
      created() {
          this.fenye(1);

      }    ,
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
