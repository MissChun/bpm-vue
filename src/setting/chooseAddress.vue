<template>
  <div>
    <el-row :gutter="0">
      <el-col :md="8">
        <el-select v-model="address.province" @change="provinceChange" size="mini" placeholder="省">
          <el-option v-for="(item,key) in provinceList" :key="key" :label="item.area_name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :md="8">
        <el-select v-model="address.city" @change="cityChange" size="mini" placeholder="市">
          <el-option v-for="(item,key) in cityList" :key="key" :label="item.area_name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :md="8">
        <el-select v-model="address.area" @change="areaChange" size="mini" placeholder="区">
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
      this.$emit('chooseProvince');
    },
    cityChange() {
      //this.getArea();
      this.address.area = '';
      this.$emit('chooseCity');
    },
    areaChange() {
      this.$emit('chooseArea');
    }
  },
  created() {
    this.getProvince();
  },
  props: {
    address: {
      type: Object,
      required: true
    },
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
