<!-- staffDialog.vue -->
<!-- staffDialog -->
<template>
  <div>
    <el-dialog :title="title" :visible="staffDialog.isShow" width="30%" center :before-close="closeBtn" :close-on-click-modal="false">
      <div class="tms-dialog-form">
        <el-form class="tms-dialog-content" label-width="100px" :rules="rules" :model="staffRules" status-icon ref="staffRules">
          <el-form-item label="电话：" prop="phone">
            <el-input placeholder="请输入" v-model="staffRules.phone" :disabled="staffDialog.type==='update'?true:false" onkeyup="this.value=this.value.replace(/\s+/g,'')">
            </el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="nick_name">
            <el-input placeholder="请输入" v-model="staffRules.nick_name" onkeyup="this.value=this.value.replace(/\s+/g,'')">
            </el-input>
          </el-form-item>
          <el-form-item label="初始密码：" prop="password" v-if="staffDialog.type==='add'">
            <el-input placeholder="请输入" type="password" v-model="staffRules.password" onkeyup="this.value=this.value.replace(/\s+/g,'')">
            </el-input>
          </el-form-item>
          <el-form-item label="初始密码修改：" v-else>
            <el-input placeholder="请输入" type="password" v-model="staffRules.password" onkeyup="this.value=this.value.replace(/\s+/g,'')">
            </el-input>
          </el-form-item>
          <el-form-item label="用户名：" prop="username">
            <el-input placeholder="请输入" v-model="staffRules.username" onkeyup="this.value=this.value.replace(/\s+/g,'')">
            </el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input placeholder="请输入" v-model="staffRules.email" onkeyup="this.value=this.value.replace(/\s+/g,'')">
            </el-input>
          </el-form-item>
          <el-form-item label="部门：" prop="department">
            <el-select v-model="staffRules.department" filterable placeholder="请选择" @change="getPositionList">
              <el-option v-for="(item,key) in departmentList" :key="key" :label="item.group_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位：" prop="carrier_role">
            <el-select v-model="staffRules.carrier_role" filterable placeholder="请选择">
              <el-option v-for="(item,key) in positionList" :key="key" :label="item.role_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取 消</el-button>
        <el-button type="primary" @click="editDepartment" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'staffDialog',
  props: {
    staffDialog: {
      type: Object,
      required: true
    },
    departmentList: {
      type: Array,
      required: true
    },
    staffRow: {
      type: Object,
      required: false
    },
    closeDialogBtn: Function,
  },
  data: function() {
    const isSpace = (rule, value, callback) => {
      if (value.indexOf(" ") != -1) {
        callback(new Error('密码不能包含空格'));
      } else {
        callback();
      }
    };
    return {
      operation: this.staffDialog.type,
      staffRules: {
        username: '',
        password: '',
        nick_name: '',
        phone: '',
        email: '',
        department: '',
        carrier_role: ''
      },
      positionList: [], //职位列表
      passwordInfo: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { pattern: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/, message: '密码长度6-16位，支持数字、字母、字符（除空格）,至少包含2种', trigger: 'blur' },
        { validator: isSpace, trigger: 'blur' },
      ],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /([\u4E00-\u9FA5A-Za-z0-9]{4,20})$/gi, message: '用户名为4-20个字符，支持中文、字母、数字', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/, message: '密码长度6-16位，支持数字、字母、字符（除空格）,至少包含2种', trigger: 'blur' },
          { validator: isSpace, trigger: 'blur' },
        ],
        nick_name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 5, message: '姓名为1-5字', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '手机号码格式不正确，请重新输入', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '邮箱格式不正确，请重新输入', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择部门', trigger: 'blur' },
        ],
        carrier_role: [
          { required: true, message: '请选择职位', trigger: 'blur' },
        ]
      },
      submitBtn: {
        btnText: '确 定',
        isDisabled: false,
        isLoading: false
      },
      title: '新增员工'
    }
  },
  computed: {

  },
  methods: {
    closeBtn: function() {
      this.$emit('closeDialogBtn', this.type);
    },
    editDepartment: function() {
      this.$refs['staffRules'].validate((valid) => {
        if (valid) {
          this.submitBtn.isDisabled = true;
          this.submitBtn.btnText = '提交中';
          this.submitBtn.isLoading = true;
          let apiName = '';
          let postData = {};
          postData = this.staffRules;
          if (this.staffDialog.type === 'add') {
            apiName = 'addStaff';

          } else if (this.staffDialog.type === 'update') {
            apiName = 'updateStaff';
            postData.is_deleted = this.staffRow.is_deleted;
            postData.id = this.staffRow.id;
            if (postData.password === '') {
              delete postData.password;
            }
          }

          this.$$http(apiName, postData).then((results) => {
            console.log('部门', results.data);
            // this.pageLoading = false;
            this.submitBtn.btnText = '确 定';
            this.submitBtn.isLoading = false;
            this.submitBtn.isDisabled = false;
            if (results.data && results.data.code == 0) {
              this.$message({
                message: this.staffDialog.type === 'add' ? '新增员工成功，该员工操作权限为所属职位权限' : '修改员工信息成功',
                type: 'success'
              });
              this.$emit('closeDialogBtn', true);
            }

          }).catch((err) => {
            this.submitBtn.btnText = '确 定';
            this.submitBtn.isLoading = false;
            this.submitBtn.isDisabled = false;
            this.$message.error(this.staffDialog.type === 'add' ? '新增员工失败' : '修改员工信息失败');
          })

        } else {
          this.submitBtn.isDisabled = false;
        }
      });
    },
    // 获取职位列表
    getPositionList: function() {
      let postData = {
        pagination: false,
        department: this.staffRules.department
      }
      this.$$http('getPositionList', postData).then((results) => {
        if (results.data && results.data.code == 0) {
          this.positionList = results.data.data;

        }
      }).catch((err) => {
        this.$message.error('获取部门列表失败');
      })
    },
  },
  watch: {
    staffDialog: {
      handler(val, oldVal) {　　　　　　
        console.log('编辑', val, oldVal)
        if (val.isShow && val.type === 'update') {
          console.log('staffRow', this.staffRow)
          this.staffRules = {
            username: this.staffRow.username,
            password: '',
            nick_name: this.staffRow.nick_name,
            phone: this.staffRow.phone,
            email: this.staffRow.email,
            department: this.staffRow.department.id,
            carrier_role: this.staffRow.carrier_role.id
          }
          delete this.rules.password;
          this.getPositionList();
          // this.staffRules.group_name = this.departmentRow.group_name;
          this.title = '修改员工';
        } else {
          this.title = '新增员工';
          this.staffRules = {
            username: '',
            password: '',
            nick_name: '',
            phone: '',
            email: '',
            department: '',
            carrier_role: ''
          }
          this.rules.password = this.passwordInfo;
          // this.staffRules.group_name = '';
        }　　　　
      },
      　　　　deep: true

    }
  },
  created: function() {

  }
}

</script>
<style scoped lang="less">


</style>
