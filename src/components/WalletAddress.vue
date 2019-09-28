<template>
  <span>
    <span>{{start}} </span><span>...</span><span> {{end}}</span>
  </span>

</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    address: {
      type: String,
      required: true, 
    }
  },
  computed: {
    start: function(): string {
      return this.address.substr(0, 4);
    },
    end: function(): string {
      return this.address.substr(this.address.length-4);
    }
  }
})
</script>