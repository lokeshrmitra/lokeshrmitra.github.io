self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = 'Uberization';
    const options = {
      body: event.data.text(),
      icon: 'images/principal-icon.png',
      badge: 'images/principal-icon.png',
      actions: [
        {
          action: 'accept',
          title: 'Accept'
        },
        {
          action: 'decline',
          title: 'Decline'
        }
      ]
    };

    event.waitUntil(self.registration.showNotification(title, options));
  });

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'accept') {
    clients.openWindow("/images");
  }
  else if (event.action === 'decline') {
    clients.openWindow("/images2");
  }
}, false);
