import { Stats } from '../models/Stats.js';
import { Contact } from '../models/Contact.js';
import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../utils/errorHandler.js';

export const contact = catchAsyncError(async (req, res, next) => {
  const { username, userEmail, queryMsg } = req.body;
  if (!username || !userEmail || !queryMsg)
    return next(
      new ErrorHandler("All fields are mandatory", 400)
    );
  await Contact.create({
    username, userEmail, queryMsg
  });
  res.status(200).json({
    success: true,
    message: "Your Query Has Been Sent.",
  });
});

export const trackContacts = catchAsyncError(async (req, res, next) => {
  const contacts = await Contact.find({ contactType: "query" });
  res.status(200).json({
    success: true,
    contacts,
  });
});

export const requestCourse = catchAsyncError(async (req, res, next) => {
  const { username, userEmail, queryMsg } = req.body;
  if (!username || !userEmail || !queryMsg)
    return next(
      new ErrorHandler("All fields are mandatory", 400)
    );
  await Contact.create({
    username,
    userEmail,
    contactType: "courseReq",
    queryMsg
  });
  res.status(200).json({
    success: true,
    message: "Thanks for requesting. We will reach back to you soon!",
  });
});

export const trackAllCourseRequests = catchAsyncError(async (req, res, next) => {
  const contacts = await Contact.find({ contactType: "courseReq" });
  res.status(200).json({
    success: true,
    contacts,
  });
});

export const getDashboardStats = catchAsyncError(async (req, res, next) => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);
  const statsData = [];
  for (let i = 0; i < stats.length; i++) {
    statsData.unshift(stats[i]);
  }
  const requiredSize = 12 - stats.length;
  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      users: 0,
      subscription: 0,
      views: 0,
    });
  }
  const usersCount = statsData[11].users;
  const subscriptionCount = statsData[11].subscription;
  const viewsCount = statsData[11].views;
  let usersPercentage = 0,
    viewsPercentage = 0,
    subscriptionPercentage = 0;
  let usersProfit = true,
    viewsProfit = true,
    subscriptionProfit = true;
  if (statsData[10].users === 0) usersPercentage = usersCount * 100;
  if (statsData[10].views === 0) viewsPercentage = viewsCount * 100;
  if (statsData[10].subscription === 0)
    subscriptionPercentage = subscriptionCount * 100;
  else {
    const difference = {
      users: statsData[11].users - statsData[10].users,
      views: statsData[11].views - statsData[10].views,
      subscription: statsData[11].subscription - statsData[10].subscription,
    };
    usersPercentage = (difference.users / statsData[10].users) * 100;
    viewsPercentage = (difference.views / statsData[10].views) * 100;
    subscriptionPercentage =
      (difference.subscription / statsData[10].subscription) * 100;
    if (usersPercentage < 0) usersProfit = false;
    if (viewsPercentage < 0) viewsProfit = false;
    if (subscriptionPercentage < 0) subscriptionProfit = false;
  }
  res.status(200).json({
    success: true,
    stats: statsData,
    usersCount,
    subscriptionCount,
    viewsCount,
    subscriptionPercentage,
    viewsPercentage,
    usersPercentage,
    subscriptionProfit,
    viewsProfit,
    usersProfit,
  });
});
