import { User } from '../models/User.js';
import { Payment } from '../models/Payment.js';
import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../utils/errorHandler.js';
import crypto from 'crypto';

export const buySubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.role === "admin")
    return next(
      new ErrorHandler("Admin can't buy subscription", 400)
    );
  if (user.subscription.status === 'Subscribed')
    return next(
      new ErrorHandler("Already subscribed", 400)
    );
  const subscriptionId = crypto.randomBytes(20).toString("hex");
  user.subscription.id = subscriptionId;
  user.subscription.status = "Subscribed";
  await Payment.create({
    user_id: req.user._id,
    razorpay_subscription_id: subscriptionId,
  });
  await user.save();
  res.status(201).json({
    success: true,
    subscriptionId,
  });
});

export const paymentVerification = catchAsyncError(async (req, res, next) => {
  const { razorpay_signature, razorpay_payment_id, razorpay_subscription_id } =
    req.body;
  const user = await User.findById(req.user._id);
  const subscription_id = user.subscription.id;
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(razorpay_payment_id + "|" + subscription_id, "utf-8")
    .digest("hex");
  const isAuthentic = generated_signature === razorpay_signature;
  if (!isAuthentic)
    return res.redirect(`${process.env.FRONTEND_URL}/paymentfail`);
  await Payment.create({
    razorpay_signature,
    razorpay_payment_id,
    razorpay_subscription_id,
  });
  user.subscription.status = "active";
  await user.save();
  res.redirect(
    `${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`
  );
});

export const getRazorPayKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_API_KEY,
  });
});

export const cancelSubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  let refund = false;
  const payment = await Payment.findOne({ user_id: req.user._id });
  const gap = Date.now() - payment.createdAt;
  const refundTime = process.env.REFUND_DAYS;
  if (refundTime > gap)
    refund = true;
  await payment.deleteOne();
  user.subscription.id = undefined;
  user.subscription.status = undefined;
  await user.save();
  res.status(200).json({
    success: true,
    message: refund
      ? `Subscription cancelled, You will receive full refund within ${refundTime} days.`
      : "Subscription cancelled, Now refund initiated as subscription was cancelled after 7 days.",
  });
});

export const trackAllSubscriptions = catchAsyncError(async (req, res, next) => {
  let allSubsribers = [];
  const subscriptions = await Payment.find();
  for (const subscriber of subscriptions) {
    const user = await User.findById(subscriber.user_id);
    allSubsribers.push({
      subscriberName: user.name,
      subscriberEmail: user.email,
      subscriptionId: subscriber.razorpay_subscription_id
    });
  };
  res.status(200).json({
    success: true,
    allSubsribers,
  });
});
