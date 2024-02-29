import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Esto llega gracias a la importación de JwtModule en los import del módulo de auth. 
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {

    try {
      // Esto para preparar para el insertado.
      // Si se usa save directamente, se inserta el objeto tal cual,
      // y si tiene campos que no deberían ser insertados, se insertarán.
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user);
      delete user.password;


      await this.userRepository.save(user);

      console.log(user);

      // TODO: JWT de 

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };


    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      // Recordar siempre seleccionar el id para el payload del token.
      // Los emails pueden ser sensibles o cambiantes, y no deberían ser incluidos en el token.
      select: { email: true, password: true, id: true }
    });

    if (!user)
      throw new UnauthorizedException('Credenciales no válidas.');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales no válidas.');

    console.log(user);

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  private getJwtToken(payload: JwtPayload) {
    // Aqui se firma el token con el payload.
    // Este codigo es sincrono, pero el metodo sign puede ser asincrono.
    const token = this.jwtService.sign(payload);

    return token;
  };

  private handleDBErrors(error: any): never {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');

  }


}
