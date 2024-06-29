import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshCookieStrategy } from './strategies/jwt-refresh-cookie.strategy';
import { JwtRefreshCookieGuard } from './guards/jwt-refresh-cookie.guard';
import { LoginGuard } from './guards/login.guard';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    JwtRefreshCookieStrategy,
    JwtAuthGuard,
    JwtRefreshGuard,
    JwtRefreshCookieGuard,
    LoginGuard,
  ],
})
export class AuthModule {}
