
import jwt from "jsonwebtoken";
const SECRET = "ESNONSODFJSJ";


const createTokenForUser = (user) => {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    };
    const token = jwt.sign(payload, SECRET

    );
    return token;
}

const validateToken = (token) => {
    const payload = jwt.verify(token, SECRET);
    // console.log(payload);
    return payload;
}

export { createTokenForUser, validateToken };

