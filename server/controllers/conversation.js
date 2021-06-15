const Conversation = require("../models/Conversation");
const asyncHandler = require("express-async-handler");

exports.getConversationById = asyncHandler(async (req, res, next) => {
  const conversationId = req.params.id;
  const userId = req.params.userId;

  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    res.status(404);
    throw new Error("No conversation found for given id");
  }

  if (!userId) {
    res.status(404);
    throw new Error("No user found for given id");
  }

  if (conversation.participants.includes(userId)) {
    res.status(200).json({
      conversation: conversation,
    });
  } else {
    res.status(401);
    throw new Error("You do not have permission to view this conversation");
  }
});

exports.getAllConversation = asyncHandler(async (req, res, next) => {
  const conversations = await Conversation.find({
    participants: req.userId,
  });

  if (!conversations) {
    res.status(404);
    throw new Error("No Conversations found relating to id");
  }

  res.status(200).json({
    conversations: conversations,
  });
});

exports.createConversation = asyncHandler(async (req, res, next) => {
  const { messages, participants } = req.body;
  const createdConversation = await Conversation.create({
    messages: messages,
    participants: participants,
  });
  if (createdConversation) {
    res.status(201).json({
      success: {
        conversation: createdConversation,
      },
    });
  } else {
    res.status(500);
    throw new Error(
      "Could not create conversation at this time, Please try again"
    );
  }
});
