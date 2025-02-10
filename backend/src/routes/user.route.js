import {Router} from "express"
import { getFoodDetails, getOrderedData, loginUser, logoutUser, orderHistory, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

/* The code `router.route("/register").post(registerUser); router.route("/login").post(loginUser);` is
setting up routes for the "/register" and "/login" endpoints using the HTTP POST method. */
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

/* This line of code is setting up a route for the endpoint "/getFoodDetails" using the HTTP GET
method. When a GET request is made to this endpoint, the `getFoodDetails` function from the user
controller will be called to handle the request and provide the food details. */
router.route("/getFoodDetails").get(getFoodDetails);

router.route("/myorder").post(orderHistory);

router.route("/orderhistory").post(getOrderedData);

//secure routes
router.route("/logout").post(verifyJWT, logoutUser);

export {router}