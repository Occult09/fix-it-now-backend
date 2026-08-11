import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";


export const createToken = (jwtPaylaod: JwtPayload, secret: string, expiresIn: SignOptions) => {
    const token = jwt.sign(jwtPaylaod, secret, { expiresIn } as SignOptions);

    return token;
}

export const verifyToken = (token: string, secret: string) => {
    const verifiedToken = jwt.verify(token, secret);

    if (!verifiedToken) {
        throw new Error("Invalid Token");
    }

    return verifiedToken;
}