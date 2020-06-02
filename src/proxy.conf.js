const PROXY_CONFIG = [
  {
    context: [
      "/gdc"

    ],
    "changeOrigin": true,
    "secure": false,
    "target": "https://analytics.totvs.com.br",
    "cookieDomainRewrite": "localhost",
    "headers": {
      "host": "https://analytics.totvs.com.br",
      "origin": null
  },
  }
]

module.exports = PROXY_CONFIG;