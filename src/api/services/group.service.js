const GroupModel=require("../models/group.model");
const ExpensesModel=require("../models/expenses.model");
const MemberModel=require("../models/member.model");
const EmailModel=require("./external/email.service");
const MessageModel=require("./external/message.service");

class notesService {
    // post 
    async createGroup(body,userID) {
        try {
            const {members}=body;
            let users=[];
            delete body["members"];

            var result =await GroupModel.create({...body});
            members.push({
                _id:userID.toString()
            })
            for(var i=0;i<members.length;i++){
              const info=await  MemberModel.create({
                user_id:members[i]._id,
                group:result._id
              })
              users.push(info)
            }

            for(var i=0;i<users.length;i++){
                result.members.push(users[i]._id);
            }

            await result.save();

            return result;
            // return true;

        } catch (error) {
            console.error(error);
            throw new Error(error.message)
        }
    }
/*
    async createExpenses(body) {
        try {
            const result =await ExpensesModel.create({...body});
            return result
        } catch (error) {
            console.error(error);
            throw new Error(error.message)
        }
    }

    async addMembers(groupId,body) {
        try {
            
            const result =await ExpensesModel.create({...body});
            const group=await GroupModel.findByIdAndUpdate(groupId,{

            }).populate("expenses");
            return result
        } catch (error) {
            console.error(error);
            throw new Error(error.message)
        }
    }
    */

    // get 
    async getGroup(groupId) {
        try {
            const group=await GroupModel.findById(groupId).populate("members");
            return group
        } catch (error) {
            console.error(error);
            throw new Error(error.message)
        }
    }
    async getAllGroup(user_id) {
        try {
            console.log(user_id.toString(),"id");
            const group=await MemberModel.find({user_id:user_id.toString()})
            .populate({ 
                path: 'group',
                populate: {
                  path: 'members',
                  model: 'Member',
                  populate: {
                    path: 'user_id',
                    model: 'User'
                    
                  } 
                } 
             })
    
            return group
        } catch (error) {
            console.error(error);
            throw new Error(error.message)
        }
    }

    /*
    async getExpences(expensesId) {
        try {
            const result = await ExpensesModel.findById(expensesId);

            return result
        } catch (error) {
            console.error(error);
            throw new Error(error.message)
        }
    }
    */

//     delete
    async deleteAll() {
        try {
            const resources =await NotesModel.deleteMany();
            return resources
        } catch (error) {
            console.error(error);
            throw new Error(error.message)
        }
    }
    
    async deleteOne(groupId) {
        try {
            const resources =await GroupModel.findByIdAndDelete(groupId);
            return resources
        } catch (error) {
            console.error(error);
            throw new Error(error.message)
        }
    }
}


module.exports=notesService;