import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "@/contexts/users/user.entity";

@Controller("users")
export class UserController {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<{ user: User }> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException("User does not exist!");

    return { user };
  }

  @Post()
  async create(@Body() user: User): Promise<{ user: User }> {
    const newUser = await this.usersRepository.save(user);

    return { user: newUser };
  }
}
