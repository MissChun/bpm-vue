<style scoped>

</style>
<template>

</template>
<script>
export default {
  name: 'publicHeader',
  props: {},

  data: function() {

    return {

    }
  },
  computed: {
    users: function() {
      // console.log('users', this.pbFunc.getLocalData('user',true));
      return this.pbFunc.getLocalData('user', true);
    }

  },
  methods: {

  }
}

</script>

