import Vue from "vue";
import Router from "vue-router";
import CreateUser from "../components/CreateUser";
import Lobby from "../components/Lobby.vue";
import Room from "../components/Room.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/CreateUser",
      name: "CreateUser",
      component: CreateUser
    },
    {
      path: "/Lobby",
      name: "Lobby",
      component: Lobby
    },
    {
      path: "/Room",
      name: "Room",
      component: Room,
      props: true
    },
    {
      path: "",
      redirect: {
        name: "CreateUser"
      }
    }
  ]
});
