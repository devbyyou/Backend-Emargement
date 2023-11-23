// qrCodeGenerator.js
const qrCode = require('qrcode');

function generateQRCode(sessionId, category, team) {
    // Vous pouvez ajuster la logique pour générer un identifiant unique basé sur vos besoins
    const uniqueIdentifier = `${sessionId}-${category}-${team}`;

    // Générer le QR code avec l'identifiant unique
    return new Promise((resolve, reject) => {
        qrCode.toDataURL(uniqueIdentifier, (err, url) => {
            if (err) {
                reject(err);
            } else {
                resolve(url);
            }
        });
    });
}

module.exports = { generateQRCode };
