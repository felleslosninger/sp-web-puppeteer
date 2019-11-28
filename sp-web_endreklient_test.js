
Feature('sp-web-login');

Scenario('sp-web endre klient', async (I)   => {
var randomstring = require("randomstring");
	         I.amOnPage('https://sp-web-test-test1.azurewebsites.net/');
		 I.see('Samarbeidsportalen');
		 I.click('Logg inn');
		 I.fillField('username',process.env.SP_WEB_USERNAME);
		 I.fillField('password',process.env.SP_WEB_PASSWORD);
		 I.click('login');
		 I.dontSee("PROD");
		 I.see('MINE API');
		 I.see('TEST1');
		 I.click('//a[@href="/integrations"]');
		 I.see('TEST1');
		 I.see('Integrasjons-ID');
		 I.see('Integrasjonsnavn');
		 I.see('Tjeneste');
		 I.see('Beskrivelse');
		 I.see('Opprettet');
		 I.see('Endret');
		 
		 I.click('#new-integration');
		 I.waitForElement("select#difi-service",5);
		 I.selectOption("select#difi-service","Maskinporten");

		 I.click('Legg til scopes');
		 I.pressKey("Tab");
		 I.pressKey("Tab");
		 I.pressKey("Tab");
		 I.pressKey("Space");
		 I.click('Lukk');
	
		 var tempClientName=randomstring.generate();
		 I.fillField('#client_name',tempClientName);
		 I.fillField('#description','test');
	         I.fillField('#authorization_lifetime','3600');
		 I.fillField('#access_token_lifetime','3600');
		 I.fillField('#refresh_token_lifetime','1200');
		 I.waitForElement("select#difi-application",5);
		 I.selectOption("select#difi-application","web");	
		 I.click('#submit-new-integration');
	
		 I.click('#change-integration');
		 let getClientID = await  I.grabValueFrom('#client_id');
		 I.fillField('#client_name',getClientID +' Endret');
		 var newClientName=getClientID+ ' Endret';
		 I.click('#save-integration');
		 
		 I.click('#change-integration');
	   	 let getClientName = I.grabTextFrom('#client_name');
		 var assert = require('assert');
		 assert(getClientName,newClientName);
		 
		 I.click('#deactivate-integration');
		 I.click('#deactivate_button');
		 I.click('//a[@href="/auth/logout"]');

});
