import { IsInt, IsNotEmpty, IsString, isString } from 'class-validator';

export class JoinWorkspaceDTO {

    @IsString()
    @IsNotEmpty()
    code: string;
}
