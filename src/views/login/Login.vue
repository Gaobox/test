<template>
  <el-row class="page-outer">
    <el-row class="page-inner">
      <el-col :span="24">
        <el-dialog v-model="dialogVisible" :title="title" width="600px" :close-on-click-modal="false"
          :close-on-press-escape="false" :show-close="false" :center="true" :align-center="true">
          <el-form v-show="showFlag" ref="loginRef" :model="loginForm" :rules="rulesLogin" label-width="120px">
            <el-form-item label="name" prop="name">
              <el-input v-model="loginForm.name" placeholder="Please enter a name" />
            </el-form-item>
            <el-form-item label="password" prop="password">
              <el-input v-model="loginForm.password" type="password" placeholder="Please enter your password" :show-password="true" />
            </el-form-item>
            <el-form-item>
              <el-row justify="space-between" style="width: 100%;">
                <el-button @click="goRegister" style="width: 45%;">register</el-button>
                <el-button type="primary" @click="login" style="width: 45%;">Login</el-button>
              </el-row>
            </el-form-item>
          </el-form>
          <el-form v-show="!showFlag" ref="registerRef" :model="registerForm" :rules="rulesRegister" label-width="120px">
            <el-form-item label="name" prop="name">
              <el-input v-model="registerForm.name" placeholder="Please enter a name" />
            </el-form-item>
            <el-form-item label="password" prop="password">
              <el-input v-model="registerForm.password" type="password" placeholder="Please enter your password" :show-password="true" />
            </el-form-item>
            <el-form-item label="Confirm Password" prop="pass">
              <el-input v-model="registerForm.pass" type="password" placeholder="Please confirm your password" :show-password="true" />
            </el-form-item>
            <el-form-item>
              <el-row justify="space-between" style="width: 100%;">
                <el-button @click="goLogin" style="width: 45%;">Login</el-button>
                <el-button type="primary" @click="resgister" style="width: 45%;">register</el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { login, register } from '@/api'
import { ElMessage } from 'element-plus'

export default {
  name: 'Login',
  data() {
    var validatorPass = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('Please enter the same password'))
      } else {
        callback()
      }
    }

    return {
      dialogVisible: true,
      loginForm: {
        name: '',
        password: '',
      },
      registerForm: {
        name: '',
        password: '',
        pass: ''
      },
      title: 'Login',
      showFlag: true,
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
      rulesRegister: {
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
        ],
        pass: [
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
          {
            validator: validatorPass,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginRef.validate((valid, fields) => {
        if (valid) {
          const { name, password } = this.loginForm;

          // 从 localStorage 获取保存的用户信息
          const storedUser = JSON.parse(localStorage.getItem('user'));

          // 检查用户名和密码是否匹配
          if (storedUser && storedUser.name === name && storedUser.password === password) {
            // 登录成功
            this.$router.push({ path: '/home' });  // 跳转到主页
            window.localStorage.setItem('user', JSON.stringify({ name }));  // 存储登录信息
          } else {
            // 用户名或密码错误
            ElMessage.error('Wrong username or password');
          }
        } else {
          console.log('error submit!', fields);
        }
      });
    },

    resgister() {
      this.$refs.registerRef.validate((valid, fields) => {
        if (valid) {
          // 假设你在前端保存用户信息
          const { name, password } = this.registerForm;

          // 保存用户信息到 localStorage
          window.localStorage.setItem('user', JSON.stringify({ name, password }));

          ElMessage.success('Successful registration');
          this.title = 'Login';
          this.showFlag = true;
          this.$refs.registerRef.resetFields(); // 清空注册表单

          // 跳转到登录页面
          this.$router.push({ path: '/login' });
        } else {
          console.log('error submit!', fields);
        }
      });
    },

    goRegister() {
      this.$refs.loginRef.resetFields()
      this.showFlag = false
      this.title = 'register'
    },
    goLogin() {
      this.$refs.registerRef.resetFields()
      this.showFlag = true
      this.title = 'Login'
    },
  }
}
</script>

<style scoped>
.page-outer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
}
</style>
