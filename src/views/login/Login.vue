<template>
    <div class="login-container">
        <div class="backImg">
            <div style="height: 100%;width: 50%;"></div>
            <div style="height:100%;width: 50%;">
                <img src="@/assets/slogan@3x.png" style="height: 30%; width: 100%;background-size: 100% 100%;">
                <div style="display: flex;">
                    <div style="height:100%;width: 60%;"></div>
                    <div style="display: flex; flex-direction: column;">
                        <a-form class="loginForm">
                            <a-row>
                                <a-col span="24">
                                    <a-form-item v-bind="validateInfos.username">
                                        <a-input v-model:value="loginModel.username" placeholder="请输入账户">
                                            <template #prefix>
                                                <UserOutlined />
                                            </template>
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col span="24">
                                    <a-form-item v-bind="validateInfos.password">
                                        <a-input v-model:value="loginModel.password" type="password" placeholder="请输入密码">
                                            <template #prefix>
                                                <LockOutlined />
                                            </template>
                                        </a-input>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="24">
                                    <a-form-item>
                                        <a-button style="width: 100%;background-color: #0c2d82;
                                            box-shadow: -2px 0px 4px 0px rgba(88, 113, 238, 0.35);
                                            border-radius: 8px;" class="mybtn" type="primary"
                                            @click="loginBtn">登录</a-button>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="24">
                                    <a-form-item>
                                        <a-button style="width: 100%;background-color: #0c2d82;
                                            box-shadow: -2px 0px 4px 0px rgba(88, 113, 238, 0.35);
                                            border-radius: 8px;" class="mybtn" type="primary"
                                            @click="loginout">退出</a-button>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </a-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import useForm from "ant-design-vue/es/form/useForm"
import { loginApi, testApi } from '@/api/login/login'
import { clearSession } from '@/utils/auth'
import { setToken, setUserId } from '@/utils/auth'
import { tabsStore } from '@/store/tabs/index'
import { useRouter } from "vue-router"
const store = tabsStore()
const router = useRouter()
const loginModel = reactive({
    username: '',
    password: ''
})
const loginout = () => {
    router.push({ name: 'login' })
    clearSession()
    store.tabsList = []
}
const rules = reactive({
    username: [{
        required: true,
        trigger: 'change',
        message: '请输入账号'
    }],
    password: [{
        required: true,
        trigger: 'change',
        message: '请输入密码'
    }],
})
const { validate, validateInfos } = useForm(loginModel, rules)
const loginBtn = () => {
    validate().then(async () => {
        // let ress = await testApi("DCLxyy/8O/DQSAFiiHdXZSfp4nxsfYvnMzoJCeb0Pm8=");
        // console.log(ress)
        let res = await loginApi(loginModel)
        if (res && res.code == 200) {
            setToken(res.data.token)
            setUserId(res.data.userId)
            router.push({ path: '/' })
        }
    })
}
</script>

<style scoped lang="scss">
.login-container {
    height: 100%;
    background: #FFF;
    background-image: url('@/assets/login.png');
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: 100% 100%;
}

.backImg {
    height: 450px;
    width: 800px;
    background-image: url('@/assets/微信图片_20230517185511.png');
    background-size: 100% 100%;
    border-radius: 10px;
    display: flex;
}

.loginForm {
    height: 100%;
    padding: 35px 20px;
    background-color: #FFF;
    //padding: 35px 20px;
    border-radius: 10px;
    display: flex;
    background-color: transparent;
}
</style>
