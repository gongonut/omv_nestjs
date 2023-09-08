import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { UpdateQuoteDto } from 'src/quote/dto/update-quote.dto';

@Injectable()
export class EmailService {

  constructor(private mails: MailerService) { }

  async quoteEmail(updateQuoteDto: UpdateQuoteDto) {
    await this.mails.sendMail({
      to: updateQuoteDto.client_email,
      from: process.env.EMAIL_USER, // from: updateQuoteDto.agent_email,
      subject: 'Respuesta a su solicitud de cotización',
      // html: updateQuoteDto.htmlQuote,
      attachments: [{ filename: `${updateQuoteDto.client_name}_cotiza.html`, content: updateQuoteDto.htmlQuote }]
    })
    return 'ok';
  }

  async defaultEmailHtml(emailDto: UpdateEmailDto) {
    await this.mails.sendMail({
      to: emailDto.to,
      from: emailDto.from,
      subject: emailDto.subject,
      html: emailDto.html,
      // attachments: emailDto.attachments
    })
    return 'ok';
  }

  /*

  create(createEmailDto: CreateEmailDto) {
    return 'This action adds a new email';
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
  */
}
