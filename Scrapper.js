const puppeteer = require("puppeteer");
const fs = require("fs");
async function main(){
    let browser = await puppeteer.launch({
        headless : false,
        defaultViewport : null,
        userDataDir: 'chromiumSessionData',
        args: [
            '--start-fullscreen'
        ]

    });
    const page = await browser.newPage();
    await page.goto("https://music.youtube.com/playlist?list=PLKhUC3ss_Xf_9iaL3bQE58Q_u4yAMV3Rl");
    await page.waitForSelector(".title.style-scope.ytmusic-responsive-list-item-renderer.complex-string a");
    await autoScroll(page);
    let music = await page.$$(".title.style-scope.ytmusic-responsive-list-item-renderer.complex-string a");
    let list = [];
    for(let i = 0; i < music.length; i++){
        list.push({"SongNames" : await page.evaluate(function (playlist){
            return playlist.textContent;
        } ,music[i] )});

       fs.writeFileSync("Songs.json" , JSON.stringify(list)); 
    }
}
    async function autoScroll(page){
     await page.evaluate(async () => {
     await new Promise((resolve, reject) => {
    var totalHeight = 0;
    var distance = 100;
    var timer = setInterval(() => {
    var scrollHeight = document.body.scrollHeight;
    window.scrollBy(0, distance);
    totalHeight += distance;

     if(totalHeight >= scrollHeight){
     clearInterval(timer);
     resolve();
                }
            }, 100);
           });
        }); 
} 
main();
