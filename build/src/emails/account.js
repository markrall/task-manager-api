"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCancellationEmail = exports.sendWelcomeEmail = void 0;
const tslib_1 = require("tslib");
const sgMail = require('@sendgrid/mail');
const SG_API_KEY = process.env.SG;
sgMail.setApiKey(SG_API_KEY);
const sendWelcomeEmail = (email, name) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const msg = {
        to: email,
        from: 'sendgrid@codeinfront.com',
        subject: 'Welcome!',
        text: `
      Welcome ${name}! 

      Check out the blog for our lastest tips to accelerate your productivity foo.
      
      Let us know about your experience so we can improve.
      
      Have a awesome day!

      Regards,
      TMAP Team`,
    };
    yield sgMail.send(msg);
});
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendCancellationEmail = (email, name) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const msg = {
        to: email,
        from: 'sendgrid@codeinfront.com',
        subject: "We're sorry to see you go!",
        text: `
      Hi ${name},
      
      Thanks for trying TMAPP. Let us know about your experience so we can improve.
      
      Regards,
      TMAPP Team
      `,
    };
    yield sgMail.send(msg);
});
exports.sendCancellationEmail = sendCancellationEmail;
//# sourceMappingURL=account.js.map