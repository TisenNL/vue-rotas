<template>
  <div id="app">
    <div class="jumbotron">
      <h1 class="display-4">Vue Router</h1>
      <p class="lead">Adicionando rotas a Single Page Applications no Vue.</p>
    </div>

    <div class="container">

      <router-link
        class="btn btn-info mb-4 mr-2"
        to="/"
        exact
      >Home</router-link>
      <router-link
        :to="{ path: '/contatos'}"
        class="btn btn-info mb-4 mr-2"
      >Contatos</router-link>
      <router-view></router-view>
    </div>
  </div>
</template>
