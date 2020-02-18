
// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({

    loginWithMidifi: function (username, password) {
      this.see('Logg inn til Samarbeidsportalen');
      this.click('#login-button');
      this.fillField('username', username);
      this.fillField('password', password);
      this.click('login');
      this.waitForNavigation();
    },

    loginWithIdPorten: function (username, password, otp) {
      this.see('Logg inn med ID-Porten');
      this.click('Logg inn med ID-Porten');
      this.waitForNavigation();
      this.loginWithBankId();
      this.waitForNavigation();
    },

    logout: function () {
      this.amOnPage(process.env.SP_WEB_HOST + '/');
      this.click('#logout');
      this.waitForNavigation();
    },

    checkEnvironmentAndFirstPage: function () {
      this.seeInCurrentUrl('/');
      this.seeInTitle("Administrasjon av tjenester | Samarbeidsportalen");
      this.see(process.env.SP_WEB_ENV, '#env-badge');
    }

  });
};
