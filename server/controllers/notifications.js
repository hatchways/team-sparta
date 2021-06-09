const Notification = require("../models/Notification");
const asyncHandler = require("express-async-handler");

//get all notifications
exports.getAllNotifications = asyncHandler(async (req, res, next) => {
let notifications = await Notification.find()

if(!notifications){
    res.status(404)
    throw new Error('No notifications found!')
}
// can we shorten it this way since the key and value are the same?
res.status(200).json({notifications})
});

exports.getAllUnreadNotifications = asyncHandler(async (req, res, next) => {
    // feel like this is wrong
let unreadNotifications = await Notification.find({read: false})
if(!unreadNotifications){
    res.status(404)
    throw new Error('no unread notifications')
}
res.status(200).json({unreadNotifications})
});

// creating notification
exports.createNewNotification = asyncHandler(async (req, res, next) => {
  const { type, description, read } = req.body;

  const createdNotification = await Notification.create({
    type,
    description,
    read,
  });
  if (createdNotification) {
    res.status(201).json({
      success: {
        notification: createdNotification,
      },
    });
  }else{
      res.status(500)
      throw new Error("Couldn't create new notification at this time.Please try again.")
  }
});

// marking notification as read
exports.markNotificationAsRead = asyncHandler(async (req, res, next) => {
//  id of unread notification
 const unreadNotificationId = req.body.id
//  finding unread notification by id
 let unreadNotification = await Notification.findById(unreadNotificationId)
 
//  if no unread notification
 if(!unreadNotification){
  res.status(500)
  throw new Error('could not find unread notification')
 }
//  read notification updates the read property to true
 let readNotification = await Notification.findByIdAndUpdate(
   unreadNotificationId,{
     read: true
   },
   {new:true}
 )
//  if this happens we then turn the unread notification into a read one
 if(readNotification){
   res.status(201).json({
     success:{
      unreadNotification: readNotification
     }
   })
 }else{
   res.status(500)
   throw new Error("Could not update notification at this time. Try again my friend!")
 }
});
