self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = 'Uberization';
    const options = {
      body: event.data.text(),
      icon: 'images/csgo.png',
      badge: 'https://png.icons8.com/search/ff0000',
      actions: [
        {
          action: 'accept',
          title: 'Accept',
          icon: 'https://png.icons8.com/correct/'
        },
        {
          action: 'decline',
          title: 'Decline',
          icon: 'https://png.icons8.com/x/'
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
