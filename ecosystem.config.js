module.exports = {
  apps: [{
    name: 'catchtheevent',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/catchtheevent',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/catchtheevent-error.log',
    out_file: '/var/log/pm2/catchtheevent-out.log',
    log_file: '/var/log/pm2/catchtheevent-combined.log',
    time: true,
    max_memory_restart: '1G',
    min_uptime: '10s',
    max_restarts: 10,
    autorestart: true,
    watch: false,
    ignore_watch: ['node_modules', 'logs', '.next', 'public'],
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    // Performance optimization
    node_args: '--max-old-space-size=1024',
    // Health check
    health_check_grace_period: 3000,
    health_check_fatal_exceptions: true,
    // Monitoring
    pmx: true,
    // Environment variables
    env_file: '.env.production'
  }]
};
