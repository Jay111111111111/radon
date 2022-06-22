const authorModel = require("../Models/authorModel");
const jwt = require("jsonwebtoken");
const createAuthor = async function (req, res) {

  try {
    let data = req.body;

    if (Object.keys(data).length != 0) {
      let savedData = await authorModel.create(data);
      res.status(201).send({ msg: savedData });
    } else res.status(400).send({ msg: "BAD REQUEST" });
  } catch (err) {
    console.log("This is the error :", err.message);
    res.status(500).send({ msg: "Error", error: err.message });
  }
};


const authorLogin = async function (req, res) {
  let authorName = req.body.emailId;
  let password = req.body.password;

  let user = await authorModel.findOne({ emailId: authorName, password: password });
  if (!user)
    return res.send({// run without it
      status: false,
      msg: "username or the password is not corerct",
    });


    let token = jwt.sign(//.verify foy checq validation
    {
      authorId: user._id.toString(),
      batch: "Author",
      organisation: "FUnctionUp",
    },
    "functionup-thorium"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, data: token });
};


module.exports.createAuthor = createAuthor;
module.exports.authorLogin=authorLogin
