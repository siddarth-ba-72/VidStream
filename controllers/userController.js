import { User } from '../models/User.js';
import { Course } from '../models/Course.js';
import { Stats } from '../models/Stats.js';
import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../utils/errorHandler.js';
import { sendToken } from '../utils/sendToken.js';
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto';
import cloudinary from 'cloudinary';
import getDataUri from '../utils/dataUri.js';

export const signUp = catchAsyncError(async (req, res, next) => {
  const {
    name, email, password
  } = req.body;
  const file = req.file;
  if (!name || !email || !password || !file)
    return next(
      new ErrorHandler("All fields are manadatory", 400)
    );
  let user = await User.findOne({ email });
  if (user)
    return next(
      new ErrorHandler("User already exists", 409)
    );
  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }
  });
  sendToken(res, user, "Signed Up successfully", 201);
});

export const signIn = catchAsyncError(async (req, res, next) => {
  const {
    email, password
  } = req.body;
  if (!email || !password)
    return next(
      new ErrorHandler("All fields are manadatory", 400)
    );
  const user = await User.findOne({ email }).select('+password');
  if (!user)
    return next(
      new ErrorHandler("Incorrect credentials!", 401)
    );
  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return next(
      new ErrorHandler("Incorrect credentials!", 401)
    );
  sendToken(res, user, `Welcome back ${user.name}`, 201);
});

export const logoutUser = catchAsyncError(async (req, res, next) => {
  res.status(200).cookie("token", null, {
    expires: new Date(Date.now()),
  }).json({
    success: true,
    message: "Logged out successfully!"
  });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const changeUserPassword = catchAsyncError(async (req, res, next) => {
  const {
    oldPassword, newPassword
  } = req.body;
  if (!oldPassword || !newPassword)
    return next(
      new ErrorHandler("All fields are manadatory", 400)
    );
  const user = await User.findById(req.user._id).select('+password');
  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch)
    return next(
      new ErrorHandler("Your old password is Incorrect!", 400)
    );
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Your password was changed successfully",
    user,
  });
});

export const updateMyProfile = catchAsyncError(async (req, res, next) => {
  const {
    name, email
  } = req.body;
  const user = await User.findById(req.user._id);
  if (name)
    user.name = name;
  if (email)
    user.email = email;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Your profile was changed successfully",
    user,
  });
});

export const updateMyProfileAvatar = catchAsyncError(async (req, res, next) => {
  const file = req.file;
  const user = await User.findById(req.user._id);
  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  user.avatar = {
    public_id: mycloud.public_id,
    url: mycloud.secure_url,
  };
  await user.save();
  res.status(200).json({
    success: true,
    message: "Profile Picture Updated Successfully",
  });
});

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return next(
      new ErrorHandler("User not found!", 400)
    );
  const resetToken = await user.getResetToken();
  await user.save();
  const url = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;
  const mailMessage = `Click on the given link to reset your password: ${url}. If ypu have not requested then please ignore`;
  await sendEmail(
    user.email,
    "VidStream Password Reset Link",
    mailMessage,
  );
  res.status(200).json({
    success: true,
    message: `Password Reset Link is sent to ${user.email}`
  });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });
  if (!user)
    return next(
      new ErrorHandler("Invalid Token")
    );
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password updated successfully!"
  });
});

export const addToPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.body.id);
  if (!course)
    return next(
      new ErrorHandler("No Course found", 404)
    );
  const courseExists = user.playlist.find((item) => {
    if (item.course.toString() === course._id.toString())
      return true;
  });
  if (courseExists)
    return next(
      new ErrorHandler("Course already exists", 409)
    );
  user.playlist.push({
    course: course._id,
    poster: course.poster.url
  });
  await user.save();
  res.status(200).json({
    success: true,
    message: "Course added successfully to the playlist"
  });
});

export const removeFromPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.query.id);
  if (!course)
    return next(
      new ErrorHandler("No Course found", 404)
    );
  const updatedPlaylist = user.playlist.filter(item => {
    if (item.course.toString() !== course._id.toString())
      return item;
  });
  user.playlist = updatedPlaylist;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Course removed successfully from the playlist"
  });
});

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

export const updateUserRole = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return next(
      new ErrorHandler("User not found", 404)
    );
  if (user.role === 'user')
    user.role = 'admin';
  else
    user.role = 'user';
  await user.save();
  res.status(200).json({
    success: true,
    message: 'User Role update successfully'
  });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return next(
      new ErrorHandler("User not found", 404)
    );
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  // Cancel subscription
  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: 'User Deleted successfully'
  });
});

export const deleteMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  // Cancel subscription
  await user.deleteOne();
  res.status(200).cookie("token", null, {
    expires: new Date(Date.now()),
  }).json({
    success: true,
    message: 'Sorry to see you going! You can return anytime you like'
  });
});

User.watch().on("change", async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  const subscription = await User.find({ "subscription.status": "Subscribed" });
  stats[0].users = await User.countDocuments();
  stats[0].subscription = subscription.length;
  stats[0].createdAt = new Date(Date.now());
  await stats[0].save();
});
