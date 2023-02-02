import express from "express"
const router = express.Router()

import { isLoggedIn } from "../middlewares/userMiddlewares.js"
import { customRole } from "../middlewares/userMiddlewares.js"
import {auth} from "../middlewares/vendorAuth.js";
// import controllers
import { addVendor, deleteVendor, getVendors,getOneVendor } from "../controllers/vendorControlleres.js"

router.route("/addvendor").post(addVendor);

router.route("/getvendor").get(getVendors);

router.route("/deletevendor").delete(deleteVendor);

router.route("/getonevendor").get(auth,getOneVendor);
// router.route("/retrieveUser/:id").get(retrieveUser)


export default router;

