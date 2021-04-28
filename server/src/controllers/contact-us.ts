import { Request, Response } from "express";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const contactUs = (req: Request, res: Response): void => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.subject ||
    !req.body.message
  ) {
    res
      .status(400)
      .json({ error: "Please, enter all the necessary information" });
    return;
  }
  const { name, email, subject, message } = req.body;
  const emailData: sgMail.MailDataRequired = {
    to: process.env.PERSONAL_EMAIL,
    from: { email, name },
    subject,
    html: `
            <pre>${message},</pre>
            `,
  };
  sgMail
    .send(emailData)
    .then((sent) => console.log("SENT", sent))
    .catch((err) => console.log("ERROR", err));

  res.json({
    message: "Your message has been sent. Thank you for contacting us!",
  });
};
