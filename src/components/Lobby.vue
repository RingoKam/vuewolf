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
import errorHandler from "../util/ErrorHandling";
import { validatePlayerModel } from "../util/ValidateModel";

export default {
    mounted() {
        const player = window.localStorage.getItem("player");
        if (!!player) {
            const p = JSON.parse(player);
            this.player = validatePlayerModel(p);
        } else {
            this.$router.push({ name: "CreateUser" });
        }
    },
    data: () => ({
        player: {},
        newRoomName: ""
    }),
    apollo: {
        getRoom: {
            query: gql`
                query {
                    getRoom {
                        id
                        name
                        isPlaying
                        players {
                            id
                            name
                        }
                    }
                }
            `,
            subscribeToMore: {
                document: gql`
                    subscription {
                        updateRoom {
                            id
                            name
                            players {
                                id
                                name
                            }
                            isPlaying
                        }
                    }
                `,
                updateQuery: ({ getRoom }, { subscriptionData }) => {
                    const updatedRoom = subscriptionData.data.updateRoom;
                    const roomIndex = getRoom.findIndex(
                        room => room.id === updatedRoom.Id
                    );
                    if(roomIndex === -1) {
                        getRoom.push(updatedRoom);
                    } else {
                        getRoom[roomIndex] = updatedRoom;
                    }
                    return getRoom;
                }
            }
        }
    },
    components: { LobbyRoomItem },
    methods: {
        async newRoom(roomName) {
            const { data } = await this.$apollo.mutate({
                mutation: gql`
                    mutation($roomName: String!, $player: JoinedPlayer!) {
                        newRoom(roomName: $roomName, player: $player)
                    }
                `,
                variables: {
                    roomName: roomName,
                    player: this.player
                }
            });
            this.$router.push({
                name: "Room",
                params: { roomId: data.newRoom }
            });
        },
        async joinGame(id) {
            const { data } = await this.$apollo.mutate({
                mutation: gql`
                    mutation($roomId: ID!, $player: JoinedPlayer!) {
                        joinRoom(roomId: $roomId, player: $player)
                    }
                `,
                variables: {
                    roomId: id,
                    player: this.player
                }
            });
            this.$router.push({
                name: "Room",
                params: { roomId: data.joinRoom }
            });
        }
    }
};
</script>

<style></style>
