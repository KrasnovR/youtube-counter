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
    let titleChannel = document.querySelector('#title-channel');
    let descriptionChannel = document.querySelector('#description-channel');
    let countChannel = document.querySelector('#count');
    let imageChannel = document.querySelector('#image-channel');
    let viewed = document.querySelector('#viewed');
    
    let form = document.querySelector('#form');

    let showStat = (id) =>{
    client.get(`https://www.googleapis.com/youtube/v3/channels?part=${part}&key=AIzaSyC-uLhGigJvmCrz_ZcByT-u4bF9S8K9Elo&id=${id}`, (response) => {
        let info = JSON.parse(response).items[0];       
        countChannel.innerText = info.statistics.subscriberCount;
        titleChannel.innerText = info.brandingSettings.channel.title;
        descriptionChannel.innerText = info.brandingSettings.channel.description;
        viewed.innerText = info.statistics.viewCount;
        imageChannel.src = info.brandingSettings.image.bannerImageUrl;
    })
}

let search = (nameChannel) =>{
    client.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyC-uLhGigJvmCrz_ZcByT-u4bF9S8K9Elo&maxResults=1&type=channel&q=${nameChannel}`, (response) => {
        let info = JSON.parse(response).items[0].snippet.channelId;
        showStat(info);})
}

form.addEventListener('submit' , (event) => {
    event.preventDefault();
    let nameChannel = document.querySelector('#name-channel').value;
    search(nameChannel);
})

showStat(idChannel);