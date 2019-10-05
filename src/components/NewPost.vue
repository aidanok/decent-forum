<template>
  <div ref="ourBox" class="post-new">
    <input v-model="title" placeholder="Thead title" type=text>
    <textarea ref="textEditor" v-model="content" placeholder="..."></textarea>
    
    <a v-if="!validationErrors" role="button" @click=post>
      Post New Thread
      <i class="ri-send-plane-2-line"></i>
    </a>

    <a
      v-else role="button"
      v-tooltip="{ 
          trigger: 'click hover', 
          autoHide: true, 
          hideOnTargetClick: true, 
          delay: { show: 100, hide: 100 }, 
          content: validationErrors, 
          placement: 'top',
        }"
      >
      Post New Thread
      <i class="ri-send-plane-2-line"></i>
    </a>

  </div>
</template>


<script lang="ts">

import Vue from 'vue'
import { SharedState } from '../ui-lib';
import { buildPostTags, postPost } from '../../../decent-forum-api/src';
export default Vue.extend({
  props: {
    path: {
      type: Array as () => string[],
      required: true, 
    },
    shared: {
      type: Object as () => SharedState,
      required: true, 
    }
  },
  
  data: () => ({
    title: '',
    content: '',
  }),

  methods: {
    async post() {
      if (this.shared.user.loggedIn) {
        const tags = buildPostTags(this.path, { format: 'Plaintext', description: this.title })
        console.log(tags);
        console.log(`^^ Posting New Thread ^^`);
        const txId = await postPost(this.shared.user.wallet!, this.content, tags, this.shared.tracker);
        this.$emit('posted', txId);
      } else {
        throw new Error('post() called when user not logged in');
      }
      
    }
  },

  computed: {
    loggedIn: function(): boolean {
      return this.shared.user.loggedIn
    },
    validationErrors: function() {
      let errors: string[] = []; 
      if (!this.shared.user.loggedIn) {
        errors.push('- You are not logged in');
      }
      if (this.content.length < 1) {
        errors.push('- Ths content of this post too short!');
      }
      if (this.title.length < 2) {
        errors.push('- The title of this post too short!')
      }
      return errors.join('<br>');
    }
  }

})
</script>