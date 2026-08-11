import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";


export const createToken = (jwtPaylaod: JwtPayload, secret: string, expiresIn: SignOptions) => {
    const token = jwt.sign(jwtPaylaod, secret, { expiresIn } as SignOptions);

    return token;
}