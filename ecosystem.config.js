module.exports = {
  apps: [
    {
      name: 'catchtheevent',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/catchtheevent',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/catchtheevent/err.log',
      out_file: '/var/log/catchtheevent/out.log',
      log_file: '/var/log/catchtheevent/combined.log',
      time: true
    }
  ]
}
