import Vue from 'vue'
import VueRouter from 'vue-router'

import AppContatos from './views/contatos/AppContatos.vue'
import ContatosHome from './views/contatos/ContatosHome.vue'
import ContatoDetalhes from './views/contatos/ContatoDetalhes.vue'
import ContatoEditar from './views/contatos/ContatoEditar.vue'
import AppHome from './views/AppHome.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { 
      path: '/contatos', 
      component: AppContatos,
      children: [
        { 
          path: ':id', 
          component: ContatoDetalhes, 
          name: 'contato' 
        },
        { 
          path: ':id/editar',
          components: 
          {
            default: ContatoEditar,
            'contato-detalhes': ContatoDetalhes
          }
        },
        { path: '', component: ContatosHome }
      ]
    },
    { path: '/', component: AppHome }
  ]
})