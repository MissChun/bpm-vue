<!-- 选择省市区组件 -->
<!--
  prop:
    chooseProvince: Function,选择省回调，可选
    chooseCity: Function,选择市回调，可选
    chooseArea: Function,选择区回调，可选
    address:Object，返回省市区id，必需
    初始化为address{
      provice:'',
      city:'',
      area:'',
    }
    addressName: Object, 返回省市区area_name，可选
    初始化为addressName{
      provice:'',
      city:'',
      area:'',
    }
    addressCode: Object, 返回省市区area_code，可选
    初始化为addressCode{
      provice:'',
      city:'',
      area:'',
    }
  ex:
    <choose-address :address.sync="address"></choose-address>
    <choose-address :address.sync="address" v-on:chooseProvince="chooseProvince" :addressName.sync="addressName"></choose-address>
 -->
<template>
  <div>
    <el-row :gutter="0">
      <el-col :md="8">
        <el-select v-model="address.province" clearable @change="provinceChange" @clear="clearProvince" placeholder="省">
          <el-option v-for="(item,key) in provinceList" :key="key" :label="item.area_name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :md="8">
        <el-select v-model="address.city" clearable @change="cityChange" @clear="clearCity" placeholder="市">
          <el-option v-for="(item,key) in cityList" :key="key" :label="item.area_name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :md="8">
        <el-select v-model="address.area" clearable @change="areaChange" @clear="clearArea" placeholder="区">
          <el-option v-for="(item,key) in areaList" :key="key" :label="item.area_name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'chooseAddress',
  data() {
    return {
      provinceList: [],
      cityList: [],
      areaList: [],
    }
  },
  methods: {
    getProvince() {
      this.$$http('getProvince').then((results) => {
        if (results.data && results.data.code == 0 && results.data.data) {
          this.provinceList = results.data.data;
        }
      });
    },
    getCity() {
      this.$$http('getCity', {
        id: this.address.province,
      }).then((results) => {
        if (results.data && results.data.code == 0 && results.data.data) {
          this.cityList = results.data.data.cities;
        }
      });
    },
    getArea() {
      this.$$http('getArea', {
        id: this.address.city,
      }).then((results) => {
        if (results.data && results.data.code == 0 && results.data.data) {
          this.areaList = results.data.data.counties;
        }
      });
    },
    clearProvince() {
      this.address.province = '';
      this.address.city = '';
      this.address.area = '';
      if (this.addressName) {
        this.addressName.province = '';
        this.addressName.city = '';
        this.addressName.area = '';
      }
      if (this.addressCode) {
        this.addressName.province = '';
        this.addressCode.city = '';
        this.addressCode.area = '';
      }
      this.cityList = [];
      this.areaList = [];
    },
    clearCity() {
      this.address.city = '';
      this.address.area = '';
      if (this.addressName) {
        this.addressName.city = '';
        this.addressName.area = '';
      }
      if (this.addressCode) {
        this.addressCode.city = '';
        this.addressCode.area = '';
      }
      this.areaList = [];
    },
    clearArea() {
      this.address.area = '';
      if (this.addressName) {
        this.addressName.area = '';
      }
      if (this.addressCode) {
        this.addressCode.area = '';
      }
    },
    provinceChange() {
      //this.getCity();
      this.address.city = '';
      this.address.area = '';
      if (this.addressName) {
        this.addressName.city = '';
        this.addressName.area = '';
        for (let i in this.provinceList) {
          if (this.address.province === this.provinceList[i].id) {
            this.addressName.province = this.provinceList[i].area_name;
            break;
          }
        }
      }
      if (this.addressCode) {
        this.addressCode.city = '';
        this.addressCode.area = '';
        for (let i in this.provinceList) {
          if (this.address.province === this.provinceList[i].id) {
            this.addressCode.province = this.provinceList[i].area_name;
            break;
          }
        }
      }
      this.$emit('chooseProvince');
    },
    cityChange() {
      //this.getArea();
      this.address.area = '';

      if (this.addressName) {
        this.addressName.area = '';
        for (let i in this.cityList) {
          if (this.address.city === this.cityList[i].id) {
            this.addressName.city = this.cityList[i].area_name;
            break;
          }
        }
      }
      if (this.addressCode) {
        this.addressCode.area = '';
        for (let i in this.cityList) {
          if (this.address.city === this.cityList[i].id) {
            this.addressCode.city = this.cityList[i].area_name;
            break;
          }
        }
      }
      this.$emit('chooseCity');
    },
    areaChange() {
      if (this.addressName) {
        for (let i in this.areaList) {
          if (this.address.area === this.areaList[i].id) {
            this.addressName.area = this.areaList[i].area_name;
            break;
          }
        }
      }
      if (this.addressCode) {
        for (let i in this.areaList) {
          if (this.address.area === this.areaList[i].id) {
            this.addressCode.area = this.areaList[i].area_name;
            break;
          }
        }
      }
      this.$emit('chooseArea');
    }
  },
  created() {
    this.getProvince();
  },
  props: {
    address: Object, //返回id
    addressName: Object, //返回area_name
    addressCode: Object, //返回area_code
    chooseProvince: Function,
    chooseCity: Function,
    chooseArea: Function,
  },
  watch: {
    'address.province': function(val, oldVal) {
      if (val) {
        this.getCity();
      }
    },
    'address.city': function(val, oldVal) {
      if (val) {
        this.getArea();
      }
    }
  }
}

</script>
<style scoped>


</style>
