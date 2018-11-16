<template>
  <div>
    <div v-if="room">
      <h2>{{ room.name }}</h2>

    </div>
  </div> 
</template>

<script>
import gql from "graphql-tag";

export default {
    name: "room",
    data: () => ({}),
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
            variables: {
                $roomId: this.roomId
            }
        }
    },
    computed: {
      room() {
        const { data } = this.getRoom;
        return [room] = data.getRoom
      }
    }
};
</script>

<style></style>
