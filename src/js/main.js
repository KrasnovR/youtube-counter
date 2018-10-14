        var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
     let anHttpRequest = new XMLHttpRequest();
     anHttpRequest.onreadystatechange = function () {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
       aCallback(anHttpRequest.responseText);
     }

     anHttpRequest.open("GET", aUrl, true);
     anHttpRequest.send(null);
    }
   }


    let idChannel = 'UC_x5XG1OV2P6uZZ5FSM9Ttw'
    let part = 'statistics, brandingSettings'

    let client = new HttpClient();
    let nameChannel = document.querySelector('#name-channel');
    let descriptionChannel = document.querySelector('#description-channel');
    let countChannel = document.querySelector('#count');
    let imageChannel = document.querySelector('#image-channel');
    let viewed = document.querySelector('#viewed');
    let target = document.querySelector('#target');
    

    let showStat = () =>{
    client.get(`https://www.googleapis.com/youtube/v3/channels?part=${part}&key=AIzaSyC-uLhGigJvmCrz_ZcByT-u4bF9S8K9Elo&id=${idChannel}`, (response) => {
        let info = JSON.parse(response).items[0];       
        countChannel.innerText = info.statistics.subscriberCount;
        nameChannel.innerText = info.brandingSettings.channel.title;
        descriptionChannel.innerText = info.brandingSettings.channel.descriptio;
        viewed.innerText = info.statistics.viewCount;
        target.innerText = 2000000 - info.statistics.subscriberCount;
        imageChannel.src = info.brandingSettings.image.bannerImageUrl;
    })
}
showStat();