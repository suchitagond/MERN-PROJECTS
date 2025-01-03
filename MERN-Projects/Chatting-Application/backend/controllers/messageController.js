import { Conversation } from "../models/conversationMode.js";
import { Message } from "../models/messageModel.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;  

        let gotConversation = await Conversation.findOne({
            Participants: { $all: [senderId, receiverId] },
        });
        if (!gotConversation) {
            gotConversation = await Conversation.create({
                Participants: [senderId, receiverId]
            })
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });
        if (newMessage) {
            gotConversation.Messages.push(newMessage._id);
        }

        await Promise.all([gotConversation.save(),newMessage.save()]);

        //socket io 
        
        // const receiverSocketId = getReceiverSocketId(receiverId);
        // if (receiverSocketId) {
        //     io.to(receiverSocketId).emit("newMessage", newMessage);
        // }
        //
        return res.status(201).json({ newMessage });

    } catch (error) {
        console.log(error);
    }
}

export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;

        const conversation = await Conversation.findOne({
            Participants: { $all: [senderId, receiverId] }
        }).populate("Messages");
        // console.log(conversation);
        return res.status(200).json(conversation?.Messages);
    } catch (error) {
        console.log(error);
    }
}