<template>
  <view>
    <my-login v-if="!token"></my-login>
    <my-userInfo v-else></my-userInfo>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import badegMix from '@/mixins/tabbar-badge.js'
  export default {
    mixins: [badegMix],
    data() {
      return {

      }
    },
    computed: {
      ...mapState('m_user', ['token'])
    }
  }
</script>

<style lang="scss">

</style>