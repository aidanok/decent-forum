<template>
  
  <div class="thread-post">
    <div class="thread-post-info">
      {{ postNode.post.date | moment('from') }} - <wallet-address :address=postNode.post.from></wallet-address>
    </div>
    <div class="thread-post-user">
      User
    </div>
    <div class="thread-post-aux">
      Right sidebar  
    </div>
    <div class="thread-post-content"> 
      {{ postNode.post.content }}
    </div>
    <div class="thread-post-actions">
      Footer
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { PostTreeNode } from 'decent-forum-api';
import moment from 'moment';

export default Vue.extend({
  props: {
    postNode: {
      type: Object as () => PostTreeNode,
      required: true,
    }
  }
})
</script>