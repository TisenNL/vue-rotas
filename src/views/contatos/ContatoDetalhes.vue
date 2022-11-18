<template>
  <div v-if="contato">
    <h3 class="font-weight-light">Nome: {{ contato.nome }}</h3>
    <p>Email: {{ contato.email }}</p>
    <button
      @click="$router.back()"
      class="btn btn-secondary mr-2"
    >Voltar</button>
    <router-link :to="`/contatos/${id}/editar`" class="btn btn-primary">
      Editar
    </router-link>
  </div>
</template>

<script>

import EventBus from '@/event-bus';

/* eslint-disable no-unused-vars */
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      contato: undefined,
    };
  },
  /*
  created() {
    this.contato = EventBus.buscarContato(this.id)
  }, */
  beforeRouteEnter(to, from, next){
    next( vm => {
      // vm.contato = EventBus.buscarContato(vm.id)
      vm.contato = EventBus.buscarContato(+to.params.id)
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.contato = EventBus.buscarContato(+to.params.id)
    next();
  },
};
</script>
