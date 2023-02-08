const puppeteer = require('puppeteer');
const path = require('path');

async function runTab(page, browser) 
{
	console.log("new browser");
	// browser.onclose;
	try{
		const client = await page.target().createCDPSession()
		await client.send('Page.setDownloadBehavior', {
			  behavior: 'allow',
			  downloadPath: path.resolve('./myAwesomeDownloadFolder'),
		})


		await page.goto('https://www.majordomo.ru/order-service?service=hosting&plan_id=19805&client_type=individual');
		await page.type('#client_name', 'login');
		await page.type('#client_email', 'betav72183@miarr.com');
		await page.type('#client_phone', '+79295682546');
		

			
		await page.evaluate(() => {
			document.querySelector("#accept_oferta").click()
			document.querySelector("#tariff_period_7").click()
			document.querySelector("#registration_form > div.register-form-block.service-related.service-hosting.service-vps.service-server.service-ssl > div > div > div > div.col-12.col-md-12.col-lg-4.col-xl-4.tariff-description > div > div > div:nth-child(8) > input").click();
			
			//document.querySelector("#main-block > div > div > div.entrance > a > button").click()
			//document.querySelector('#registration_form').submit();
		});
		
		await page.waitForSelector('#main-block > div > div > div.entrance > a > button', {timeout: 30000})
		
		await page.goto('https://hms.majordomo.ru/access/ssh');

		await page.waitForSelector("#main-block > div.form-container > div.ssh-connection-info > div.ssh-key-operations > button", {timeout: 30000})
		
		await page.evaluate(() => {
			document.querySelector("#main-block > div.form-container > div.ssh-connection-info > div.ssh-key-operations > button").click()
			document.querySelector("#main-block > div.form-container > div.ssh-connection-info > div.ssh-key-operations > div > ul > li:nth-child(2)").click()
		});
		await page.on('response', (response)=>
		{
			//console.log(response, response.status())
			browser.close();
			console.log('quit succes')
		});
		return (-1);
	}catch(e){
		//console.log('eerrrroooorrr',e)
		browser.close();
		console.log('quit error')
		return (-1);
	}

	
}

	let i = 0;
/* 	while (1){
		if (i < 1)
		{
			const b = await puppeteer.launch({
				headless: false,
				args: [],
				//executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
				//userDataDir: 'C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\User Data'
			})
			const t = await b.newPage();
			i++;
			runTab(t,b)
			.then(e=>i += e);
			console.log(i);
		}
		
		//console.log("maxxx");
	} */


setInterval(async()=>{
	//console.log("cheeeeck");
	if (i < 2)
	{
		const b = await puppeteer.launch({
			headless: false,
			args: [],
			//executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
			//userDataDir: 'C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\User Data'
		})
		const t = await b.newPage();
		i++;
		runTab(t,b)
		.then(e=>i += e);
	}
},1000,)


console.log("end");
	//await page.screenshot({path: 'google.png'});
	//await browser.close();

