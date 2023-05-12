import express from "express";
import {
  contact,
  trackContacts,
  requestCourse,
  trackAllCourseRequests,
  getDashboardStats,
} from "../controllers/otherController.js";

import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// contact form
router.route("/contact").post(contact);

// contact form
router.route("/allcontact").get(isAuthenticated, authorizeAdmin, trackContacts);

// Request form
router.route("/courserequest").post(isAuthenticated, requestCourse);

// Request form
router.route("/allcourserequest").get(isAuthenticated, authorizeAdmin, trackAllCourseRequests);

// Get Admin Dashboard Stats
router.route("/admin/stats").get(isAuthenticated, authorizeAdmin, getDashboardStats);

export default router;