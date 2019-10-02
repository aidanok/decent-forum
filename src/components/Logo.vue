<template>
  <div class="app-logo-container">
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
<!--
<div class="ascii-logo" v-bind:class="{ 'ascii-logo-foo2': foo }" v-crazy>
________                              __   
\______ \   ____   ____  ____   _____/  |_ 
 |    |  \_/ __ \_/ ___\/ __ \ /    \   __\
 |    `   \  ___/\  \__\  ___/|   |  \  |  
/_______  /\___  >\___  >___  >___|  /__|  
        \/     \/     \/    \/     \/      
</div>

<div class="ascii-logo" v-bind:class="{ 'ascii-logo-foo2': foo }" v-crazy> 
   _____
  /  _  \
 /  /_\  \
/    |    \
\____|__  /
        \/ 
</div>

<div class="ascii-logo" v-bind:class="{ 'ascii-logo-foo2': foo }" v-crazy>                          
___________                                
\_   _____/__________ __ __  _____         
 |    __)/  _ \_  __ \  |  \/     \        
 |     \(  &lt;_> )  | \/  |  /  Y Y  \       
 \___  / \____/|__|  |____/|__|_|  /       
     \/                          \/       
</div>
-->
<!--
<div class="ascii-logo" v-bind:class="{ 'ascii-logo-foo2': foo }" v-crazy> 
______                    _   
|  _  \                  | |  
| | | |___  ___ ___ _ __ | |_ 
| | | / _ \/ __/ _ \ '_ \| __|
| |/ /  __/ (_|  __/ | | | |_ 
|___/ \___|\___\___|_| |_|\__|
</div>
<div class="ascii-logo" v-bind:class="{ 'ascii-logo-foo2': foo }" v-crazy>


  __ _ 
 / _` |
| (_| |
 \__,_|
       
</div>
<div class="ascii-logo" v-bind:class="{ 'ascii-logo-foo3': foo }" v-crazy>
______                         
|  ___|                        
| |_ ___  _ __ _   _ _ __ ___  
|  _/ _ \| '__| | | | '_ ` _ \ 
| || (_) | |  | |_| | | | | | |
\_| \___/|_|   \__,_|_| |_| |_|
                               
                               
</div> -->

<div class="ascii-logo" v-bind:class="{ 'ascii-logo-foo2': foo, 'ascii-logo-foo3': foo }" v-crazy>
______                    _                     ______                         
|  _  \                  | |                    |  ___|                        
| | | |___  ___ ___ _ __ | |_ ______ __ _ ______| |_ ___  _ __ _   _ _ __ ___  
| | | / _ \/ __/ _ \ '_ \| __|______/ _` |______|  _/ _ \| '__| | | | '_ ` _ \ 
| |/ /  __/ (_|  __/ | | | |_      | (_| |      | || (_) | |  | |_| | | | | | |
|___/ \___|\___\___|_| |_|\__|      \__,_|      \_| \___/|_|   \__,_|_| |_| |_|
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
}

.ascii-logo {
  font-size: 3px;
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
      this.foo = true;
      setTimeout(() => this.foo = false, delay)
    }, delay)
    
    /*setInterval(() => {
      this.foo = !this.foo;
    }, 4000)*/
  },

  
})
</script>