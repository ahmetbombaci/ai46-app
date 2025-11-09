# EmailJS Setup Guide for AI46 Website

This guide will help you set up **free email functionality** for your contact form using EmailJS.

## Why EmailJS?

- ✅ **200 free emails/month** (4x more than Formspree's 50)
- ✅ **No server needed** - works with static sites
- ✅ **Custom email templates** - professional branded emails
- ✅ **Auto-reply feature** - send confirmation to users
- ✅ **Multiple recipients** - CC/BCC support
- ✅ **Stays on your site** - no redirects

## 📋 Step-by-Step Setup

### 1️⃣ Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com)
2. Click **"Sign Up Free"**
3. Verify your email address

### 2️⃣ Add Your Email Service

1. In EmailJS Dashboard, click **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:

   - **Gmail** (easiest)
   - **Outlook**
   - **Yahoo**
   - Or any SMTP service

4. **For Gmail:**
   - Click "Connect Account"
   - Authorize EmailJS to send emails
   - Name it (e.g., "AI46 Gmail Service")
   - Click "Create Service"
   - **Copy the Service ID** (e.g., `service_abc123`)

### 3️⃣ Create Email Template

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Set up your template:

**Subject:**

```
New Inquiry from {{from_name}} - AI46 Website
```

**Content (To You):**

```
Hello,

You have received a new message from your AI46 website:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Service Interest: {{service_interest}}

Message:
{{message}}

Best regards,
AI46 Website
```

**Auto-Reply (To User) - Optional:**

```
Hi {{from_name}},

Thank you for contacting AI46! We've received your message and will get back to you within 24 hours.

Your inquiry details:
- Service Interest: {{service_interest}}
- Message: {{message}}

We look forward to discussing how AI can transform your business.

Best regards,
AI46 Team
contact@ai46.app
```

4. Click **"Save"**
5. **Copy the Template ID** (e.g., `template_xyz789`)

### 4️⃣ Get Your Public Key

1. Go to **"Account"** → **"General"**
2. Find **"Public Key"**
3. **Copy it** (e.g., `abcDEF123456`)

### 5️⃣ Update Your Website Files

Update these 3 values in your files:

**In `index.html`:**

```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
```

**In `script.js`:**

```javascript
const SERVICE_ID = "YOUR_SERVICE_ID"; // Replace with your service ID
const TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // Replace with your template ID
```

### 6️⃣ Test Your Form

1. Open your website
2. Fill out the contact form
3. Click "Send Message"
4. Check your email!

## 🎯 Complete Example

After setup, your code should look like:

**index.html:**

```javascript
emailjs.init("u7x9PQr5K2mNs8D4"); // Your actual public key
```

**script.js:**

```javascript
const SERVICE_ID = "service_7h3j9k2"; // Your actual service ID
const TEMPLATE_ID = "template_m4n8p5q"; // Your actual template ID
```

## 🔒 Security Tips

1. **Public Key is Safe** - It's meant to be public
2. **Don't Share Service ID** - Though it's in your code, don't share unnecessarily
3. **Use Domain Whitelist** - In EmailJS settings, add `your-username.github.io`
4. **Monitor Usage** - Check EmailJS dashboard for unusual activity

## 📊 Monitoring Your Emails

- **Dashboard**: See all sent emails
- **History**: Track what was sent and when
- **Stats**: Monitor your usage (200/month limit)
- **Logs**: Debug any issues

## 🚀 Advanced Features (Optional)

### Add reCAPTCHA (Prevent Spam)

```javascript
// Add to form submission
grecaptcha.ready(function () {
  grecaptcha.execute("YOUR_SITE_KEY", { action: "submit" });
});
```

### Add File Attachments

```javascript
// EmailJS supports attachments in paid plans
attachments: [
  {
    name: "file.pdf",
    data: base64data,
  },
];
```

### Multiple Recipients

```javascript
// In your template settings
to_email: "contact@ai46.app, sales@ai46.app";
```

## ❓ Troubleshooting

| Issue                    | Solution                                             |
| ------------------------ | ---------------------------------------------------- |
| "Service ID is invalid"  | Double-check SERVICE_ID in script.js                 |
| "Template ID is invalid" | Verify TEMPLATE_ID matches EmailJS                   |
| No email received        | Check spam folder, verify email service is connected |
| Hit 200 limit            | Upgrade to paid plan or wait for next month          |

## 💡 Pro Tips

1. **Test Mode**: EmailJS has a test mode to not use your quota
2. **Custom Domain**: Use your ai46.app email once domain is set up
3. **Backup**: Keep a CSV export of form submissions
4. **Analytics**: Track successful submissions with Google Analytics

## 📈 When to Upgrade

Consider EmailJS paid plans ($9/month) when:

- You need >200 emails/month
- You want file attachments
- You need priority support
- You want to remove EmailJS branding

## 🆘 Need Help?

- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
- Your site issues: Check browser console (F12)

---

**Remember**: EmailJS is the best free option for contact forms on static sites. It's reliable, professional, and gives you 4x more free emails than alternatives!
