const puppeteer = require("puppeteer");
const fs = require("fs");
const Songs = require("./Songs.json");


// VARIABLES
const baseURI = "https://wynk.in";


async function main() {
    const browser = await puppeteer.launch({
        defaultViewport: null,
        headless: false,
        userDataDir: 'chromiumSessionData',
        args: [
            '--start-fullscreen',
        ]
    });

     const page = await browser.newPage();
     await page.goto(baseURI);
     for (let idx = 0; idx < Songs.length; idx++) {
         let songName = Songs[idx].SongNames;
          await page.waitForTimeout(500);
          await page.waitForSelector("#searchinput");
          await page.click("#searchinput");

      // GIVING SONG NAME AS INPUT
      await page.waitForTimeout(500);
      await page.type("#searchinput", songName);
      await page.keyboard.press("Enter");

    // SELECTING THE FIRST RESULT FROM THE PLAYLIST
    await page.waitForTimeout(500);
    await page.waitForSelector("#SONG_smoothScroll > li:nth-child(1) > div.railContent.w-100.float-left.pt-2 > a");
    await page.click("#SONG_smoothScroll > li:nth-child(1) > div.railContent.w-100.float-left.pt-2 > a");

     //CLICK ON FAV BUTTON
     await page.waitForTimeout(500);
     await page.waitForSelector("body > app-root > app-home > div.container-fluid.sideSpacer > div > song-info > div > div.row > div.col-12.col-sm-12.col-md-9 > div.d-flex.justify-content-between.align-items-center.mt-md-4 > div.lsButton > button.likeIcons");
     await page.click("body > app-root > app-home > div.container-fluid.sideSpacer > div > song-info > div > div.row > div.col-12.col-sm-12.col-md-9 > div.d-flex.justify-content-between.align-items-center.mt-md-4 > div.lsButton > button.likeIcons");

    }

      await page.waitForTimeout(500);
      await page.waitForSelector("#navbar > div > div.d-flex.mr-auto.align-items-center > ul > li:nth-child(2) > a");
      await page.click("#navbar > div > div.d-flex.mr-auto.align-items-center > ul > li:nth-child(2) > a");

    //CLICK ON LIKED SONGS
    await page.waitForTimeout(500);
    await page.waitForSelector("#my_playlists > div:nth-child(1) > div > div > app-grid-image > div > img");
    await page.click("#my_playlists > div:nth-child(1) > div > div > app-grid-image > div > img");
    
}

main();