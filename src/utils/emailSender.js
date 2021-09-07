import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

const sender = "kigali.dev@gmail.com";
let mailOptions;

const transporter = nodemailer.createTransport({
  service: "gmail",
  maxConnections: 3,
  pool: true,
  auth: {
    user: `${sender}`,
    pass: process.env.EMAILPASSWORD,
  },
});

const options = {
  viewEngine: {
    partialsDir: `E:/Projects/Windows-Services-Monitor/views/partials`,
    layoutsDir: `E:/Projects/Windows-Services-Monitor/views/layouts`,
    
    extname: ".hbs",
  },
  extName: ".hbs",
  viewPath: "views",
};

transporter.use("compile", hbs(options));
const send = async () => {
  const maillist = ["abdou.niyigena@equitybank.co.rw"];

  mailOptions = {
    from: `${sender}`,
    to: maillist,
    subject: "STPA STATUS",
    template: "emailTemplate",
    // context: {
    //   name: firstName,
    //   otp,
    // },
  };

  await transporter.sendMail(mailOptions, (error, infos) => {
    if (error) {
      console.log(error);
    } else {
      // console.log(`Email sent: ${infos.response}`);
    }
  });
};

export default send;
