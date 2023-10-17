const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const UserService = require('./services/user-service');
// const UserRepository = require('./repository/user-repository');
// const {User} = require('./models/index');
// const bcrypt = require('bcrypt');

const app = express();

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(3001, async () => {
        console.log(`Server Started on Port: ${PORT}`);

        // create the token here. 
        const service = new UserService();
        const newToken = service.createToken({email: 'dev_en@gmail.com', id: 1});
        console.log("New token is:- ", newToken);
        
        // verifiy the token here
        const verifyToken = service.verifyTokent(newToken);
        console.log("Verified token is:- ", verifyToken);
        // const repo = new UserRepository();

        // const response = await repo.getById(1);
        // console.log(response);
        // const incomingpassword = '123456';
        // const user = await User.findByPk(3);
        // const response = bcrypt.compareSync(incomingpassword, user.password);
        // console.log(response);
    });
}   

prepareAndStartServer();