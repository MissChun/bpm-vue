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
.whiteSpan {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
</style>
<template>
  <div id="addPerson" class="detail-main">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="3">
            <router-link :to="{path: '/businessManage/customerManage/customerPayManageAll'}">
              <div class="go-return icon-back"></div>
            </router-link>
          </el-col>
          <el-col :span="18">
            <p>客户详情</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-form class="addheaduserform" label-width="145px" :model="customerPayData" status-icon>
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
              <el-col :span="6" >
                <el-form-item label="付款方名称:">
                  <div class="detail-form-item whiteSpan" >{{customerPayData.payer}}</div>
                </el-form-item>
              </el-col>
              <el-col :span="6" class="">
                <el-form-item label="客户名称:">
                  <div class="detail-form-item" v-if="customerPayData.consumer&&customerPayData.consumer.length>0" >
                    <el-row>
                      <el-col v-for="(item,index) in customerPayData.consumer" :key="item.id" class="whiteSpan" :title="item.consumer_name">{{item.consumer_name}}</el-col>
                    </el-row>
                  </div>
                  <div class="detail-form-item" v-else v-html="pbFunc.dealNullData('')"></div>
                </el-form-item>
              </el-col>

               <el-col :span="6">
                <el-form-item label="客户简称:">
                  <div class="detail-form-item" v-if="customerPayData.consumer&&customerPayData.consumer.length>0" >
                    <el-row>
                      <el-col v-for="(item,index) in customerPayData.consumer" :key="item.short_name" class="whiteSpan" :title="item.short_name">{{item.short_name}}</el-col>
                    </el-row>
                  </div>
                  <div class="detail-form-item" v-else v-html="pbFunc.dealNullData('')"></div>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="业务员:">
                  <div class="detail-form-item" v-if="customerPayData.consumer&&customerPayData.consumer.length>0" >
                    <el-row>
                      <el-col v-for="(item,index) in customerPayData.consumer" :key="item.consumer_name" class="whiteSpan" :title="item.sale_man_name">{{item.sale_man_name}}</el-col>
                    </el-row>
                  </div>
                  <div class="detail-form-item" v-else v-html="pbFunc.dealNullData('')"></div>
                </el-form-item>
              </el-col>

            </el-row>
           
            <!-- </el-form> -->
          </div>
         
        
            <!-- <el-form class="addheaduserform" label-width="120px" ref="addClientFormSetpOne" :rules="rules" :model="userData" status-icon> -->
         
          
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
      customerPayData: {
        
      },
      paddingloading: false
    }
  },
  created() {
    this.getDetail();
  },
  computed: {
    customerPayId: function() {
      return this.$route.query.customerPayId;
    }
  },
  methods: {
    getDetail: function() {
      this.paddingloading = true;
      this.$$http('getCustomerPayDetlis', { id: this.customerPayId }).then((results) => {
        if (results.data && results.data.code == 0) {
          this.customerPayData = results.data.data;
          
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
      this.$router.push({ path: "/businessManage/customerManage/customerPayManageAll/customerPayManageEditAdd?activeStep=" + number + "&customerPayId=" + this.customerPayId +"&operate=edit"});
    },

  }
}

</script>
