import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./request/auth";
import { SignInResponseDto, SignUpResponseDto } from "./response/auth";
import { ResponsDto } from "./response";
import { error } from "console";
import { off } from "process";

const DOMAIN = 'http://localhost:4000';

const API_DOMAIN = `${DOMAIN}/api/v1`;

const SIGN_IN_URL = () =>`${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () =>`${API_DOMAIN}/auth/sign-up`;

export const signInRequest =  async (requestBody : SignInRequestDto) =>{
    const reuslt = await axios.post(SIGN_IN_URL(),requestBody)
    .then(response => {
        const responseBody:SignInResponseDto = response.data;
        return responseBody;
    } )
    .catch(error =>{
        if(!error.response.data) return null;
        const responseBody: ResponsDto = error.response.data;
        return responseBody;
    })
    return reuslt;
}

export const signUpRequest = async (requestBody : SignUpRequestDto) =>{
    const result = await axios.post(SIGN_UP_URL(),requestBody)
        .then(response => {
            const responseBody: SignUpResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response.data) return null;
            const responseBody: ResponsDto = error.response.data;
            return responseBody;
        });
    return result    
}