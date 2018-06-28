<!-- personDetail.vue -->
<style scoped lang="less">
.el-form-item {
  margin-bottom: 0px;
}

.el-main {
  padding-top: 0px;
}
.bottomLine{
  border-bottom: 1px dashed #ccc;
}

.insureBottom {}

</style>
<template>
  <div id="addPerson" class="detail-main">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="3">
            <router-link :to="{path: '/purchaseCenter/supplierManage/supplierManageAll'}">
              <div class="go-return icon-back"></div>
            </router-link>
          </el-col>
          <el-col :span="18">
            <p>客户详情</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-form class="addheaduserform" label-width="145px" :model="supplierData" status-icon>
          <div class="detail-list detail-form">
            <div class="detail-form-title">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  基本资料
                </el-col>
                <el-col :span="6" class="text-right">
                  <el-button type="primary" size="mini" @click="goEditDetail(0)">编辑该条</el-button>
                </el-col>
              </el-row>
            </div>
            <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="供应商名称:">
                  <div class="detail-form-item">{{supplierData.supplier_name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="供方简称:">
                  <div class="detail-form-item">{{supplierData.supplier_short_name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人:">
                  <div class="detail-form-item">{{supplierData.contact}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="联系电话:">
                  <div class="detail-form-item">{{supplierData.contact_phone}}</div>
                </el-form-item>
              </el-col>
             <el-col :span="8">
                <el-form-item label="地址:">
                  <div class="detail-form-item">{{supplierData.address}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- </el-form> -->
          </div>
          <div class="detail-list detail-form">
            <div class="detail-form-title">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  合同信息
                </el-col>
                <el-col :span="6" class="text-right">
                  <el-button type="primary" size="mini" @click="goEditDetail(1)">编辑该条</el-button>
                </el-col>
              </el-row>
            </div>
            <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="合同编号:" prop="qualification_certificate_number">
                    <div class="detail-form-item">{{supplierData.contract_no}}</div>
                  </el-form-item>
                </el-col>
                 <el-col :span="8">
                  <el-form-item label="合同类型:" prop="qualification_certificate_number">
                    <div class="detail-form-item" v-if="supplierData.supplier_type&&supplierData.supplier_type.verbose">{{supplierData.supplier_type.verbose}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同起始日期:">
                    <div class="detail-form-item">{{supplierData.contract_date}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
               <el-row :gutter="40">
                 <el-col :span="8">
                  <el-form-item label="合同截止日期:">
                    <div class="detail-form-item">{{supplierData.contract_life}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="合同地址:">
                  <div class="detail-form-item">{{supplierData.contract_address}}</div>
                </el-form-item>
              </el-col>
              </el-row>
              
            <!-- </el-form> -->
          </div>
          <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'supplierManageDetalis',

  data() {
    return {
      supplierData: {
        
      },
      paddingloading: false
    }
  },
  created() {
    this.getDetail();
  },
  computed: {
    supplierId: function() {
      return this.$route.query.supplierId;
    }
  },
  methods: {
    getDetail: function() {
      this.paddingloading = true;
      this.$$http('getSupplierDetlis', { id: this.supplierId }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.supplierData = results.data.data;
          this.paddingloading = false;
        } else {
          this.paddingloading = false;
          Message.error("获取数据失败");
        }
      }).catch(() => {
        this.paddingloading = false;
      })

    },
    goEditDetail: function(number) {
      this.$router.push({ path: "/purchaseCenter/supplierManage/supplierManageAll/supplierManageEditAdd?activeStep=" + number + "&supplierId=" + this.supplierId });
    },

  }
}

</script>
