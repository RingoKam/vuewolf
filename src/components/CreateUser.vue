<template>
  <div class="create-user">
    <label for="username">Username</label>
    <input v-model="username" type="text" />
    <button name="username" @click="addPlayer(username);">Let's go!</button>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "CreateUser",
  created() {
    //check see if user is created, if so, go to lobby
    const player = window.localStorage.getItem("player");
    if (!!player) {
      this.$router.push({ name: "Lobby" });
    }
  },
  data: () => ({
    username: ""
  }),
  methods: {
    async addPlayer(player) {
      //add player and reroute to lobby
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation($name: String!) {
            newPlayer(name: $name) {
              id
              name
            }
          }
        `,
        variables: {
          name: player
        }
      });
      window.localStorage.setItem("player", JSON.stringify(data.newPlayer));
      this.$router.push({ name: "Lobby" });
    }
  }
};
</script>

<style lang="sass" scoped>
.create-user
  color: red
</style>
