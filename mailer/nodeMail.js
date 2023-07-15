const nodemailer = require("nodemailer");

async function messageNow(email, token) {
  let transport = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "arush3339@gmail.com",
      pass: "hqbstqtshhjydviw",
    },
  });

  let message = {
    to: email,
    from: "Web Bookmarker 🔖 <web-bookmarker.herokuapp.com>",
    subject: "Reset Your Password",
    text: `Click on the Link : `,
    html: `<a href="http://localhost:3000/reset-password?token=${token}" classname="btn btn-primary">Change Password</a>`,
  };

  let info = await transport.sendMail(message);

  return info;
  // console.log("Info", info);
  // console.log("Message Send : %s", info.messageId);
}

messageNow().catch((err) => console.log(err));

exports.messageNow = messageNow;
