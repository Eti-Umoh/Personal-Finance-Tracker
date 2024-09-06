import sgMail from '@sendgrid/mail';

// Load the API key from environment variables
const apiKey = String(process.env.SENDGRID_API_KEY);
console.log(apiKey)
sgMail.setApiKey(apiKey);

// Function to send welcome email
export const sendEmail = async (user, password) => {
    const msg = {
        to: user.emailAddress, // Recipient email
        from: process.env.SMTP_HOST_SENDER, // Sender email
        subject: 'Finance Tracker Account Created',
        html: `<p><b>Hi ${user.firstName},</b></p>
                <p>Your account has been created, and here are your login details:</p>
                <p><b>Email:</b> ${user.emailAddress}</p>
                <p><b>Password:</b> ${password}</p>
                <p>We recommend changing your password after the first login for security reasons.</p>
                <br>
                <p>Best regards</p>`,
            };
            try {
                const response = await sgMail.send(msg);
                return {
                    success: true,
                    message: 'Email sent successfully',
                    response: response,
                };
            } catch (error) {
                console.error('Error sending email: ', error);
                return {
                    success: false,
                    message: 'Failed to send email',
                    error: error,
                };
            }
        };


// Function to send token via email
export const sendToken = async (emailAddress, token) => {
    const msg = {
        to: emailAddress, // Recipient email
        from: process.env.SMTP_HOST_SENDER, // Sender email
        subject: 'Password Reset Token',
        html: `<p>Here is your token to reset your password:</p>
                <p><b>Token:</b> ${token}</p>
                <br>
                <p>This token will expire in 15 mins.</p>`,
            };
            try {
                const response = await sgMail.send(msg);
                return {
                    success: true,
                    message: 'Email sent successfully',
                    response: response,
                };
            } catch (error) {
                console.error('Error sending email: ', error);
                return {
                    success: false,
                    message: 'Failed to send email',
                    error: error,
                };
            }
        };