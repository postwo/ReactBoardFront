import ResponsDto from "../response.dto";

export default interface SignInResponseDto extends ResponsDto{
    token: string;
    expirationTime: number;
}