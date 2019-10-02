<template>
  <div class="media-view">
    <div v-if="loading" class="lds-dual-ring">
    </div>
    <div v-if="media" class="compatible-media">
      
      <a class="media-link" :href=media.url target="_blank"> {{ media.description.substr(0, 80) }} </a>

      <div class="tool-bar">
        <i class="ri-discuss-line" v-tooltip="'Start a discussion'"></i>
        <i v-if="media && media.showContentToggle" role="button" @click=toggleContent class="ri-eye-line"></i>
      </div>
      
      <div
        class="media-rendered"
        v-if="media.showContent"
        v-html="mediaHtml">
      </div>

    </div>
    <div v-if="error">
      An error occured: {{ error }} 
    </div>
    <div v-if="!loading && !error && !media">
      Unknown content.
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { queryTxTags } from 'decent-forum-api/query/query2';
import { findConfig, MediaConfig } from 'decent-forum-api/media'
//import { extract } from 'article-parser';
import { arweave } from 'decent-forum-api';
//import readability from 'readability';

import createDOMPurify from 'dompurify'

const DOMPurify = createDOMPurify(window)


export default Vue.extend({
  
  props: {
    txId: {
      type: String, 
      required: true,
    },
    txTags: {
      type: Object as () => Record<string, string>, 
      required: true, 
    },
    mediaConfig: {
      type: Object as () => MediaConfig,
      required: true, 
    },
    alwaysHide: {
      type: Boolean, 
      default: true, 
    }
  },

  data: () => ({
    loading: true,
    error: false as boolean | string,
    media: null as MediaConfig | null,
    mediaHtml: null as string | null,
  }),

  async created() {
    try { 
      const mediaHtml = await this.mediaConfig.toHtml(this.txId, this.txTags);
      this.media = Object.assign({}, this.mediaConfig, this.alwaysHide ? { showContent: false } : {})
      this.mediaHtml = mediaHtml;
    }
    catch (e) {
      this.error = 'Problem'
    }
    this.loading = false;
  },


  methods: {

    async loadContent() {
      /*this.loading = true;
      try {
        const txTags = await queryTxTags(this.txId);
        console.log('[MediaView] ', txTags);
        const media = findConfig(this.txId, txTags);
        console.log('DID FIND MEDIA CONVERTOR?', !!media);
        if (media) { 
          const mediaHtml = await media.toHtml(this.txId, txTags);
          this.media = media; 
          this.mediaHtml = mediaHtml;
          console.log(mediaHtml);
          console.log('^^ HTML ^^')
        }
      } catch (e) {
        this.error = 'Unable to load transaction.'
        this.media = null;
        this.mediaHtml = null;
        console.error(e);
      }
      this.loading = false;
      */
    },

    toggleContent() {
      this.media && (this.media.showContent = !this.media.showContent); 
    },

  }
})
</script>