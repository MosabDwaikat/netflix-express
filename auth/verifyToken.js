const verifyToken = (admin) => (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(400).json({ message: "No token provided" });
  }

  if (!authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = authorizationHeader.split(" ")[1];

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      console.log("Error verifying token:", error);
      return res.status(403).json({ message: "Invalid token" });
    });
};

module.exports = verifyToken;
