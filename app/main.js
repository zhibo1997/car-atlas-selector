import dva from "dva";
import router from "./router";
import carpicmodels from "./models/carpicmodels";

const app=dva({
    history:require("history").createHashHistory
})
app.model(carpicmodels);
app.router(router);
app.start("#root")