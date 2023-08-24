import {
  fetchVideosInPlaylist,
  fetchVideosInChannel,
  fetchVideoInfo,
  fetchPlaylistsInChannel,
  fetchChannelInfo
} from './youtubeApi';

import { YoutubeWeb, fetchHtmlProfile, fetchHtmlChannel } from './youtubeWeb';

import {
  subscriptionsJson,
  findChannelId,
  findPlaylistInfo,
  findChannelPlaylists
} from './youtubeHtml';

// console.log(await fetchVideosInPlaylist());
// console.log(await fetchVideosInChannel());
// console.log(await fetchVideoInfo('vNYfcV872QE'));
// console.log(await fetchPlaylistsInChannel());
// console.log(await fetchChannelInfo('UCbMGBIayK26L4VaFrs5jyBw'));

// const youtubeWeb = new YoutubeWeb('deverlife');
// await youtubeWeb.launch();

// await subscriptionsHtmlForProfile('monblue');
// findChannelId('monblue');
// findPlaylistInfo('');
// findChannelPlaylists('');
// subscriptionsJson('deverlife');

// * youtubeWeb
console.log(await fetchHtmlProfile('monblue'));
// console.log(await fetchHtmlChannel('/@nomadcoders', 'playlists'));
