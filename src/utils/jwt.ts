import * as JWT from 'jsonwebtoken';

export const jwt = {
  sign(payload: object) : string{
    return JWT.sign(payload, process.env.JWT_SECRET, {
      algorithm: 'HS256',
      issuer: 'feedbackness platform',
      expiresIn: process.env.JWT_LIFE,
    });
  },

  verify(token: string) : any {
    return JWT.verify(token, process.env.JWT_SECRET);
  },
};
