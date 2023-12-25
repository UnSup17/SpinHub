import nodemailer from "nodemailer";
import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

export async function sendMail(mails: {
  subject: string;
  toEmail: string;
  optText: string;
}[]) {
  const oauth2Client = new OAuth2({
    clientId: process.env.HAPPYFOX_GOOGLE_CLIENT_ID,
    clientSecret: process.env.HAPPYFOX_GOOGLE_CLIENT_SECRET,
    redirectUri: "https://developers.google.com/oauthplayground",
  });

  oauth2Client.setCredentials({
    refresh_token: process.env.HAPPYFOX_GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = await oauth2Client.getAccessToken();

  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.HAPPYFOX_GOOGLE_ADDRESS,
      clientId: process.env.HAPPYFOX_GOOGLE_CLIENT_ID,
      clientSecret: process.env.HAPPYFOX_GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.HAPPYFOX_GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  } as any);

  try {

    await new Promise((resolve, reject) => {
      smtpTransport.verify(function (error, success) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    const response: any = []

    mails.forEach(async (mail) => {
      const mailOptions = {
        from: process.env.HAPPYFOX_GOOGLE_ADDRESS,
        to: mail.toEmail,
        subject: mail.subject,
        generateTextFromHTML: true,
        html: mail.optText,
      };
      await new Promise((resolve, reject) => {
        smtpTransport.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log(info);
            response.push(info);
            resolve(info);
          }
        });
      })
    })

    console.log(response);
    return response;
  } catch (error: any) {
    return error;
  } finally {
    smtpTransport.close();
  }
}