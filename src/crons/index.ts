import {removeOldTokens} from "./remove.old.tokens";
import {updateCurrency} from "./update.currency";
import {checkValidBody} from "./check.valid";

export const cronRunner = () => {
    removeOldTokens.start();
    updateCurrency.start();
    checkValidBody.start();
};