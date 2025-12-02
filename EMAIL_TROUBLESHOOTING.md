# Email Troubleshooting Guide

If emails are not being sent, please check the following common issues:

## 1. Check Environment Variables

Ensure your `.env.local` file exists in the project root and contains the correct keys:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID_CONFIRMATION=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**Important:**
- Keys must start with `VITE_`.
- Restart the server (`npm run dev`) after changing `.env.local`.

## 2. Verify EmailJS Configuration

1.  **Service ID**: Go to EmailJS Dashboard -> Email Services. Ensure the ID matches `VITE_EMAILJS_SERVICE_ID`.
2.  **Template ID**: Go to EmailJS Dashboard -> Email Templates. Ensure the ID matches `VITE_EMAILJS_TEMPLATE_ID_CONFIRMATION`.
3.  **Public Key**: Go to EmailJS Dashboard -> Account -> General. Ensure the key matches `VITE_EMAILJS_PUBLIC_KEY`.

## 3. Check Template Variables

Your EmailJS template should use these variable names:
- `{{to_name}}`
- `{{to_email}}`
- `{{order_id}}`
- `{{order_total}}`
- `{{order_items_html}}` (Ensure "Contains HTML" is checked in EmailJS template settings for this field if available, or use triple braces `{{{order_items_html}}}`)

## 4. Browser Console

Open the browser developer tools (F12) and check the Console tab when placing an order.
- **Success**: You should see "Order confirmation email sent successfully".
- **Error**: You will see "Failed to send email: ..." with a specific error message from EmailJS.

## 5. Ad Blockers

Sometimes ad blockers or privacy extensions (like Ghostery, uBlock Origin) can block EmailJS scripts. Try disabling them for your localhost.
