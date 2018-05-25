<template>
  <div>
    <el-row :gutter="0">
      <el-col :md="8">
        <el-select v-model="address.province" @change="provinceChange" placeholder="省">
          <el-option v-for="(item,key) in provinceList" :key="key" :label="item.area_name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :md="8">
        <el-select v-model="address.city" @change="cityChange" placeholder="市">
          <el-option v-for="(item,key) in cityList" :key="key" :label="item.area_name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :md="8">
        <el-select v-model="address.area" @change="areaChange" placeholder="区">
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
          console.log('this.provinceList', this.provinceList);
        }
      });
    },
    getCity() {
      this.$$http('getCity', {
        province_id: this.address.province,
      }).then((results) => {
        if (results.data && results.data.code == 0 && results.data.data) {
          this.cityList = results.data.data.cities;
          console.log('this.cityList', this.cityList);
        }
      });
    },
    getArea() {
      this.$$http('getArea', {
        city_id: this.address.city,
      }).then((results) => {
        if (results.data && results.data.code == 0 && results.data.data) {
          this.areaList = results.data.data.counties;
          console.log('this.areaList', this.areaList);
        }
      });
    },
    provinceChange() {
      //this.getCity();
      this.address.city = '';
      this.address.area = '';
      if (this.addressName) {
        for (let i in this.provinceList) {
          if (this.address.province === this.provinceList[i].id) {
            this.addressName.province = this.provinceList[i].area_name;
            break;
          }
        }
      }
      if (this.addressCode) {
        for (let i in this.provinceList) {
          if (this.address.province === this.provinceList[i].id) {
            this.addressCode.province = this.provinceList[i].area_name;
            break;
          }
        }
      }
      console.log('this.address', this.address.province)
      this.$emit('chooseProvince');
    },
    cityChange() {
      //this.getArea();
      this.address.area = '';
      this.$emit('chooseCity');
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
    },
    areaChange() {
      if (this.addressName) {
        for (let i in this.cityList) {
          if (this.address.city === this.cityList[i].id) {
            this.addressName.city = this.cityList[i].area_name;
            break;
          }
        }
      }
      if (this.addressCode) {
        for (let i in this.cityList) {
          if (this.address.city === this.cityList[i].id) {
            this.addressCode.city = this.cityList[i].area_name;
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
      console.log('provinceval, oldVal', val, oldVal);
    },
    'address.city': function(val, oldVal) {
      if (val) {
        this.getArea();
      }
      console.log('provinceval, oldVal', val, oldVal);
    }
  }
}

</script>
<style scoped>


</style>
