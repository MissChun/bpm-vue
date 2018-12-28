<style type="text/css" scoped lang="less">
.basic-data{
  margin: 50px 0 50px 80px;
  .basic-data-list{
    width:360px;
    //background:#ccc;
  }
  .update-btn{
    width: 45%;
    font-size: 16px;
  }
}
</style>
<template>
  <div class="nav-tab">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基础信息" name="basicData">
        <el-form class="" label-width="80px" v-if="activeName==='basicData'" ref="editMsgForm" :rules="rules" :model="editMsgForm" status-icon>
          <div class="tab-screen">
            <div class="basic-data" v-if="editStatus.basicData">
              <div class="basic-data-list">
                <el-form-item label="电话:">
                  <div>{{users.user_info.mobile_number}}</div>
                </el-form-item>
              </div>
              <div class="basic-data-list">
                <el-form-item label="姓名:">
                  <div>{{users.user_info.nick_name}}</div>
                </el-form-item>
              </div>
              <div class="basic-data-list">
                <el-form-item label="用户名:">
                  <div>{{users.username}}</div>
                </el-form-item>
              </div>
              <div class="basic-data-list">
                <el-form-item label="邮箱:">
                  <div>{{users.user_info.email}}</div>
                </el-form-item>
              </div>
              <div class="basic-data-list">
                <el-form-item label="部门:">
                  <div>{{users.user_info.department}}<span class="text-secondary ml-30" v-if="!users.is_leader">（修改请联系管理员）</span></div>
                </el-form-item>
              </div>
              <div class="basic-data-list">
                <el-form-item label="职位:">
                  <div>{{users.user_info.position}}<span class="text-secondary ml-30" v-if="!users.is_leader">（修改请联系管理员）</span></div>
                </el-form-item>
              </div>
              <div class="basic-data-list">
                <el-form-item label="">
                  <el-button type="primary" class="update-btn ml-30" @click="updateBtn('basicData',false)">修改</el-button>
                </el-form-item>
              </div>
            </div>
            <div class="basic-data" v-else>
              <div class="basic-data-list">
                <el-form-item label="电话:" prop="mobile_phone">
                  <el-input v-model.trim="editMsgForm.mobile_phone" type="text" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="basic-data-list">
                <el-form-item label="姓名:" prop="nick_name">
                  <el-input v-model.trim="editMsgForm.nick_name" type="text" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="basic-data-list">
                <el-form-item label="用户名:" prop="username">
                  <el-input v-model.trim="editMsgForm.username" type="text" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="basic-data-list">
                <el-form-item label="邮箱:" prop="email">
                  <el-input v-model.trim="editMsgForm.email" type="text" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="basic-data-list">
                <el-form-item label="部门:" prop="department">
                  <el-select v-model="editMsgForm.department" placeholder="请选择" v-loading="departmentLoading" v-if="users.is_leader">
                    <el-option v-for="(item,key) in departmentData" :key="item.id" :label="item.department_name" :value="item.id"></el-option>
                  </el-select>
                  <div v-else>{{users.user_info.department}}<span class="text-secondary ml-30">（修改请联系管理员）</span></div>
                </el-form-item>
              </div>
              <div class="basic-data-list">
                <el-form-item label="职位:" prop="position">
                  <el-select v-model="editMsgForm.position" placeholder="请选择" v-loading="positionLoading" v-if="users.is_leader">
                    <el-option v-for="(item,key) in positionData" :key="item.id" :label="item.position_name" :value="item.id"></el-option>
                  </el-select>
                  <div v-else>{{users.user_info.position}}<span class="text-secondary ml-30">（修改请联系管理员）</span></div>
                </el-form-item>
              </div>
              <div class="basic-data-list">
                <el-form-item label="" class="text-center">
                  <el-button @click="updateBtn('basicData',true)" class="update-btn">取消</el-button>
                  <el-button type="primary" class="update-btn" @click="updateBasicData" :disabled="basicDataSubmitBtn.isDisabled" :loading="basicDataSubmitBtn.isLoading">{{basicDataSubmitBtn.btnText}}</el-button>
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="updatePassword">
        <el-form class="" label-width="110px" v-if="activeName==='updatePassword'" ref="passwordForm" :rules="passwordRules" :model="passwordForm" status-icon>
          <div class="tab-screen">
            <div class="basic-data">
              <div class="basic-data-list">
                <el-form-item label="原密码:" prop="old_pwd">
                  <el-input v-model.trim="passwordForm.old_pwd" type="password" placeholder="请输入原密码"></el-input>
                </el-form-item>
              </div>
              <div class="basic-data-list">
                <el-form-item label="新密码:" prop="new_pwd">
                  <el-input v-model.trim="passwordForm.new_pwd" type="password" placeholder="请输入新密码"></el-input>
                </el-form-item>
              </div>
              <div class="basic-data-list">
                <el-form-item label="再次输入密码:" prop="confirm_pwd">
                  <el-input v-model.trim="passwordForm.confirm_pwd" type="password" placeholder="请再次输入密码"></el-input>
                </el-form-item>
              </div>
              <div class="basic-data-list">
                <el-form-item label="" class="text-center">
                  <el-button type="primary" class="update-btn" @click="updatePassword" :disabled="passwordSubmitBtn.isDisabled" :loading="passwordSubmitBtn.isLoading">{{passwordSubmitBtn.btnText}}</el-button>
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
  export default {
    name:'personalSettings',
    computed: {

    },
    data(){
      const isSpace = (rule, value, callback) => {
        if (value.indexOf(" ") != -1) {
          callback(new Error('密码不能包含空格'));
        } else {
          callback();
        }
      };
      const validateConfirmPass = (rule, value, callback) => {
        if (value === this.passwordForm.new_pwd) {
          callback();
        } else if (value.indexOf(" ") != -1) {
          callback(new Error('密码不能包含空格'));
        } else {
          callback(new Error("两次输入的密码不一致，请重新输入"));
        }
      };
      return {
        pageLoading: false,
        departmentLoading: false,
        positionLoading: false,
        activeName:'basicData',
        departmentData:{},//部门职位列表
        positionData:{},//职位列表
        users:{},//用户信息
        editStatus:{
          basicData:true,
          password:true
        },
        basicDataSubmitBtn:{
          btnText:'确定',
          isDisabled:false,
          isLoading:false
        },
        passwordSubmitBtn:{
          btnText:'确定',
          isDisabled:false,
          isLoading:false
        },
        editMsgForm:{
          mobile_phone:'',
          email:'',
          username:'',
          nick_name:'',
          position:'',
          department:'',

        },
        passwordForm:{
          old_pwd: '',
          new_pwd: '',
          confirm_pwd:'',
        },
        passwordRules:{
          old_pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            // { pattern: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/, message: '密码长度6-16位，支持数字、字母、字符(除空格),至少包含2种', trigger: 'blur' },
            // { pattern: this.$store.state.common.regular.password.match, message: this.$store.state.common.regular.password.tips, trigger: 'blur' },
            // { validator: isSpace, trigger: 'blur' },
          ],
          new_pwd: [
            { required: true, message: '请设置新登录密码', trigger: 'blur' },
            { pattern: this.$store.state.common.regular.password.match, message: this.$store.state.common.regular.password.tips, trigger: 'blur' },
            { validator: isSpace, trigger: 'blur' },
          ],
          confirm_pwd: [
            { required: true, message: '请再次输入你的密码', trigger: 'blur' },
            { validator: validateConfirmPass, trigger: 'blur' }
          ],
        },
        rules:{

          nick_name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 5, message: '姓名为1-5字', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { pattern: this.$store.state.common.regular.username.match, message: this.$store.state.common.regular.username.tips, trigger: 'blur' }
          ],
          mobile_phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { pattern: this.$store.state.common.regular.phone.match, message: this.$store.state.common.regular.phone.tips, trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { pattern: this.$store.state.common.regular.email.match, message: this.$store.state.common.regular.email.tips, trigger: 'blur' }
          ],
          department: [
            { required: true, message: '请选择部门', trigger: 'blur' },
          ],
          position: [
            { required: true, message: '请选择职位', trigger: 'blur' },
          ]
        }
      }
    },
    created() {
      this.users = this.pbFunc.getLocalData('user',true);
    },
    methods: {
      handleClick(targetName) {

      },
      updateBtn(type,status){
        this.editMsgForm = {
          mobile_phone:this.users.user_info.mobile_number,
          email:this.users.user_info.email,
          username:this.users.username,
          nick_name:this.users.user_info.nick_name,
          position:this.users.user_info.position_id,
          department:this.users.user_info.department_id,
          old_pwd: '',
          new_pwd: '',
          confirm_pwd:'',
        }
        if(type==='basicData'){
          this.editStatus.basicData = status;
          if(this.users.is_leader&&!status){
            this.getDepartmentList();
            this.getPositionList(this.users.user_info.department_id);
          }
        }else if(type==='password'){
          this.editStatus.password = status;
        }
      },
      getDepartmentList: function() {
        this.departmentLoading = true;
        this.$$http('getDepartmentList', { pagination: false }).then((results) => {
          if (results.data && results.data.code == 0) {
            this.departmentData = results.data.data.data;
            this.departmentLoading = false;
            // for(let i in this.departmentData){

            // }
          }
        }).catch((err) => {
          this.departmentLoading = false;
          this.$message.error('获取部门列表失败');
        })
      },
      getPositionList: function(departmentId) {
        let postData = {
          need_all: true,
          department: departmentId
        }
        this.positionLoading = true;
        this.$$http('getPositionList', postData).then((results) => {
          this.positionLoading = false;
          if (results.data && results.data.code == 0) {
            this.positionData = results.data.data;
          }
        }).catch((err) => {
          this.$message.error('获取职位列表失败');
        })
      },
      updateUser(postData,submitBtn,type){
        submitBtn = {
          btnText:'提交中',
          isDisabled:true,
          isLoading:true
        }
        this.$$http('updateUserInfo', postData).then((results) => {
          submitBtn = {
            btnText:'确定',
            isDisabled:false,
            isLoading:false
          }
          if (results.data && results.data.code == 0) {
            if(type === 'basicData'){
              results.data.data.user.user_info = results.data.data.user_info;
              this.pbFunc.setLocalData('user', results.data.data.user, true);
              this.users = results.data.data.user;
              this.editStatus.basicData = true;
              if (results.data.data.user && results.data.data.user.menus && results.data.data.user.menus.length) {
                this.pbFunc.setLocalData('menuList', results.data.data.user.menus, true);
              }
              if(this.$refs['editMsgForm']){
                this.$refs['editMsgForm'].clearValidate();　　　　
              }
            }else if(type==='password'){
              this.passwordForm = {
                old_pwd: '',
                new_pwd: '',
                confirm_pwd:'',
              };
              if(this.$refs['passwordForm']){
                this.$refs['passwordForm'].clearValidate();　　　　
              }
            }
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }else{
            this.$message.error(results.data.msg);
          }

        }).catch((err) => {
          submitBtn = {
            btnText:'确定',
            isDisabled:false,
            isLoading:false
          }
          this.$message.error('修改失败');
        })
      },
      // 修改基础信息
      updateBasicData(){
        this.$refs['editMsgForm'].validate((valid) => {
          if (valid) {
            let postData = this.editMsgForm;
            postData.id = this.users.id;
            postData = this.pbFunc.fifterObjIsNull(postData);
            this.updateUser(postData,this.basicDataSubmitBtn,'basicData');
          }
        });
      },
      // 修改密码
      updatePassword(){
        this.$refs['passwordForm'].validate((valid) => {
          if (valid) {
            let postData = this.passwordForm;
            postData.id = this.users.id;
            postData = this.pbFunc.fifterObjIsNull(postData);
            this.updateUser(postData,this.passwordSubmitBtn,'password');
          }
        });
      },
    }
  }
</script>
