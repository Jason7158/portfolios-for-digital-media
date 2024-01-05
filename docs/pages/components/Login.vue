<script>
import { wait } from '@/utils/util'
import ValidCode from '@/components/ValidCode.vue'
import chaHua from '@/assets/imgs/chahua.png'

export default {
  name: 'Login',
  components: { ValidCode },
  data() {
    return {
      sendCode: 'Send code',
      loading: false,
      second: 3,
      resetPwdStep: 0,
      restType: '0',
      dialogVisible: false,
      getCode: '',
      disabled: false,
      loginImg: {
        chaHua,
      },
      ruleForm: {
        passname: '',
        password: '',
        verifycode: '',
      },
      rules: {
        passname: [{ required: true, message: 'invalid account', trigger: 'blur' }],
        password: [{ required: true, message: 'invalid password', trigger: 'blur' }],
        verifycode: [{ validator: this.checkVerifyCode, trigger: 'blur' }],
      },
      pwdForm1: {
        account: '',
        phoneNumber: '',
        email: '',
        autoCode: '',
      },
      rules1: {
        account: [{ required: true, message: 'Please enter account', trigger: 'blur' }],
        phoneNumber: [
          { required: true, message: 'Please enter mobile phone number', trigger: 'blur' },
        ],
        email: [
          { required: true, message: 'Please enter e-mail', trigger: 'blur' },
          { validator: this.checkEmail, trigger: 'blur' },
        ],
        autoCode: [
          { required: true, message: 'Please enter verification code', trigger: 'blur' },
          { validator: this.checkAutoCode, trigger: 'blur' },
        ],
      },
      pwdForm2: {
        password: '',
        passwordCopy: '',
      },
      rules2: {
        password: [
          { required: true, message: 'Please enter a new password', trigger: 'blur' },
        ],
        passwordCopy: [
          { required: true, message: 'Please enter password', trigger: 'blur' },
          { validator: this.checkPwdCopy, trigger: 'blur' },
        ],
      },
      identifyCodes: '0123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
      identifyCode: '',
    }
  },
  mounted() {
    this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    checkEmail(rule, value, callback) {
      const email = /^([a-zA-Z0-9]+[_|.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if (!email.test(value))
        callback(new Error('Incorrect email format'))
      else
        callback()
    },
    checkAutoCode(rule, value, callback) {
      if (value !== this.pwdForm1.autoCode)
        callback(new Error('Incorrect verification code'))
      else
        callback()
    },
    checkPwdCopy(rule, value, callback) {
      if (value !== this.pwdForm2.password)
        callback(new Error('Passwords do not match'))
      else
        callback()
    },
    group(val) {
      val === '0' ? this.pwdForm1.email = '' : this.pwdForm1.phoneNumber = ''
    },
    // 忘记密码-获取验证码
    async fetchAuthCode() {
      try {
        this.disabled = true
        let nums = 60
        const timer = setInterval(() => {
          if (nums === 0 && status !== 0) {
            clearInterval(timer)
            this.disabled = false
            this.sendCode = 'Send code'
          }
          else {
            this.sendCode = `${nums}s`
            nums--
          }
        }, 1000)
      }
      catch (e) {
        console.error(e)
        this.$message.error(e.message)
      }
    },
    // 忘记密码提交
    async nextStep() {
      if (this.resetPwdStep === 0) {
        await this.$refs.pwdForm1.validate()
        this.resetPwdStep = 1
      }
      else if (this.resetPwdStep === 1) {
        await this.$refs.pwdForm2.validate()
        this.countDown()
        this.resetPwdStep = 2
      }
    },
    handleClose() {
      this.dialogVisible = false
      this.resetPwdStep = 0
      this.$refs.pwdForm1.resetFields()
      // this.$refs.pwdForm2.resetFields()
    },
    // 倒计时
    countDown() {
      const times = setInterval(() => {
        if (this.second > 0 && this.second <= 3) {
          this.second--
        }
        else {
          clearInterval(times)
          this.handleClose()
        }
      }, 1000)
    },

    // 登录验证码
    checkVerifyCode(rule, value, callback) {
      if (value.toLowerCase() !== this.identifyCode.toLowerCase())
        callback(new Error('Incorrect verification code'))
      else
        callback()
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 切换验证码
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成四位随机验证码
    makeCode(o, l) {
      for (const i of o) {
        if (i < l) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
          ]
        }
      }
    },
    isFloat(val) {
      return val.replace(/^\s*/, '').replace(/\s*$/, '')
    },
    // 登录
    async submitForm() {
      this.loading = true
      await wait(1000)
      this.loading = false
    },
  },
}
</script>

<template>
  <div class="h-1080px w-1920px relative overflow-hidden transform-origin-tl">
    <div class="content absolute z-10 ">
      <div class=" align-middle inline-block w-6/12">
        <div class="text-center">
          <el-image :src="loginImg.chaHua" class="w-4/5" />
        </div>
      </div>
      <div class="align-middle inline-flex justify-around flex-col items-center w-6/12 h-full pr-12">
        <div class=" text-center font-extrabold text-size-2xl mt-6">
          Online Cargo Insurance
        </div>
        <el-form :model="ruleForm" :rules="rules" label-width="0px" class="loginForm w-80%">
          <el-form-item prop="passname">
            <el-input v-model="ruleForm.passname" type="passname" clearable autocomplete="off" placeholder="Account" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" type="password" autocomplete="off" clearable placeholder="Password" />
          </el-form-item>
          <el-form-item prop="verifycode" class="verifi">
            <el-input
              v-model="ruleForm.verifycode" clearable placeholder="Verification Code" class="float-left !w-4.5/6"
              @keyup.enter="submitForm()"
            />
            <div
              class="border border-solid  overflow-hidden border-gray-3 rounded float-right cursor-pointer verificode ml-1 flex-1 h-32px"
              @click="refreshCode()"
            >
              <ValidCode :identify-code="identifyCode">
                {{ identifyCode }}
              </ValidCode>
            </div>
          </el-form-item>
          <span
            class="w-full text-right text-blue-9 text-xs inline-block mb-4 cursor-pointer"
            @click="dialogVisible = true"
          >Forgot Password?</span>
          <el-form-item class="mt-4">
            <el-button class="w-full" type="danger" :loading="loading" @click="submitForm()">
              Login
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible" title="Reset Password" width="900px" class="mt-6" :show-close="true"
      :before-close="handleClose"
    >
      <div class="mx-12" style="height:250px">
        <el-steps class="mb-4" :active="resetPwdStep" finish-status="success" simple>
          <el-step title="Verify identity" />
          <el-step title="Set a new password" />
          <el-step title="Finish" />
        </el-steps>

        <!-- step 1 -->
        <el-form
          v-show="resetPwdStep === 0" ref="pwdForm1" :model="pwdForm1" :rules="rules1" label-width="200px"
          size="small"
        >
          <el-form-item label="Account" prop="account">
            <el-input v-model="pwdForm1.account" clearable />
          </el-form-item>
          <el-form-item label="Reset method" prop="resource">
            <el-radio-group v-model="restType" @change="group(restType)">
              <el-radio label="0">
                SMS
              </el-radio>
              <el-radio label="1">
                E-mail
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="restType === '0'" label="Mobile phone number" prop="phoneNumber">
            <el-input v-model="pwdForm1.phoneNumber" placeholder="" clearable />
          </el-form-item>
          <el-form-item v-if="restType === '1'" label="E-mail" prop="email">
            <el-input v-model="pwdForm1.email" placeholder="" clearable />
          </el-form-item>
          <el-form-item label="Verification code" prop="autoCode">
            <el-input v-model="pwdForm1.autoCode" style="width: calc(100% - 130px)" clearable />
            <el-button class="min-w-form-nav ml-2" size="small" round :disabled="disabled" @click="fetchAuthCode">
              {{ sendCode }}
            </el-button>
          </el-form-item>
        </el-form>
        <!-- step 2 -->
        <el-form
          v-show="resetPwdStep === 1" ref="pwdForm2" :model="pwdForm2" :rules="rules2" label-width="200px"
          size="small"
        >
          <el-form-item label="Account">
            <el-input v-model="pwdForm1.account" disabled clearable />
          </el-form-item>
          <el-form-item prop="password">
            <template #label>
              <span>New password</span>
              <el-tooltip effect="dark" content="Top Center 提示文字" placement="top">
                <template #content>
                  <div>
                    <p>1. Password length 8 characters and above.</p>
                    <p>
                      2. Uppercase letters, lowercase letters, numbers, and special characters, choose 3 combination
                      forms
                    </p>
                  </div>
                </template>
                <i class="ml-1 el-icon-warning-outline cursor-pointer" />
              </el-tooltip>
            </template>
            <el-input v-model="pwdForm2.password" type="password" clearable />
          </el-form-item>
          <el-form-item label="Confirm password" prop="passwordCopy">
            <el-input v-model="pwdForm2.passwordCopy" type="password" clearable />
          </el-form-item>
        </el-form>
        <!-- step 3 -->
        <div v-show="resetPwdStep === 2" class="text-center pt-10">
          <i class="el-icon-success text-green-1 text-6xl" />
          <p class="text-lg">
            The new password has been set successfully
          </p>
          <p>
            <span class="text-gray-1">Close dialog after</span><span class="text-orange-500">{{ second }}</span><span
              class="text-gray-1"
            >Seconds</span>
          </p>
        </div>
      </div>
      <template #footer>
        <div class="text-center">
          <el-button class="min-w-button" size="small" round type="primary" @click="nextStep">
            {{ resetPwdStep !== 2 ? 'Next' : 'Finish' }}
          </el-button>
        </div>
      </template>
    </el-dialog>
    <div class="wave wave1" />
    <div class="wave wave2" />
  </div>
</template>

<style lang="scss" scoped>
.wave {
  position: relative;
  background-color: #fff;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    min-width: 300%;
    min-height: 300%;
    background-color: #df6f6d;
    animation-name: rotate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  &::before {
    bottom: 16%;
    border-radius: 45%;
    animation-duration: 25s;
  }

  &::after {
    bottom: 12%;
    opacity: .5;
    border-radius: 47%;
    animation-duration: 25s;
  }
}

.wave1 {
  position: absolute;
  width: 600px;
  height: 600px;
  top: 0%;
  left: 0%;
}

.wave2 {
  position: absolute;
  width: 500px;
  height: 500px;
  right: -15%;
  bottom: -85%;
}

@keyframes rotate {
  0% {
    transform: translate(-50%, 0) rotateZ(0deg);
  }

  50% {
    transform: translate(-50%, -2%) rotateZ(180deg);
  }

  100% {
    transform: translate(-50%, 0%) rotateZ(360deg);
  }
}

/*动态波浪end*/

.content {
  width: 50%;
  height: 40%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

:deep(.el-step__head) {
  line-height: normal;
}

:deep(.el-step.is-simple:not(:last-of-type) .el-step__title) {
  max-width: 55%;
}

:deep(.el-step.is-simple .el-step__icon) {
  width: 14px;
  height: 14px;
}

:deep(.el-step.is-simple .el-step__title) {
  font-size: 14px;
}

:deep(.el-button.is-disabled) {
  color: #244AA9;
}
</style>
