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
            <router-link :to="{path: '/businessManage/customerManage/customerManageAll'}">
              <div class="go-return icon-back"></div>
            </router-link>
          </el-col>
          <el-col :span="18">
            <p>客户详情</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-form class="addheaduserform" label-width="145px" :model="customerData" status-icon>
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
                <el-form-item label="客户名称:">
                  <div class="detail-form-item">{{customerData.consumer_name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户简称:">
                  <div class="detail-form-item">{{customerData.short_name}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户等级:">
                  <div class="detail-form-item">{{customerData.consumer_level}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="联系人:">
                  <div class="detail-form-item">{{customerData.contact_person}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话:">
                  <div class="detail-form-item">{{customerData.contact_phone}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="分属业务员:">
                  <div class="detail-form-item">{{customerData.sale_man}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="社会统一信用代码:">
                  <div class="detail-form-item">{{customerData.social_credit_code}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="地址:">
                  <div class="detail-form-item" v-if="customerData.consumer_address">{{customerData.consumer_address}}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- </el-form> -->
          </div>
         
          <div class="detail-list detail-form">
            <div class="detail-form-title">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  业务约定
                </el-col>
                <el-col :span="6" class="text-right">
                  <el-button type="primary" size="mini" @click="goEditDetail(1)">编辑该条</el-button>
                </el-col>
              </el-row>
            </div>
            <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="卸车免费等待时长:">
                  <div class="detail-form-item">
                    <span v-if="customerData.free_hour">{{customerData.free_hour}}小时</span>
                    <span v-else v-html="pbFunc.dealNullData('')"></span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="超时计算单价:">
                  <div class="detail-form-item">
                    <span v-if="customerData.waiting_price">{{customerData.waiting_price}}元／小时</span>
                    <span v-else v-html="pbFunc.dealNullData('')"></span>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="亏吨标准:">
                  <div class="detail-form-item">
                    <span v-if="customerData.kui_tons_standard">{{customerData.kui_tons_standard}}kg</span>
                    <span v-else v-html="pbFunc.dealNullData('')"></span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="结算方式:">
                  <div class="detail-form-item">{{customerData.settlement_cycle}}</div>
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
                  <el-button type="primary" size="mini" @click="goEditDetail(2)">编辑该条</el-button>
                </el-col>
              </el-row>
            </div>
            <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="合同编号:" prop="qualification_certificate_number">
                    <div class="detail-form-item">{{customerData.contract_no}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同起始日期:">
                    <div class="detail-form-item">{{customerData.contract_start_date}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同截止日期:">
                    <div class="detail-form-item">{{customerData.contract_end_date}}</div>
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
  name: 'customerManageDetalis',

  data() {
    return {
      customerData: {
        
      },
      paddingloading: false
    }
  },
  created() {
    this.getDetail();
  },
  computed: {
    customerId: function() {
      return this.$route.query.customerId;
    }
  },
  methods: {
    getDetail: function() {
      this.paddingloading = true;
      this.$$http('getCustomerDetlis', { id: this.customerId }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.customerData = results.data.data;
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
      this.$router.push({ path: "/businessManage/customerManage/customerManageAll/customerManageEditAdd?activeStep=" + number + "&customerId=" + this.customerId });
    },

  }
}

</script>
