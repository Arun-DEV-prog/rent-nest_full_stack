
import type { JwtPayload, SignOptions } from "jsonwebtoken"
import jwt from 'jsonwebtoken';





const verifyToken=(token: string, secret: string)=>{
      try{
         const verifiedToken=jwt.verify(token, secret);

         return{
             success: true,
             data: verifiedToken as JwtPayload
         }

      }catch(error: unknown){
          const message = error instanceof Error ? error.message : "Invalid token";

          return{
             success: false,
             error: message
          }
      }
}

const signToken=(payload: string | object | Buffer, secret: string, options: SignOptions = {})=>{
    if (typeof payload === 'object' && payload !== null && !Buffer.isBuffer(payload)) {
      const payloadCopy = { ...payload } as Record<string, unknown>
      delete payloadCopy.exp
      delete payloadCopy.iat
      return jwt.sign(payloadCopy, secret, options)
    }

    return jwt.sign(payload, secret, options)
}

export const jwtUtils={
    verifyToken,
    signToken
}