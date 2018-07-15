<!-- positionDialog.vue -->
<template>
  <div>
    <el-dialog :title="title" :visible="positionDialog.isShow" width="30%" center :before-close="closeBtn" :close-on-click-modal="false">
      <div class="tms-dialog-form">
        <el-form class="tms-dialog-content" label-width="100px" :rules="rules" :model="positionRules" status-icon ref="positionRules">
          <el-form-item label="部门名称：">
            <div>{{departmentRow.department_name}}</div>
          </el-form-item>
          <el-form-item label="职位名称：" prop="position_name">
            <el-input placeholder="请输入" :autofocus="true" v-model="positionRules.position_name" onkeyup="this.value=this.value.replace(/\s+/g,'')">
            </el-input>
          </el-form-item>
          <el-form-item label="领导职位：" prop="leader">
            <el-select v-model="positionRules.leader" placeholder="请选择">
              <el-option v-for="(item,key) in positionList" :key="key" :label="item.position_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取 消</el-button>
        <el-button type="primary" @click="editposition('positionRules')" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'positionDialog',
  props: {
    positionDialog: {
      type: Object,
      required: true
    },
    positionRow: {
      type: Object,
      required: false
    },
    departmentRow: {
      type: Object,
      required: true
    },
    closeDialogBtn: Function,
  },

  data: function() {

    return {
      type: 'position', //弹窗类型
      operation: this.positionDialog.type,
      positionRules: {
        department: '',
        position_name: '',
        leader: ''
      },
      rules: {
        position_name: [
          { required: true, message: '请输入职位名称', trigger: 'blur' },
          { min: 1, max: 20, message: '职位名称字数为1-20字', trigger: 'blur' }
        ],
      },
      submitBtn: {
        btnText: '确 定',
        isDisabled: false,
        isLoading: false
      },
      title: '新增职位',
      positionList: []
    }
  },
  computed: {

  },
  methods: {
    closeBtn: function() {
      this.$emit('closeDialogBtn', this.type);
    },
    getPositionList(id) {
      let postData = {
        need_all: true,
        department: id
      }
      this.$$http('getPositionList', postData).then((results) => {
        if (results.data && results.data.code == 0) {

          this.positionList = results.data.data;
        }
      }).catch((err) => {})
    },
    editposition: function(positionRules) {
      this.$refs[positionRules].validate((valid) => {
        if (valid) {
          this.submitBtn.isDisabled = true;
          this.submitBtn.btnText = '提交中';
          this.submitBtn.isLoading = true;
          let apiName = '';
          let postData = {};
          if (this.positionDialog.type === 'add') {
            apiName = 'addPosition';
            this.positionRules.department = this.departmentRow.id;
            postData = this.positionRules;
          } else if (this.positionDialog.type === 'update') {
            apiName = 'updatePosition';
            postData = {
              position_name: this.positionRules.position_name,
              id: this.positionRow.id,
              leader: this.positionRules.leader
            }
          }
          this.$$http(apiName, postData).then((results) => {
            // this.pageLoading = false;
            this.submitBtn.btnText = '确 定';
            this.submitBtn.isLoading = false;
            this.submitBtn.isDisabled = false;
            if (results.data && results.data.code == 0) {
              this.$message({
                message: this.positionDialog.type === 'add' ? '新增职位成功！请设置该职位操作的权限' : '编辑职位信息成功！',
                type: 'success'
              });
              this.$emit('closeDialogBtn', this.type, true);
            }

          }).catch((err) => {
            this.submitBtn.btnText = '确 定';
            this.submitBtn.isLoading = false;
            this.submitBtn.isDisabled = false;
            this.$message.error(this.positionDialog.type === 'add' ? '新增职位失败' : '编辑职位信息失败');
          })

        } else {
          this.submitBtn.isDisabled = false;
        }
      });
    }
  },
  watch: {
    positionDialog: {
      handler(val, oldVal) {　　　　　　
        this.getPositionList(this.departmentRow.id)
        if (val.isShow && val.type === 'update') {
          this.positionRules.position_name = this.positionRow.position_name;
          this.positionRules.leader = this.positionRow.leader;
          this.title = '编辑职位';
        } else {
          this.positionRules.position_name = '';
          this.positionRules.leader = '';
          this.title = '新增职位';
        }　　
        if (this.$refs['positionRules']) {
          this.$refs['positionRules'].clearValidate();　　　　
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
