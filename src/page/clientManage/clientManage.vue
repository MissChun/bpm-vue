<template>
  <div>
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="自有客户" name="first">
      </el-tab-pane>
      <el-tab-pane label="平台客户" name="tow">
      </el-tab-pane>
    </el-tabs> -->
    <template>
      <router-view></router-view>
    </template>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'carBaseInfo',
  computed: {

  },

  data() {
    return {
      activeName: 'first',
    }
  },
  methods: {
    handleClick: function(tab, event) {
      if (tab.paneName === 'first') {
        this.$router.push({
          path: '/clientManage/privateClientManage'
        });
      } else if (tab.paneName === 'tow') {
        this.$router.push({
          path: '/clientManage/platformClientManage'
        });
      }
    }
  }

}

</script>
<style>


</style>
