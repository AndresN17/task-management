import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    singUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    singIn(@Body() authCredentialsDto: AuthCredentialsDto){
        return this.authService.signIn(authCredentialsDto);
    }
}
