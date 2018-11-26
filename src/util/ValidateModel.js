import _ from "lodash"

export function validatePlayerModel(player) {
    return _.pick(player, "id", "name");
}