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
import { EmailService } from '@src/email/email.service';
import { randomBytes } from 'crypto';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,

    private readonly emailService: EmailService
  ) { }

  /**
   * La función crea un nuevo usuario, genera un token de confirmación, guarda el usuario en la base de datos
   * y envía un correo electrónico de confirmación con un enlace de activación.
   * @param {CreateUserDto} createUserDto - El parámetro `createUserDto` en el método `create` es un
   */
  async create(createUserDto: CreateUserDto): Promise<void> {

    const existingUser = await this.userRepository.findOneBy({ email: createUserDto.email });
    if (existingUser) {
      throw new BadRequestException('Dirección de correo electrónico ya registrada');
    }

    try {

      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      const newUser = this.userRepository.create(user);
      const confirmationToken = this.generateConfirmationToken(newUser.email);
      newUser.verificationToken = confirmationToken;
      await this.userRepository.save(newUser);

      const activationLink = `http://localhost:3040/auth/confirm-email/${confirmationToken}`;

      await this.emailService.sendEmail({
        to: newUser.email,
        subject: 'Bienvenido a la plataforma',
        htmlBody: `Gracias por registrarte en la plataforma. Confirma tu email con este link n/ <a href="${activationLink}"> Link here</a>`
      });

    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async confirmEmail(token: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { verificationToken: token } });
    if (!user) {
      throw new BadRequestException('Token de confirmación inválido');
    }

    user.emailVerified = true;
    await this.userRepository.save(user);
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



    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  googleLogin(req: any) {
    if (!req.user) {
      return 'No hay usuario de Google';
    }

    return {
      message: 'Información del usuario de Google',
      user: req.user,
    };
  }

  private getJwtToken(payload: JwtPayload) {
    // Aqui se firma el token con el payload.
    // Este codigo es sincrono, pero el metodo sign puede ser asincrono.
    const token = this.jwtService.sign(payload);

    return token;
  };

  private generateConfirmationToken(email: string): string {
    const token = randomBytes(32).toString('hex'); // Generate a random token
    // Nota!: Es posible que desees almacenar este token junto con el correo electrónico del usuario en la base de datos para su verificación

    return token;
  }

  private handleDBErrors(error: any): never {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Por favor, revisa los registros del servidor');

  }

  testAuthorization() {
    return "Esta es una ruta privada y utiliza autorización de casl.";
  }


}