export function createContactEmailHtml(
  name: string,
  email: string,
  message: string,
  timestamp: string
): string {
  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedMessage = escapeHtml(message).replace(/\n/g, '<br>');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600;">New Contact Message</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">From your portfolio website</p>
            </td>
          </tr>
          <!-- Sender Info -->
          <tr>
            <td style="padding:32px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border-radius:8px;padding:20px;">
                <tr>
                  <td>
                    <p style="margin:0 0 8px;font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">From</p>
                    <p style="margin:0 0 4px;font-size:16px;color:#1e293b;font-weight:600;">${escapedName}</p>
                    <a href="mailto:${escapedEmail}" style="font-size:14px;color:#6366f1;text-decoration:none;">${escapedEmail}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Message -->
          <tr>
            <td style="padding:24px 40px;">
              <p style="margin:0 0 12px;font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
              <div style="font-size:15px;color:#334155;line-height:1.7;">${escapedMessage}</div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 32px;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 4px;font-size:12px;color:#94a3b8;">Received on ${escapeHtml(timestamp)}</p>
              <p style="margin:0;font-size:12px;color:#94a3b8;">Reply directly to this email to respond to <strong>${escapedName}</strong> at ${escapedEmail}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
