module.exports = {
  apps: [
    {
      name: "theannualreports",
      cwd: "/home/theannualreports/htdocs/theannualreports.com",
      script: "npm",
      args: "run preview",
      env: { NODE_ENV: "production", PORT: "3000" }
    }
  ]
};