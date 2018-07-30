<style type="text/css" scoped lang="less">

</style>
<template>
  <div>
    <error :error-obj="errorObj"></error>
  </div>
</template>
<script type="text/javascript">
import error from '@/components/common/error'
export default {
  components: {
    error: error,
  },

  data: function() {
    return {
      errorObj:{
        title:'404',
        desc:'Oops!!您访问的页面找不到了！'
      }
    }
  },
  computed: {

  },
  methods: {

  }
}

</script>
