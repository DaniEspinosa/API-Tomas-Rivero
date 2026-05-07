const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendContact = async (req, res) => {
  const { nombre, telefono, email, mensaje, inmuebleTitulo, inmuebleId } = req.body;

  if (!nombre || !telefono || !mensaje) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #4a1f1f; padding: 24px 32px;">
        <h2 style="color: #d1a000; margin: 0; font-size: 20px;">Nueva consulta desde la web</h2>
        ${inmuebleTitulo ? `<p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 14px;">Inmueble: ${inmuebleTitulo}</p>` : ''}
      </div>
      <div style="background: #fff; padding: 32px; border: 1px solid #eee;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888; font-size: 13px; width: 120px;">Nombre</td><td style="padding: 8px 0; font-weight: 600;">${nombre}</td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Teléfono</td><td style="padding: 8px 0; font-weight: 600;"><a href="tel:${telefono}" style="color: #4a1f1f;">${telefono}</a></td></tr>
          ${email ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #4a1f1f;">${email}</a></td></tr>` : ''}
          <tr><td colspan="2" style="padding: 16px 0 8px; border-top: 1px solid #f0f0f0; margin-top: 12px;"></td></tr>
          <tr><td colspan="2" style="padding: 8px 0; color: #333; line-height: 1.6;">${mensaje.replace(/\n/g, '<br>')}</td></tr>
        </table>
        ${inmuebleId ? `<div style="margin-top: 24px;"><a href="http://localhost:10000/inmueble/${inmuebleId}" style="background: #d1a000; color: #4a1f1f; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">Ver inmueble</a></div>` : ''}
      </div>
      <div style="background: #f9f7f4; padding: 16px 32px; font-size: 12px; color: #aaa; text-align: center;">
        Tomás Rivero Inmobiliaria · tomasapi.es
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Web Tomás Rivero" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email || undefined,
      subject: inmuebleTitulo
        ? `Consulta sobre: ${inmuebleTitulo}`
        : `Nueva consulta desde la web - ${nombre}`,
      html,
    });

    res.json({ ok: true });
  } catch (e) {
    console.error("Error enviando email:", e);
    res.status(500).json({ error: "Error al enviar el mensaje" });
  }
};
