module.exports = {
  apps: [
    {
      name: 'catchtheevent',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/catchtheevent',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/pm2/catchtheevent-error.log',
      out_file: '/var/log/pm2/catchtheevent-out.log',
      log_file: '/var/log/pm2/catchtheevent.log',
      time: true,
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024',
      watch: false,
      ignore_watch: ['node_modules', 'logs'],
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s'
    }
  ]
}
