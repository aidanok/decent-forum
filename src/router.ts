import Vue from 'vue';
import Router from 'vue-router';
import AllForums from './views/AllForums.vue';
import CreateThread from './views/CreateThread.vue';
import Forum from './views/Forum.vue';
import Thread from './views/Thread.vue';
import Media from './views/Media.vue';
import CreateForum from './views/CreateForum.vue';
import Loading from './components/Loading.vue';
import Blocks from './views/Blocks.vue';

import { decodeForumPath } from 'decent-forum-api/lib/forum-paths';

Vue.use(Router);

function isString(x: any): x is string {
  return x && typeof x === 'string'
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: AllForums,
    },
    {
      path: '/post/:forum',
      name: 'post',
      component: CreateThread,
      props: (route) => {
        return {
          path: isString(route.params.forum) ? decodeForumPath(route.params.forum) : [], 
        }
      },
    }, 
    {
      path: '/forum/:forum',
      name: 'forum',
      component: Forum,
      props: (route) => {

        console.log(route.params.forum)
          
        return {
          path: isString(route.params.forum) ? decodeForumPath(route.params.forum) : [],
        }
      }
    },
    {
      path: '/thread/:txId',
      name: 'thread',
      component: Thread,
      props: true,
    },
    {
      path: '/create-forum',
      name: 'create-forum',
      component: CreateForum,
      props: true,
    },
    {
      path: '/media',
      name: 'media',
      component: Media,
      props: true, 
    },
    {
      path: '/loading',
      name: 'name',
      component: Loading,
    },
    {
      path: '/blocks',
      name: 'blocks',
      component: Blocks
    }

  ],
});
