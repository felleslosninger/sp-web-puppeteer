exports.config = {
  tests: './*_test.js',
  output: '',
  helpers: {
    Puppeteer: {
      url :'https://sp-web-test-test1.azurewebsites.net/',
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
  mocha: {},
  name: 'webdriverpuppeteer'
}
