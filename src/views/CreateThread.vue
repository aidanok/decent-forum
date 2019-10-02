<template>
  <div class="create-thread-page">
    <div class="forum-content-page-top-bar">
      <forum-path-header :path=path extraSegment="New Post"></forum-path-header>
    </div>
     <new-post :path=path :shared=shared @posted="threadPosted"></new-post>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SharedState } from '@/ui-lib';
export default Vue.extend({
  props: {
    shared: {
      type: Object as () => SharedState,
      required: true
    },
    path: {
      type: Array as () => string[],
      required: true
    },
  },

  methods: {
    threadPosted: function() {
      this.$router.go(-1);
    }
  }
})
</script>