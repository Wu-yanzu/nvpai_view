<template>

  <div>
    <el-card class="box-card">
      <div>
        <el-row :gutter="5">
          <el-col :span="3">
            <el-input v-model="keyword" placeholder="请输入关键字">
              <el-button type="primary" slot="append" icon="el-icon-search" @click="fenye(1)" plain></el-button>
            </el-input>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" plain @click="adddialogFormVisible=true">添加</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-table
      :data="data.records"
      stripe
      style="width: 100%;">
      <el-table-column
        prop="id"
        label="新闻序号"
        width="100">
      </el-table-column>

      <el-table-column
        prop="newsTypeId"
        label="新闻分类"
        width="180">
      </el-table-column>

      <el-table-column
        prop="title"
        label="新闻标题"
        width="180">
      </el-table-column>

      <el-table-column
        label="新闻图片">
        <template slot-scope="scope">
          <img :src="'http://localhost:8080/'+scope.row.image" width="60px"/>
        </template>
      </el-table-column>

      <el-table-column
        prop="IsPubTime"
        label="是否发布">
      </el-table-column>

      <el-table-column
        prop="fabuTime"
        label="发布时间">
      </el-table-column>

      <el-table-column
        prop="readCount"
        label="阅读数量">
      </el-table-column>

      <el-table-column
        width="100px"
        prop="zanCount"
        label="点赞数量">
      </el-table-column>

      <el-table-column
        prop="author"
        label="作者">
      </el-table-column>

      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-tooltip content="修改新闻">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="update(scope.row)" circle
                       plain></el-button>
          </el-tooltip>
          <el-tooltip content="删除新闻">
            <el-button size="mini" type="primary" icon="el-icon-delete" @click="del(scope.row.id)" circle
                       plain></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="fenye"
      :current-page="data.current"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="data.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.total">
    </el-pagination>

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


        <el-form-item label="店铺介绍">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!--        <el-button @click="elseAdd">取 消</el-button>-->
        <!--        <el-button type="primary" @click="saveAdd">确 定</el-button>-->
      </div>
    </el-dialog>

    <!--添加店铺结束*********************************************************************************************************-->


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
        <!--        <el-button @click="elseupdate">取 消</el-button>-->
        <el-button>取 消</el-button>
        <!--        <el-button type="primary" @click="saveupdate">确 定</el-button>-->
      </div>
    </el-dialog>

    <!--修改店铺结束*********************************************************************************************************-->

  </div>
</template>

<script>
export default {
  name: "Store",
  data() {
    return {
      //搜索关键词
      keyword: '',
      data: {
        records: '',
        total: '',
        size: 2,
        current: 1
      },
      pageSize: 2,
      name: "",
      adddialogFormVisible: false,
      updatedialogFormVisible: false,
      fileList: [],
      form: {},
      imgUrl: "",

    }
  },
  methods: {

    //显示新闻列表
    fenye(curPage) {
      this.$axios({
        method: 'get',
        url: '/news/list?curPage=' + curPage + '&pageSize=' + this.data.size + '&keyword=' + this.keyword,
      }).then(
        resp => {
          console.log(resp.data)
          this.data = resp.data.data;
          // this.page = resp.data;
        }
      )
    }
    ,
    handleSizeChange(pageSize) {
      this.data.size = pageSize;
      this.fenye(1)
    },
    handleChange(file) {
      this.fileList.push(file);
    },
    handleRemove(file, fileList) {
      this.fileList = [];
      this.fileList = fileList
    }
    ,
    //删除新闻
    del(id) {
      this.$axios.get("serverstore/del?id=" + id).then(
        resp => {
          if (resp.data) {
            this.$message.success("删除成功")
            this.fenye(1);
          } else {
            this.$message.error("删除失败")
          }
        }
      )
    },
    // //修改店铺
    // elseupdate() {
    //   this.updatedialogFormVisible = false
    //   this.getinit()
    // },
    //修改店铺
    update(item) {
      this.fileList = [];
      this.form = item;
      console.log(this.form);
      console.log(this.form.id);
      //得到门店的其他图片
      this.$axios.post("serverstore/imgList?id=" + this.form.id).then(
        resp => {
          resp.data.forEach(item => {
            this.fileList.push({"url": "http://localhost:8080/" + item.path});
          })

        }
      )
      this.updatedialogFormVisible = true
    }
  }
  // saveupdate() {
  //   var fh = new FormData();
  //   Object.keys(this.form).forEach(key => {
  //     fh.append(key, this.form[key]);
  //   })
  //
  //   var arr = []
  //   this.fileList.forEach(item => {
  //     if (!item.raw && item.url.indexOf("blob:") == -1) {
  //       arr.push(item.url.substring(item.url.lastIndexOf("/") + 1));
  //     } else {
  //       fh.append("photos", item.raw);
  //     }
  //   })
  //   var s = arr.join(",");
  //   fh.append("paths", s)
  //   console.log(s);
  //   console.log(this.form);
  //   //提交请求
  //   this.$axios.post("serverstore/update", fh).then(
  //     resp => {
  //       if (resp.data) {
  //         this.$message.success("修改成功");
  //         this.updatedialogFormVisible = false;
  //         this.fenye(1)
  //         this.getinit();
  //       } else {
  //         this.$message.success("修改失败");
  //       }
  //     }
  //   )
  // }
  ,
  // saveAdd() {
  //判断地址是否填写完整
  //   if (this.prov == '省份' || this.city == '城市' || this.district == '区域' || this.city == '请选择' || this.district == '请选择'
  //     || this.city == '' || this.district == '' || this.address == '' || this.addrName == '' || this.addrPhone == '') {
  //     this.$message.error('地址填写不完整')
  //   } else {
  //     var addr = this.prov + this.city + this.district + this.address;
  //     this.adddialogFormVisible = false
  //     var fh = new FormData();
  //     console.log(this.form);
  //     Object.keys(this.form).forEach(key => {
  //       fh.append(key, this.form[key])
  //     })
  //
  //     fh.append("address", addr)//地址
  //     fh.append('multipartFile', this.fileList[0].raw)//图片
  //     this.fileList.forEach(item => {
  //       fh.append("photos", item.raw)
  //     })
  //     this.$axios.post("serverstore/add", fh).then(
  //       resp => {
  //         if (resp.data) {
  //           this.$message.success("添加成功")
  //           this.fenye(1);
  //           this.getinit();
  //
  //         } else {
  //           this.$message.error("添加失败")
  //         }
  //       }
  //     )
  //   }
  // },
  created() {
    this.fenye(1);

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

</style>
