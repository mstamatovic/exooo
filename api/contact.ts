import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Sva polja su obavezna.' });
    }

    try {
        const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': process.env.BREVO_API_KEY || '',
            },
            body: JSON.stringify({
                sender: {
                    name: "Exooo Website",
                    email: "milosstamatovic@yahoo.com", // Tvoj verifikovani Gmail kao pošiljalac
                },
                // 🌟 NOVO: Ovo govori Gmail-u kome da odgovori kada klikneš "Reply"
                replyTo: {
                    email: email,
                    name: name,
                },
                to: [
                    {
                        email: "milosstamatovic984@gmail.com", // Gde tebi stiže obaveštenje
                        name: "Milos Stamatovic",
                    },
                ],
                subject: `Nova poruka sa sajta od: ${name}`,
                htmlContent: `
          <h3>Nova poruka sa kontakt forme</h3>
          <p><strong>Ime:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Poruka:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
        `,
            }),
        });

        if (!brevoResponse.ok) {
            const errorData = await brevoResponse.json();
            throw new Error(errorData.message || 'Greška pri slanju emaila');
        }

        return res.status(200).json({ message: 'Poruka je uspešno poslata!' });
    } catch (error: any) {
        console.error('Brevo Error:', error);
        return res.status(500).json({ message: 'Došlo je do greške pri slanju poruke.' });
    }
}