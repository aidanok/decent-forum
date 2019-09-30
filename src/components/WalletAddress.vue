<template>
  <span>
    <span v-if="!handle">{{start}}</span>
    <span v-else>{{handle}}</span>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
import { queryArweaveId } from 'decent-forum-api/query/arweave-id';
export default Vue.extend({
  props: {
    address: {
      type: String,
      required: false, // SHOULD ACTUALLY BE REQUIRED... 
    }
  },
  
  data: () => ({
    handle: null as string | null
  }),

  created() {
    queryArweaveId(this.address)
      .then(x => this.handle = x.handle)
      .catch(e => {});
  },

  computed: {
    start: function(): string {
      return this.address.substr(0, 7);
    },
    end: function(): string {
      return this.address.substr(this.address.length-4);
    }
  }
})
</script>