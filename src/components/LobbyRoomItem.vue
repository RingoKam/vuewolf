<template>
  <div class="lobby-room-item">
    <div class="room-name">{{ name }}</div>
    <div class="room-player-count">{{ playerCount }} / 7</div>
    <button @click="join">Join</button>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    players: {
      required: true,
      type: Array
    },
    isPlaying: {
      required: true,
      type: Boolean
    }
  },
  computed: {
    playerCount() {
      return this.players.length;
    }
  },
  methods: {
    join() {
      this.$emit("join", this.id);
    }
  }
};
</script>

<style scoped>
.lobby-room-item {
  display: flex;
  justify-content: flex-start;
}
.lobby-room-item div {
}
.lobby-room-item button {
  align-item: flex-end;
}
</style>
