Feature('sp-web forside test');

Before(async (I) => {
    // start & login
    I.amOnPage(process.env.SAMARBEIDS_PORTALEN_HOST + '/');

});

After(async (I) => {
  //  I.see("Logg ut");
});


Scenario('Gå til samarbeidsportalen', async (I) => {
    I.loginWithSamarbeidsPortalen(process.env.SP_WEB_MIDIFI_USERNAME, process.env.SP_WEB_MIDIFI_PASSWORD);

    // sanity check
    I.checkEnvironmentAndFirstPageForSamarbeidsportalen();
    I.amOnPage(process.env.SAMARBEIDS_PORTALEN_HOST + '/');
    I.navigateToMainPage();
    I.see("Ver1");
    I.see("Ver2");
    I.see("INTEGRASJONER");

});

Scenario('samarbeidsportalen viser lenker', async (I) => {

});
