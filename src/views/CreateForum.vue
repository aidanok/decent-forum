<template>
  <div class="create-forum">

    <p>
      Create a forum by choosing a name and posting the first thread.
    </p>

    <input type="text" v-model="forumName" placeholder="Forum Name">

    <router-link v-if="!validationErrors" :to="`/forum/${forumName}`">
      Create Forum
    </router-link>

    <router-link 
        v-if="validationErrors"
        to="/create-forum"
        v-tooltip="{ 
          trigger: 'click hover', 
          autoHide: true, 
          hideOnTargetClick: true, 
          delay: { show: 100, hide: 100 }, 
          content: validationErrors, 
          placement: 'bottom',
        }"
      >
      Create Forum
    </router-link>


  </div>
  
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
  data: () => ({
    forumName: ''
  }),

  computed: {
    validationErrors: function(): string {
      return this.forumName.length < 4 ? '- Forum name is too short' : ''
    }
  }
})
</script>