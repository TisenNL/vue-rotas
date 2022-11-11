/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'

import AppContatos from './views/contatos/AppContatos.vue'
import ContatosHome from './views/contatos/ContatosHome.vue'
import ContatoDetalhes from './views/contatos/ContatoDetalhes.vue'
import ContatoEditar from './views/contatos/ContatoEditar.vue'
import AppErro404 from './views/AppErro404.vue'
import Erro404Contatos from './views/contatos/Erro404Contatos.vue'
import AppHome from './views/AppHome.vue'
import AppLogin from './views/login/AppLogin.vue'

import EventBus from '@/event-bus'

Vue.use(VueRouter)

const extrairParametroId = route => ({ id: +route.params.id })

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { 
      path: '/contatos', 
      component: AppContatos,
      alias: ['/meus-contatos', '/lista-de-contatos'],
      props: (route) => {
        const busca = route.query.busca
        return busca ? { busca } : {}
      },
      children: [
        { 
          path: ':id(\\d+)',
          component: ContatoDetalhes, 
          name: 'contato',
          props: extrairParametroId
        },
        { 
          // path: ':id(\\d+)/editar/:opcional?',
          // path: ':id(\\d+)/editar/:zeroOuMais*',
          // path: ':id(\\d+)/editar/:umOuMais+',
          path: ':id(\\d+)/editar',
          alias: ':id(\\d+)/alterar',
          meta: { requerAutenticacao: true }, 
          beforeEnter(to, from, next) {
            console.log('beforeEnter') 
            next() //continuar
            // next(true) //continuar
            // next(false) //bloquear
            // next('/contatos') //redirecionar
            // next({ name: 'contatos' }) //redirecionar
            // next(new Error(`Permissões insuficientes para acessar o recurso "${to.fullPath}"`))
          },
          components: 
          {
            default: ContatoEditar,
            'contato-detalhes': ContatoDetalhes
          },
          props: {
            default: extrairParametroId,
            'contato-detalhes': extrairParametroId
          }
        },
        { path: '', component: ContatosHome, name: 'contatos' },
        { path: '*', component: Erro404Contatos }
      ]
    },
    { path: '/home', component: AppHome },
    { path: '/login', component: AppLogin },
    // { path: '/', redirect: { name: 'contatos' } }
    { 
      path: '/', 
      // eslint-disable-next-line no-unused-vars
      redirect: to => {
        // return '/contatos'
        return { name: 'contatos' }
      } 
    },
    { path: '*', component: AppErro404 }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach')
  console.log('Requer autenticação? ', to.meta.requerAutenticacao)
  const estaAutenticado = EventBus.autenticado
  if(to.matched.some(rota => rota.meta.requerAutenticacao)) {
    if(!estaAutenticado) {
      next({
        path: '/login',
        query: { redirecionar: to.fullPath }
      })
      return
    }
  }
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('beforeResolve')
  next()
})

router.afterEach((to, from) => {
  console.log('afterEach')
})

router.onError(erro => {
  console.log(erro)
})

export default router