self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = 'BrainDead';
    const options = {
      body: event.data.text(),
      icon: 'images/csgo.png',
      badge: 'images/csgo.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
  });