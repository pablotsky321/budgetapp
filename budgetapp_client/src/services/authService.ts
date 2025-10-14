import {  LoginType, UserType, LoginResponseType } from "@/interfaces/AuthContextTypes";

export async function login(loginData: LoginType): Promise<LoginResponseType> {

   const loginRequest = await fetch("http://localhost:8080/auth/login", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'        
    },
    body: JSON.stringify(loginData)
   })

   const data = await loginRequest.json()

   return await data as LoginResponseType
}

export async function register(registerData: UserType): Promise<UserType | null> {

    const loginRequest = await fetch("http://localhost:8080/auth/register", {
     method: 'post',
     headers: {
         'Content-Type': 'application/json'        
     },
     body: JSON.stringify(registerData)
    })
 
    const data = await loginRequest.json()
 
    return await data as UserType
 }
