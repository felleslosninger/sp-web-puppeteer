exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url :'https://sp-web-test-test1.azurewebsites.net/',
      waitForNavigation:  [ "domcontentloaded", "networkidle0" ],
      waitForAction: 10000,
      chrome:{
        args: ['--no-sandbox']
      }
    }
  },
  plugins: {
    allure: {
      enabled: 'true'
  }
},  
 mocha: {
    reporterOptions: {
        mochaFile: 'output/result.xml'
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  name: 'webdriverpuppeteer'
}
