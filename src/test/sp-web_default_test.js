const randomstring = require("randomstring");

Feature('sp-web default test');

Before(async (I) => {
    // start & login
    I.amOnPage(process.env.SP_WEB_HOST + '/');
    I.loginWithMidifi(process.env.SP_WEB_MIDIFI_USERNAME, process.env.SP_WEB_MIDIFI_PASSWORD);

    // sanity check
    I.checkEnvironmentAndFirstPage();

});

After(async (I) => {
    I.logout();
});

Scenario('sp-web create clients with default values', async (I) => {

    // nav to list of integrations
    I.click('#integrations-link');
    I.waitForInvisible('.spinner-container');
    I.seeElement("#integrations-table");

    /********************************************************
     * Maskinporten client
     ********************************************************/
    // click new integration
    I.click('#new-integration');
    I.waitForInvisible('.spinner-container');

    // select integration_type & application_type
    I.selectOption("select#difi-service", "Maskinporten");
    I.selectOption("select#difi-application", "web");

    // add a scope (modal)
    I.click('#add-scopes');
    I.waitForVisible("#add-scopes-modal");
    I.see('Tilgjengelige scopes');
    I.seeElement('#scope-1');
    I.checkOption('#scope-1');
    I.click('#close_button');
    I.waitForInvisible('#add-scopes-modal');

    // fill form
    let rndStr = await randomstring.generate({length: 8});
    I.fillField('#client_name', 'Maskinporten-' + rndStr);
    I.fillField('#description', 'maskinporten test');

    // submit form
    I.click('#submit-new-integration');
    I.waitForNavigation();

    // verify client_id
    I.seeElement("#confirm-modal");
    let maskinportenClientId = (await I.grabTextFrom('#modal-client-id')).split('client_id: ')[0];
    I.seeInCurrentUrl('/integrations/' + maskinportenClientId);
    I.click("#close_button");

    // verify client in table listing
    I.amOnPage(process.env.SP_WEB_HOST + '/integrations');
    I.waitForInvisible('.spinner-container');
    I.seeTextEquals(maskinportenClientId, '//table[@id="integrations-table"]//a[@href="/integrations/' + maskinportenClientId + '"]');
    I.click('//table[@id="integrations-table"]//a[@href="/integrations/' + maskinportenClientId + '"]');
    I.waitForInvisible('.spinner-container');

    // deactivate client
    I.click('#change-integration');
    I.waitForClickable('#deactivate-integration');
    I.click('#deactivate-integration');
    I.waitForVisible('#deactivate-confirm-modal');
    I.click('#deactivate_button');
    I.waitForInvisible('#deactivate-confirm-modal');
    I.waitForInvisible('.spinner-container');
    I.seeInCurrentUrl('/integrations');

    /********************************************************
     * ID-Porten client
     ********************************************************/
    // click new integration
    I.click('#new-integration');
    I.waitForInvisible('.spinner-container');

    // select integration_type & application_type
    I.selectOption("select#difi-service", "ID-porten");
    I.selectOption("select#difi-application", "web");

    // fill form
    rndStr = await randomstring.generate({length: 8});
    I.fillField('#client_name', 'ID-Porten-' + rndStr);
    I.fillField('#description', 'idporten test');
    I.fillField('#redirect_uris', 'https://so.me/where');
    I.fillField('#post_logout_redirect_uris', 'https://so.me/where, https://some.where/else');
    I.fillField('frontchannel_logout_uri', 'no.digdir.mobileApp://oauth2Callback');
    I.fillField('#client_uri', 'http://localhost:8080/auth/login');

    // submit form
    I.click('#submit-new-integration');
    I.waitForNavigation();

    // verify client_id
    I.seeElement("#confirm-modal");
    let idportenClientId = (await I.grabTextFrom('#modal-client-id')).split('client_id: ')[0];
    I.seeInCurrentUrl('/integrations/' + idportenClientId);
    I.click("#close_button");

    // verify client in table listing
    I.amOnPage(process.env.SP_WEB_HOST + '/integrations');
    I.waitForInvisible('.spinner-container');
    I.seeTextEquals(idportenClientId, '//table[@id="integrations-table"]//a[@href="/integrations/' + idportenClientId + '"]');
    I.click('//table[@id="integrations-table"]//a[@href="/integrations/' + idportenClientId + '"]');
    I.waitForInvisible('.spinner-container');

    // deactivate client
    I.click('#change-integration');
    I.waitForClickable('#deactivate-integration');
    I.click('#deactivate-integration');
    I.waitForVisible('#deactivate-confirm-modal');
    I.click('#deactivate_button');
    I.waitForInvisible('#deactivate-confirm-modal');
    I.waitForInvisible('.spinner-container');
    I.seeInCurrentUrl('/integrations');

    /********************************************************
     * KRR client
     ********************************************************/
    // click new integration
    I.click('#new-integration');
    I.waitForInvisible('.spinner-container');

    // select integration_type & application_type
    I.selectOption("select#difi-service", "KRR");
    I.selectOption("select#difi-application", "web");

    // fill form
    rndStr = await randomstring.generate({length: 8});
    I.fillField('#client_name', 'KRR-' + rndStr);
    I.fillField('#description', 'KRR test');

    // submit form
    I.click('#submit-new-integration');
    I.waitForNavigation();

    // verify client_id
    I.seeElement("#confirm-modal");
    let krrClientId = (await I.grabTextFrom('#modal-client-id')).split('client_id: ')[0];
    I.seeInCurrentUrl('/integrations/' + krrClientId);
    I.click("#close_button");

    // verify client in table listing
    I.amOnPage(process.env.SP_WEB_HOST + '/integrations');
    I.waitForInvisible('.spinner-container');
    I.seeTextEquals(krrClientId, '//table[@id="integrations-table"]//a[@href="/integrations/' + krrClientId + '"]');
    I.click('//table[@id="integrations-table"]//a[@href="/integrations/' + krrClientId + '"]');
    I.waitForInvisible('.spinner-container');

    // deactivate client
    I.click('#change-integration');
    I.waitForClickable('#deactivate-integration');
    I.click('#deactivate-integration');
    I.waitForVisible('#deactivate-confirm-modal');
    I.click('#deactivate_button');
    I.waitForInvisible('#deactivate-confirm-modal');
    I.waitForInvisible('.spinner-container');
    I.seeInCurrentUrl('/integrations');

});

Scenario('sp-web create client as supplier', async (I) => {

    // verify supplier permissions
    let permissions  = await I.sendGetRequest('/account/user-permissions');
    I.assertOk(permissions.status === 200, 'Could not get permissions: ' + permissions.statusText);
    I.assertOk(permissions.data.includes('idporten:dcr.supplier'), 'User must have supplier permission.');

    // nav to list of integrations
    I.click('#integrations-link');
    I.waitForInvisible('.spinner-container');
    I.seeElement("#integrations-table");

    // click new integration
    I.click('#new-integration');
    I.waitForInvisible('.spinner-container');

    // select integration_type & application_type
    I.selectOption("select#difi-service", 'KRR');
    I.selectOption("select#difi-application", 'web');

    // supplier stuff
    let clientOrgno = '991825827';
    I.checkOption('#client_org_active');
    I.fillField('#client_orgno', clientOrgno);

    // fill form
    let rndStr = await randomstring.generate({length: 8});
    I.fillField('#client_name', 'Supplier-KRR-' + rndStr);
    I.fillField('#description', 'Supplier-KRR test');

    // submit form
    I.click('#submit-new-integration');
    I.waitForNavigation();

    // verify client_id
    I.seeElement("#confirm-modal");
    let clientId = (await I.grabTextFrom('#modal-client-id')).split('client_id: ')[0];
    I.seeInCurrentUrl('/integrations/' + clientId);
    I.click("#close_button");

    // verify supplier & client orgno
    let account  = await I.sendGetRequest('/account');
    I.assertOk(account.status === 200, 'Could not get account: ' + account.statusText);
    I.assertOk(!!account.data && !!account.data.organizationNumber);
    let supplierOrgno = account.data.organizationNumber;

    let client = await I.sendGetRequest('/integrations/' + clientId);
    I.assertOk(client.status === 200, 'Could not get integration: ' + client.statusText);
    I.assertOk(client.data.supplier_orgno === supplierOrgno, 'Supplier orgno does not match.');
    I.assertOk(client.data.client_orgno === clientOrgno, 'Client orgno does not match.');

    // verify client in table listing
    I.amOnPage(process.env.SP_WEB_HOST + '/integrations');
    I.waitForInvisible('.spinner-container');
    I.seeTextEquals(clientId, '//table[@id="integrations-table"]//a[@href="/integrations/' + clientId + '"]');
    I.click('//table[@id="integrations-table"]//a[@href="/integrations/' + clientId + '"]');
    I.waitForInvisible('.spinner-container');

    // make a change and verify
    let client_name = await I.grabValueFrom('#client_name');
    let client_name_changed = client_name + ' Endret';
    I.click('#change-integration');
    I.waitForEnabled("#client_name");
    I.fillField('#client_name', client_name_changed);
    I.click('#save-integration');
    I.waitForInvisible('.spinner-container');
    let client_name_new = await I.grabValueFrom('#client_name');
    I.assertOk(client_name_new === client_name_changed, 'Client name was not changed.');

    // deactivate client
    I.click('#change-integration');
    I.waitForClickable('#deactivate-integration');
    I.click('#deactivate-integration');
    I.waitForVisible('#deactivate-confirm-modal');
    I.click('#deactivate_button');
    I.waitForInvisible('#deactivate-confirm-modal');
    I.waitForInvisible('.spinner-container');
    I.seeInCurrentUrl('/integrations');
});



Scenario('sp-web create scope with default values', async (I) => {

    // nav to list of scopes
    I.click('#scopes-link');
    I.waitForInvisible('.spinner-container');
    I.seeElement("#scopes-table");

    // click 'new scope'
    I.click('#new-scope');
    I.waitForInvisible('.spinner-container');

    // fill form
    let prefixName = await I.grabTextFrom('select#prefix option:nth-child(1)');
    I.assertOk(!!prefixName, 'Prefix dropdown is empty.');
    I.selectOption("select#prefix", prefixName); // select first available prefix
    let subscopeName = 'testscope/' + await randomstring.generate({length: 8, charset: 'alphanumeric', capitalization: 'lowercase'});
    I.fillField('#subscope', subscopeName);
    I.fillField('#description', 'scope test');

    // submit form
    I.click('#submit-new-scope');
    I.waitForNavigation();

    // verify
    I.seeInCurrentUrl('/scopes/' + prefixName + ':' + subscopeName);

    // deactivate scope
    I.click('#change_button');
    I.waitForClickable('#deactivate_button');
    I.click('#deactivate_button');
    I.waitForVisible('body > div.fade.sp-web.modal.show > div');   // I.waitForVisible('#deactivate-scope-modal');
    I.click('#deactivate_button');
    I.waitForInvisible('body > div.fade.sp-web.modal.show > div'); // I.waitForInvisible('#deactivate-scope-modal');
    I.waitForInvisible('.spinner-container');
    I.seeInCurrentUrl('/scopes');

});