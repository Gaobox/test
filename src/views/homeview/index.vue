<template>
  <el-row class="home">
    <el-col :span="24">
      <div class="img">
        <img src="@/assets/images/home-hot.webp" lazy alt="首页热品" />
      </div>
      <el-button type="primary" class="see-info" @click="goHomeHot">check the details</el-button>
    </el-col>
  </el-row>
  <el-row class="home-list">
    <el-col :span="24">
      <template v-for="item in list">
        <h3 class="list-title">{{ item.title }}</h3>
        <div class="list-product">
          <el-card class="list-card" :body-style="{ padding: '0px' }" v-for="card in item.list">
            <img :src="card.url" class="image" @click="enterInformation(card)" />
            <div style="padding: 14px">
              <h4>{{ card.title }}</h4>
              <div class="bottom">
                <div class="desc">{{ card.desc }}</div>
                <div class="bottom-f">
                <div class="left">
                  <span>{{ card.price }}</span>
                  <template v-if="card.discount">
                    <el-tag>{{ card.discount }}</el-tag>
                  </template>
                </div>
                <div class="right">
                  <el-button type="success" @click="addCardShopping(card)" title="加入购物车">add to the cart</el-button>
                </div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </template>
    </el-col>
  </el-row>
  <el-row>
    <el-dialog v-model="dialogVisible" title="Log in to the backend" width="30%">
      <el-form ref="loginRef" :model="loginAdminForm" :rules="rulesLogin" label-width="80px">
        <el-form-item label="name" prop="name">
          <el-input v-model="loginAdminForm.name" placeholder="Please enter a name" />
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="loginAdminForm.password" type="password" placeholder="Please enter your password" :show-password="true" />
        </el-form-item>
        <el-form-item>
          <el-row justify="space-between" style="width: 100%;">
            <el-button type="primary" @click="loginAdmin" style="width: 100%;">Login</el-button>

          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { getHomeListData } from '@/api'
import { ElMessage } from 'element-plus'

export default {
  name: 'HomeView',
  components: {
    IconPicture
  },
  data() {
    return {
      list: [],
      countList: [],
      shopCount: 0,
      dialogVisible: false,
      loginAdminForm: {
        name: 'admin',
        password: '123456',
      },
      rulesLogin: {
        name: [
          {
            required: true,
            message: 'Please fill in your name',
            trigger: 'blur',
          },
          {
            min: 2,
            max: 10,
            message: 'Please fill in a 2-10 digit name',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Please enter your password',
            trigger: 'blur',
          },
          {
            min: 2,
            max: 10,
            message: 'Please enter a 6-10 digit password',
            trigger: 'blur',
          },
        ]
      },
    }
  },
  mounted() {
    this.getHomeList(); // 获取数据
    this.$emitter.on('updateProductList', () => { 
      this.getHomeList(); // 获取更新后的商品数据
    });
    this.$emitter.on('goAdminLogin', (flag) => {
      this.dialogVisible = flag;
    });
  },

  onBeforeUnmount() {
    this.$emitter.off('addShopCard')
    
  },
  methods: {
    goHomeHot() {
      this.$router.push({ path: '/home/hot' })
    },
    getHomeList() {
      getHomeListData().then(res => {
        try {
          const { code, data, msg } = res
          if (code === 200) {
            this.list = data
          } else {
            ElMessage.error(msg)
          }
        } catch (error) {
          ElMessage.error("请求数据错误")
        }
      }).catch(error => {
        ElMessage.error("请求数据错误")
        console.log(error)
      })
    },
    // 添加购物车
    addCardShopping(card) {
      // 检查购物车中是否已有该商品
      const existingProduct = this.countList.find(item => item.id === card.id);

      if (existingProduct) {
        // 如果商品已存在，增加数量
        existingProduct.quantity++;
      } else {
        // 如果商品不存在，添加商品并设置数量为 1
        this.countList.push({ ...card, quantity: 1 });
      }
      
      // 触发购物车更新事件
      this.$emitter.emit('addShopCard', this.countList);
    },
    // 点击进入详情
    enterInformation(card) {
      this.$router.push({ path: '/home/hot', query: { card: JSON.stringify(card) } })
    },
    // 打开登录对话框
    openLoginDialog() {
      this.dialogVisible = true;
    },
    // 登录后台
    loginAdmin() {
      const { name, password } = this.loginAdminForm;

      // 预设的用户名和密码
      const correctUsername = 'admin';
      const correctPassword = '123456';

      // 验证用户名和密码是否正确
      if (name === correctUsername && password === correctPassword) {
        this.$router.push({ path: '/admin' });
        this.dialogVisible = false;
      } else {
        ElMessage.error('Wrong username or password');
      }
    }
  }
}
</script>

<style>
.home {
  position: relative;
  width: 100%;
}

.img {
  width: 100%;
  height: 450px;
}

.img img {
  width: 100%;
  height: 100%;
}

.see-info {
  position: absolute;
  bottom: 50px;
  left: 50px;
}

.list-product {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.list-product .list-card {
  width: 24%;
}

.list-product .image {
  display: block;
  margin: 10px auto;
  width: 266px;
  height: 332px;
  cursor: pointer;
  transition: all 0.5s;
}

.list-product .image:hover {
  transform: scale(1.1);
}

.list-card .desc {
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.list-card h4 {
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
}

.list-title {
  text-align: center;
  padding: 25px 0;
  margin: 25px 0;
  font-size: 40px;
}

.bottom-f {
  display: flex;
  justify-content: space-between;
}
</style>
