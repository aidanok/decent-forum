<template>
  <div>
    <div class="block-watcher-sync-info">
      <h3> Blocks </h3>
      
      <div> {{ synced }} blocks synced in last poll </div> 
      
      <p> 
        Last poll: Did we miss blocks? {{ missed ? 'Yes' : 'No' }}, See a Re-org: {{ reorg ? 'Yes' : 'No' }} 
      </p> 
    </div>

    <div v-for="b in list" :key=b.hash>
      
      <div class="block-watcher-block">
        Block: {{ b.hash.substr(0, 6 )}} 
        - [ {{ b.block.txs.length }} Txs ] 
        - {{ new Date(b.block.timestamp * 1000) | moment('from') }} 
      </div>
      <div class="block-watcher-tx" v-for="(tags, tx) in b.tags" :key=tx>
        
        <div class="block-watcher-tx-header"> 
          TX: <a v-bind:href="`https://arweave.net/${tx}/`" target="_blank">{{tx}}</a> 
        </div> 
        
        <div class="block-watcher-tx-tag" v-for="(val, name) in tags" :key=name>
          <div>{{ name}}  </div>
          <div>{{ val }} </div> 
        </div>

      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { SharedState } from '../ui-lib';
import { BlockWatcher } from 'decent-forum-api/block-watcher/block-watcher';
import { WatchedBlock, SyncResult } from 'decent-forum-api/block-watcher/types';


export default Vue.extend({
  
  props: {
    shared: {
      type: Object as () => SharedState,
      required: true, 
    }
  },

  data() {
    return {
      list: [] as WatchedBlock[],
      missed: false,
      reorg: false,
      synced: 0,
    }
  },

  created() {
    this.shared.blockWatcher.subscribe(this.handleSync);
  },

  beforeDestroy() {
    this.shared.blockWatcher.unsubscribe(this.handleSync);
  },

  methods: {
    handleSync(sync: SyncResult) {
      this.list = sync.list;
      this.missed = sync.missed;
      this.reorg = sync.reorg;
      this.synced = sync.synced;
    }
  }

})
</script>