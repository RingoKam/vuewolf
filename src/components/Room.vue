<template>
  <div>
    <div v-if="room">
      <h2>{{ room.name }}</h2>
      <div v-for="(player, index) in room.players" :key="index">{{ player.name }}</div>
      <button>Ready</button>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import _ from "lodash";
import { validatePlayerModel } from "../util/ValidateModel";

export default {
  name: "room",
  mounted() {
    const player = window.localStorage.getItem("player");
    if (player) {
      const p = JSON.parse(player);
      this.player = validatePlayerModel(p);
    } else {
      this.$router.push({ name: "CreateUser" });
    }
  },
  data: () => ({
    player: {}
  }),
  props: {
    roomId: {
      required: true,
      type: String
    }
  },
  apollo: {
    getRoom: {
      query: gql`
        query($roomId: ID) {
          getRoom(roomId: $roomId) {
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
      variables() {
        return {
          roomId: this.roomId
        };
      },
      subscribeToMore: {
        document: gql`
          subscription updateRoom($roomId: ID, $playerId: ID) {
            updateRoom(roomId: $roomId, playerId: $playerId) {
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
        variables() {
          return {
            roomId: this.roomId,
            playerId: this.player.Id
          };
        },
        updateQuery: ({ getRoom }, { subscriptionData }) => {
          return subscriptionData.data.updateRoom;
        }
      }
    }
  },
  computed: {
    room() {
      return _.get(this.getRoom, "[0]", null);
    }
  }
};
</script>

<style></style>
