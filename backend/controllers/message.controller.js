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
        if (!conservation) {
            conservation = await Conservation.create({
                participants : [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            // conservation: conservation._id,
        });

        if (newMessage) {
			conservation.messages.push(newMessage._id);
		}


        //Socket IO works here:...
        //


        // await conservation.save();
        // await newMessage.save();

        await Promise.all([conservation.save(), newMessage.save()]);// save conservation and message
        res.status(201).json(newMessage);
    }catch(error){
        console.error(error.message);
        res.status(500).json({error:error.message});
    }
};

export const getMessage = async (req, res) => {
    try {

        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        const conservation = await Conservation.findOne({
            participants : {$all: [senderId, userToChatId]},
        }).populate("messages");

        if (!conservation) {return res.status(200).json([]);}

        const messages = conservation.messages;
		res.status(200).json(messages);
        
    } catch(error){
        console.log(error.message);
        res.status(500).json({error: error.message});
    }
}