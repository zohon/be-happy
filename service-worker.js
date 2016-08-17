importScripts('underscore.js');

self.addEventListener('push', function(event) {
  // Since there is no payload data with the first version
  // of push messages, we'll grab some data from
  // an API and use it to populate a notification
  event.waitUntil(
    fetch("https://be-happy-fb01b.firebaseio.com/messages.json").then(function(response) {
      if (response.status !== 200) {
        // Either show a message to the user explaining the error
        // or enter a generic message and handle the
        // onnotificationclick event to direct the user to a web page
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        throw new Error();
      }

      // Examine the text in the response
      return response.json().then(function(datas) {

        if (datas.error || !datas) {
          console.error('The API returned an error.', data.error);
          throw new Error();
        }
        var theMessage = null;
        console.log(datas);
        theMessage = _.findWhere(datas, {status: "today"});

        console.log(theMessage);

        var title = (theMessage && theMessage.title ? theMessage.title : "Il en faut peux pour etre heureux");
        var message = (theMessage && theMessage.text ? theMessage.text : "vraiment tres peux pour etre heureux");
        var icon = (theMessage && theMessage.icon ? theMessage.icon : "http://www.freeiconspng.com/uploads/happy-x-icon-18.png");
        var notificationTag = (theMessage && theMessage.tag ? theMessage.tag : "be happy");

        return self.registration.showNotification(title, {
          body: message,
          icon: icon,
          tag: notificationTag
        });

      });
    }).catch(function(err) {
      console.error('Unable to retrieve data', err);

      var title = 'An error occurred';
      var message = 'We were unable to get the information for this push message';
      var icon = "";
      var notificationTag = 'notification-error';

      return self.registration.showNotification(title, {
          body: message,
          icon: icon,
          tag: notificationTag
        });
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  // Android doesn't close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients.matchAll({
      type: "window"
    })
    .then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url == '/' && 'focus' in client)
          return client.focus();
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
