<style scoped lang="less">


</style>
<template>
  <div>
    <keep-alive :include="['landMarkList', 'landmarkMap']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'landMark',
  computed: {


  },
  data() {
    return {

    }
  },
  methods: {

  },

}

</script>
