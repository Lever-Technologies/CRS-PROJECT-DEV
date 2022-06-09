import { Inject, UseGuards } from '@nestjs/common';
import { User } from './entities/user.entity';
import { RegisterDto, LoginDto, UserToken } from './dto/auth.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver('auth')
export class AuthResolver {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Mutation(() => User, { name: 'registerUser' })
  registerUser(@Args('registerInput') registerInput: RegisterDto) {
    return this.service.register(registerInput);
  }

  @Mutation(() => UserToken, { name: 'login' })
  login(
    @Args('loginInput')
    loginInput: LoginDto,
  ) {
    return this.service.login(loginInput);
  }

  @Mutation(() => UserToken, { name: 'refresh' })
  @UseGuards(JwtAuthGuard)
  refresh(
    @Args('userInput')
    userInput: RegisterDto,
  ) {
    return this.service.refresh(<User>userInput);
  }
}
