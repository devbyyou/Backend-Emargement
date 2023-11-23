const notificationService = {
    sendNotificationToConcernedUsers: (equipeId, message) => {
        // Logique pour envoyer des notifications
        // (par exemple, à l'aide de
        // Firebase Cloud Messaging, des e-mails, etc.)
        // implémenter logique en fonction du choix de service de notification
        console.log(`Notification envoyée aux entraîneurs ou responsables de l'équipe ${equipeId}: ${message}`);
    },
};

module.exports = { notificationService };
