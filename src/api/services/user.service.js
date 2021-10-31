const GroupModel = require('../models/group.model');
const MemberModel = require('../models/member.model');

class payService {
    async payGroup(groupId,userId,amount) {
        try {
            const payment = await MemberModel.findOneAndUpdate({group:groupId,user_id:userId},{
                $inc:{paid:amount}
            });
            return payment;
        } catch (error) {
            console.error(error);
        }
    }

    async dueEmail(id) {
        try {
            const track = await Tracks.findById(id);
            return track;
        } catch (error) {
            console.error(error);
        }
    }

    

}

module.exports = payService;