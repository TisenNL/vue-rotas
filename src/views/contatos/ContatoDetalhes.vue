<template>
  <div>
    <h3 class="font-weight-light">
      Detalhes sobre o Contato com id: {{ $route.params.id }}
    </h3>
    <router-link
      :to="`/contatos/${id}/editar`"
      class="btn btn-primary"
    >
      Editar
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  // watch: {
  //     // eslint-disable-next-line no-unused-vars
  //     '$route'(to, from) {
  //         this.id = to.params.id
  //     }
  // },
  beforeRouteUpdate(to, from, next) {
    this.id = to.params.id;
    next();
  },
  created() {
    console.log("Parâmetros da rota: ", this.$route.params);
  },
};
</script>
