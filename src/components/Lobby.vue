<template>
  <div>
    <div>name: {{ player.name }}</div>
    <div>
      <label> New Room: </label> <input v-model="newRoomName" />
      <button @click="newRoom(newRoomName);">Create</button>
    </div>
    <div v-for="(room, idx) in getRoom" :key="idx">
      <LobbyRoomItem v-bind="room" @join="joinGame" />
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import LobbyRoomItem from "./LobbyRoomItem.vue";

export default {
  mounted() {
    const player = window.localStorage.getItem("player");
    if (!!player) {
      this.player = JSON.parse(player);
    } else {
      this.$router.push({ name: "CreateUser" });
    }
  },
  data: () => ({
    player: {},
    newRoomName: ""
  }),
  apollo: {
    getRoom: gql`
      query {
        getRoom {
          id
          name
          isPlaying
        }
      }
    `
  },
  components: { LobbyRoomItem },
  methods: {
    async newRoom(roomName) {
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation($roomName: String!, $playerId: ID!) {
            newRoom(roomName: $roomName, playerId: $playerId)
          }
        `,
        variables: {
          roomName: roomName,
          playerId: this.player.id
        }
      });
      this.$router.push({ name: "Room", params: { roomId: data.newRoom } });
    },
    async joinGame(id) {
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation($roomId: ID!, $playerId: ID!) {
            joinRoom(roomId: $roomId, playerId: $playerId)
          }
        `,
        variables: {
          roomId: id,
          playerId: this.player.id
        }
      });
      this.$router.push({ name: "Room", params: { roomId: data.joinRoom } });
    }
  }
};
</script>

<style></style>
