import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const user = GqlExecutionContext.create(ctx).getContext().req.user;

    return user && data ? user[data] : user;
  },
);
