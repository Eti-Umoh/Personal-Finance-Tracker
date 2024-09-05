import sgMail from '@sendgrid/mail';

// Load the API key from environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send an email
export const sendEmail = async (req, res) => {
    const { email, message } = req.body;

    const msg = {
        to: 'etiumoh04@gmail.com', // Recipient email
        from: process.env.SMTP_HOST_SENDER, // Sender email
        subject: 'User Enquiry',
        html: `<p>This email is from ${email}</p><p>${message}</p>`,
    };

    try {
        const response = await sgMail.send(msg);
        res.status(200).json({ message: 'Email sent successfully', response });
    } catch (error) {
        console.error('Error sending email: ', error);
        res.status(500).json({ message: 'Failed to send email', error });
    }
};
