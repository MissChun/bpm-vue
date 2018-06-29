<template>
  <div class="out-contain">
    <el-form class="search-filters-form" label-width="80px" :model="searchFilters" status-icon>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input placeholder="请输入" v-model="searchFilters.keyword" @keyup.native.13="startSearch">
            <el-select v-model="searchFilters.field" slot="prepend" placeholder="请选择">
              <el-option v-for="(item,key) in fieldSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
          </el-input>
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
        <el-form class="addheaduserform detail-form" label-width="120px" ref="stationForm" :rules="rules" :model="formData" status-icon>
          <el-row>
            <el-col :span="20">
              <el-form-item label="站点名称:" prop="position_name">
                <el-input placeholder="请输入" type="text" v-model="formData.position_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="实际站点:" prop="map_position">
                <span>{{formData.map_position}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="站点类型:" prop="station_type">
                <el-select v-model="formData.station_type" placeholder="请选择">
                  <el-option v-for="(item,key) in stationTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="客户简称:" prop="customer">
                <el-select v-model="formData.station_type" placeholder="请选择">
                  <el-option v-for="(item,key) in stationTypeSelect" :key="key" :label="item.verbose" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="联系电话:" prop="consignee">
                <el-input placeholder="请输入" type="text" v-model="formData.consignee"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="联系电话:" prop="consignee_phone">
                <el-input placeholder="请输入" type="text" v-model="formData.consignee_phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="地址:">
                <span>{{addressDetail.address}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="启用状态:">
                <el-switch v-model="formData.is_active"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="dialog-footer text-center">
          <el-button type="primary" @click="editStation" :loading="submitBtn.isLoading" :disabled="submitBtn.isDisabled">{{submitBtn.btnText}}</el-button>
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
export default {
  name: 'stationManageEditAdd',
  computed: {
    id: function() {
      return this.$route.query.id || '';
    },
    pageTitle: function() {
      return this.$route.query.id ? '编辑客户站点' : '新增客户站点';
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
      },
      landmarkDetail: {},
      customerList: [],
      siteList: [],
      searchBtn: {
        isDisabled: false,
        isLoading: false,
        text: '搜索'
      },
      fieldSelect: [{
          key: 'position_name',
          verbose: '实际站点',
        },
        {
          key: 'address',
          verbose: '地址',
        },
      ],
      showLeftWindow: true,
      formData: {
        position_name: '',
        map_position: '',
        station_type: '',
        customer: '',
        consignee: '',
        consignee_phone: '',
        is_active: true,
      },
      addressDetail: {},
      submitBtn: {
        isLoading: false,
        isDisabled: false,
        btnText: '保存并退出',
      },
      stationTypeSelect: [{
          key: 'trade',
          verbose: '贸易',
        },
        {
          key: 'dealer',
          verbose: '终端',
        },
        {
          key: 'other',
          verbose: '其他',
        },
      ],
      rules: {
        position_name: [
          { required: true, message: '请输入地标名称', trigger: 'blur' },
          { pattern: /^([\u4E00-\u9FA5A-Za-z0-9]{0,10})$/gi, message: '地标名称为1～10个字符', trigger: 'blur' },
        ],
        map_position: [
          { required: true, message: '请选择实际液厂', trigger: 'blur' },
        ],
        customer: [
          { required: true, message: '请选择客户', trigger: 'blur' },
        ],
        gas_type: [
          { required: true, message: '请选择气种', trigger: 'change' },
        ],
        consignee: [
          { pattern: /^([\u4E00-\u9FA5A-Za-z0-9]{0,20})$/gi, message: '联系人为1～20个字符', trigger: 'blur' },
        ],
        consignee_phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { pattern: /^\d{3,4}-?\d{7,8}$/, message: '联系电话为11位手机号码/座机号码', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: '/mapManage/landmark/landmarkList' });
      }
    },

    getAllSiteList: function() {
      return new Promise((resolve, reject) => {
        let postData = {
          //pagination: false,
          confirm_status: 'SUCCESS',
          position_type: 'DELIVER_POSITION',
          simplify: true,
          page_size: 100,
          page: 1,
        };

        if (this.searchFilters.keyword.length) {
          postData.position_name = this.searchFilters.keyword;
        }

        this.pageLoading = true;

        this.$$http('getLandMarkList', postData).then((results) => {
          console.log('this.pageLoading', this.pageLoading);
          this.pageLoading = false;
          if (results.data && results.data.code == 0) {
            this.siteList = results.data.data.results;
            if (!this.siteList.length) {
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

    startSearch: function() {
      this.searchBtn.isDisabled = true;
      this.searchBtn.loading = true;
      this.searchBtn.text = '搜索中';


      this.getAllSiteList().then((data) => { //展示该数据
        this.renderMarker();
        this.searchBtn.isDisabled = false;
        this.searchBtn.loading = false;
        this.searchBtn.text = '搜索';
      })


    },
    getInfoWindowDom: function(data) {
      let mark_type = (data.mark_type && data.mark_type.verbose) ? data.mark_type.verbose : '无';
      let check_status = (data.check_status && data.check_status.verbose) ? data.check_status.verbose : '无';
      let mark_source = (data.mark_source && data.mark_source.verbose) ? data.mark_source.verbose : '无';
      let is_synced = data.is_synced ? '已同步' : '未同步';
      let infoBodyStr = '<div class="fs-13">地标类型：' + mark_type +
        '</div><div class="fs-13">地标位置：' + data.address +
        '</div><div class="fs-13">审核状态：' + check_status +
        '</div><div class="fs-13">上传来源：' + mark_source +
        '</div><div class="fs-13">是否同步：' + is_synced +
        '</div></div>';

      return infoBodyStr;
    },
    initMarkList: function() {

      let _this = this;
      AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow', 'control/BasicControl'],
        function(MarkerList, SimpleMarker, SimpleInfoWindow, BasicControl) {

          _this.map.addControl(new BasicControl.Zoom({
            position: 'lt', //left top，左上角
            showZoomNum: true //显示zoom值
          }));

          let $ = MarkerList.utils.$; //即jQuery/Zepto

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
            console.log('info', info);
            if (info.selected) {
              let infoWindow = _this.markerList.getInfoWindow();
              let id = info.selected.data.id;
              _this.getLandmarkDetail(id).then((results) => {
                console.log('detailresults', results);
                let infoBodyStr = _this.getInfoWindowDom(_this.landmarkDetail);
                infoWindow.setInfoBody(infoBodyStr);

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
        this.markerList.render(this.siteList);
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

      this.map.setFitView(this.allMakers);

    },
    editStation: function() {
      this.$refs['stationForm'].validate((valid) => {
        if (valid) {

          let apiName = this.id ? 'patchLandMarkDetail' : 'addLandmark';

          this.addEditStationAjax(apiName);

        } else {
          this.submitBtn.isDisabled = false;
        }
      });
    },
    addEditStationAjax: function(apiName) {
      return new Promise((resolve, reject) => {
        let postData = {
          position_name: this.formData.position_name,
          position_type: this.formData.position_type,
          longitude: this.addressDetail.longitude,
          latitude: this.addressDetail.latitude,
          address: this.addressDetail.address,
          contacts: this.formData.contacts,
          tel: this.formData.tel,
          source_type: 'PLATFORM',
          province: this.addressDetail.province,
          city: this.addressDetail.city,
          county: this.addressDetail.county,
        };

        if (apiName === 'addLandmark' && this.formData.position_type === 'LNG_FACTORY') {
          postData.gas_type = this.formData.gas_type;
        }

        if (apiName === 'patchLandMarkDetail') {
          postData.id = this.id;
          delete postData.source_type;
          delete postData.position_type;
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
              this.$router.push({ path: '/mapManage/landmark/landmarkList' });
            } else {
              this.$router.push({ path: `/mapManage/landMark/landmarkDetail/${this.id}` });
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

  },

  created() {

  },
  mounted: function() {
    this.map = new AMap.Map('map-container', {
      zoom: 5
    });

    this.initMarkList();

    this.getAllSiteList().then(() => {
      this.renderMarker();
    })


  },
};

</script>
<style scoped lang="less">
.out-contain {
  position: relative;
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
  top: 280px;

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
  top: 100px;
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
