<template>
  <el-row class="header">
    <el-col :span="12">
      <h1>
        vue3-shoe mall
      </h1>
    </el-col>
    <el-col :span="12">
      <el-row justify="end" style="align-items: center;">
        <el-popover v-model:visible="popoverVisible" placement="top-start" title="Cart" :width="300" trigger="click">
          <template #reference>
            <el-badge :value="shopCount" class="item">
              <el-icon>
                <ShoppingCartFull />
              </el-icon>
            </el-badge>
          </template>
          <template v-if="popoverList.length > 0">
            <ul class="popover-list">
              <li v-for="item in popoverList" :key="item.id" class="popover-list-item">
                <div class="left">
                   X{{ item.quantity }} {{ item.title }}
                </div>
                <div class="right">{{ item.price }}</div>
              </li>
            </ul>
          </template>
          <template v-else>
            No data yet
          </template>
        </el-popover>
        <el-button text @click="goAdmin">Log in to the backend</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { ShoppingCartFull } from '@element-plus/icons-vue'

export default {
  name: 'MyHeader',
  data() {
    return {
      shopCount: 0,
      popoverVisible: false,
      popoverList: []
    }
  },
  mounted() {
    // 监听购物车更新事件
      this.$emitter.on('addShopCard', (updatedCart) => {
      this.popoverList = updatedCart;  // 更新购物车弹窗中的商品列表
      this.shopCount = updatedCart.length;
      console.log("Updated cart list:", this.popoverList);
    });
  },
  methods: {
    goAdmin() {
      this.$emitter.emit('goAdminLogin', true); // 触发登录框显示
    },
    showShopCard() {
      this.popoverVisible = true; // 显示购物车
    }
  }
}
</script>

<style scoped>
.header {
  height: 60px;
  list-style: 60px;
}

a,
a:hover,
a:active,
a:visited,
a:focus {
  color: #222;
  text-decoration: none;
}

.popover-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.popover-list-item {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  line-height: 45px;
  padding: 0 15px;
  cursor: pointer;
}

.popover-list-item:hover {
  background-color: #f5f5f5;
}

.popover-list-item .left {
  width: 75%;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
}
</style>
