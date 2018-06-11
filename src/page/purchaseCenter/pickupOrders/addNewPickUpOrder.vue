<style scoped lang="less">
.left-arrow-d {
  height: 80px;
  line-height: 80px;
  text-align: center;
  cursor: pointer;
}

.stepTitle {
  background-color: rgb(235, 238, 245);
  height: 40px;
  text-align: center;
  font-size: 18px;
  line-height: 40px;
}

.icon-down-arrow {
  font-size: 35px;
  color: rgb(222, 222, 222);
  vertical-align: middle;
  transform: rotate(90deg);
  display: inline-block;
}



.right-arrow-d {
  height: 80px;
  line-height: 80px;
  text-align: center;
  pointer: cursor;
}

.el-header p {
  font-size: 25px;
  text-align: center;
  height: 80px;
  line-height: 80px;
  margin: 0 0;
}

.el-main {
  padding-top: 0;
}

.detail-main {
  margin: 30px 5%;
  .el-input {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}

</style>
<template>
  <div class="detail-main">
    <el-container>
      <el-header style="height:80px">
        <el-row>
          <el-col :span="1" class="left-arrow-d"><i class="icon-down-arrow" v-on:click="goOrderList"></i></el-col>
          <el-col :span="22">
            <p>新增提货单</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-loading="loadingArr.pageLoading">
        <el-form class="addPickOrder" label-width="125px" :model="pickOrderParam" status-icon :rules="rules" rel="addPickOrderForm">
          <div class="detail-form-title">
            <el-row>
              <el-col :span="24" class="text-center">
                提货计划详情
              </el-col>
            </el-row>
          </div>
          <el-row class="mt-20">
            <el-col :span="7" :offset="3">
              <el-form-item label="供应商名称:" prop="supplier">
                <el-select v-model="pickOrderParam.supplier" filterable placeholder="请选择" @change="searchList()" v-loading="loadingArr.supplierLoading">
                  <el-option v-for="(item,key) in selectData.supplierList" :key="item.id" :label="item.supplier_name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="3">
              <el-form-item label="液厂:" prop="fluid_id">
                <el-select v-model="pickOrderParam.fluid" filterable placeholder="请选择" v-loading="loadingArr.fluidLoading">
                  <el-option v-for="(item,key) in selectData.fluidList" :key="item.id" :label="item.fluid_name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7" :offset="3">
              <el-form-item label="计划时间:" prop="plan_time">
                <el-date-picker v-model="pickOrderParam.plan_time" type="datetime" placeholder="选择日期时间" default-time="12:00:00" value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="3">
              <el-form-item label="需求车辆:" prop="require_car_number">
                <el-input placeholder="请输入" type="text" v-model="pickOrderParam.require_car_number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7" :offset="3">
              <el-form-item label="计划吨位:" prop="plan_tonnage">
                <el-input placeholder="请输入" type="text" v-model="pickOrderParam.plan_tonnage"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="3">
              <el-form-item label="采购价:" prop="unit_price">
                <el-input placeholder="请输入" type="text" v-model="pickOrderParam.unit_price"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7" :offset="3">
              <el-form-item label="采购优惠:" prop="discount_price">
                <el-input placeholder="请输入" type="text" v-model="pickOrderParam.discount_price"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="3">
              <el-form-item label="备注:" prop="mark">
                <el-input placeholder="请输入" type="textarea" v-model="pickOrderParam.mark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="detail-form-title">
            <el-row>
              <el-col class="text-center">
                卸货计划详情
              </el-col>
            </el-row>
          </div>
          <el-row class="mt-20">
            <el-col :span="7" :offset="3">
              <el-form-item label="卸货区域:" prop="unload_area">
                <el-select v-model="pickOrderParam.unload_area" filterable placeholder="请选择" v-loading="loadingArr.unloadLoading">
                  <el-option v-for="(item,key) in selectData.unloadList" :key="item.id" :label="item.area_name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="detail-form-title">
            <el-row>
              <el-col :span="24" class="text-center">
                托运计划
              </el-col>
            </el-row>
          </div>
          <el-row class="mt-20">
            <el-col :span="10" :offset="3">
              <el-form-item label="承运方式:" prop="consignment_type">
                <el-radio v-model="pickOrderParam.consignment_type" label="own" border>只有贸易</el-radio>
                <el-radio v-model="pickOrderParam.consignment_type" label="external" border>外部承运</el-radio>
                <!--  <el-radio v-model="pickOrderParam.consignment_type" label="together" border>共同承运</el-radio> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="13" :offset="3">
              <el-form-item label="承运方式:" v-loading="loadingArr.carriersLoading">
                <el-col :span="13" v-if="pickOrderParam.consignment_type=='own'||pickOrderParam.consignment_type=='together'" :offset="1">
                  <el-form-item label="自有:" label-width="60px">
                    <el-select v-model="carriersParam.ownCarriers" filterable placeholder="请选择" >
                      <el-option v-for="(item,key) in selectData.carriersOwnList" :key="item.id" :label="item.carrier_name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="13" :offset="1" v-if="pickOrderParam.consignment_type=='external'||pickOrderParam.consignment_type=='together'">
                  <el-form-item label="外部:" label-width="60px">
                    <el-select v-model="carriersParam.extendCarriers" filterable placeholder="请选择" >
                      <el-option v-for="(item,key) in selectData.carriersOutList" :key="item.id" :label="item.carrier_name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" :offset="9">
              <el-button type="success" @click="goOrderList">取消</el-button>
              <el-button type="primary" @click="upOrder" style="margin-left:20px;">提交</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'addNewPickUpOrder',
  data() {
    return {
      loadingArr: {
        supplierLoading: false,
        pageLoading: false,
        unloadLoading: false,
        fluidLoading: false,
        carriersLoading: false
      },
      pickOrderParam: {
        supplier: "",
        fluid: "",
        plan_time: '',
        require_car_number: '',
        trader: '',
        consignment_type: 'own',
        plan_tonnage: '',
        discount_price: '',
        unit_price: '',
        mark: '',
        unload_area: ''
      },
      carriersParam: {
        ownCarriers: "",
        extendCarriers: ""
      },
      rules: [],
      selectData: {
        supplierList: [],
        fluidList: [],
        unloadList: [],
        carriersOwnList: [],
        carriersOutList: []
      }
    };
  },
  computed: {

  },
  methods: {
    goOrderList: function() {
      this.$router.push({ path: "/purchaseCenter/pickupOrders/ordersList" });
    },
    upOrder: function() {
      var carriers = [];
      if (this.pickOrderParam.consignment_type == 'own') {
        if (this.carriersParam.ownCarriers) {
          carriers = [this.carriersParam.ownCarriers];
        }
      } else if (this.pickOrderParam.consignment_type == 'external') {
        if (this.carriersParam.extendCarriers) {
          carriers = [this.carriersParam.extendCarriers];
        }
      }
      var sendData = this.pbFunc.deepcopy(this.pickOrderParam);
      sendData.carriers = carriers;
      this.loadingArr.pageLoading = true;
      this.$$http("cratePickUpOrder", sendData).then((results) => {
        this.loadingArr.pageLoading = false;
        if (results.data.code == 0) {
          this.$message({
            message: '创建托运单成功',
            type: 'success'
          });
          this.$router.push({ path: "/purchaseCenter/pickupOrders" });
        }
      }).catch(() => {
        this.loadingArr.pageLoading = false;
      });
    },
    searchList: function() {
      this.getFulid(this.pickOrderParam.supplier);
    },
    getFulid: function(supplierId) {
      var sendData = {};
      if (supplierId) {
        sendData.supplier_id = supplierId;
      }
      this.loadingArr.fluidLoading = true;
      this.$$http("getFulid", sendData).then((results) => {
        this.loadingArr.fluidLoading = false;
        if (results.data.code == 0) {
          var dataBody = results.data.data;
          this.selectData.fluidList = dataBody;
        }
      }).catch(() => {
        this.loadingArr.fluidLoading = false;
      });
    },
    getSupplier: function() {
      var sendData = {};

      this.loadingArr.supplierLoading = true;
      this.$$http("getSupplier", sendData).then((results) => {
        this.loadingArr.supplierLoading = false;
        if (results.data.code == 0) {
          var dataBody = results.data.data;
          this.selectData.supplierList = dataBody;
        }
      }).catch(() => {
        this.loadingArr.supplierLoading = false;
      });

    },
    getCarriers: function() {
      var sendData = {};
      this.loadingArr.carriersLoading = true;
      sendData.carrier_type = "own";
      this.$$http("getCarriers", sendData).then((results) => {
        this.loadingArr.carriersLoading = false;
        if (results.data.code == 0) {
          var dataBody = results.data.data.data;
          this.selectData.carriersOwnList = dataBody;
        }
      }).catch(() => {
        this.loadingArr.carriersLoading = false;
      });
      sendData.carrier_type = "external";
      this.$$http("getCarriers", sendData).then((results) => {
        this.loadingArr.carriersLoading = false;
        if (results.data.code == 0) {
          var dataBody = results.data.data.data;
          this.selectData.carriersOutList = dataBody;
        }
      }).catch(() => {
        this.loadingArr.carriersLoading = false;
      });
    },
    getUnload: function(trader) {
      var sendData = {};
      sendData.trader = trader;
      this.$$http("getUnload", sendData).then((results) => {
        this.loadingArr.unloadLoading = false;
        if (results.data.code == 0) {
          var dataBody = results.data.data.data;
          this.selectData.unloadList = dataBody;
        }
      }).catch(() => {
        this.loadingArr.unloadLoading = false;
      });
    },
    getTrade: function() {
      var sendData = {};
      var vm = this;
      this.loadingArr.unloadLoading = true;
      this.$$http("getCompanies", sendData).then((results) => {
        if (results.data.code == 0) {
          vm.pickOrderParam.trader = results.data.data.data[0].id;
          vm.getUnload(results.data.data.data[0].id);
        }
      });
    },
  },
  created() {
    this.getSupplier();
    //this.getFulid();
    this.getTrade();
    this.getCarriers();
    //this.getUnload();
  }
};

</script>
