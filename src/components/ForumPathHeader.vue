<template>
  <div class="forum-path-header">
    <router-link 
      v-for="(segment, index) in path" 
      :to="`/forum/${encodedPathFor(index)}`"
      :key="index">
      {{ segmentTextFor(index) }}
    </router-link>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import { encodeForumPath } from '../../../decent-forum-api/src'
export default Vue.extend({
  props: {
    path: { 
      type: Array as () => string[],
      required: true, 
    },
  },
  created() {
    console.log('FORUM');
    console.log(this.path);
  },
  methods: {
    encodedPathFor(idx: number) {
      return encodeForumPath(this.path.slice(0, idx+1));
    },
    segmentTextFor(idx: number) {
      return `${this.path[idx]}${idx < this.path.length-1 ? ' > ' : ''}`;
    }
  }
})

</script>