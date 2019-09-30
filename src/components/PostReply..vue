<template>
  <div class="post-reply">
    <textarea ref="textEditor" @blur="editorBlurred" placeholder="..."></textarea>
    <a role="button">
      Post Reply
      <i class="ri-send-plane-2-line"></i>
    </a>
  </div> 
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  mounted() {
    (this.$refs.textEditor as any).focus();
  },

  methods: {
    editorBlurred(event: any) {
      console.log(event);
      //this.$emit('blur');
    }
  }
})
</script>