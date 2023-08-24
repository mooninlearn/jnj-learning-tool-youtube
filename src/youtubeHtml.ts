/** youtubeHtml
 *
 * Description
 *   - Extract Data(json) From Html
 *
 * Functions
 *   [X]
 *
 * Usages
 *   -
 *
 * Requirements
 *   - npm install cheerio
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
// ? Builtin Modules

// ? External Modules

// ? UserMade Modules
import { loadJson, saveFile, saveJson, findFiles, sleep } from 'jnj-lib-base';

// ? Local Modules
import {
  loadFile,
  cheerFromStr,
  cheerFromFile,
  querySelector,
  querySelectorAll,
  getValue,
  getValues,
  getValueFromStr,
  getValuesFromStr,
  dictFromRoot,
  dictsFromRoots
} from './utils/cheer';

// & Variable AREA
// &---------------------------------------------------------------------------

const html_home_by_profile = (nick) => `_files/html/profile/${nick}.html`;
const json_subscriptions = (nick) => `_files/json/subscriptions/${nick}.json`;

// & Function AREA
// &---------------------------------------------------------------------------

/**
 *  Extract & Save Subscriptions From Html File(`_files/html/subscriptions_${nick}.html`)
 * @note
 */
const subscriptionsJson = (nick, save = true) => {
  let $ = cheerFromFile(html_home_by_profile(nick));

  // * courseInfo
  let subscriptions: any[] = [];

  let $roots = $('div[id="items"]').eq(2).find('ytd-guide-entry-renderer > a'); // div[id="items"]:nth-of-type(2)
  for (let i = 0; i < $roots.length; i++) {
    const $root = $roots.eq(i);

    const customUrl = $root.attr('href') || '';
    if (!customUrl.includes('@')) {
      continue;
    }

    let subscription = {};
    subscription['title'] = $root.text().trim();
    subscription['customUrl'] = customUrl;
    subscription['description'] = $root.find('tp-yt-paper-item').eq(0).attr('aria-label') ?? '';
    // subscription['thumb'] = $root.find('tp-yt-paper-item > yt-img-shadow > img').eq(0).attr('src');
    const _thumb = $root.find('yt-icon').eq(0).attr('disable-upgrade') ?? '';
    let thumb = '';
    if (_thumb != '') {
      const _thumbs = _thumb.split('"');
      thumb = _thumbs[_thumbs.length - 2];
    }
    subscription['thumb'] = thumb;
    subscriptions.push(subscription);
  }

  if (save) {
    saveJson(json_subscriptions(nick), subscriptions);
  }

  return subscriptions;
};

/**
 *  Find From Html String(youtube channel home ex) `https://www.youtube.com/@@legacycoder`)
 * @note
 */
const findChannelId = (html) => {
  // let $ = cheerFromFile(html_home_by_profile(nick));
  let channelId = '';
  let $ = cheerFromStr(html);
  const url = $('link[rel="canonical"]').eq(0).attr('href') || '';
  if (url != '') {
    channelId = url.split('/').slice(-1)[0];
  }
  return channelId;
  // console.log(channelId);
  // <link rel="canonical" href="https://www.youtube.com/channel/UCT0dmfFCLWuVKPWZ6wcdKyg">
};

// /**
//  *  Extract & Save Subscriptions From Html File(`_files/html/subscriptions_${nick}.html`)
//  * @note
//  */
// const findChannelId = (nick) => {
//   // let $ = cheerFromFile(html_home_by_profile(nick));
//   let channelId = '';
//   let $ = cheerFromFile(`_files/html/sample/channelHome.html`);
//   const url = $('link[rel="canonical"]').eq(0).attr('href') || '';
//   if (url != '') {
//     channelId = url.split('/').slice(-1)[0];
//   }
//   console.log(channelId);
//   // <link rel="canonical" href="https://www.youtube.com/channel/UCT0dmfFCLWuVKPWZ6wcdKyg">
// };

// title:	//div[@class^="metadata-wrapper"]//yt-formatted-string	text
// channelCustomUrl: class^="metadata-action-bar"] yt-formatted-string > a, href
// channelTitle: class^="metadata-action-bar"] yt-formatted-string > a

// 동영상 개수:	ytd-playlist-byline-renderer > div[class^="metadata-stats" > yt-formatted-string:nth-of-type(1) > span:nth-of-type(2)
// 조회수: ytd-playlist-byline-renderer > div[class^="metadata-stats" > yt-formatted-string:nth-of-type(2)
// 최종 업데이트: ytd-playlist-byline-renderer > div[class^="metadata-stats" > yt-formatted-string:nth-of-type(2) > span:nth-of-type(2)

// $roots = $('div[id="meta"]')
// title	h3 >  a, title
// url	h3 >  a, href
// channelTitle	ytd-video-meta-block  > yt-formatted-string > a, text
// channelCustomUrl	ytd-video-meta-block  > yt-formatted-string > a, href
// viewNum	yt-formatted-string[id="video-info"] > span: 1
// publishedAt	yt-formatted-string[id="video-info"] > span: 3

const findPlaylistInfo = (html) => {
  html = loadFile('_files/html/sample/playlist_elements_bk.html');
  let $ = cheerFromStr(html);
  const $meta = $('div[class^="metadata-wrapper"]').eq(0);
  let meta = {};
  meta['title'] = $meta.find('yt-formatted-string').eq(0).text();
  meta['channelCustomUrl'] = $meta
    .find('div[class^="metadata-action-bar"] yt-formatted-string > a')
    .eq(0)
    .attr('href');
  meta['channelTitle'] = $meta
    .find('div[class^="metadata-action-bar"] yt-formatted-string > a')
    .eq(0)
    .text();
  meta['videoNum'] = $meta
    .find(
      'ytd-playlist-byline-renderer > div[class^="metadata-stats"] > yt-formatted-string:nth-of-type(1) > span:nth-of-type(2)'
    )
    .eq(0)
    .text();
  meta['viewNum'] = $meta
    .find(
      'ytd-playlist-byline-renderer > div[class^="metadata-stats"] > yt-formatted-string:nth-of-type(2)'
    )
    .eq(0)
    .text();
  meta['updatedAt'] = $meta
    .find(
      'ytd-playlist-byline-renderer > div[class^="metadata-stats"] > yt-formatted-string:nth-of-type(3) > span:nth-of-type(2)'
    )
    .eq(0)
    .text();

  const $roots = $('div[id="meta"][class="style-scope ytd-playlist-video-renderer"]');
  console.log($roots.length);
  let videos = [];

  for (let i = 0; i < $roots.length; i++) {
    const $root = $roots.eq(i);
    let video = {};
    video['videoTitle'] = $root.find('h3 > a').eq(0).text().trim();
    video['videoUrl'] = $root.find('h3 > a').eq(0).attr('href');

    video['channelTitle'] = $root
      // .find('ytd-video-meta-block  > yt-formatted-string > a')
      .find('div[id="text-container"]  yt-formatted-string > a')
      .eq(0)
      .text();
    video['channelCustomUrl'] = $root
      // .find('ytd-video-meta-block  > yt-formatted-string > a')
      .find('div[id="text-container"]  yt-formatted-string > a')
      .eq(0)
      .attr('href');
    video['viewNum'] = $root
      .find('yt-formatted-string[id="video-info"] > span:nth-of-type(1)')
      .eq(0)
      .text();
    video['publishedAt'] = $root
      .find('yt-formatted-string[id="video-info"] > span:nth-of-type(3)')
      .eq(0)
      .text();
    videos.push(video);
  }

  console.log(meta);
  console.log(videos);
};

const findChannelPlaylists = (html) => {
  // C:\JnJ-soft\Projects\internal\jnj_tools\learning-tools\jnj-learning-tools\jnj-learning-tool-youtube\_files\html\sample\channel_playlists_bk.html
  html = loadFile('_files/html/sample/channel_playlists_bk.html');
  let $ = cheerFromStr(html);
  const $rootDetails = $('div[id="details"]');
  const $rootThumbs = $('ytd-playlist-thumbnail');
  console.log($rootThumbs.length);

  let playlists = [];

  for (let i = 0; i < $rootDetails.length; i++) {
    const $rootDetail = $rootDetails.eq(i);
    const $rootThumb = $rootThumbs.eq(i);
    let playlist = {};
    // playlist['playlistId'] = $root.find('h3 > a').eq(0).attr('href').split('&').slice(-2)[0];
    const url = $rootDetail.find('h3 > a').eq(0).attr('href');
    playlist['playlistId'] = url.split('&').slice(-2)[0].split('=')[1];
    playlist['playlistTitle'] = $rootDetail.find('h3 > a').eq(0).text();

    playlist['thumb'] = $rootThumb.find('img').eq(0).attr('src');
    // playlist['thumb'] = $rootThumb.find('div[id="playlist-thumbnails"] img').eq(0).attr('src');
    playlist['videoNum'] = $rootThumb.find('div[id="overlays"] yt-formatted-string').eq(0).text();
    playlist['updatedAt'] = $rootThumb.find('div[id="metadata-line"] span').eq(0).text();

    playlists.push(playlist);
  }

  console.log(playlists);

  // playlistId = 'h3 > a', href, split('&').slice(-2)[0]
  // thumb = 'div[id="playlist-thumbnails"] img', src, split('?')[0]
  // videoNum = 'div[id="overlays"] yt-formatted-string' // 동영상 6개
  // updatedAt = 'div[id="metadata-line"] span: 1'
};

// & Export AREA
// &---------------------------------------------------------------------------
export { subscriptionsJson, findChannelId, findPlaylistInfo, findChannelPlaylists };
