<template>
  <div>
    <template v-if="$route.path=='/transportPowerManage/carManage'">
      <div>
        <keep-alive :include="['carHeadManage', 'carTailManage']">
          <carHeadManage></carHeadManage>
        </keep-alive>
      </div>
    </template>
    <template v-else>
      <div>
        <keep-alive :include="['carHeadManage', 'carTailManage']">
          <router-view></router-view>
        </keep-alive>
      </div>
    </template>
  </div>
</template>
</div>
</template>
<script>
export default {
  name: 'carManage',
  components: {
    carHeadManage: () =>
      import ("../../../components/transportPowerManage/carManage/carHeadManage.vue")
  },
  data() {
    return { in: ""
    }
  },
  methods: {
    clicktabs: function() {

    }
  },
  mounted: function() {}

}

</script>
<style>


</style>
