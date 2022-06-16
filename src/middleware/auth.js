const authenticate = async function(req, res, next) {
    //check the token in request header
    //validate this token
    let token = req.headers["v-auth-token"];
  if (!token) token = req.headers["v-auth-token"];
  if (!token) return res.send({ status: false, msg: "token must be present" });
  console.log(token);

  let decodedToken = jwt.verify(token, "functionup-thorium");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
  console.log("authentication succesfull")
    next()
}


const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
    let token = req.headers["x-auth-token"];
    if(!token) token = req.headers["x-auth-toke"];
    if(!token) return res.send({status: false, msg:"token must be present"});
    console.log(token);


    let decodedToken = jwt.verify(token, "functionup-thorium");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });

  let userModify = req.params.userId;
  let userLoggedin = decodedToken.userId
  if (!userModify != userLoggedin)
    return res.send({ status: false, msg: "user logged in not allowed" });

    res.send({ status: true, data: userLoggedin });
    console.log("autherization succesfull")

    next()
}


module.exports.authenticate = authenticate
module.exports.authorise = authorise