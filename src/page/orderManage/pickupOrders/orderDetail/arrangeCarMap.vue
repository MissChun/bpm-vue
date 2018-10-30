<style scoped lang="less">


</style>
<template>
  <div class="tab-screen">
    <div>
      <div class="nav-tab">
        <el-tabs v-model="activeName" type="card" @tab-click="clicktabs">
          <el-tab-pane label="列表" name="first">
          </el-tab-pane>

        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'arrangeCarMap',
  data() {
    return {
      activeName: 'second',
    }
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    }
  },
  methods: {
    clicktabs: function(targetName) {
      if (targetName.name == 'first') {
        this.$router.push({ path: `/orderManage/pickupOrders/orderDetail/arrangeCarTab/arrangeCarList/${this.id}` });
      }
    },
  },
  activated: function() {
    this.activeName = 'second';
  },
  created: function() {

  }
}

</script>
