/** youtubeApi
 *
 * Description
 *   - fetch functions From youtube API
 *
 * Functions
 *   [X]
 *
 * Usages
 *   -
 *
 * Requirements
 *   - Create youtub API key
 *
 * References
 *   -
 *
 * Authors
 *   - Moon In Learn <mooninlearn@gmail.com>
 *   - JnJsoft Ko <jnjsoft.ko@gmail.com>
 */

// & Import AREA
// &---------------------------------------------------------------------------
// ? External Modules
import axios from 'axios';

// ? UserMade Modules
import { loadJson } from 'jnj-lib-base';

// ? Local Modules
import {
  // ? key
  YOUTUBE_KEY, // youtube API key

  // ? url
  url_videos_in_playlist, // https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLgRxBCVPaZ_1iBe1v3-ZSSzHGdQo7AZPq&maxResults=10&pageToken=EAAaBlBUOkNBbw&key=YOUTUBE_KEY
  url_videos_in_channel, // https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCbMGBIayK26L4VaFrs5jyBw&maxResults=10&order=date&type=video&videoDefinition=high&pageToken=CAoQAA&key=YOUTUBE_KEY
  url_video_info, // https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=YOUTUBE_KEY&id=vNYfcV872QE
  url_search_channel, // https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=channel&key=YOUTUBE_KEY&q=개발하는남
  url_playlists_in_channel, // https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCgD2FCXaZZwtnfpd_r8iW0A&key=YOUTUBE_KEY
  url_channel_info // https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&key=YOUTUBE_KEY&id=UCgD2FCXaZZwtnfpd_r8iW0A
} from './globals';

// & Variable AREA
// &---------------------------------------------------------------------------

// & Function AREA
// &---------------------------------------------------------------------------
function videoInfoFromPlaylistItem(item) {
  let info = {};
  info['title'] = item.snippet['title'];
  // info["thumbnail"] = item.snippet["thumbnails"]["default"]["url"];
  // info["description"] = item.snippet["description"];
  info['videoId'] = item.snippet['resourceId']['videoId'];
  info['playlistId'] = item.snippet['playlistId'];
  // info["channelId"] = item.snippet["channelId"];
  info['channelTitle'] = item.snippet['channelTitle'];
  // info["publishedAt"] = item.snippet["publishedAt"];
  return info;
}

function videoInfoFromSearchItem(item) {
  let info = {};
  info['videoId'] = item.id.videoId;
  info['title'] = item.snippet['title'];
  info['channelTitle'] = item.snippet['channelTitle'];
  info['publishedAt'] = item.snippet['publishedAt'];
  return info;
}

// * 동영상 목록 <- 재생목록
const fetchVideosInPlaylist = async (
  playlistId = 'PLgRxBCVPaZ_1iBe1v3-ZSSzHGdQo7AZPq',
  maxResults = 10,
  pageToken = '',
  allItems = []
) => {
  let url = `${url_videos_in_playlist(playlistId)}&maxResults=${maxResults}&pageToken=${pageToken}`;
  let response = await axios(url);
  let data = response.data;

  // data = JSON.parse(UrlFetchApp.fetch(url).getContentText());
  let items = data['items'].map((item) => videoInfoFromPlaylistItem(item));
  allItems = allItems.concat(items);

  if (data['nextPageToken']) {
    return fetchVideosInPlaylist(playlistId, maxResults, data['nextPageToken'], allItems);
  } else {
    return allItems;
  }
};

// * 동영상 목록 <- 채널
const fetchVideosInChannel = async (
  channelId = 'UCbMGBIayK26L4VaFrs5jyBw',
  maxResults = 10,
  pageToken = '',
  allItems = []
) => {
  let url = `${url_videos_in_channel(channelId)}&maxResults=${maxResults}&pageToken=${pageToken}`;
  let response = await axios(url);
  let data = response.data;

  // let url = `${BASEURL_VIDEOS_IN_CHANNEL}${channelId}&maxResults=${maxResults}&pageToken=${pageToken}&key=${YOUTUBE_API_KEY}`;
  // data = JSON.parse(UrlFetchApp.fetch(url).getContentText());
  const items = data['items'].map((item) => videoInfoFromSearchItem(item));
  allItems = allItems.concat(items);

  if (data['nextPageToken']) {
    return fetchVideosInChannel(channelId, maxResults, data['nextPageToken'], allItems);
  } else {
    // Logger.log(allItems);
    return allItems;
  }
};

// * 동영상 정보
const fetchVideoInfo = async (videoId = 'vNYfcV872QE', part = 'snippet,statistics') => {
  let response = await axios(url_video_info(videoId));
  try {
    return response.data.items;
  } catch {
    return null;
  }
};

// * 재생목록 <- 채널
const fetchPlaylistsInChannel = async (
  channelId = 'UCbMGBIayK26L4VaFrs5jyBw',
  maxResults = 10,
  pageToken = '',
  allItems = []
) => {
  let url = `${url_playlists_in_channel(
    channelId
  )}&maxResults=${maxResults}&pageToken=${pageToken}`;
  let response = await axios(url);
  let data = response.data;
  let items = data['items'].map((item) => videoInfoFromSearchItem(item));
  allItems = allItems.concat(items);

  if (data['nextPageToken']) {
    return fetchPlaylistsInChannel(channelId, maxResults, data['nextPageToken'], allItems);
  } else {
    // Logger.log(allItems);
    return allItems;
  }
};

// * 채널 정보
const fetchChannelInfo = async (
  channelId = 'UCbMGBIayK26L4VaFrs5jyBw',
  part = 'snippet,statistics'
) => {
  let response = await axios(url_channel_info(channelId));
  try {
    return response.data.items;
  } catch {
    return null;
  }
};

// & Export AREA
// &---------------------------------------------------------------------------
export {
  fetchVideosInPlaylist, // 동영상 목록 <- 재생목록
  fetchVideosInChannel, // 동영상 목록 <- 채널
  fetchVideoInfo, // 동영상 정보
  fetchPlaylistsInChannel, // 재생목록 <- 채널
  fetchChannelInfo // 채널 정보
};

// & Test AREA
// &---------------------------------------------------------------------------
