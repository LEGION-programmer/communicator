const User = require('../db/models/user')
const bcrypt = require("bcryptjs")
const GenerateError = require('../midleware/error')
const GenerateSuccesResponse = require('../midleware/succes')

class UserController {
    async register(req, res){
        try{
            const {name, surname, password, cPassword, sex} = req.body
            if(cPassword != password){
                throw new GenerateError('Posswords are not the same!');
            }
                  
            const userId = Math.floor(Math.random()*10000)
            const user = new User({userId, name, surname, password, sex})
            await user.save()
            return res.json(new GenerateSuccesResponse(userId))
            
        }catch(e){
            return res.json(e)
        }
    }

    async login(req, res){
        try{
            const {userId, password} = req.body
            const user = await User.find({userId})
            if(!user){
                throw new GenerateError('This user doesnt exist')
            }
            bcrypt.compare(password, user.password, (isMatch, error) => {
                if(error){
                    throw new GenerateError(error)
                }else if(!isMatch){
                    throw new GenerateError('Wrong password')
                }
            })
            return res.json(new GenerateSuccesResponse(userId))
        }catch(e){
            return res.json(e)
        }
    }

    async findListOfUsersById(req, res){
        let userList
        try{
            userList = await User.find({userId: req.params.userId})
            if(!userList){
                throw new GenerateError('User not found')
            }
            return res.json(userList)        
        }catch(e){
            return res.json(e)
        }
    }

    async addNewFriend(req, res) {
        try {
            const userId = Number(req.body.userId)
            const friendId = Number(req.body.friendId)
        
            if (isNaN(userId) || isNaN(friendId)) {
                return res.status(400).json({ message: 'Bad id' })
            }
        
            const user = await User.findOne({ userId: userId })
        
            if (!user) {
                return res.status(404).json({ message: "user doesn't exist" })
            }
        
            user.friends.push(friendId)
            await user.save()
        
            return res.status(200).json({ message: 'New fiend added' })
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async getFriendsId(req, res){
        try {
            const userId = req.params.userId
    
            const user = await User.findOne({ userId })
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }
    
            const friendsIdArray = user.friends
    
            const friends = await User.find({ userId: { $in: friendsIdArray } })
    
            if (!friends || friends.length === 0) {
                return res.status(404).json({ message: 'No friends found' })
            }
    
            return res.status(200).json({ friends })
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async getUserInfo(req, res){
        try{
            const user = await User.findOne({userId: req.params.userId})
            if(!user){
                return res.status(404).json({message: 'User not found'})
            }
            return res.status(200).json(user)
        }catch(e){
            return res.status(500).json({ message: 'Internal server error' })
        }

    }
}

module.exports = new UserController