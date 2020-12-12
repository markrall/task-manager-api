const sgMail = require('@sendgrid/mail')
const SG_API_KEY = process.env.SG

sgMail.setApiKey(SG_API_KEY)

const sendWelcomeEmail = (email, name) => {
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
  sgMail.send(msg).then(
    () => {},
    error => {
      console.error(error)

      if (error.response) {
        console.error(error.response.body)
      }
    }
  )
}

const sendCancellationEmail = (email, name) => {
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
  sgMail.send(msg).then(
    () => {},
    error => {
      console.error(error)

      if (error.response) {
        console.error(error.response.body)
      }
    }
  )
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
}
