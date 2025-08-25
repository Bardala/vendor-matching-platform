import { IsEmail, IsString } from 'class-validator';

export class ClientReqDto {
  @IsString()
  companyName: string;

  @IsEmail()
  contactEmail: string;
}
