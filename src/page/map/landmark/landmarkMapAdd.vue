<template>
  <div>
    <div id="map-container"></div>
    <div class='map-panel'>
      <input id='map-search-input' placeholder="点击地图显示地址/输入地址显示位置" value="" @change="inputChangeFun" />
      <div id='map-message'></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'landmarkMapAdd',
  computed: {


  },
  data() {
    return {
      map: '',
      placeSearch: '',
      geocoder: '',
    }
  },
  methods: {

    initMap: function() {
      let _this = this;
      _this.map = new AMap.Map('map-container', {
        zoom: 5
      });
      _this.addMark = new AMap.Marker({
        map: ctrl.map,
        icon: '../../../img/location.svg',
        visible: false,
      })
      /*搜索的自动提示*/
      AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.ToolBar', 'AMap.Scale', 'AMap.OverView', 'AMap.Geocoder'], function() {
        _this.map.addControl(new AMap.ToolBar());

        _this.map.addControl(new AMap.Scale());

        _this.map.addControl(new AMap.OverView({
          isOpen: true
        }));

        let autoOptions = {
          city: "", //城市，默认全国
          input: "map-search-input" //使用联想输入的input的id
        };

        let autocomplete = new AMap.Autocomplete(autoOptions);

        _this.placeSearch = new AMap.PlaceSearch({ //构造地点查询类
          city: "", //城市
        });

        _this.map.on('click', _this.mapClickFun);


        AMap.event.addListener(autocomplete, "select", function(e) {

          inputEle.value = e.poi.name;
          _this.inputChangeFun(e);

        });

      });


      _this.map.setFitView();
    },
    inputChangeFun: function() {
      let _this = this;
      _this.placeSearch.search(address, function(status, result) {

        if (status == 'complete' && result.poiList && result.poiList.pois && result.poiList.pois.length) {

          _this.addMark.setPosition(result.poiList.pois[0].location);

          _this.map.setCenter(_this.addMark.getPosition());

          mapMessage.innerHTML = '';

          _this.setMapZoom();
        } else {
          mapMessage.innerHTML = '无法获取位置'
        }

      });
    }

  },
  created: function() {

  },
  mounted: function() {
    this.initMap();
  }

}

</script>
<style scoped lang="less">
#map-container {
  width: 100%;
  height: 700px;
}

</style>
