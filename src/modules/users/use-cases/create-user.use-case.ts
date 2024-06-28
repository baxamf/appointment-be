import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserInput } from '../dto/create-user.input';
import { hash } from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(createUserInput: CreateUserInput) {
    const { password, ...userData } = createUserInput;

    const hashedPass = await hash(password, 10);

    return this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPass,
      },
    });
  }
}
