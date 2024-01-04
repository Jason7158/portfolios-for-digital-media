<script>
import ValidCode from '@/components/ValidCode.vue'
import chaHua from '@/assets/imgs/chahua.png'

export default {
  name: 'Login',
  components: { ValidCode },
  data() {
    return {
      second: 3,
      resetPwdStep: 0,
      restType: '0',
      dialogVisible: false,
      sendCode: '获取验证码',
      getCode: '',
      usertype: '', // 1 外部用户, 2 内部用户
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
        passname: [{ required: true, message: '请输入正确的用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入正确的密码', trigger: 'blur' }],
        verifycode: [{ validator: this.checkVerifyCode, trigger: 'blur' }],
      },
      pwdForm1: {
        account: '',
        phoneNumber: '',
        email: '',
        autoCode: '',
      },
      rules1: {
        account: [{ required: true, message: '请输入正确的账号', trigger: 'blur' }],
        phoneNumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: this.checkPhone, trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: this.checkEmail, trigger: 'blur' },
        ],
        autoCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: this.checkAutoCode, trigger: 'blur' },
        ],
      },
      pwdForm2: {
        password: '',
        passwordCopy: '',
      },
      rules2: {
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
        ],
        passwordCopy: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
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
    // 忘记密码-手机
    checkPhone(rule, value, callback) {
      const phone = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!phone.test(value))
        callback(new Error('手机号不正确，请输入正确的手机号!'))
      else
        callback()
    },
    checkEmail(rule, value, callback) {
      const email = /^([a-zA-Z0-9]+[_|.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if (!email.test(value))
        callback(new Error('邮箱不正确,请输入正确的邮箱!'))
      else
        callback()
    },
    checkAutoCode(rule, value, callback) {
      if (value !== this.pwdForm1.autoCode)
        callback(new Error('验证码不正确，请重新输入!'))
      else
        callback()
    },
    checkPwdCopy(rule, value, callback) {
      if (value !== this.pwdForm2.password)
        callback(new Error('两次密码不一致，请重新输入!'))
      else
        callback()
    },
    group(val) {
      val === '0' ? this.pwdForm1.email = '' : this.pwdForm1.phoneNumber = ''
    },
    // 忘记密码-获取验证码
    async fetchAuthCode() {
      const param = {
        extno: this.pwdForm1.account,
        mobile: this.pwdForm1.phoneNumber,
        email: this.pwdForm1.email,
        changepwdway: this.restType,
      }
      try {
        const data = await getVerifycode(param)
        this.disabled = true
        let nums = 60
        let timer = null
        timer = setInterval(() => {
          if (nums === 0 && status !== 0) {
            clearInterval(timer)
            this.disabled = false
            this.sendCode = '获取验证码'
          }
          else {
            this.sendCode = `${nums}秒后重新获取`
            nums--
          }
        }, 1000)
        this.getCode = data.id
        this.usertype = data.usertype
      }
      catch (e) {
        this.$message.error(e.message)
      }
    },
    // 忘记密码提交
    async resetPwd() {
      if (this.resetPwdStep === 0) {
        await this.$refs.pwdForm1.validate()
        const query = {
          extno: this.pwdForm1.account,
          code: this.pwdForm1.autoCode,
          id: this.getCode,
        }
        try {
          await getCheckCode(query)
          this.resetPwdStep = 1
          return
        }
        catch (e) {
          this.resetPwdStep = 0
          this.$message.error(e.message)
          throw e
        }
      }
      if (this.resetPwdStep === 1) {
        await this.$refs.pwdForm2.validate()
        const param = {
          extno: this.pwdForm1.account,
          code: this.pwdForm1.autoCode,
          newpass: this.pwdForm2.password,
          confirmpass: this.pwdForm2.passwordCopy,
          id: this.getCode,
        }
        try {
          await getForgetPwd(param)
          this.resetPwdStep = 2
          this.countDown()
        }
        catch (e) {
          this.resetPwdStep = 1
          this.$message.error(e.message)
          throw e
        }
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
      if (value === '')
        callback(new Error('请输入验证码'))
      else if (value.toLowerCase() !== this.identifyCode.toLowerCase())
        callback(new Error('验证码不正确!'))
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
      await this.$refs.ruleForm.validate()
      const params = {
        extno: this.isFloat(this.ruleForm.passname),
        pwd: this.ruleForm.password,
      }
      try {
        await this.$store.dispatch('user/login', params)
        this.$message.success('登录成功！')
        this.$router.replace({ path: '/home' })
      }
      catch (e) {
        this.$message.error(e.message)
        this.refreshCode()
        this.ruleForm.password = ''
        this.ruleForm.verifycode = ''
        throw e
      }
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
        <div class=" text-center font-extrabold text-size-2xl">
          Online Cargo Insurance
        </div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0px" class="loginForm w-80%">
          <el-form-item prop="passname">
            <el-input v-model="ruleForm.passname" type="passname" clearable autocomplete="off" placeholder="Account" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" type="password" autocomplete="off" clearable placeholder="Password" />
          </el-form-item>
          <el-form-item prop="verifycode" class="verifi">
            <el-input
              v-model="ruleForm.verifycode" clearable placeholder="Verification Code" class="float-left !w-5/6"
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
            <el-button class="w-full" type="danger" @click="submitForm()">
              Login
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible" title="Reset Password" width="600px" class="mt-6" :show-close="true"
      :before-close="handleClose"
    >
      <div class="mx-12" style="height:250px">
        <el-steps class="mb-4" :active="resetPwdStep" finish-status="success" simple>
          <el-step title="验证身份" />
          <el-step title="设置新密码" />
          <el-step title="完成" />
        </el-steps>

        <!--            step 1 -->
        <el-form
          v-show="resetPwdStep === 0" ref="pwdForm1" :model="pwdForm1" :rules="rules1" label-width="100px"
          size="small"
        >
          <el-form-item label="账号" prop="account">
            <el-input v-model="pwdForm1.account" placeholder="输入账号" clearable />
          </el-form-item>
          <el-form-item label="密码重置方式" prop="resource">
            <el-radio-group v-model="restType" @change="group(restType)">
              <el-radio label="0">
                通过短信
              </el-radio>
              <el-radio label="1">
                通过邮箱
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="restType === '0'" label="手机号" prop="phoneNumber">
            <el-input v-model="pwdForm1.phoneNumber" placeholder="输入手机号" clearable />
          </el-form-item>
          <el-form-item v-if="restType === '1'" label="邮箱" prop="email">
            <el-input v-model="pwdForm1.email" placeholder="输入邮箱" clearable />
          </el-form-item>
          <el-form-item label="验证码" prop="autoCode">
            <el-input v-model="pwdForm1.autoCode" style="width: calc(100% - 130px)" clearable placeholder="输入验证码" />
            <el-button class="min-w-form-nav ml-2" size="small" round :disabled="disabled" @click="fetchAuthCode">
              {{ sendCode }}
            </el-button>
          </el-form-item>
        </el-form>
        <!-- step 2 -->
        <el-form
          v-show="resetPwdStep === 1" ref="pwdForm2" :model="pwdForm2" :rules="rules2" label-width="100px"
          size="small"
        >
          <el-form-item label="账号">
            <el-input v-model="pwdForm1.account" disabled clearable />
          </el-form-item>
          <el-form-item prop="password">
            <template #label>
              <span>新密码</span>
              <el-tooltip effect="dark" content="Top Center 提示文字" placement="top">
                <template #content>
                  <div>
                    <p>1、密码长度8位及以上</p>
                    <p>2、大写字母、小写字母、数字及特殊字符, 选3种组合形式</p>
                  </div>
                </template>
                <i class="ml-1 el-icon-warning-outline cursor-pointer" />
              </el-tooltip>
            </template>
            <el-input v-model="pwdForm2.password" placeholder="输新密码" clearable />
          </el-form-item>
          <el-form-item label="确认密码" prop="passwordCopy">
            <el-input v-model="pwdForm2.passwordCopy" placeholder="输入确认密码" clearable />
          </el-form-item>
        </el-form>
        <!--            step 3 -->
        <div v-show="resetPwdStep === 2" class="text-center pt-10">
          <i class="el-icon-success text-green-1 text-6xl" />
          <p class="text-lg">
            新密码设置成功
          </p>
          <p><span class="text-orange-500">{{ second }}</span><span class="text-gray-1">秒后，自动关闭弹窗</span></p>
        </div>
      </div>
      <template #footer>
        <div class="text-center">
          <el-button class="min-w-button" size="mini" round type="primary" @click="resetPwd">
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
:deep() {}

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

::v-deep.el-step.is-simple:not(:last-of-type) .el-step__title {
  max-width: 55%;
}

::v-deep.el-step.is-simple .el-step__icon {
  width: 14px;
  height: 14px;
}

::v-deep.el-step.is-simple .el-step__title {
  font-size: 14px;
}

::v-deep.el-button.is-disabled {
  color: #244AA9;
}
</style>
