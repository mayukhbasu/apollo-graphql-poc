import * as sgMail from "@sendgrid/mail";
import "dotenv/config";


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async(recipient: string, url: string) => {
    const content = {
        to: `${recipient}`,
        from: 'test@example.com',
        subject: 'Confirm Email',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<strong>Click here to confirm email ${url}</strong>`,
    };

    await sgMail.send(content);
}