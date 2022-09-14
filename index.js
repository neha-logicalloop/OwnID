const express = require("express");
const cors = require("cors");
const app = express();
const crypto = require('crypto');
const bodyParser = require('body-parser')
const connection = require("./connection");
const User = require("./user");
const server = require("http").createServer(app);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const SharedSecret  = "CJUf6HVMRxbcRFCvAphnpCDY3cjo3DJgwj4s2DsID+yZD1ZAhM1MktsDFDu6V97dyI7yj4368rBmBnKEHX+AqQ=="
const appId = "2c36rxgrff2ewu"
app.use(cors());

connection
  .connect()
  .then((success) => {
    server.listen(process.env.PORT || 8080, () => {
      console.log(`Running on port 8080.`);
      console.log(success);
    });
  })
  .catch((error) => {
    console.log(error);
    console.log("Db not connected!");
  });

  app.post('/v1/signup', async (req, res) => {
    const email = req.body.loginId; //The unique id of a user in your database, usually email or phone
    const ownIdData = req.body.ownIdData; //OwnID authentication information as string
    console.log(req.body,"dfsdf");
    const user = new User({
      email: loginId
    });
    user.ownIdData = ownIdData;
    await user.save();
    return res.sendStatus(204);
});

app.post('/v1/setOwnIDDataByLoginId', async (req, res) => {
    const email = req.body.loginId; //The unique id of a user in your database, usually email or phone
    const ownIdData = req.body.ownIdData; //OwnID authentication information as string
    console.log(req.body,"dfsdf");
    const user = await User.findOne({ email: email }).exec();
    user.ownIdData = ownIdData;
    await user.save();
    return res.sendStatus(204);
});

app.post('/v1/getOwnIDDataByLoginId', async (req, res) => {
    const email = req.body.loginId; //The unique id of a user in your database, usually email or phone
    const user = await User.findOne({ email: email }).exec();
    if (!user) { return res.json({ errorCode: 404 }) } //Error code when user doesn't exist
    res.json({ ownIdData: user.ownIdData }) //OwnID authentication information as string
});

app.post('/v1/getSessionByLoginId', async (req, res) => {
    const sign = require('jwt-encode');

    const email = req.body.loginId; //The unique id of a user in your database, usually email or phone
    const user = await User.findOne({ email: email }).exec();
    const jwt = sign({ email: user.email }, 'secret');
    return res.json({ token: jwt });
});