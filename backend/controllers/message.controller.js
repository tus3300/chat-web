import Conservation from '../models/conservation.model.js';
import Message from '../models/message.model.js';

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conservation = await Conservation.findOne({
            participants : {$all: [senderId, receiverId]},
        });
        if (conservation) {
            conservation = await Conservation.create({
                participants : [senderId, receiver],
            });
        }

        const newMessage = new Message.create({
            senderId,
            receiverId,
            message,
            // conversation: conservation._id,
        });

        if(newMessage){
            conservation.messages.push(newMessage, message._id);
        }

        res.status(201).json(newMessage);
    }catch(error){
        console.error(error.message);
        res.status(500).json({error:error.message});
    }
};