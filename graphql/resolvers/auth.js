const User = require('../../Models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


module.exports =  {  
    createUser: async (args) => {
        try{
        const existingUser = await User.findOne({email: args.userInput.email})
        if(existingUser){
            throw new Error('User already exist');
        }
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        const user = new User({
            email : args.userInput.email,
            //dont store it like that on DB. security issue
            // password: args.userInput.password..Hash-it instead
            password: hashedPassword
        });
        const result = await user.save();
        console.log(result)
        return {...result._doc, password: null};
    }
        catch(err)  {
            console.log(err);
            throw err;
        }
    },
    login : async({email, password}) => {
        const user =  await User.findOne({email: email});
        if(!user){
            throw new Error('user doessnt exist');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual){
            throw new Error('Invalid Crendentials(password)');
        }
        //first argumern is data we want in the token
        //2nd is a string used to hash the token, must be on server not exposed to clients
        const token = jwt.sign({userId: user.id , email: user.email}, 'somesupersecretkey' , {
            expiresIn: '1h'
        });
        return {userId: user.id, token: token, tokenExpiration: 1 };
    }
    
}

