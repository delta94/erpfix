module.exports = {
    apps : [
        {
          name: "erpfix",
          script: "npm",
          watch: true,
          env: {
              "PORT": 3000,
              "NODE_ENV": "development"
          }
        }
    ]
  }
//   pm2 start ecosystem.config.js --env development