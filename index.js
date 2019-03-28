let swRegistration = null;
let isSubscribed = false;
const applicationServerPublicKey= "BB-vYEM6B3wVD1JX4hYuuGoFJsLeRGMt7G8to6ZAyQyHHTwzUAk3AekCU7r_yRSL3xDEX2T1m9KJsraElv5icfk";

if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.register('sw.js')
    .then(function(swReg) {
        console.log('Service Worker is registered', swReg);

        swRegistration = swReg;
        //displaying form if serviceWorker is available
        document.getElementById('myform').style.display = 'block';        

        //getting initial state of subscription
        swRegistration.pushManager.getSubscription()
        .then(subscription=>{
          if(subscription!==null){
            isSubscribed = true;
            console.log('User is already subscribed');
          }else{
            isSubscribed = false;
            console.log('User not subscribed');                 
          }
        })

    })
    .catch(function(error) {
        console.error('Service Worker Error', error);
    });
} else {
    console.warn('Push messaging is not supported');
    document.getElementById('sw-error').style.display = 'block';
    document.getElementById('myform').style.display = 'none';
}

function subscribeUser(){
  let emailField = document.getElementById('email');
  if(emailField.value != ''){
    //Subscribing user now
    if(swRegistration == null){
      alert('serviceWorker was not registerd');      
    // }else if(!isSubscribed){
    //   alert('not');      
    }else{
      const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
      swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey
      }).then(currentSubscription=>{
        // Send the subscription to be stored on server
        axios({
          method: 'post',
          url: 'https://lokeshrmitra-devhosts.herokuapp.com/products/subs',
          //url:'https://lokeshrmitra-devhosts.herokuapp.com/reply',
          data: {
            email: document.getElementById('email').value ,
            subscription: currentSubscription
          }
        }).then(response=>{
          console.log(response)
          isSubscribed = true;
        })
        .catch(error=>console.log(error));
      })
    }
  }else if(isSubscribed){
    alert('already subscribed to someone');
  }else{
    alert('Email is empty');
  }

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