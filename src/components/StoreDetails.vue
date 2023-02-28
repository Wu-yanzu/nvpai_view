<template>
  <div style="width: 100%;text-align: left;">
    <div style="width: 1180px;margin: auto;">
      <el-carousel :interval="3000" arrow="always" height="75px">
        <el-carousel-item v-for="item in adPhotos" :key="item">
          <img :src="item" width="1200px"/>
        </el-carousel-item>
      </el-carousel>

      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">商家</el-breadcrumb-item>
        <el-breadcrumb-item>{{store.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <br/>
      <el-card class="box-card">
        <div style="width: 50%;float: left;margin-bottom: 15px">
          <el-carousel :interval="3000" arrow="always" height="360px">
            <el-carousel-item v-for="item in storePhotos" :key="item.path">
              <img :src="'http://localhost:8080/'+item.path" width="100%">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div style="float: left;width: 45%;padding-left: 20px;">
          <div style="width: 100%;height: 80px">
            <div style="float: left;width: 70%;">
              <h1>{{store.name}}</h1>
            </div>
            <div style="float: left;width: 30%;margin-top:11px">
              <el-rate
                v-model="store.score"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </div>
          </div>
          <br/>
          <span style="font-size: 14px"><b>联系人：</b>{{store.pname}}</span>
          <br/>
          <br/>
          <span style="font-size: 14px"><b>电话：</b>{{store.phone}}</span>
          <br/>
          <br/>
          <span style="font-size: 14px"><b>地址：</b>{{store.address}}</span>
          <br/>
          <br/>
          <span style="font-size: 14px"><b>营业时间：</b>7:30-17:00</span>
          <br/>
          <br/>
          <div style="width: 100%;background-color:#FCF9EA;">
            <span style="font-size: 14px;display: inline-block;margin: 15px auto;">
              <b>&nbsp;精彩点评：</b>带着小朋友去的，他超级喜欢，上串下跳玩的不亦乐乎
            </span>
          </div>
          <i class="el-icon-edit" style="font-size: 14px"> {{count}} 条用户评论&nbsp;</i>
          <el-button type="text" @click="getAnchor('remark')" style="color: #006DAE;">查看</el-button>
          <el-button type="primary" @click="comment">评论</el-button>
        </div>
        <el-button type="text" style="color: #006DAE;" @click="collect">收藏</el-button>
      </el-card>

      <br/>
      <el-menu :default-active="activeIndex" class="el-menu-demo" background-color="#0086f6" text-color="#303133"
               mode="horizontal" active-text-color="#ffd04b">
        <el-menu-item index="1">
          <el-button style="color: aliceblue" type="text" @click="getAnchor('delicacy')">本店美食</el-button>
        </el-menu-item>
        <el-menu-item index="2">
          <el-button style="color: aliceblue" type="text" @click="getAnchor('remark')">精选点评</el-button>
        </el-menu-item>
      </el-menu>

      <div id="delicacy">
        <el-card>
          <div>
            <h3>本店美食</h3>
          </div>
          <div>
            <el-table :data="foodList" style="width: 100%">
              <el-table-column label="图片">
                <template slot-scope="scope">
                  <el-carousel :interval="3000" arrow="always" height="140px" style="width: 240px">
                    <el-carousel-item v-for="item in scope.row.photoList" :key="item.path">
                      <img :src="'http://localhost:8080/'+item.path" width="240px">
                    </el-carousel-item>
                  </el-carousel>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="菜名">
              </el-table-column>
              <el-table-column prop="description" label="描述">
              </el-table-column>
              <el-table-column prop="price" label="单价">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="reserve(scope.row)">预定</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
      <br/>
      <div id="remark">
        <el-card>
          <div style="width: 100%">
            <div>
              <h3>精选点评</h3>
            </div>
            <div>
              <el-table :data="page.list" style="width: 100%">
                <el-table-column label="点评图片">
                  <template slot-scope="scope">
                    <el-carousel :interval="3000" arrow="always" height="140px" style="width: 240px">
                      <el-carousel-item v-for="item in scope.row.commentphotos">
                        <img :src="'http://localhost:8080/'+item.path" width="240px">
                      </el-carousel-item>
                    </el-carousel>
                  </template>
                </el-table-column>
                <el-table-column prop="user.name" label="评论人">
                </el-table-column>
                <el-table-column prop="content" label="评论内容">
                </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.currentPage"
                :page-sizes="[4,5,6]"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
              </el-pagination>
            </div>
          </div>
        </el-card>

        <el-dialog width="40%" title="预定" :visible.sync="dialogFormVisible">
          <el-form label-width="80px">
            <el-form-item label="待付款">
              <el-input disabled style="width: 50%;" v-model="menu.price"></el-input>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input style="width: 50%;"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input style="width: 50%;"></el-input>
            </el-form-item>
          </el-form>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-checkbox>我已阅读并接受合同条款、补充条款及其他所有内容</el-checkbox>
          <div slot="footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="toReserve">确 定 支 付</el-button>
          </div>
        </el-dialog>

        <el-dialog width="40%" title="评论" :visible.sync="dialogFormVisible1">
          <el-form ref="form" label-width="80px">
            <el-form-item label="评分" prop="birthday">
              <el-rate v-model="score" :colors="colors"></el-rate>
            </el-form-item>
            <el-form-item label="评价" prop="birthday">
              <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="context" style="width: 50%;"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <el-upload
                class="upload-demo"
                action=""
                :on-remove="handleRemove"
                :on-change="handleChange"
                list-type="picture-card"
                :multiple="true"
                :limit="5"
                :auto-upload="false"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="toComment">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog width="40%" title="预定" :visible.sync="dialogFormVisible">
          <el-form label-width="80px">
            <el-form-item label="待付款">
              <el-input disabled style="width: 50%;" v-model="menu.price"></el-input>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input style="width: 50%;" v-model="person"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input style="width: 50%;" v-model="phone"></el-input>
            </el-form-item>
          </el-form>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-checkbox>我已阅读并接受合同条款、补充条款及其他所有内容</el-checkbox>
          <div slot="footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="toReserve">确 定 支 付</el-button>
          </div>
        </el-dialog>

        <el-dialog width="240px" title="订单二维码" :visible.sync="dialogFormVisible2">
          <img :src="'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='+qrCode">
        </el-dialog>

      </div>
      <br/>
    </div>

  </div>
</template>

<script>
  export default {
    name: "StoreDetails",
    data() {
      return {
        adPhotos: ['https://pic5.40017.cn/i/ori/1bgrmPCXheM.jpg', 'https://pic5.40017.cn/i/ori/1aT1oYnyhTa.jpg', 'https://pic5.40017.cn/i/ori/RK6oxCYWUE.jpg'],
        store: {
          // id: 1,
          // name: '筑地 寿司清',
          // address: '江苏省苏州市姑苏区园林路23号',
          // pname: '张经理',
          // phone: '03-3541-7720',
          // score: 3.7,
        },
        count: 0,
        activeIndex: '1',
        foodList: [],
        page: {
          pageSize: 4
        },
        currentPage: 1,
        user: {},
        dialogFormVisible: false,
        dialogFormVisible1: false,
        dialogFormVisible2: false,
        menu: {},
        score: null,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
        context: '',
        fileList: [],
        storePhotos: [],
        qrCode: '',
        person: '',
        phone: ''
      }
    },
    methods: {
      getAnchor(e) {
        document.querySelector("#" + e).scrollIntoView(true);
      },
      // 收藏
      collect() {
        if (this.user == null) {
          this.toLogin()
        } else {
          this.$axios.get('/store/collect?uid=' + this.user.id + '&sid=' + this.store.id + '&state=2')
            .then(resp => {
              if (resp.data == true) {
                this.$message.success("添加成功!");
              } else {
                this.$message.error("添加失败!")
              }
            })
        }
      },
      handleSizeChange(pageSize) {
        console.log(`每页 ${pageSize} 条`);
        this.page.pageSize = pageSize;
        this.paging();
      },
      handleCurrentChange(currentPage) {
        console.log(`当前页: ${currentPage}`);
        this.currentPage = currentPage;
        this.paging();
      },
      handleChange(file) {
        this.fileList.push(file);
      },
      handleRemove(file, fileList) {
        this.fileList = fileList;
      },
      paging() {
        this.$axios.get('/store/foodList?sid=' + this.store.id)
          .then(resp => {
            this.foodList = resp.data;
          });
        this.$axios.get('/store/commentList?sid=' + this.store.id + '&curPage=' + this.currentPage + '&pageSize=' + this.page.pageSize)
          .then(resp => {
            this.page = resp.data;
            this.count = this.page.total;
          });
        this.$axios.get('/store/storePhotos?sid=' + this.store.id)
          .then(resp => {
            this.storePhotos = resp.data;
          })
      },
      toLogin() {
        this.$router.push('/Login')
      }
      ,
      // 预定
      reserve(menu) {
        if (this.user == null) {
          this.toLogin();
        } else {
          this.dialogFormVisible = true;
          this.menu = menu;
        }
      },
      toReserve() {
        this.$axios.get('/store/reserve?uid=' + this.user.id + '&mid=' + this.menu.id + '&price=' + this.menu.price)
          .then(resp => {
            console.log(resp.data);
            this.qrCode = resp.data;
            this.dialogFormVisible = false;
            this.dialogFormVisible2 = true;
          })
      },
      // 评论
      comment() {
        if (this.user == null) {
          this.toLogin()
        } else {
          this.dialogFormVisible1 = true;
        }
      },
      toComment() {
        this.dialogFormVisible1 = false;
        var fd = new FormData();
        fd.append("uid", this.user.id);
        fd.append("sid", this.store.id);
        fd.append("content", this.context);
        fd.append("score", this.score);
        this.fileList.forEach(item => {
          fd.append('photo', item.raw);
        });
        this.$axios.post('/store/comment', fd)
          .then(resp => {
            if (resp.data == true) {
              this.dialogFormVisible1 = false;
              this.$message.success("添加成功！")
              this.$axios.get('store/getStoreById?id=' + this.store.id).then(resp => {
                this.store = resp.data
              })
              if (sessionStorage.getItem('store') != null) {
                sessionStorage.removeItem('store')
              }
              sessionStorage.setItem('store', JSON.stringify(this.store))

              this.paging()

            } else {
              this.$message.error('添加失败！')
            }
          })
      }
    },
    created() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      this.store = JSON.parse(sessionStorage.getItem('store'))
      console.log(this.store)

      this.paging();
    }
  }
</script>

<style scoped>
</style>

