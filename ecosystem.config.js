module.exports = {
  apps: [
    {
      name: "theannualreports",
      cwd: "/home/theannualreports/htdocs/theannualreports.com",
      script: "./pm2-start.sh",
      env: { NODE_ENV: "production", PORT: "3000" }
    }
  ]
};