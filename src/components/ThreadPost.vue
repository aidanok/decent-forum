<template>
  
  <div class="thread-post">
    
    <div class="thread-post-time">
      {{ postNode.post.date | moment('from') }}
    </div>

    <wallet-address class="thread-post-from" :address=postNode.post.from></wallet-address>
    
    <div class="thread-post-info">   
    </div>

    <div class="thread-post-content"> 
      {{ postNode.post.content }}
    </div>

    <div class="thread-post-footer">
    </div>

    <!-- TODO Make these top level grid items to allow for full customization -->
    <div class="thread-post-vote">
      <a role="button" @click="replying = !replying" class="thread-post-reply-button">
        Reply <i class="ri-reply-line"></i>
      </a>
      <i class="ri-thumb-up-line"></i>
      <i class="ri-thumb-down-line"></i>
    </div>

    <post-reply v-if="replying">
    </post-reply>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { PostTreeNode } from 'decent-forum-api';
import moment from 'moment';
import { CurrentUser, SharedState } from '../ui-types';
import { wrapGrid } from 'animate-css-grid';

export default Vue.extend({
  props: {
    postNode: {
      type: Object as () => PostTreeNode,
      required: true,
    },
    shared: {
      type: Object as () => SharedState,
      required: true, 
    },
  },

  data: () => ({
    replying: true,
  })
})
</script>