<template>
  <el-row>
    <el-col :span="24">
      <template v-if="temp">
        <h2>{{ title }}</h2>
        <p>{{ price }}</p>
        <p>{{ desc }}</p>
        <ul>
          <li v-for="(item, index) in color" :key="index">{{ item }}</li>
        </ul>
        <h3 class="details">Product details display picture</h3>
        <el-row class="img-list">
          <div v-for="(item, index) in details" :key="index">
            <img :src="item.url" alt="细节图">
          </div>
        </el-row>
      </template>
      <template v-if="!temp">
        <h2>{{ card.title }}</h2>
        <p>{{ card.price }}</p>
        <p>{{ card.desc }}</p>
        <ul>
          <li v-for="(item, index) in card.color" :key="index">{{ item }}</li>
        </ul>
        <h3 class="details">Product details display picture</h3>
        <el-row class="img-list">
          <div v-for="(item, index) in card.details" :key="index">
            <img :src="item" alt="细节图">
          </div>
        </el-row>
      </template>

    </el-col>
  </el-row>
</template>

<script>
import hot1 from '@/assets/images/home-hot-1.webp'
import hot2 from '@/assets/images/home-hot-1.webp'
import hot3 from '@/assets/images/home-hot-1.webp'
import hot4 from '@/assets/images/home-hot-1.webp'
import hot5 from '@/assets/images/home-hot-1.webp'
import hot6 from '@/assets/images/home-hot-1.webp'


export default {
  name: 'HomeHot',
  data() {
    return {
      title: 'Air Jordan 1',
      price: '1399',
      desc: 'The AJ1 gets a new look. ',
      color: ['white', 'black', 'blue', 'rose'],
      details: [
        {
          url: hot1,
          alt: '细节'
        },
        {
          url: hot2,
          alt: '细节'
        },
        {
          url: hot3,
          alt: '细节'
        },
        {
          url: hot4,
          alt: '细节'
        },
        {
          url: hot5,
          alt: '细节'
        },
        {
          url: hot6,
          alt: '细节'
        },
      ],
      temp: true,
      card: null
    }
  },
  mounted() {
    const content = this.$route.query.card
    if (content) {
      this.temp = false
      this.card = JSON.parse(content)
    }
  },
}
</script>

<style scoped>
.details {
  margin-bottom: 25px;
}

.img-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.img-list div {
  width: 32%;
  margin-bottom: 15px;
}

.img-list div img {
  width: 100%;
}
</style>