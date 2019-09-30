<template>
  <!-- These css vars DONT get inherited.. boo ! -->
  <div 
    v-bind:style="{ cssVars: true }" 
    v-bind:class="{'thread-post-is-root': postNode.isRootPost() }" 
    class="thread-post-container">

  <div v-bind:class="{ 'thread-post-is-root': postNode.isRootPost() }" class="thread-post">
    
    <div v-if="postNode.isRootPost()" class="thread-post-title">
      <h3> {{ postNode.post.tags.description }} </h3>
    </div>

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

    
  </div>
    <post-reply v-if="replying" @blur="replying = false">
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

  

  computed: {
    cssVars: function (): Record<string, any> {
      return {
        "--post-time": moment(this.postNode.post.date).fromNow(),
      }
    }
  },

  data: () => ({
    replying: false,
  })
})
</script>