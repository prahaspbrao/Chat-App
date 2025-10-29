export const signup =  async (req , res) =>{
    const {fullName , email , password} = req.body;

    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message : "All fields are  required"})
        }

        if(password.length < 6){
            return res.status(400).json({message : "Password should be atleast 6 charecters"})
        }

        // check if email valid : regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message : "Invalid email format"})
        }
    } catch (error) {
        
    }
}