<!-- tradeBusiness.vue -->
<template>
  <div>
    <trade-business-list :detail-link="'/serviceManage/businessToExamine/businessDetail'" :is-to-examine="true"></trade-business-list>
  </div>
</template>
<script>
import tradeBusinessList from '@/components/businessManage/tradeBusinessList';
export default {
  components: {
    tradeBusinessList: tradeBusinessList
  },
  computed: {

  },

  data() {
    return {}
  },
  methods: {


  },
  created() {
  }

}

</script>
<style>


</style>
