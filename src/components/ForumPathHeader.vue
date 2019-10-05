<template>
  <div class="forum-path-header">
    
    <router-link to="/">All Forums</router-link> 
    
    <span class="forum-path-header-seperator"></span>

    <span v-for="(segment, index) in path" :key="index">
      <router-link 
        :to="{ name: 'forum', params: { forum: encodedPathFor(index) } }"
        :key="index">
        {{segment}}</router-link>
    
    <span v-if="extraSegment || index !== path.length - 1" class="forum-path-header-seperator">
    </span>
    </span>

    <span v-if="extraSegment">
      {{extraSegment}}
    </span>
    
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import { encodeForumPath } from 'decent-forum-api'
export default Vue.extend({
  props: {
    path: { 
      type: Array as () => string[],
      required: true, 
    },
    extraSegment: {
      type: String, 
      default: '',
    }
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