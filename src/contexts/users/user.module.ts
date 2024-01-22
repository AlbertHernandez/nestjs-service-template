import { Module } from "@nestjs/common";

import { UserController } from "./api/user.controller";

@Module({
  controllers: [UserController],
})
export class UserModule {}
