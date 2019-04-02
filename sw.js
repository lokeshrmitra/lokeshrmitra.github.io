self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = 'Uberization';
    const options = {
      body: event.data.text(),
      icon: 'images/icon.png',
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