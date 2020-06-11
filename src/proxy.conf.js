const PROXY_CONFIG = [
  {
    context: [
      "/gooddata"

    ],
    "changeOrigin": true,
    "secure": false,
    "target": "https://analytics.totvs.com.br",
    "cookieDomainRewrite": "localhost",
    "headers": {
      "host": "https://analytics.totvs.com.br",
      "origin": null
    },
    "pathRewrite": {
      "^/gooddata": ""
    } 
  }
]

module.exports = PROXY_CONFIG;