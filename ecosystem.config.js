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

// module.exports = {
//   apps: [
//     {
//         name: "theannualreports",
//         cwd: "/home/theannualreports/htdocs/theannualreports.com",
//         //script: "./pm2-start.sh",
//         script: "npm",
//         args: "run preview",
//         env: { NODE_ENV: "production", PORT: "3000" }
//     }
//   ]
// };


// module.exports = {
//   apps: [
//     {
//       name: "theannualreports",
//       cwd: "/home/theannualreports/htdocs/theannualreports",
//       script: "npm",
//       args: "run preview",
//       env: { NODE_ENV: "production", PORT: "3051" }
//     }
//   ]
// };