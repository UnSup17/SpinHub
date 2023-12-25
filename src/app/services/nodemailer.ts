import nodemailer from "nodemailer";
import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

export async function sendMail({
  subject,
  toEmail,
  optText,
}: {
  subject: string;
  toEmail: string;
  optText: string;
}) {
  const oauth2Client = new OAuth2({
    clientId: process.env.HAPPYFOX_GOOGLE_CLIENT_ID,
    clientSecret: process.env.HAPPYFOX_GOOGLE_CLIENT_SECRET,
    redirectUri: "https://developers.google.com/oauthplayground",
  });

  oauth2Client.setCredentials({
    refresh_token: process.env.HAPPYFOX_GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();

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

  const mailOptions = {
    from: process.env.HAPPYFOX_GMAIL_ADDRESS,
    to: toEmail,
    subject: subject,
    generateTextFromHTML: true,
    html: optText,
  };

  try {
    const response = await smtpTransport.sendMail(mailOptions);
    smtpTransport.close();
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
}