import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./request/auth";
import { SignInResponseDto, SignUpResponseDto } from "./response/auth";
import { ResponsDto } from "./response";
import { error } from "console";
import { off } from "process";
import { GetSignInUserResponseDto } from "./response/user";

const DOMAIN = 'http://localhost:4000';

const API_DOMAIN = `${DOMAIN}/api/v1`;

const authorization = (accessToken: string) => {
    return {headers: {Authorization: `Bearer ${accessToken}`}}
};

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

const Get_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;

export const GetSignInUserReuest = async(accessToken: string) => {
    const result = await axios.get(Get_SIGN_IN_USER_URL(), authorization(accessToken))
        .then(response => {
            const responseBody: GetSignInUserResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponsDto = error.response.data;
            return responseBody;
        });
    return result;
}