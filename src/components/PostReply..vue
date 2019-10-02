<template>
  <div ref="ourBox" class="post-reply">
    <textarea ref="textEditor" v-model="content" placeholder="..."></textarea>
    
    <a v-if="!validationErrors" role="button" @click=post>
      Post Reply
      <i class="ri-send-plane-2-line"></i>
    </a>

    <a
      v-else 
      role="button"
      v-tooltip="{ 
          trigger: 'click hover', 
          autoHide: true, 
          hideOnTargetClick: true, 
          delay: { show: 100, hide: 100 }, 
          content: validationErrors, 
          placement: 'top',
        }"
      >
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
    showing: {
      type: Boolean,
      default: false,
    }
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
      console.log(el);
      if ( el !== target && !el.contains(target)) {
        console.log('matched');
        if (this.showing) {
          this.$emit('blur', {});
        }
      }
    }
  },  

  computed: {
    validationErrors: function() {
      let errors: string[] = []; 
      if (!this.shared.user.loggedIn) {
        errors.push('- You are not logged in');
      }
      if (this.content.length < 1) {
        errors.push('- Ths content of this post too short!');
      }
      return errors.join('<br>');
    }
  }

})
</script>