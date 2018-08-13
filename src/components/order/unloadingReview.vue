<style scoped lang="less">
.loading-review-container {
  /deep/ .el-date-editor.el-input {
    width: 100%;
  }
}

</style>
<template>
  <div class="loading-review-container">
    <el-form ref="examinePoundForm" :model="surePound" status-icon :label-position="'right'" label-width="100px">
      <el-row>
        <el-col :span="20" :offset="2">
          <el-row>
            <el-col :span="5" :offset="1" v-for="item in imgList" :key="item.id">
              <router-link target="_blank" :to="imgReviewSrc">
                <img :src="item" style='width:100%;max-height:100px'></img>
              </router-link>
            </el-col>
          </el-row>
          <el-col :span="20" :offset="2">
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="2">
          <router-link target="_blank" :to="imgReviewSrc">
            <img :src="surePound.image_url" style='width:100%;max-height:500px'></img>
          </router-link>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="计划到站时间:">
            {{surePound.business_order && surePound.business_order.plan_arrive_time || surePound.plan_time}}
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="实际到站时间:">
            <el-date-picker v-if="isEdit" v-model="surePound.active_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            <span v-if="!isEdit">{{surePound.active_time || '无'}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="计划站点:">
            {{surePound.business_order && surePound.business_order.station || surePound.station}}
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="卸车完成时间:">
            <el-date-picker v-if="isEdit" v-model="surePound.work_end_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            <span v-if="!isEdit">{{surePound.work_end_time || '无'}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="站点地址:">
            {{surePound.business_order && surePound.business_order.station_address || surePound.station_address}}
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="离站时间:">
            <el-date-picker v-if="isEdit" v-model="surePound.leave_time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            <span v-if="!isEdit">{{surePound.leave_time || '无'}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="计划卸车吨位:">
            {{surePound.business_order && surePound.business_order.plan_tonnage || surePound.plan_tonnage}}
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="实际里程:">
            <el-input v-if="isEdit" placeholder="请输入" type="text" v-model="surePound.weight_active_mile"></el-input>
            <span v-if="!isEdit">{{surePound.weight_active_mile || '无'}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="计划卸车车号:">
            {{surePound.transPowerInfo && surePound.transPowerInfo.tractor && surePound.transPowerInfo.tractor.plate_number || surePound.plate_number}}
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="卸车毛重(吨):">
            <el-input v-if="isEdit" placeholder="请输入" type="text" v-model="surePound.gross_weight"></el-input>
            <span v-if="!isEdit">{{surePound.gross_weight || '无'}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="主驾:">
            <span>{{surePound.transPowerInfo && surePound.transPowerInfo.master_driver && surePound.transPowerInfo.master_driver.name ||surePound.master_driver}}&nbsp;&nbsp;{{surePound.transPowerInfo && surePound.transPowerInfo.master_driver && surePound.transPowerInfo.master_driver.mobile_phone ||surePound.master_driver_phone}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="卸车皮重(吨):">
            <el-input v-if="isEdit" placeholder="请输入" type="text" v-model="surePound.tare_weight"></el-input>
            <span v-if="!isEdit">{{surePound.tare_weight || '无'}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="副驾/押运:">
            <span>{{surePound.transPowerInfo && surePound.transPowerInfo.vice_driver && surePound.transPowerInfo.vice_driver.name || surePound.copilot_name}}&nbsp;&nbsp;{{surePound.transPowerInfo && surePound.transPowerInfo.vice_driver && surePound.transPowerInfo.vice_driver.mobile_phone || surePound.copilot_driver_phone}}</span>
            <br v-if="(surePound.transPowerInfo && surePound.transPowerInfo.vice_driver && surePound.transPowerInfo.vice_driver.name) || surePound.copilot_name">
            <span>{{surePound.transPowerInfo && surePound.transPowerInfo.escort_staff && surePound.transPowerInfo.escort_staff.name || surePound.supercargo_name}}&nbsp;&nbsp;{{surePound.transPowerInfo && surePound.transPowerInfo.escort_staff && surePound.transPowerInfo.escort_staff.mobile_phone || surePound.supercargo_phone}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="卸车净重(吨):">
            <el-input v-if="isEdit" placeholder="请输入" type="text" v-model="surePound.net_weight"></el-input>
            <span v-if="!isEdit">{{surePound.net_weight || '无'}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: center;" v-if="isEdit">
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" @click="sendRe()" :loading="buttonLoading">确 定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'unloadingReview',
  data() {
    return {
      buttonLoading: false,
      imgList: [],
      surePound: {},
    };
  },
  props: {
    surePoundData: Object,
    successCallback: Function,
    cancel: Function,
    isEdit: Boolean,
  },
  computed: {
    imgReviewSrc: function() {
      return `/imgReview?imgList=${this.imgList.join(',')}`;
    }
  },
  methods: {
    getImg() {
      let qustArray = [];
      this.imgList = [];
      //获取卸车榜单
      if (this.surePound.weight_note) {
        this.$$http("getPundList", { id: this.surePound.weight_note }).then(results => {
          if (results.data.code == 0) {
            let imageUrlArray = results.data.data.data;
            imageUrlArray.map((img, i) => {
              this.imgList.push(img.image_url);
            })
          }
        });
      }

    },
    sendRe() { //审核通过
      let sendData = {
        active_time: this.surePound.active_time,
        //work_start_time: this.surePound.work_start_time,
        work_end_time: this.surePound.work_end_time,
        gross_weight: this.surePound.gross_weight,
        tare_weight: this.surePound.tare_weight,
        net_weight: this.surePound.net_weight,
        leave_time: this.surePound.leave_time || null,
        active_mile: this.surePound.weight_active_mile || null,
        is_checked: 'pass',
        id: this.surePound.weight_note || '',
      };

      if (!this.surePound.weight_note) return;

      this.buttonLoading = true;
      this.$$http("examineLoad", sendData).then(results => {
        this.buttonLoading = false;
        if (results.data.code == 0) {
          this.$message({
            type: "success",
            message: "审核通过成功"
          });

          this.$emit('successCallback');
          this.$emit('close');
        }
      }).catch((err) => {
        this.buttonLoading = false;
      });

    }
  },
  created() {
    this.surePound = Object.assign({}, this.surePoundData);
    this.getImg();
  },
  watch: {
    surePoundData: {
      handler(val, oldVal) {
        this.surePound = Object.assign({}, this.surePoundData);
        this.getImg();
      },
      deep: true　
    },
  }
};

</script>
