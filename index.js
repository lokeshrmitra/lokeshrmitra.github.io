let swRegistration = null;
let isSubscribed = false;
const applicationServerPublicKey= "BB-vYEM6B3wVD1JX4hYuuGoFJsLeRGMt7G8to6ZAyQyHHTwzUAk3AekCU7r_yRSL3xDEX2T1m9KJsraElv5icfk";

if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.register('sw.js')
    .then(function(swReg) {
        console.log('Service Worker is registered', swReg);

        swRegistration = swReg;
        //initializeUI();
    })
    .catch(function(error) {
        console.error('Service Worker Error', error);
    });
    } else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
}

  function initializeUI() {
    if(isSubscribed){

    }else{
        subscribeUser();
    }

    // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
      if (subscription !== null) {
          isSubscribed = true;
        console.log('User IS subscribed.');
      } else {
        isSubscribed = false;
        console.log('User is NOT subscribed.');
      }

      //updateBtn();
    });
  }

  function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(subscription) {
      console.log('User is subscribed.');

      updateSubscriptionOnServer(subscription);

        isSubscribed = true;
    })
    .catch(function(err) {
      console.log('Failed to subscribe the user: ', err);
      //updateBtn();
    });
  }

  function updateSubscriptionOnServer(subscription){
      let em = $('#email').val();
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://lokeshrmitra-devhosts.herokuapp.com/products/subs?email=${em}&subscription=${JSON.stringify(subscription)}`,
        "method": "POST",
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
  }

/**
 * Public Key:
BB-vYEM6B3wVD1JX4hYuuGoFJsLeRGMt7G8to6ZAyQyHHTwzUAk3AekCU7r_yRSL3xDEX2T1m9KJsraElv5icfk

Private Key:
hKEheVRB2afntwIU1WtLnNusfEa2LI1luCwRBuYk_Jk

 */

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

$(document).ready(()=>{

    $('#subscribe').click(()=>{
        let email = $('#email');
        if(email.val() != ''){
            initializeUI();
        }else{
            alert('Empty email')
        }
    })
});