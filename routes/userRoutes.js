import express from 'express';
import {
  signUp,
  signIn,
  logoutUser,
  getMyProfile,
  changeUserPassword,
  updateMyProfile,
  updateMyProfileAvatar,
  forgotPassword,
  resetPassword,
  addToPlaylist,
  removeFromPlaylist,
  getAllUsers,
  updateUserRole,
  deleteUser,
  deleteMyProfile
} from '../controllers/userController.js';
import { isAuthenticated, authorizeAdmin } from '../middlewares/auth.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();

// Sign Up
router.route('/register').post(singleUpload, signUp);

// Sign In
router.route('/login').post(signIn)

// Logout
router.route('/logout').get(logoutUser);

// My profile
router.route('/me').get(isAuthenticated, getMyProfile);

// Delete My Profile
router.route('/me').delete(isAuthenticated, deleteMyProfile);

// Change Password
router.route('/changepassword').put(isAuthenticated, changeUserPassword)

// Update Profile
router.route('/updateprofile').put(isAuthenticated, updateMyProfile);

// Update Profile picture
router.route('/updateprofilepicture').put(isAuthenticated, singleUpload, updateMyProfileAvatar);

// Forgot Password
router.route('/forgotpassword').post(forgotPassword);

// Reset Password
router.route('/resetpassword/:token').post(resetPassword);

// Add to playlist
router.route('/addtoplaylist').post(isAuthenticated, addToPlaylist)

// Remove from Playlist
router.route('/removefromplaylist').delete(isAuthenticated, removeFromPlaylist);

// All Users - Admin
router.route('/admin/allusers').get(isAuthenticated, authorizeAdmin, getAllUsers);

// Update User Role - Admin
router.route('/admin/user/:id')
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;