
Feature('sp-web-login');

Scenario('sp-web endre klient',  (I)   => {
var randomstring = require("randomstring");
	         I.amOnPage('https://sp-web-test-test1.azurewebsites.net/');
		 I.see('Samarbeidsportalen');
		 I.click('Logg inn');
		 I.fillField('username','utvtest@difi.no');
		 I.fillField('password','Testadmin123');
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
		 I.click('+ Ny integrasjon');
	 	 I.waitForElement("select#difi-service");
		 I.selectOption("select#difi-service","Maskinporten");
		 I.click('Legg til scopes');
		 //I.seeCheckcheckOption('#difi:vivian');
		 //I.seeCheckboxIsChecked("#difi:vivian")
		 //I.checkOption("difi:vivian");
		 //I.pressKey(["Tab", "Tab","Tab","Shift"]);
		 I.pressKey("Tab");
		 I.saveScreenshot("blabla1.png");
		 I.pressKey("Tab");
		 I.saveScreenshot("blabla2.png");
		 I.pressKey("Tab");
		 I.saveScreenshot("blabla3.png");
		 I.pressKey("Space");
		 I.saveScreenshot("blabla4.png");
		 I.click('Lukk');
		 I.saveScreenshot("blabla5.png");
		 var tempClientName=randomstring.generate();
		 I.fillField('#client_name',tempClientName);
		 I.fillField('#description','test');
		 I.click('#submit-new-integration');
	         let numTodos = I.grabTextFrom('#client_id');
		 I.click('#change-integration');
		 I.fillField('#client_name',tempClientName+' Endret');
		 I.click('#submit-new-integration');	
		 I.click('//a[@href="/auth/logout"]');

});
