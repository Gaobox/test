<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <MyHeader></MyHeader>
      </el-header>
      <el-main>
        <el-row class="main-content">
          <RouterView></RouterView>
        </el-row>
      </el-main>
      <el-footer>
        <MyFooter></MyFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import MyHeader from './components/MyHeader.vue';
import MyFooter from './components/MyFooter.vue';

export default {
  name: 'App',
  components: {
    MyHeader,
    MyFooter,
  }
}
</script>

<style scoped>
.main-content {
  width: 1200px;
  margin: 0 auto;
}
</style>


