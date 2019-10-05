<template>
  <div class="app-logo-container">
    <div class="ascii-logo" v-bind:class="{ 'ascii-logo-foo2': foo, 'ascii-logo-foo3': foo }" v-crazy>
______                    _                     ______                             
|  _  \                  | |                    |  ___|                            
| | | |___  ___ ___ _ __ | |_ ______ __ _ ______| |_ ___  _ __ _   _ _ __ ___  ___ 
| | | / _ \/ __/ _ \ '_ \| __|______/ _` |______|  _/ _ \| '__| | | | '_ ` _ \/ __|
| |/ /  __/ (_|  __/ | | | |_      | (_| |      | || (_) | |  | |_| | | | | | \__ \
|___/ \___|\___\___|_| |_|\__|      \__,_|      \_| \___/|_|   \__,_|_| |_| |_|___/
                                                                                   
    </div>

</div>
    
</template>

<style>

.no-display {
  display: none; 
}

.app-logo-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-left: 1em;
}

.ascii-logo {
  font-size: 4px;
  line-height: 4px;
  font-weight: bolder;
  font-family: monospace;
  color:rgb(37, 36, 36);
  margin-left: 1em;
  white-space: pre;
  text-align: left;
}

.ascii-logo-foo span {
  display: inline-block;
  transition: all 0.3s ;
  transform-origin: center;
}

.ascii-logo-foo2 > * {
  animation: spin 0.87s;
  animation-delay: calc(var(--pos-x) * 0.01s * var(--pos-y));
  animation-iteration-count: 1;
}


.ascii-logo-foo3 > * {
  animation: color 0.17s;
  animation-delay: calc(var(--pos-x) * 0.003s * var(--pos-y)) ;
  animation-iteration-count: 1;
  animation-direction: alternate;
}

@keyframes spin {
    from {transform:rotate(0deg) }
    to {transform:rotate(360deg) }
}

@keyframes color {
  from {color:rgb(37, 36, 36); transform:scale(1)}
  to {color:rgb(102, 107, 122); transform:scale(2.5) }
}

</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
  directives: {
    crazy: {
      bind: function(el) {
        const text = el.innerText;
        const frag = document.createDocumentFragment();
        const childs = [] as any[];
        let x = 1, y = 1;
        for (var i = 0; i < el.innerText.length; i++) {
          const spanEl = document.createElement("SPAN");
          spanEl.innerText = text[i];
          spanEl.style.setProperty("--pos-x", x.toString());
          spanEl.style.setProperty("--pos-y", y.toString());
          spanEl.style.setProperty('display', 'inline-block')
          spanEl.style.setProperty('transitions', 'all 0.5s')
          spanEl.style.setProperty('transform-origin', '50% 80%')
          
          //spanEl.classList.add('ascii-logo-foo')
          x++;
          if (text[i] === '\n') {
            y++; 
            x = 1;
            frag.appendChild(document.createElement('BR'))
          } else {
            frag.appendChild(spanEl);
          
          }
        }
        el.innerText = '';
        el.appendChild(frag);

      },
      inserted: function (el) {
      }
    },
  },

  data: () => ({
    foo: false
  }),

  created() {


    const doLogoAnim = async () => {
      await new Promise(res => setTimeout(res, 9000)); 
      while (true) {
        this.foo = true; 
        await new Promise(res => setTimeout(res, 8000));
        this.foo = false;
        await new Promise(res => setTimeout(res, 120*1000));
      }
    }

    doLogoAnim();
  },

  
})
</script>