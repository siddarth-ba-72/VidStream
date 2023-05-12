import express from 'express';
import {
  getAllCourses,
  creatCourse,
  getCourseLectures,
  addLecture,
  deleteCourse,
  deleteLecture
} from '../controllers/courseController.js';
import singleUpload from '../middlewares/multer.js';
import { authorizeAdmin, isAuthenticated, authorizeSubscribers } from '../middlewares/auth.js';

const router = express.Router();

// All courses without lectures
router.route('/allcourses').get(getAllCourses);

// Create new Course - Admin
router.route('/createcourse').post(isAuthenticated, authorizeAdmin, singleUpload, creatCourse);

// Course Details
router.route('/course/:id')
  .get(isAuthenticated, authorizeSubscribers, getCourseLectures)
  .post(isAuthenticated, authorizeAdmin, singleUpload, addLecture)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse);

// Delete lecture
router.route('/deletelecture').delete(isAuthenticated, authorizeAdmin, deleteLecture)

export default router;