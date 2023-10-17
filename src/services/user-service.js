const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    async signIn(email, password) {
        try {
            // step 1:- fetch the user using email 
            const user = await this.userRepository.getByEmail(email);

            // step 2:- compare the input password with the encrypted password
            const passwordsMatch = this.checkPassword(inputPassword, user.password);

            if(!passwordsMatch) {
                console.log("Password does not match");
                throw {error: "Incorrect Password"}; 
            }

            // step 3:- if pwd match, create a new JWT token and send it to user. 
            const newJWT = this.createToken({email: user.email, id: user.id});
        } catch {
            console.log("Something went wrong in the signin process.");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw {error: 'Invalid token'}
            }
            const user = this.userRepository.getById(response.id);
            if(!user) {
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the auth process");
            throw error;
        }
    }
    
    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: 30});
            return result;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    verifyTokent(token) {
        try {
            const responce = jwt.verify(token, JWT_KEY);
            return responce;
        } catch {
            console.log("Something went wrong in the token verificaton");
            throw error;
        }
    }

    checkPassword(userInputPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }
}

module.exports = UserService;