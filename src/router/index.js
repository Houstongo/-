import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import Main1 from '@/components/Main1.vue'
import Main2 from '@/components/Main2.vue'
import Main3 from '@/components/Main3.vue'
import Main4 from '@/components/Main4.vue'
import Main5 from '@/components/Main5.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
      {
      path: '/Main1',
      name: 'Main1',
      component: Main1
      },
      {
        path: '/Main2',
        name: 'Main2',
        component: Main2
      },
      {
        path: '/Main3',
        name: 'Main3',
        component: Main3
      },
      {
        path: '/Main4',
        name: 'Main4',
        component: Main4
  },
    {
      path: '/Main5',
      name: 'Main5',
      component: Main5
    }

]
})

