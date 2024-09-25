import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, msg: "no token ,authorised denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("topa");
    console.log(decoded);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(501).json({ msg: err.message });
  }
};
export default isAuth;
