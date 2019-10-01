import Vue from 'vue';
import Router, { Route } from 'vue-router';
import AllForums from './views/AllForums.vue';
import PostEditor from './views/PostEditor.vue';
import ViewForum from './views/ViewForum.vue';
import Thread from './views/Thread.vue';

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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/post-edit',
      name: 'post-edit',
      component: PostEditor,
      props: (route) => {
        return {
          path: isString(route.query.forum) ? decodeForumPath(route.query.forum) : [], 
        }
      },
    }, 
    {
      path: '/forum/:forum',
      name: 'fourm',
      component: ViewForum,
      props: (route) => {
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
    }

  ],
});
