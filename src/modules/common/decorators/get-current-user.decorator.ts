import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserResponse } from 'src/modules/users/entities/user-response.entity';

export const CurrentUser = createParamDecorator(
  (data: keyof UserResponse, ctx: ExecutionContext) => {
    const user = GqlExecutionContext.create(ctx).getContext().req.user;

    return user && data ? user[data] : user;
  },
);
