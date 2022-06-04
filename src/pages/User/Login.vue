<script setup lang="ts">

import {RuleObject} from "ant-design-vue/lib/form/interface";
import {getCurrentInstance,reactive} from 'vue';
import {Md5} from "ts-md5";
import {userLogin} from "../../api/user";
import {message} from "ant-design-vue";


const internalInstance = getCurrentInstance();


const form = reactive({
  phone: '',
  password: ''
})
const checkPhone = (rule:RuleObject, value:number) => {
  if (!internalInstance?.appContext.config.globalProperties.$checkPhone.test(value)){
    return Promise.reject('请输入正确的手机号')
  } else {
    return Promise.resolve()
  }
}
const checkPassword = (rule:RuleObject, value:string) => {
  if (!internalInstance?.appContext.config.globalProperties.$checkPassword.test(value)){
    return Promise.reject('密码8-20位，支持英文、数字')
  } else {
    return Promise.resolve()
  }
}
const login = () => {
  console.log(form)
  console.log(internalInstance?.appContext.config.globalProperties.$checkPhone.test(form.phone))
  console.log(internalInstance?.appContext.config.globalProperties.$checkPhone.test(form.password))

  if (internalInstance?.appContext.config.globalProperties.$checkPhone.test(form.phone)
    && internalInstance?.appContext.config.globalProperties.$checkPassword.test(form.password)){
    userLogin({
      phone: form.phone,
      password: Md5.hashStr(form.password),
    })
        .then(res => {
          console.log(res.data)
          if (res.data.message === '登录成功'){
            const token = res.data.result.token
            localStorage.setItem('token',token)
            localStorage.setItem('phone', form.phone)
            localStorage.setItem('username', res.data.result.username)
            localStorage.setItem('is_login', 'true')
            // location.replace('/')
          } else {
            message.error(res.data.message)
            setTimeout(function () {location.reload()}, 1500)
          }
        })
  }else if (form.phone == ''){
    message.error('请填写账号')
  }else if (form.password == ''){
    message.error('请填写密码')
  } else {
    message.error('请填写正确的账号、密码')
  }
}

const rules = {
  phone:[{required: true, validator: checkPhone, trigger: 'blur'}],
  password: [{required: true, validator: checkPassword, trigger: 'blur'}]
}

// onMounted  进页面时执行
{
  localStorage.clear()
  sessionStorage.clear()
}

</script>

<template>
  <div class="div">
    <div style="padding-top: 35vh">
      <a-card
          title="登录"
          class="loginForm"
      >
        <a-form
            :model="form"
            :rules="rules"
        >
          <a-row>
            <a-form-item
                label="账号"
                name="phone"
            >
              <a-input
                  placeholder="请输入手机号"
                  v-model:value="form.phone"
              />
            </a-form-item>
          </a-row>
          <a-row>
            <a-form-item
                label="密码"
                name="password"
            >
              <a-input
                  placeholder="请输入密码"
                  type="password"
                  v-model:value="form.password"
                  @keyup.enter="login"
              />
            </a-form-item>
          </a-row>
          <a-row justify="center" style="padding-right: 60px">
            <a @click="ForgerPassword">忘记密码</a>
          </a-row>
          <a-row>
            <a-button
                style="margin-left: 28%"
                size="small"
                type="primary"
                @click="login"
            >
              登录
            </a-button>
          </a-row>
        </a-form>
      </a-card>
    </div>
  </div>

</template>

<style scoped>

</style>
