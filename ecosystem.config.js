module.exports = {
  apps: [
    {
      name: 'rangtaali-hamilton-2025',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/rangtaali.catchtheevent.com',
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
      error_file: '/var/log/rangtaali/err.log',
      out_file: '/var/log/rangtaali/out.log',
      log_file: '/var/log/rangtaali/combined.log',
      time: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000,
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 8000,
      shutdown_with_message: true
    }
  ],

  deploy: {
    production: {
      user: 'www-data',
      host: 'your-vps-ip',
      ref: 'origin/main',
      repo: 'https://github.com/yourusername/rangtaali-hamilton-2025.git',
      path: '/var/www/rangtaali.catchtheevent.com',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
