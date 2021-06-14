const Message = require("../models/Message");
const asyncHandler = require("express-async-handler");
const Conversation = require("../models/Conversation");

exports.getAllMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({
    conversation_id: req.params.conversationId,
  });

  if (!messages) {
    res.status(404);
    throw new Error("No messages found for given id");
  }

  res.status(200).json({ messages: messages });
});

exports.createMessage = asyncHandler(async (req, res, next) => {
  const { conversation_id, body } = req.body;

  console.log(req.user);
  let conversation = await Conversation.findById(conversation_id);

  if (conversation) {
    if(conversation.participants.includes(req.user.id)){
      const createdMessage = await Message.create({
        conversation_id,
        body,
        creator: req.user.id,
      });
  
      if (createdMessage) {
        const messageArr = conversation.messages;
        messageArr.push(createdMessage._id);
  
        const messages = messageArr;
        const participants = conversation.participants;
        const createdDate = conversation.created_date;
        const messageDate = createdMessage.message_date;
  
        const createdConversation = await Conversation.findByIdAndUpdate(
          conversation_id,
          {
            messages,
            participants,
            createdDate,
            message_date: messageDate,
          },
          { new: true }
        );
        if (createdConversation) {
          console.log("successfully updated conversation");
        } else {
          console.log("failed to update conversation");
        }
        
        res.status(201).json({
          success: {
            message: createdMessage,
          },
        });
      } else {
        res.status(500);
        throw new Error(
          "Could not create message at this time, Please try again"
        );
      }
    } else{
      res.status(401);
      throw new Error(
        "You are not a participant of this conversation"
      );
    }
  } else {
    res.status(404);
    throw new Error("No conversation found");
  }
});

exports.updateMessage = asyncHandler(async (req, res, next) => {
  const { body } = req.body;
  const messageId = req.params.id;
  const message = await Message.findById(messageId);

  if (!message) {
    res.status(404);
    throw new Error("No message found for given id");
  }

  if (message.creator.toString() !== req.user.id) {
    res.status(401);
    throw new Error("You are not allowed to edit this message.");
  }

  const createdMessage = await Message.findByIdAndUpdate(
    messageId,
    {
      body,
    },
    { new: true }
  );

  if (createdMessage) {
    res.status(201).json({
      success: {
        message: createdMessage,
      },
    });
  } else {
    res.status(500);
    throw new Error("Could not update message at this time, Please try again");
  }
});
