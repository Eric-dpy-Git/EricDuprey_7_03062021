/* const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TKN || "groupomania");
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch (err) {
    res.status(401).json({
      error: new Error("Error in auth middleware"),
    });
  }
}; */
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const UserId = decodedToken.userId;
    console.log(UserId);
    console.log(req.body.userId);
    if (
      /* req.body.userId && req.body.userId !== UserId */ req.body.userId ==
      UserId
    ) {
      next();
      console.log("Token is validate !");
    } else {
      throw "Invalid user ID";
    }
  } catch {
    res.status(401).json({
      error: new Error("Error in auth middleware"),
    });
  }
};
