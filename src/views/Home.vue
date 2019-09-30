<template>
  <div class="home">
    
    <div class="top-level-forum" v-for="(node0, key0) in shared.cache.forums.children" :key="key0">
      <h5> {{ node0.segments.join(' > ') }} </h5>
      {{ node0.posts.length }} Posts !<br/>

      <div v-for="(node1, key1) in node0.children" :key="key1">
        <h5> {{ node1.segments.join(' > ') }} </h5>
        {{ node1.posts.length }} Posts
      </div>
    </div>

  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import { queryPosts } from 'decent-forum-api';
import { SharedState } from '../ui-types';

export default Vue.extend({
  
  props: {
    shared: {
      type: Object as () => SharedState,
      required: true,
    }
  },

  data() {
    return {
      forums: null as null | any[],
    }
  },

  async created() {
    const data = await queryPosts([], this.shared.cache);
    // console.log(JSON.parse(JSON.stringify(this.shared.cache.forums, (k,v) => k === 'parent' ? undefined : v)));

  }
});
</script>
