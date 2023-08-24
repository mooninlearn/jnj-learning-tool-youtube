/** globals
 *
 * Description
 *   - global variables / functions
 *
 * Functions
 *   [X] user info (from `.env`)
 *      - web account
 *      - api account
 *   [X] local paths
 *       - constant(folder/file)
 *       - function(folder/file)
 *
 * Usages
 *   -
 *
 * Requirements
 *   - npm install dotenv
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
// * Builtin Modules

// * External Modules
import dotenv from 'dotenv';

// & Variable AREA
// &---------------------------------------------------------------------------
// * Dotenv(계정 아이디/비밀번호, API key 등)
dotenv.config(); // 실행 경로에 있는 `.env`

const WINDOW_USER = process.env.WINDOW_USER; // windows user name
const YOUTUBE_KEY = process.env.YOUTUBE_KEY; // youtube API key

// * BASE URL
const BASEURL_YOUTUBE_WEB = 'https://www.youtube.com';
const BASEURL_YOUTUBE_API = 'https://www.googleapis.com/youtube/v3';

// & Function AREA
// &---------------------------------------------------------------------------
// * API Urls
const url_youtube_api_videos_in_playlist = (playlistId) =>
  `${BASEURL_YOUTUBE_API}/playlistItems?part=snippet&playlistId=${playlistId}&key=${YOUTUBE_KEY}`; // https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLgRxBCVPaZ_1iBe1v3-ZSSzHGdQo7AZPq&maxResults=10&pageToken=EAAaBlBUOkNBbw&key=YOUTUBE_KEY
const url_youtube_api_videos_in_channel = (channelId) =>
  `${BASEURL_YOUTUBE_API}/search?part=snippet&channelid=${channelId}&key=${YOUTUBE_KEY}`; // https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCbMGBIayK26L4VaFrs5jyBw&maxResults=10&order=date&type=video&videoDefinition=high&pageToken=CAoQAA&key=YOUTUBE_KEY
const url_youtube_api_video_info = (videoId) =>
  `${BASEURL_YOUTUBE_API}/videos?part=snippet,statistics&id=${videoId}&key=${YOUTUBE_KEY}`; // https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=YOUTUBE_KEY&id=vNYfcV872QE
const url_youtube_api_search_channel = (query) =>
  `${BASEURL_YOUTUBE_API}/search?part=snippet&type=channel&maxresults=10&q=${query}&key=${YOUTUBE_KEY}`; // https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=channel&key=YOUTUBE_KEY&q=개발하는남
const url_youtube_api_playlists_in_channel = (channelId) =>
  `${BASEURL_YOUTUBE_API}/playlists?part=snippet&channelId=${channelId}&key=${YOUTUBE_KEY}`; // https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCgD2FCXaZZwtnfpd_r8iW0A&key=YOUTUBE_KEY
const url_youtube_api_channel_info = (channelId) =>
  `${BASEURL_YOUTUBE_API}/channels?part=statistics,snippet&id=${channelId}&key=${YOUTUBE_KEY}`; // https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&key=YOUTUBE_KEY&id=UCgD2FCXaZZwtnfpd_r8iW0A

// * WEB Urls
// const url_youtube_channel_home = (customUrl) => `${BASEURL_YOUTUBE_WEB}${customUrl}`;
const url_youtube_web_channel = (customUrl, menu = '') =>
  `${BASEURL_YOUTUBE_WEB}${customUrl}/${menu}`; // menu:: ``: 홈 | `videos`: 동영상 | `shorts`: SHORTS | `streams`: 라이브 | `playlists`: 재생목록 | `channels`: 채널 | `about`: 정보
const url_youtube_web_channel_search = (customUrl, query = '') =>
  `${BASEURL_YOUTUBE_WEB}${customUrl}/search?query=${query}`;

const url_youtube_web_playlists = (playlistId) =>
  `${BASEURL_YOUTUBE_WEB}/playlist?list=${playlistId}`;

const url_youtube_web_video = (videoId) => `${BASEURL_YOUTUBE_WEB}/watch?v=${videoId}`;

// & Export AREA
// &---------------------------------------------------------------------------
export {
  // ? key
  WINDOW_USER, // windows user name
  YOUTUBE_KEY, // youtube API key

  // ? url(API)
  url_youtube_api_videos_in_playlist, // https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLgRxBCVPaZ_1iBe1v3-ZSSzHGdQo7AZPq&maxResults=10&pageToken=EAAaBlBUOkNBbw&key=YOUTUBE_KEY
  url_youtube_api_videos_in_channel, // https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCbMGBIayK26L4VaFrs5jyBw&maxResults=10&order=date&type=video&videoDefinition=high&pageToken=CAoQAA&key=YOUTUBE_KEY
  url_youtube_api_video_info, // https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=YOUTUBE_KEY&id=vNYfcV872QE
  url_youtube_api_search_channel, // https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=channel&key=YOUTUBE_KEY&q=개발하는남
  url_youtube_api_playlists_in_channel, // https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCgD2FCXaZZwtnfpd_r8iW0A&key=YOUTUBE_KEY
  url_youtube_api_channel_info, // https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&key=YOUTUBE_KEY&id=UCgD2FCXaZZwtnfpd_r8iW0A

  // ? url(web)
  url_youtube_web_channel
};

// & Test AREA
// &---------------------------------------------------------------------------
