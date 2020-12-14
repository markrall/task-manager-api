const sgMail = require('@sendgrid/mail')
const SG_API_KEY = process.env.SG

sgMail.setApiKey(SG_API_KEY)

const sendWelcomeEmail = async (email, name) => {
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
  }
  await sgMail.send(msg)
}

const sendCancellationEmail = async (email, name) => {
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
  }
  await sgMail.send(msg)
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
}
