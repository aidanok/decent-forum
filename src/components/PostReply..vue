<template>
  <div ref="ourBox" class="post-reply">
    <textarea ref="textEditor" v-model="content" placeholder="..."></textarea>
    <a role="button" @click=post>
      Post Reply
      <i class="ri-send-plane-2-line"></i>
    </a>
  </div> 
</template>

<script lang="ts">

import Vue from 'vue'
import { postPost, PostTreeNode, buildPostTags } from 'decent-forum-api';
import { CurrentUser, LoggedInUser, SharedState } from '../ui-lib';
import { buildPostTagsForReply } from '../../../decent-forum-api/src/lib/post';

export default Vue.extend({

  props: {
    replyToNode: {
      type: Object as () => PostTreeNode,
      required: true,
    },
    shared: {
      type: Object as () => SharedState,
      required: true,
    },
  },

  data:() => ({
    content: ''
  }),

  mounted() {
    // Focus once we attach to dom 
    (this.$refs.textEditor as any).focus();
    
    // blerg.. setTimeout. otherwise we get triggerd on open.
    // TODO: fix with something better.
    setTimeout(() => {
      document.addEventListener('click', this.documentClick);
    }, 100);
    
  },

  beforeDestroy() {
    document.removeEventListener('click', this.documentClick);
  },

  methods: {

    async post() {
      
      const tags = buildPostTagsForReply(this.replyToNode, { format: 'Plaintext' })
      if (this.shared.user.loggedIn) {
        const id = await postPost(this.shared.user.wallet!, this.content, tags, this.shared.tracker);
        this.$emit('posted-reply', id);
      }
    },

    documentClick(e: any) {
      let el = this.$refs.ourBox as Element;
      let target = e.target;    
      if ( el !== target && !el.contains(target)) {
        this.$emit('blur', {});
      }
    }
  },  

})
</script>