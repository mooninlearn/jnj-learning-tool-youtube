/** youtubeWeb
 *
 * Description
 *   - fetch functions From youtube web page
 *
 * Functions
 *   [X]
 *
 * Usages
 *   -
 *
 * Requirements
 *   -
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
import puppeteer from 'puppeteer';
// import puppeteer from 'puppeteer-extra';

// ? UserMade Modules
import { saveFile, sleep } from 'jnj-lib-base';

// ? Local Modules
import {
  // ? key
  WINDOW_USER, // youtube API key
  url_youtube_web_channel
} from './globals';

const userDataDir = 'C:\\Users\\Jungsam\\AppData\\Local\\Google\\Chrome\\User Data';

// & Variable AREA
// &---------------------------------------------------------------------------
const profiles = {
  monblue: '1',
  moondevenv: '2',
  satsbymoon: '3',
  deverlife: '13'
};

const html_home_by_profile = (nick) => `_files/html/profile/${nick}.html`;

// & Class AREA
// &---------------------------------------------------------------------------
class YoutubeWeb {
  nick; //
  profile; //
  browser;
  page;

  /** class constructor
   * @param nick - chrome user nick
   *
   * @example
   *   youtubeWeb = new YoutubeWeb('deverlife')
   */
  constructor(nick: string) {
    this.nick = nick;
    this.profile = `Profile ${profiles[nick]}`;
  }

  /** launch
   */
  async launch() {
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      userDataDir: `C:\\Users\\${WINDOW_USER}\\AppData\\Local\\Google\\Chrome\\User Data`,
      args: [`--profile-directory=${this.profile}`, '--window-size=1920,1080']
    });
    const page = await browser.newPage();
    // await page.setViewport({
    //   width: 1080,
    //   height: 1080
    // });
    await page.goto('https://www.youtube.com');

    return { page, browser };
  }

  // async getHtmlByXpath(xpath, nth = 0) {
  //   const $items = await this.page.$x(xpath);
  //   return await this.page.evaluate((el) => (el as HTMLElement).innerHTML, $items[nth]);
  // }

  // await page.$eval(selector, el => el.remove());
}

// & Function AREA
// &---------------------------------------------------------------------------
// * Utils
const getInnerHtmlByXpath = async ({ page, browser, xpath, nth = 0 }) => {
  const $items = await page.$x(xpath);
  return await page.evaluate((el) => (el as HTMLElement).innerHTML, $items[nth]);
};

const getOuterHtmlByXpath = async ({ page, browser, xpath, nth = 0 }) => {
  const $items = await page.$x(xpath);
  return await page.evaluate((el) => (el as HTMLElement).outerHTML, $items[nth]);
};

// * Goto Page(Url) by Puppeteer
/**
 *
 *
 */
const gotoProfilePage = async (nick) => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    userDataDir: `C:\\Users\\${WINDOW_USER}\\AppData\\Local\\Google\\Chrome\\User Data`,
    args: [`--profile-directory=Profile ${profiles[nick]}`]
  });
  const page = await browser.newPage();
  await page.goto('https://www.youtube.com');

  return { page, browser };
};

/**
 *
 *
 */
const gotoChannelPage = async (customUrl, menu) => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  await page.goto(url_youtube_web_channel(customUrl, menu));

  return { page, browser };
};

// * Fetch Html by Puppeteer
/** subscriptionsHtmlForProfile
 * subscriptions Html For Profile(by nick)
 *
 */
const fetchHtmlProfile = async (nick) => {
  let { page, browser } = await gotoProfilePage(nick);
  sleep(5);

  // 햄버거 메뉴 클릭
  await page.click('#guide-icon');
  sleep(3);

  // 구독 더보기 클릭
  await page.click('a[title*="개 더보기"]'); // TODO: `영어` 페이지에서도 작동하도록
  sleep(3);

  const html = await page.content();
  browser.close();
  return html;
};

// const subscriptionsHtmlForProfile = async (nick) => {
//   const youtubeWeb = new YoutubeWeb(nick);
//   let { page, browser } = await youtubeWeb.launch();
//   sleep(5);

//   // 햄버거 메뉴 클릭
//   await page.click('#guide-icon');
//   sleep(3);

//   // 구독 더보기 클릭
//   await page.click('a[title*="개 더보기"]');
//   sleep(3);

//   return await getOuterHtmlByXpath({ page, browser, xpath: '//div[@id="items"]', nth: 2 });
// };

// * fetch html channel page by puppeteer
/**
 *
 *
 */
const fetchHtmlChannel = async (customUrl, menu) => {
  let { page, browser } = await gotoChannelPage(customUrl, menu);
  sleep(5);
  const html = await page.content();
  browser.close();
  return html;
};

// return await getOuterHtmlByXpath({ page, browser, xpath: '//div[@id="items"]', nth: 2 });

// & Export AREA
// &---------------------------------------------------------------------------
export { YoutubeWeb, fetchHtmlProfile, fetchHtmlChannel };
