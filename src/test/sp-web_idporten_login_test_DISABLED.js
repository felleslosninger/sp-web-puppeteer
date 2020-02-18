Feature('sp-web-idporten-login');

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


Scenario('sp-web login through ID-Porten', async (I) => {

    // nav to list of integrations
    I.click('#integrations-link');
    I.waitForInvisible('.spinner-container');
    I.seeElement("#integrations-table");

    I.loginWithIdPorten(process.env.SP_WEB_IDPORTEN_USERNAME, process.env.SP_WEB_IDPORTEN_PASSWORD, process.env.SP_WEB_IDPORTEN_OTP);

    I.waitForInvisible('.spinner-container');
    I.waitForElement('button#env-badge');
    I.seeInCurrentUrl('/integrations');
    I.seeInTitle("Administrasjon av tjenester | Samarbeidsportalen");
    I.see(process.env.SP_WEB_ENV, '#env-badge');
    I.dontSee('Logg inn med ID-Porten');
});