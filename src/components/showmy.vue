<template>
  <div>
    <div class="first">
      <div class="first_a">
        <div class="first_one">个人信息</div>
      </div>
    </div>
    <div class="two">
      <div class="two_tow">
        <el-form ref="form" :model="info" label-width="80px">
          <el-form-item label="昵称">
            <el-input disabled v-model="info.id"></el-input>
          </el-form-item>

          <el-form-item label="姓名">
            <el-input disabled v-model="info.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input disabled v-model="info.age"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input disabled v-model="info.phone"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input disabled v-model="info.address"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="button" type="primary" @click="update()">修改</el-button>
      </div>
      <div class="two_tx">
        <img :src="'http://localhost:8080/'+info.userphoto.path" v-image-preview>
        <div class="tx" @click="updatetx()">修改头像 ></div>
      </div>
    </div>
    <div>
      <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
        <el-form ref="forms" :model="info" :rules="rules">
          <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
            <el-input v-model="info.name" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="年龄" prop="age" :label-width="formLabelWidth">
            <el-input v-model.number="info.age" auto-complete="off"></el-input>
          </el-form-item>


          <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
            <el-input v-model.number="info.phone" auto-complete="off"></el-input>
          </el-form-item>


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
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="all(),dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save()">确 定</el-button>
        </div>
      </el-dialog>
    </div>


    <div>
      <el-dialog
        title="修改头像"
        :visible.sync="dialogVisible2"
        width="30%"
      >
        <el-form ref="tx" :model="form" label-width="80px">
          <el-form-item label="头像">
            <img :src="imgUrl" width="100px">
            <el-upload
              class="upload-demo"
              action=""
              :on-change="handlechange"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible2 = false">取 消</el-button>
      <el-button type="primary" @click=" saveUpload(),dialogVisible2 = false">确 定</el-button>
    </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import area from '../assets/area'  //这里引入城市信息
  export default {
    name: "showmy",
    data() {

      return {
        info: {},
        formLabelWidth: "100px",
        dialogFormVisible: false,
        dialogVisible2: false,
        fileList: [],
        form: {},
        imgUrl: "",
        //对话框用到的变量
        arr: area.arrAll,
        prov: '省份',
        city: '城市',
        district: '区域',

        cityArr: [],
        districtArr: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        addressList: [], //地址列表
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: "blur"},
            {min: 3, max: 50, message: '姓名长度在 3 到 50 个字符', trigger: 'blur'}
          ]
          ,
          age: [
            {required: true, message: '请输入年龄', trigger: "blur"},
            {type: 'number', min: 1, max: 150, message: '年龄在 1 到 150 之间的数字', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '手机号', trigger: "blur"},
          ]


        }


      }
    },
    methods: {
      //修改头像
      handlechange(file) {
        this.fileList[0] = file
        this.imgUrl = URL.createObjectURL(file.raw)
      },
      saveUpload() {
        var fd = new FormData()
        fd.append("id", this.info.id)
        fd.append("pid", this.info.pid)
        fd.append('photo', this.fileList[0].raw)
        this.$axios.post('muser/upload', fd)
          .then(resp => {
            this.$message.success("头像修改成功")
            location.reload()
          })
      },
      //修改个人信息
      save() {
        //判断地址是否填写完整
        this.$refs.forms.validate(valid => {
          if (valid) {
            this.dialogFormVisible = false;
            if (this.prov == '省份' || this.city == '城市' || this.district == '区域' || this.city == '请选择' || this.district == '请选择'
              || this.city == '' || this.district == '') {
              alert('地址填写不完整')
            } else {
              delete this.info.userphoto
              delete this.info.address
              var fd = new FormData();
              Object.keys(this.info).forEach(item => {
                fd.append(item, this.info[item])
              })

              var addr = this.prov + " " + this.city + " " + this.district;
              fd.append("address", addr);
              this.$axios.post('muser/updateinfo', fd)
                .then(resp => {
                  //重新获取地址列表
                  this.dialogFormVisible = false
                  location.reload()
                })
            }
          }
        })
      },

      updatetx() {
        this.dialogVisible2 = true
      }
      ,
      all() {
        //这里是一个口子 可以传送id  拿到所有信息
        this.$axios.post("muser/list?id=" + this.info.id).then(resp => {
          this.info = resp.data
        })
      }
      ,
      update() {
        this.dialogFormVisible = true
        console.log(this.info)
        var a = this.info.address.split(' ');
        this.prov = a[0]
        this.city = a[1]
        this.district = a[2]
      }
      ,

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
      toLogin() {
        this.$router.push('/Login')
      }
    }, created() {

      this.info = JSON.parse(sessionStorage.getItem('user'));
      console.log(this.info)
      if (this.info == null) {
        this.$message.error('登录状态有误！请重新登录！')
      }

      this.all()

    },
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
  .first {
    width: 100%;
  }

  .first_a {
    height: 46px;
    background: #fafafa;
    border-bottom: 1px solid #ddd;
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
  }

  .two {
    width: 100%;
    height: 698px;
  }

  .two_tow {
    float: left;
    display: inline-block;
    margin-top: 20px;
    height: 698px;
  }

  .a span {
    margin-left: 18px;
  }

  .button {
    margin-left: 230px;
    margin-top: 40px;
  }

  .two_tx {
    background-color: #F5F5F5;
    float: right;
    position: relative;
    left: -120px;
    top: 70px;
    height: 150px;
    width: 150px;
  }

  .two_tx img {
    height: 150px;
    width: 150px;
    border-radius: 115px;
  }

  .tx {
    position: relative;
    top: -25px;
    font-size: 12px;
    color: #6FBCFF;

  }
</style>
