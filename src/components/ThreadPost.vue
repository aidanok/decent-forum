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
      {{ scoreByVotesAndTime(postNode.post.upVotes, postNode.post.downVotes, postNode.post.date ) }}
    </div>

    <div class="thread-post-content">
      {{ postNode.post.content }}
    </div>

    <div class="thread-post-footer">
    </div>

    <!-- TODO Make these top level grid items to allow for full customization -->
    <!-- TODO removee opacity hack and put in a close button or something -->
    <div class="thread-post-vote">
      <a role="button" 
        v-bind:style="{ 'opacity': replying ? 0.0 : 1.0 }" 
        @click="replying = !replying" 
        class="thread-post-reply-button"
      >
        Reply <i class="ri-reply-line"></i>
      </a>
      <i class="ri-thumb-up-line"></i>
      <i class="ri-thumb-down-line"></i>
    </div>

    
  </div>
    <!-- Use v-show so we keep the state on accidental close -->
    <post-reply v-if="replying" 
      :replyToNode="postNode" 
      :shared="shared" 
      @blur="replying = false"
      @posted-reply=postedReply
    >
    </post-reply>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { PostTreeNode } from 'decent-forum-api';
import moment from 'moment';
import { CurrentUser, SharedState } from '../ui-lib';
import { scoreByVotesAndTime } from 'decent-forum-api/sorting'
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

  methods: {
    postedReply(id: string) {
      this.replying = false;
      this.$emit('posted-reply', id);
    },
    scoreByVotesAndTime(up: number, down: number, t: Date) {
      return scoreByVotesAndTime(up, down, t);
    }
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