import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class LoginUserDto {
    // Dev-Nota: Este dto se parece mucho al CreateUserDto, pero no es lo mismo. 
    // Si extendieramos de CreateUserDto, tendríamos que agregarle el fullName, que no es necesario para el login.
    // O ponerlo opcional, que no es lo que queremos.

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;


}