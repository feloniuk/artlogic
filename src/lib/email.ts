import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  locale: string;
  submissionId: string;
}

export async function sendContactNotification(data: ContactEmailData) {
  const adminEmail = process.env.RESEND_ADMIN_TO;
  const fromEmail = process.env.RESEND_FROM ?? "onboarding@resend.dev";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (!adminEmail) {
    console.warn("RESEND_ADMIN_TO not set, skipping email notification");
    return;
  }

  const subject =
    data.locale === "uk"
      ? `Нова заявка від ${data.name} — ArtLogic`
      : `New inquiry from ${data.name} — ArtLogic`;

  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #7c3aed, #2563eb); padding: 2px; border-radius: 12px;">
        <div style="background: #050510; border-radius: 10px; padding: 30px;">
          <h1 style="color: #fff; margin: 0 0 8px; font-size: 22px;">
            ${data.locale === "uk" ? "Нова заявка з сайту" : "New website inquiry"}
          </h1>
          <p style="color: #a78bfa; margin: 0 0 24px; font-size: 14px;">ArtLogic — artlogic.com.ua</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 120px;">${data.locale === "uk" ? "Ім'я" : "Name"}</td>
              <td style="padding: 8px 0; color: #fff; font-size: 14px;"><strong>${data.name}</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Email</td>
              <td style="padding: 8px 0; color: #60a5fa; font-size: 14px;"><a href="mailto:${data.email}" style="color: #60a5fa;">${data.email}</a></td>
            </tr>
            ${data.phone ? `
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">${data.locale === "uk" ? "Телефон" : "Phone"}</td>
              <td style="padding: 8px 0; color: #fff; font-size: 14px;">${data.phone}</td>
            </tr>` : ""}
            ${data.company ? `
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">${data.locale === "uk" ? "Компанія" : "Company"}</td>
              <td style="padding: 8px 0; color: #fff; font-size: 14px;">${data.company}</td>
            </tr>` : ""}
            ${data.service ? `
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">${data.locale === "uk" ? "Послуга" : "Service"}</td>
              <td style="padding: 8px 0; color: #a78bfa; font-size: 14px;">${data.service}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-size: 13px; vertical-align: top;">${data.locale === "uk" ? "Мова" : "Language"}</td>
              <td style="padding: 8px 0; color: #67e8f9; font-size: 14px;">${data.locale === "uk" ? "🇺🇦 Українська" : "🇬🇧 English"}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid #7c3aed;">
            <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px;">${data.locale === "uk" ? "Повідомлення" : "Message"}</p>
            <p style="color: #e2e8f0; font-size: 14px; margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>

          <div style="margin-top: 24px; text-align: center;">
            <a href="${appUrl}/uk/admin" style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #2563eb); color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;">
              ${data.locale === "uk" ? "Відкрити в адмін-панелі" : "Open in Admin Panel"}
            </a>
          </div>

          <p style="color: #374151; font-size: 12px; margin-top: 20px; text-align: center;">ID: ${data.submissionId}</p>
        </div>
      </div>
    </div>
  `;

  await resend.emails.send({
    from: fromEmail,
    to: adminEmail,
    subject,
    html,
    replyTo: data.email,
  });
}
