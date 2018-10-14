'use strict';

var HttpClient = function HttpClient() {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200) aCallback(anHttpRequest.responseText);
        };

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    };
};

var idChannel = 'UC_x5XG1OV2P6uZZ5FSM9Ttw';
var part = 'statistics, brandingSettings';

var client = new HttpClient();
var titleChannel = document.querySelector('#title-channel');
var descriptionChannel = document.querySelector('#description-channel');
var countChannel = document.querySelector('#count');
var imageChannel = document.querySelector('#image-channel');
var viewed = document.querySelector('#viewed');

var form = document.querySelector('#form');

var showStat = function showStat(id) {
    client.get('https://www.googleapis.com/youtube/v3/channels?part=' + part + '&key=AIzaSyC-uLhGigJvmCrz_ZcByT-u4bF9S8K9Elo&id=' + id, function (response) {
        var info = JSON.parse(response).items[0];
        countChannel.innerText = info.statistics.subscriberCount;
        titleChannel.innerText = info.brandingSettings.channel.title;
        descriptionChannel.innerText = info.brandingSettings.channel.description;
        viewed.innerText = info.statistics.viewCount;
        imageChannel.src = info.brandingSettings.image.bannerImageUrl;
    });
};

var search = function search(nameChannel) {
    client.get('https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyC-uLhGigJvmCrz_ZcByT-u4bF9S8K9Elo&maxResults=1&type=channel&q=' + nameChannel, function (response) {
        var info = JSON.parse(response).items[0].snippet.channelId;
        showStat(info);
    });
};

form.addEventListener('submit', function (event) {
    event.preventDefault();
    var nameChannel = document.querySelector('#name-channel').value;
    search(nameChannel);
});

showStat(idChannel);