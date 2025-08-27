# Email & Security Setup Instructions for Volumetric Ventures Contact Form

The contact form is now configured to send emails automatically using EmailJS. Follow these steps to activate it:

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up Free" (200 emails/month free)
3. Verify your email address

## Step 2: Add Your Email Service
1. In EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose your email provider:
   - **Gmail** (recommended for simplicity)
   - **Outlook**
   - **Yahoo**
   - Or any other provider
4. Follow the connection instructions
5. Note your **Service ID** (e.g., "service_abc123")

## Step 3: Create Email Template
1. Click "Email Templates" in dashboard
2. Click "Create New Template"
3. Set up the template:
   - **To Email**: info@volumetricventures.com
   - **From Name**: {{from_name}}
   - **Subject**: {{subject}}
   - **Content**:
   ```
   New contact form submission from Volumetric Ventures website:
   
   Name: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}
   
   Message:
   {{message}}
   ```
4. Save and note your **Template ID** (e.g., "template_xyz789")

## Step 4: Get Your Public Key
1. Click "Integration" in dashboard
2. Copy your **Public Key** (e.g., "user_AbCdEfGh")

## Step 5: Set up reCAPTCHA v3
1. Go to: https://www.google.com/recaptcha/admin/create
2. Configure:
   - **Label**: Volumetric Ventures
   - **reCAPTCHA type**: reCAPTCHA v3
   - **Domains**: 
     - volumetricventures.com
     - www.volumetricventures.com
     - localhost (for testing)
3. Submit and get your keys:
   - **Site Key**: (public, for website)
   - **Secret Key**: (keep private)

## Step 6: Update Website Code
Edit the following files with your actual keys:

**index.html** (Line 161):
```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY_HERE"></script>
```

**script.js**:
- Line 46: Replace `YOUR_EMAILJS_PUBLIC_KEY` with your EmailJS public key
- Line 49: Replace `YOUR_RECAPTCHA_SITE_KEY` with your reCAPTCHA site key
- Line 125: Replace `YOUR_SERVICE_ID` with your EmailJS service ID
- Line 125: Replace `YOUR_TEMPLATE_ID` with your EmailJS template ID

Example:
```javascript
emailjs.init('user_AbCdEfGh');
const RECAPTCHA_SITE_KEY = '6Lc_1234567890AbCdEfGh';
...
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

## How It Works
- Messages are sent automatically from EmailJS's servers
- No email client opens for the user
- You receive emails at info@volumetricventures.com
- Users see "Thank you, we will be in contact soon." message
- Message disappears after 3 seconds
- Keyboard retracts on mobile before message appears
- Falls back to mailto method if EmailJS fails

## Testing
1. Open your website
2. Fill out the contact form
3. Click "Send Message"
4. Check info@volumetricventures.com for the email

## Alternative: Using Your Own SMTP
If you prefer using your own email address as sender, you can:
1. Use Gmail with an App Password
2. Configure it in EmailJS as a custom SMTP service
3. This way emails come from your own address (e.g., noreply@volumetricventures.com)

## Monitoring
- Check EmailJS dashboard for email history and statistics
- Free tier: 200 emails/month, 2 templates
- Upgrade if needed for more volume