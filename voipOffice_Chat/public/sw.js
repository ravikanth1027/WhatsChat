let notificationUrl = '';


self.addEventListener('push', function (event) {
    console.log('Push received: ', event);
    let _data = event.data ? JSON.parse(event.data.text()) : {};
    notificationUrl = _data.url;
    event.waitUntil(
        self.registration.showNotification(_data.title, {
            body: _data.message,
            icon: _data.icon,
            tag: _data.tag
        })
    );

});

self.addEventListener('notificationclick', function (event) {
    console.log("notificationclicked----------")
    event.notification.close();

    event.waitUntil(
        clients.matchAll({
            type: "window"
        })
        .then(function (clientList) {
            const hadWindowToFocus = clientList.some(windowClient => windowClient.url === notificationUrl ? (windowClient.focus(), true) : false);
            console.log(hadWindowToFocus)
            if (!hadWindowToFocus) clients.openWindow(notificationUrl).then(windowClient => windowClient ? windowClient.focus() : null);

            /*if (clients.openWindow) {
                return clients.openWindow(notificationUrl);
            }*/
        })
    );
});




/*self.addEventListener('notificationclick', event => {
    console.log("notificationclicked")
  event.waitUntil(async function() {
    const allClients = await clients.matchAll({
      includeUncontrolled: true
    });

    let chatClient;

    // Let's see if we already have a chat window open:
    for (const client of allClients) {
      const url = new URL(client.url);

      if (url.pathname == 'http://localhost:3000/dashboard/') {
        // Excellent, let's use it!
        client.focus();
        chatClient = client;
        break;
      }
    }

    // If we didn't find an existing chat window,
    // open a new one:
    if (!chatClient) {
      chatClient = await clients.openWindow('/chat/');
    }

    // Message the client:
    chatClient.postMessage("New chat messages!");
  }());
});*/