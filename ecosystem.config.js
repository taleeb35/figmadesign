module.exports = {
  apps: [
    {
      name: "theannualreports",
      cwd: "/home/theannualreports/htdocs/theannualreports.com",
      script: "./pm2-start.sh",
      env: {
        NODE_ENV: "production",
        PORT: "3000"
      },
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000
    }
  ]
};

// module.exports = {
//   apps: [
//     {
//       name: "theannualreports",
//       cwd: "/home/theannualreports/htdocs/theannualreports.com",
//       script: "npm",
//       args: "run preview",
//       env: { NODE_ENV: "production", PORT: "3000" }
//     }
//   ]
// };