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
var nameChannel = document.querySelector('#name-channel');
var descriptionChannel = document.querySelector('#description-channel');
var countChannel = document.querySelector('#count');
var imageChannel = document.querySelector('#image-channel');
var viewed = document.querySelector('#viewed');
var target = document.querySelector('#target');

var showStat = function showStat() {
    client.get('https://www.googleapis.com/youtube/v3/channels?part=' + part + '&key=AIzaSyC-uLhGigJvmCrz_ZcByT-u4bF9S8K9Elo&id=' + idChannel, function (response) {
        var info = JSON.parse(response).items[0];
        countChannel.innerText = info.statistics.subscriberCount;
        nameChannel.innerText = info.brandingSettings.channel.title;
        descriptionChannel.innerText = info.brandingSettings.channel.descriptio;
        viewed.innerText = info.statistics.viewCount;
        target.innerText = 2000000 - info.statistics.subscriberCount;
        imageChannel.src = info.brandingSettings.image.bannerImageUrl;
    });
};
showStat();