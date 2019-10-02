<template>
  <div>
    <transition-group name="list" tag="div">
    <interesting-media-row 
      v-for="(obj) in shared.contentWatcher.interesting"
      :key=obj.txId 
      :txId=obj.txId
      :txTags=obj.txTags 
      :mediaConfig=obj.mediaConfig
    >
    </interesting-media-row> 
    </transition-group>
  </div>
</template>
<script lang="ts">

import Vue from 'vue'
import { SharedState } from '../ui-lib'

export default Vue.extend({
  props: {
    shared: {
      type: Object as () => SharedState,
      required: true, 
    }
  }
})

</script>