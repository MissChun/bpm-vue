<template>
  <div class="out-contain">
    <el-header>
      <el-row>
        <el-col :span="3">
          <router-link :to="{path: '/basicDataManage/supplierManage/supplierFluidsAll/supplierFluidsList'}">
            <div class="go-return icon-back"></div>
          </router-link>
        </el-col>
        <el-col :span="18">
          <p>{{pageTitle }}
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
        </el-col>
      </el-row>
    </el-header>
    <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input placeholder="请输入" v-model="searchFilters.keyword" @keyup.native.13="startSearch">
            <el-select v-model="searchFilters.field" slot="prepend" placeholder="请选择">
              <el-option v-for="(item,key) in fieldSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
            </el-select>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地标区域:" class="map-choose-address">
            <choose-address :address.sync="address" :addressName.sync="addressName"></choose-address>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="startSearch" :loading="searchBtn.loading" :disabled="searchBtn.isDisabled">{{searchBtn.text}}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="map-out-container mt-25">
      <div class="map-loading" v-loading="pageLoading"></div>
      <div id="map-container"></div>
    </div>
    <transition name="fade">
      <div class="landmark-dialog" v-show="showLeftWindow">
        <h4>{{pageTitle}}</h4>
        <el-form class="addheaduserform detail-form" label-width="100px" ref="stationForm" :rules="rules" :model="formData" status-icon>
          <el-row>
            <el-col :span="20">
              <el-form-item label="所属供应商:" prop="supplier">
                <el-select v-model="formData.supplier" clearable filterable :loading="getSupplierLoading" placeholder="请输入选择供应商">
                  <el-option v-for="(item,key) in supplierList" :key="key" :label="item.supplier_name" :value="item.id"></el-option>
                </el-select>
                <!-- <el-select v-model="formData.supplier" clearable filterable remote :loading="getSupplierLoading" placeholder="请输入选择供应商" :remote-method="searchSupplierList">
                  <el-option v-for="(item,key) in supplierList" :key="key" :label="item.supplier_name" :value="item.id"></el-option>
                </el-select> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="供方液厂名:" prop="fluid_name">
                <el-input placeholder="请输入" type="text" v-model="formData.fluid_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="实际液厂:" prop="actual_fluid">
                <span>{{choosedActualFluid.position_name}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="气种:">
                <span>{{choosedActualFluid.gas_type && choosedActualFluid.gas_type.verbose}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="地址:">
                <span>{{choosedActualFluid.address}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="dialog-footer text-center">
          <el-button type="primary" @click="editFluid" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="side-alert-traggle side-alert-traggle-right" v-show="showLeftWindow" @click="showLeftWindow = !showLeftWindow"><span>收起</span></div>
    </transition>
    <transition name="fade">
      <div class="side-alert-traggle side-alert-traggle-left" v-show="!showLeftWindow" @click="showLeftWindow = !showLeftWindow">
        <span>展开</span></div>
    </transition>
  </div>
</template>
<script>
import chooseAddress from '@/components/chooseAddress';
export default {
  name: 'stationManageEditAdd',
  components: {
    chooseAddress: chooseAddress,
  },
  computed: {
    id: function() {
      return this.$route.query.id || '';
    },
    pageTitle: function() {
      return this.$route.query.id ? '编辑供方液厂' : '新增供方液厂';
    }
  },
  data() {
    return {

      map: '',
      markerList: '',
      allMakers: '',
      cluster: '',
      pageLoading: true,
      getCustomerLoading: true,
      searchFilters: {
        keyword: '',
        field: 'position_name',
        actual_fluid: '',
      },
      landmarkDetail: {},

      fluidDetail: {},
      fluidList: [],
      searchBtn: {
        isDisabled: false,
        isLoading: false,
        text: '搜索'
      },
      fieldSelect: [{
        key: 'position_name',
        verbose: '液厂',
      }, ],
      showLeftWindow: false,
      formData: {
        supplier: '',
        fluid_name: '',
      },
      getSupplierLoading: false,
      supplierList: [],
      choosedActualFluid: {},

      submitBtn: {
        isLoading: false,
        isDisabled: false,
        btnText: '保存并退出',
      },

      rules: {
        supplier: [
          { required: true, message: '请选择所属供应商', trigger: 'change' },
        ],
        fluid_name: [
          { required: true, message: '请输入供方液厂名称', trigger: 'blur' },
          { pattern: /^([\u4E00-\u9FA5A-Za-z0-9]{0,20})$/gi, message: '液厂名称为1～20个字符', trigger: 'blur' },
        ],
        actual_fluid: [
          { required: true, message: '请选择实际液厂', trigger: 'change' },
        ],
      },
      address: {
        province: '',
        city: '',
        area: '',
      },
      addressName: {
        province: '',
        city: '',
        area: '',
      },
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: '/mapManage/landmark/landmarkList' });
      }
    },

    getActualFluidList: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          pagination: false,
          confirm_status: 'SUCCESS',
          position_type: 'LNG_FACTORY',
          simplify: true,
        };

        if (this.searchFilters.keyword.length) {
          postData.position_name = this.searchFilters.keyword;
        }

        if (this.addressName.province) {
          postData.province = this.addressName.province;
        }
        if (this.addressName.city) {
          postData.city = this.addressName.city;
        }
        if (this.addressName.area) {
          postData.county = this.addressName.area;
        }

        this.pageLoading = true;

        this.$$http('getLandMarkList', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.fluidList = results.data.data.results;
            if (!this.fluidList.length) {
              this.$message({
                message: '无数据',
                type: 'success'
              });
            }
            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {

          this.pageLoading = false;
          reject(err);
        })

      })
    },


    getLandmarkDetail: function(id) {
      return new Promise((resolve, reject) => {
        let postData = {
          id: id
        };
        this.$$http('getLandMarkDetail', postData).then((results) => {
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.landmarkDetail = results.data.data;
            resolve(results)
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(err);
        })

      })
    },

    startSearch: function() {
      this.searchBtn.isDisabled = true;
      this.searchBtn.loading = true;
      this.searchBtn.text = '搜索中';

      this.getActualFluidList().then((data) => { //展示该数据
        this.renderMarker();
        this.searchBtn.isDisabled = false;
        this.searchBtn.loading = false;
        this.searchBtn.text = '搜索';
      })

    },
    getInfoWindowDom: function(data) {
      let source_type = (data.source_type && data.source_type.verbose) ? data.source_type.verbose : '无';
      let infoBodyStr = '<div class="fs-13 md-5">地标位置：' + data.address +
        '</div><div class="fs-13 md-5">上传来源：' + source_type +
        '</div></div><br><div class="text-right "><a href="javascript:void(0)" class="el-button el-button--primary el-button--mini" id="choose-Actual-fluid">设为供方液厂</a></div>';

      return infoBodyStr;
    },
    initMarkList: function() {

      let _this = this;
      AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow', 'control/BasicControl'],
        function(MarkerList, SimpleMarker, SimpleInfoWindow, BasicControl) {

          _this.map.addControl(new BasicControl.Zoom({
            position: 'rt', //left top，左上角
            showZoomNum: true //显示zoom值
          }));

          let jQuery = MarkerList.utils.$; //即jQuery/Zepto

          _this.markerList = new MarkerList({

            map: _this.map,

            //从数据中读取位置, 返回lngLat
            getPosition: function(item) {
              return [item.location.longitude, item.location.latitude];
            },

            //数据ID，如果不提供，默认使用数组索引，即index
            getDataId: function(item, index) {
              return index;
            },

            getInfoWindow: function(data, context, recycledInfoWindow) {
              let infoTitleStr = '<div class="marker-info-window"><span class="fs-13">' + data.position_name + '</span>';
              let infoBodyStr = '<br><div class="fs-13 text-center">数据加载中...</div><br>';
              if (recycledInfoWindow) {
                recycledInfoWindow.setInfoTitle(infoTitleStr);
                recycledInfoWindow.setInfoBody(infoBodyStr);
                return recycledInfoWindow;
              } else {
                return new SimpleInfoWindow({
                  infoTitle: infoTitleStr,
                  infoBody: infoBodyStr,
                  offset: new AMap.Pixel(0, -37)
                });
              }
            },

            //构造marker用的options对象, content和title支持模板，也可以是函数，返回marker实例，或者返回options对象
            getMarker: function(dataItem, context, recycledMarker) {
              if (recycledMarker) {
                recycledMarker.setIconStyle({
                  src: require('@/assets/img/l_2.png'),
                  style: {
                    width: '20px',
                    height: '20px',
                  }
                });
                recycledMarker.setLabel({
                  content: dataItem.position_name,
                  offset: new AMap.Pixel(30, 0)
                })

                return recycledMarker
              } else {
                return new SimpleMarker({
                  containerClassNames: 'my-marker',
                  iconStyle: {
                    src: require('@/assets/img/l_2.png'),
                    style: {
                      width: '20px',
                      height: '20px',
                    }
                  },
                  label: {
                    content: dataItem.position_name,
                    offset: new AMap.Pixel(30, 0)
                  }
                });
              }
            },

            //marker上监听的事件
            markerEvents: ['click', 'mouseover', 'mouseout'],

            selectedClassNames: 'selected',

            autoSetFitView: false

          });

          _this.markerList.on('selectedChanged', function(event, info) {
            if (info.selected) {
              let infoWindow = _this.markerList.getInfoWindow();
              let id = info.selected.data.id;
              _this.getLandmarkDetail(id).then((results) => {
                let infoBodyStr = _this.getInfoWindowDom(_this.landmarkDetail);
                infoWindow.setInfoBody(infoBodyStr);

                jQuery('#choose-Actual-fluid').on('click', function() {
                  _this.choosedActualFluid = results.data.data;
                  _this.formData.actual_fluid = _this.choosedActualFluid.id;
                  _this.showLeftWindow = true;
                })

              }).catch(() => {
                let infoBodyStr = '<br><div class="fs-13 text-center">数据加载失败</div><br>';
                infoWindow.setInfoBody(infoBodyStr);
              })
              //选中并非由列表节点上的事件触发，将关联的列表节点移动到视野内
              if (!info.sourceEventInfo.isListElementEvent) {

                if (info.selected.listElement) {
                  scrollListElementIntoView($(info.selected.listElement));
                }

              }
            }
          });

        });
    },
    renderMarker: function() {
      const renderAndCluster = () => {
        this.markerList.render(this.fluidList);
        this.map.plugin(["AMap.MarkerClusterer"], () => {
          this.allMakers = this.markerList.getAllMarkers();
          if (this.cluster) {
            this.cluster.setMarkers(this.allMakers);
          } else {
            this.cluster = new AMap.MarkerClusterer(this.map, this.allMakers, {
              minClusterSize: 4,
              maxZoom: 17,
            });
          }

        });
      }
      if (this.markerList) {
        renderAndCluster();
      } else {
        setTimeout(() => {
          this.renderMarker();
        }, 200)
      }

      if (!this.id) {
        this.map.setFitView(this.allMakers);
      }


    },
    editFluid: function() {
      this.$refs['stationForm'].validate((valid) => {
        if (valid) {

          let apiName = this.id ? 'fixFluids' : 'addFluids';

          this.addEditFluidAjax(apiName);

        } else {
          this.submitBtn.isDisabled = false;
        }
      });
    },
    addEditFluidAjax: function(apiName) {
      return new Promise((resolve, reject) => {
        let postData = {
          fluid_name: this.formData.fluid_name,
          supplier: this.formData.supplier,
          actual_fluid: this.choosedActualFluid.id,
        };

        if (apiName === 'fixFluids') {
          postData.id = this.id;
        }

        this.submitBtn.btnText = '提交中';
        this.submitBtn.isLoading = true;

        this.$$http(apiName, postData).then((results) => {
          if (results.data && results.data.code == 0) {
            this.$message({
              message: '保存成功',
              type: 'success'
            });

            if (apiName === 'addLandmark') {
              this.$router.push({ path: '/basicDataManage/supplierManage/supplierFluidsAll/supplierFluidsList' });
            } else {
              this.$router.push({ path: `/basicDataManage/supplierManage/supplierFluidsAll/supplierFluidsList` });
            }

            resolve(results);
          } else {
            reject(results);
          }
          this.submitBtn.btnText = '保存并退出';
          this.submitBtn.isLoading = false;
          this.submitBtn.isDisabled = false;
        }).catch((err) => {
          this.submitBtn.btnText = '保存并退出';
          this.submitBtn.isLoading = false;
          this.submitBtn.isDisabled = false;
          reject(results);
        })

      })
    },

    searchSupplierList: function(query) {

      let postData = {
        need_all: true,
      }
      if (query) {
        postData.supplier_name = query;
      }
      this.getSupplierLoading = true;
      this.$$http('searchSupplierList', postData).then((result) => {
        this.getSupplierLoading = false;
        if (result.data.code == 0) {
          this.supplierList = result.data.data;
        }
      }).catch((error) => {
        this.getSupplierLoading = false;
      });
    },

    getFluidsDetail: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          id: this.id,
        };
        this.$$http('getFluidDetail', postData).then((results) => {
          if (results.data && results.data.code == 0) {

            this.fluidDetail = results.data.data;
            this.formData.supplier = this.fluidDetail.supplier;
            this.formData.fluid_name = this.fluidDetail.fluid_name;

            resolve(results);
          } else {
            reject(results);
          }
        }).catch((err) => {
          reject(results);
        })

      })

    }

  },

  created() {

  },
  mounted: function() {
    this.map = new AMap.Map('map-container', {
      zoom: 5
    });

    this.searchSupplierList();

    this.initMarkList();




    this.getActualFluidList().then(() => {
      this.renderMarker();

      if (this.id) {
        this.showLeftWindow = true;

        this.getFluidsDetail().then(() => {

          if (this.fluidDetail.map_position) {
            this.getLandmarkDetail(this.fluidDetail.map_position).then(() => {
              this.choosedActualFluid = this.landmarkDetail;
              this.formData.actual_fluid = this.choosedActualFluid.id;

              let choosedActualFluidMarker = '';

              this.map.setZoom(15);
              this.map.setCenter([this.landmarkDetail.location.longitude, this.landmarkDetail.location.latitude]);
            });
          } else {
            this.pageLoading = false;
          }

        })
      }
    })


  },
};

</script>
<style scoped lang="less">
.out-contain {
  position: relative;

  .return-box {
    height: 80px;
  }
}

.search-filters-form {
  /deep/ .el-input-group__prepend {
    width: 140px;
    background-color: #fff;
  }
}

.map-out-container {
  width: 100%;
  height: 700px;
  position: relative;

  .map-loading {
    position: absolute;
    height: 50px;
    width: 100%;
    left: 0;
    top: 0;

    /deep/ .el-loading-mask {
      background-color: rgba(250, 250, 250, 0);
    }
  }

  .icon-description {
    padding: 10px;
    position: absolute;
    left: 0px;
    bottom: 10px;
    border-bottom: 300px;
    height: 220px;
    width: 140px;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 9999;

    >div {
      &:nth-child(2) {
        margin-left: 1px;
      }

      line-height: 24px;
      margin-bottom: 4px;

      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }

      span {
        line-height: 24px;
        font-size: 13px;
      }

      i {
        height: 18px;
        width: 18px;
        border-radius: 50%;
        margin: 1px 6px 0 1px;
        font-size: 13px;
      }

      .bg-1 {
        background-color: #47d2d0;
      }

      .bg-2 {
        background-color: #4a9bf8;
      }

      .bg-3 {
        background-color: #f56c6c;
      }

      .bg-4 {
        background-color: #7c8fa0;
      }
    }
  }
}

#map-container {
  width: 100%;
  height: 700px;
}

.map-choose-address {
  /deep/ .el-row {
    padding: 0 !important;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.side-alert-traggle {
  position: absolute;
  top: 470px;

  width: 26px;
  height: 50px;


  line-height: 24px;

  cursor: pointer;
  text-align: center;

  border: 1px solid #4a9bf8;
  border-left: 0 none;
  background-color: #fff;
  color: #4a9bf8;
  z-index: 999;

  span {
    font-size: 16px;
  }
}

.side-alert-traggle-right {
  left: 400px;
}

.side-alert-traggle-left {
  left: 0px;
}

.landmark-dialog {
  position: absolute;
  left: 0;
  top: 250px;
  width: 400px;
  padding-bottom: 30px;
  background-color: #fff;

  h4 {
    text-align: center;
    line-height: 60px;
  }

  /deep/ .el-select {
    display: block;
  }
}

</style>
