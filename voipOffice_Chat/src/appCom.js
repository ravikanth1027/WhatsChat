let isSubscribed = false;
let swRegistration = null;
let applicationKey = "BFveEp9QA5ZnTev5mGo_JjwIe2a0MsT6nUeeVQdrj7xns_8UoS2m-vAUzrOCBzGV4nZ5Qd_NnHMJ8hGAtSoprko";


// Url Encription
function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Installing service worker
if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.register('sw.js')
        .then(function (swReg) {
            if(swReg.installing) {
        console.log('Service worker installing');
    } else if(swReg.waiting) {
        console.log('Service worker installed');
    } else if(swReg.active) {
        console.log('Service worker active');
    
    } 
    // Check if push messaging is supported  
    /*if (!('PushManager' in window)) {  
       console.log('Push messaging isn\'t supported.');  
       return;  
     }*/
   //
   /*if (Notification.permission === 'denied') {  
      console.log('The user has blocked notifications.');  
      return;  
   }   */

            swRegistration = swReg;

            swRegistration.pushManager.getSubscription()
                .then(function (subscription) {
                    isSubscribed = !(subscription === null);

                    if (isSubscribed) {
                        console.log('User is subscribed');
                    } else {
                        swRegistration.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: urlB64ToUint8Array(applicationKey)
                            })
                            .then(function (subscription) {
                                console.log("HEllo"+subscription);
                                console.log('User is subscribed');

                                saveSubscription(subscription);

                                isSubscribed = true;
                            })
                            .catch(function (err) {
                                console.log(err)
                                console.log('Failed to subscribe user: ', err);
                            })
                    }
                })
        })
        .catch(function (error) {
            console.error('Service Worker Error', error);
        });
} else {
    console.warn('Push messaging is not supported');
}

// Send request to database for add new subscriber
async function saveSubscription(subscription) {
    var tmp = localStorage.getItem('token');
    /*JSON.parse(tmp)*/
    var phonenumber = tmp.split(":")[1].split(",")[0].split("\"").[1]; //.split("+")[1]
    /*{"token":"+17342344999,Canny"}*/
    let subscription_temp = {
        "phonenumber" : phonenumber,
        "subscriptionKey": subscription
    }
 fetch('http://localhost:4000/subscribe', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(subscription_temp)
 })
   .then(function(data){
    console.log(data)
   })
   .catch(function(error){
    console.log("Request Error", error)
   });
}