
module.exports = (req, res, next) => {
  const { _id } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.json({ status: "err" });
    }
    req.payload = payload;
    next();
  });
};
