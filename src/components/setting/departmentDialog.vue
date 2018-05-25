<!-- departmentDialog -->
<template>
  <div>
    <el-dialog :title="title" :visible="departmentDialog.isShow" width="30%" center :before-close="closeBtn" :close-on-click-modal="false">
      <div class="tms-dialog-form">
        <el-form class="tms-dialog-content" label-width="100px" :rules="rules" :model="departmentRules" status-icon ref="departmentRules">
          <el-form-item label="部门名称：" prop="group_name">
            <el-input :autofocus="true" placeholder="请输入" v-model="departmentRules.group_name" onkeyup="this.value=this.value.replace(/\s+/g,'')">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取 消</el-button>
        <el-button type="primary" @click="editDepartment('departmentRules')" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'departmentDialog',
  props: {
    departmentDialog: {
      type: Object,
      required: true
    },
    departmentRow: {
      type: Object,
      required: false
    },
    closeDialogBtn: Function,
  },

  data: function() {

    return {
      type: 'department', //弹窗类型
      operation: this.departmentDialog.type,
      departmentRules: {
        group_name: ''
      },
      rules: {
        group_name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 1, max: 20, message: '部门名称字数为1-20字', trigger: 'blur' }
          // { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/gi, message: '企业名称为中文、英文，不能输入数字、标点符号', trigger: 'blur' },
        ],
      },
      submitBtn: {
        btnText: '确 定',
        isDisabled: false,
        isLoading: false
      },
      title:'新增部门'
    }
  },
  computed: {

  },
  methods: {
    closeBtn: function() {
      this.$emit('closeDialogBtn', this.type);
    },
    editDepartment: function(departmentRules) {
      this.$refs[departmentRules].validate((valid) => {
        if (valid) {
          this.submitBtn.isDisabled = true;
          this.submitBtn.btnText = '提交中';
          this.submitBtn.isLoading = true;
          let apiName = '';
          let postData = {};
          if (this.departmentDialog.type === 'add') {
            apiName = 'addDepartment';
            postData = this.departmentRules;
          } else if (this.departmentDialog.type === 'update') {
            apiName = 'updateDepartment';
            postData = {
              group_name: this.departmentRules.group_name,
              id: this.departmentRow.id
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
                message: this.departmentDialog.type === 'add' ? '新增部门成功！请在该部门下添加职位' : '编辑部门信息成功！',
                type: 'success'
              });
              this.$emit('closeDialogBtn', this.type, true);
            }

          }).catch((err) => {
            this.submitBtn.btnText = '确 定';
            this.submitBtn.isLoading = false;
            this.submitBtn.isDisabled = false;
            this.$message.error(this.departmentDialog.type === 'add' ? '新增部门失败' : '编辑部门信息失败');
          })

        } else {
          this.submitBtn.isDisabled = false;
        }
      });
    }
  },
  watch: {
    departmentDialog: {
      handler(val, oldVal) {　　　　　　
        console.log('编辑', val, oldVal)
        if (val.isShow && val.type === 'update') {

          this.departmentRules.group_name = this.departmentRow.group_name;
          this.title = '编辑部门';
        } else {
          this.title = '新增部门';
          this.departmentRules.group_name = '';
        }　　　　
      }, 　　　　deep: true

    }
  },
  created: function() {

  }
}

</script>
<style scoped lang="less">


</style>
