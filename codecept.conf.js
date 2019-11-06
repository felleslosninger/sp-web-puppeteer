exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url :'https://sp-web-test-test1.azurewebsites.net/',
      chrome:{
        args: ['--no-sandbox']
      }
    }
  },
mocha: {
  reporterOptions: {
      reportDir: 'output'
  }
},
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'webdriverpuppeteer'
}
