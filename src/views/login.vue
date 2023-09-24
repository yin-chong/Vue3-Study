<template>
    <div class="login">
        <div class="login-content">
            <el-form
              ref="ruleFormRef"
              :model="userInfo"
              :rules="rules"
              label-width="120px"
              :size="formSize"
              status-icon
            >
              <el-form-item label="用户名" prop="name">
                <el-input v-model="userInfo.name" style="width: 400px;" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="userInfo.password" type="password" style="width: 400px;" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                  登录
                </el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import router from '../router/index';
  import { ElMessage } from 'element-plus'
  
  interface RuleForm {
    name: string
    password: string
  }
  
  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const userInfo = reactive<RuleForm>({
    name: '',
    password: '',
  })
  
  const rules = reactive<FormRules<RuleForm>>({
    name: [
      { required: true, message: '请填写用户名', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请填写密码', trigger: 'blur' },
    ],
  })
  
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        const { name, password } = userInfo;
        if(name == 'user' && password == '123456') {
            window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
            router.push({
                name: 'index',
                query: {
                    userType: 'user'
                }
            })
        } else if(name == 'manage' && password == '123456') {
            window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
            router.push({
                name: 'index',
                query: {
                    userType: 'manage'
                }
            })
        } else {
            ElMessage({
                showClose: true,
                message: '用户名密码错误!',
                type: 'warning',
            })
        }
      } else {
        console.log('error submit!', fields)
      }
    })
  }
  
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  </script>
<style lang="scss">
.login {
    width: 100%;
    height: 100%;
    position: relative;
    &-content {
        width: 650px;
        height: auto;
        box-sizing: border-box;
        padding: 50px;
        margin: 20% auto 0;
        position: relative;
        border: 1px solid #333;
        border-radius: 8px;
    }
}
</style>
  