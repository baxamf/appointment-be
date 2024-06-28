import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigName } from 'src/config/config-names.enum';
import { IAppConfig } from 'src/config/app.config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const cfg = configService.get<IAppConfig>(ConfigName.APP);

        return {
          secret: cfg.jwtSecret,
          signOptions: { expiresIn: cfg.jwtExpiresIn },
        };
      },
    }),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
