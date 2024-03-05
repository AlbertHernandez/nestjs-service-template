import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface SendMailOptions {
    to: string;
    subject: string;
    htmlBody: string;
    // Todo: Add attachments
    // attachments?:any[];
}

@Injectable()
export class EmailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'marketingtrial85@gmail.com',
            pass: 'bpoupoefvrkxhplo'
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
            console.log('failed to send email desde alayi mio');
            console.log(error);
            return false;
        }
    }
}