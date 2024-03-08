## **Introducción**

El Módulo de Correo Electrónico en tu aplicación Nest.js facilita el envío de correos electrónicos utilizando la biblioteca Nodemailer. Esta documentación proporciona una guía sobre cómo usar el módulo y cómo configurarlo para diferentes servicios de correo electrónico.

### **Propósito**

El propósito es permitir el envío eficiente de correos electrónicos en tu aplicación Nest.js. Puedes utilizarlo para enviar confirmaciones por correo electrónico al crear usuarios u otros casos de uso relacionados con el correo electrónico.

### **Configuración del Servicio de Correo**

Está configurado para utilizar el servicio de correo de Gmail de forma predeterminada. Sin embargo, puedes cambiar esta configuración para utilizar cualquier otro servicio de correo electrónico.

### Cambio del Servicio de Correo

Para cambiar el servicio de correo electrónico, debes actualizar la configuración del transporte de Nodemailer en el código.

### **Uso del Módulo de Correo Electrónico**

Para utilizar el Módulo de Correo Electrónico, primero, debes crear una instancia de la clase **`EmailService`** y luego llamar al método **`sendEmail`** con las opciones necesarias.

## **Ejemplo de Código**

Aquí hay un ejemplo de cómo puedes utilizar el Módulo de Correo Electrónico en tu aplicación Nest.js:

```tsx
typescriptCopy code
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface SendMailOptions {
    to: string;
    subject: string;
    htmlBody: string;
    // Todo: Agregar adjuntos
    // adjuntos?:any[];
}

@Injectable()
export class EmailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'correo@gmail.com', // Cambia esto por tu correo electrónico de Gmail
            pass: 'contraseña' // Cambia esto por tu contraseña de Gmail
        }
    });

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody
            });
            return true;
        } catch (error) {
            console.log('No se pudo enviar el correo electrónico:');
            console.log(error);
            return false;
        }
    }
}

```

En este ejemplo, debes reemplazar **`'correo@gmail.com'`** con tu dirección de correo electrónico de Gmail y **`'contraseña'`** con tu contraseña correspondiente.

Este código muestra cómo configurar y utilizar el servicio de correo electrónico en Nest.js utilizando Nodemailer.
