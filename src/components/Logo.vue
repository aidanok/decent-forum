<template>
  <div>
    <!--
  <div class="no-display ascii-logo" v-bind:class="{ 'ascii-logo-foo2': foo }" v-crazy>
  __                                    __           ___                                       
 /\ \                                  /\ \__      /'___\                                      
 \_\ \      __     ___      __     ___ \ \ ,_\    /\ \__/   ___    _ __   __  __    ___ ___    
 /'_` \   /'__`\  /'___\  /'__`\ /' _ `\\ \ \/    \ \ ,__\ / __`\ /\`'__\/\ \/\ \ /' __` __`\  
/\ \L\ \ /\  __/ /\ \__/ /\  __/ /\ \/\ \\ \ \_    \ \ \_//\ \L\ \\ \ \/ \ \ \_\ \/\ \/\ \/\ \ 
\ \___,_\\ \____\\ \____\\ \____\\ \_\ \_\\ \__\    \ \_\ \ \____/ \ \_\  \ \____/\ \_\ \_\ \_\
 \/__,_ / \/____/ \/____/ \/____/ \/_/\/_/ \/__/     \/_/  \/___/   \/_/   \/___/  \/_/\/_/\/_/
  </div>
  <div class="no-display ascii-logo" v-bind:class="{ 'ascii-logo-foo2': foo }" v-crazy>
                                                                                                                                            
         88                                                                  ad88                                                           
         88                                                    ,d           d8"                                                             
         88                                                    88           88                                                              
 ,adPPYb,88   ,adPPYba,   ,adPPYba,   ,adPPYba,  8b,dPPYba,  MM88MMM      MM88MMM  ,adPPYba,   8b,dPPYba,  88       88  88,dPYba,,adPYba,   
a8"    `Y88  a8P_____88  a8"     ""  a8P_____88  88P'   `"8a   88           88    a8"     "8a  88P'   "Y8  88       88  88P'   "88"    "8a  
8b       88  8PP"""""""  8b          8PP"""""""  88       88   88           88    8b       d8  88          88       88  88      88      88  
"8a,   ,d88  "8b,   ,aa  "8a,   ,aa  "8b,   ,aa  88       88   88,          88    "8a,   ,a8"  88          "8a,   ,a88  88      88      88  
 `"8bbdP"Y8   `"Ybbd8"'   `"Ybbd8"'   `"Ybbd8"'  88       88   "Y888        88     `"YbbdP"'   88           `"YbbdP'Y8  88      88      88  
  </div>

<div class="no-display ascii-logo" v-bind:class="{ 'ascii-logo-foo2': foo }" v-crazy>
     _                                     ___                            
    | |                           _       / __)                           
  _ | |  ____  ____  ____  ____  | |_    | |__  ___    ____  _   _  ____  
 / || | / _  )/ ___)/ _  )|  _ \ |  _)   |  __)/ _ \  / ___)| | | ||    \ 
( (_| |( (/ /( (___( (/ / | | | || |__   | |  | |_| || |    | |_| || | | |
 \____| \____)\____)\____)|_| |_| \___)  |_|   \___/ |_|     \____||_|_|_|
                                                                          
</div>
-->

<div class="ascii-logo" v-bind:class="{ 'ascii-logo-foo2': foo }" v-crazy>
  ____                               _     _       _                     ____                                 _   
 / ___|    ___    _ __ ___     ___  | |_  | |__   (_)  _ __     __ _    |  _ \    ___    ___    ___   _ __   | |_ 
 \___ \   / _ \  | '_ ` _ \   / _ \ | __| | '_ \  | | | '_ \   / _` |   | | | |  / _ \  / __|  / _ \ | '_ \  | __|
  ___) | | (_) | | | | | | | |  __/ | |_  | | | | | | | | | | | (_| |   | |_| | |  __/ | (__  |  __/ | | | | | |_ 
 |____/   \___/  |_| |_| |_|  \___|  \__| |_| |_| |_| |_| |_|  \__, |   |____/   \___|  \___|  \___| |_| |_|  \__|
                                                               |___/                                              
                                   
</div>
  </div>
    
</template>

<style>

.no-display {
  display: none; 
}

.ascii-logo {
  font-size: 5px;
  line-height: 5px;
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
  animation-name: spin;
  animation-duration: 1.75s;
  animation-delay: calc(var(--pos-x) * 0.001s * var(--pos-y));
  animation-iteration-count: 1;
}

@keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
}

</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  
  directives: {
    crazy: {
      bind: function(el) {
        console.log('el was binded', el)
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
        console.log('el was inseerrrted', el);
      }
    },
  },

  data: () => ({
    foo: false
  }),

  created() {
    let delay = 8000;
    setTimeout(() => {
      
    })
    setInterval(() => {
      //this.foo = !this.foo;
    }, 6000)
  },

  
})
</script>