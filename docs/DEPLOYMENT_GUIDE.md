# Deployment Guide

## Overview

This guide covers various deployment strategies for Enterprise Hub.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Configuration](#environment-configuration)
3. [Docker Deployment](#docker-deployment)
4. [Cloud Deployment](#cloud-deployment)
5. [Database Setup](#database-setup)
6. [SSL Configuration](#ssl-configuration)
7. [Monitoring & Maintenance](#monitoring--maintenance)

## Prerequisites

### Required Software
- Node.js 20+ LTS
- PostgreSQL 15+
- Docker & Docker Compose (for containerized deployment)
- Git
- SSL Certificate (for production)

### Domain Setup
- Main domain: `yourdomain.com`
- API subdomain: `api.yourdomain.com` (recommended)
- Database: Private subnet/VPN access

## Environment Configuration

### Backend Environment Variables

Create `backend/.env`:

```env
# Application
NODE_ENV=production
PORT=5000

# Database
DATABASE_URL=postgresql://username:password@host:5432/database_name

# Security
JWT_SECRET=<generate-strong-random-256-bit-key>
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=https://yourdomain.com
```

**Generate Secure JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Frontend Environment Variables

Create `frontend/.env.production`:

```env
VITE_API_URL=https://api.yourdomain.com/api
```

## Docker Deployment

### Step 1: Update docker-compose.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  backend:
    build: ./backend
    restart: always
    environment:
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_NAME}
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
    ports:
      - "5000:5000"
    depends_on:
      - postgres
    networks:
      - app-network

  frontend:
    build: ./frontend
    restart: always
    ports:
      - "80:3000"
    depends_on:
      - backend
    networks:
      - app-network

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge
```

### Step 2: Deploy

```bash
# Create .env file with secrets
cat > .env << EOF
DB_USER=your_db_user
DB_PASSWORD=your_secure_password
DB_NAME=enterprise_db
JWT_SECRET=your_jwt_secret
EOF

# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

### Step 3: Initialize Database

```bash
# Run migrations
docker-compose exec backend npx prisma migrate deploy

# Seed database
docker-compose exec backend npx prisma db seed
```

## Cloud Deployment

### AWS Deployment

#### Architecture
```
Internet → CloudFront → ALB → ECS (Frontend)
                         ↓
                    ECS (Backend) → RDS (PostgreSQL)
```

#### Step-by-Step

**1. Create RDS PostgreSQL Instance**
```bash
aws rds create-db-instance \
  --db-instance-identifier enterprise-hub-db \
  --db-instance-class db.t3.medium \
  --engine postgres \
  --engine-version 15.3 \
  --master-username admin \
  --master-user-password YourPassword \
  --allocated-storage 20 \
  --vpc-security-group-ids sg-xxxxx \
  --db-subnet-group-name your-subnet-group
```

**2. Deploy Backend to ECS**

Create `backend/Dockerfile.production`:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./
EXPOSE 5000
CMD ["npm", "start"]
```

**3. Deploy Frontend to S3 + CloudFront**

```bash
# Build frontend
cd frontend
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

### Heroku Deployment

**Backend:**
```bash
cd backend
heroku create your-app-name-backend
heroku addons:create heroku-postgresql:standard-0
heroku config:set JWT_SECRET=your-secret
git push heroku main
heroku run npx prisma migrate deploy
heroku run npx prisma db seed
```

**Frontend:**
```bash
cd frontend
heroku create your-app-name-frontend
heroku buildpacks:set heroku/nodejs
git push heroku main
```

### DigitalOcean App Platform

**1. Create `app.yaml`:**
```yaml
name: enterprise-hub
region: nyc

databases:
  - name: db
    engine: PG
    version: "15"
    size: db-s-1vcpu-1gb

services:
  - name: backend
    github:
      repo: your-username/repo-name
      branch: main
      deploy_on_push: true
    source_dir: backend
    build_command: npm run build
    run_command: npm start
    environment_slug: node-js
    envs:
      - key: DATABASE_URL
        scope: RUN_TIME
        type: SECRET
        value: ${db.DATABASE_URL}
      - key: JWT_SECRET
        scope: RUN_TIME
        type: SECRET
        value: your-jwt-secret
    http_port: 5000

  - name: frontend
    github:
      repo: your-username/repo-name
      branch: main
      deploy_on_push: true
    source_dir: frontend
    build_command: npm run build
    run_command: npm run preview
    environment_slug: node-js
    envs:
      - key: VITE_API_URL
        scope: BUILD_TIME
        value: https://backend-xxxxx.ondigitalocean.app/api
    http_port: 3000
```

**2. Deploy:**
```bash
doctl apps create --spec app.yaml
```

## Database Setup

### PostgreSQL Tuning for Production

Edit `postgresql.conf`:

```conf
# Connection Settings
max_connections = 100
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 200
work_mem = 2621kB
min_wal_size = 1GB
max_wal_size = 4GB
```

### Database Backup Strategy

**1. Automated Daily Backups:**

```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="enterprise_db"

pg_dump -U postgres $DB_NAME | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# Keep only last 30 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete
```

**2. Set up cron job:**
```bash
0 2 * * * /path/to/backup.sh
```

**3. Restore from backup:**
```bash
gunzip < backup_20240115_020000.sql.gz | psql -U postgres enterprise_db
```

## SSL Configuration

### Using Let's Encrypt (Nginx)

**1. Install Certbot:**
```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
```

**2. Obtain Certificate:**
```bash
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com
```

**3. Nginx Configuration:**

`/etc/nginx/sites-available/enterprise-hub`:

```nginx
# Frontend
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    root /var/www/enterprise-hub/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}

# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**4. Enable and restart:**
```bash
sudo ln -s /etc/nginx/sites-available/enterprise-hub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Monitoring & Maintenance

### Health Checks

**Backend Health Endpoint:**
```bash
curl https://api.yourdomain.com/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### Log Management

**1. PM2 for Process Management:**
```bash
npm install -g pm2

# Start backend
cd backend
pm2 start dist/server.js --name enterprise-hub-backend

# View logs
pm2 logs enterprise-hub-backend

# Monitor
pm2 monit

# Auto-restart on reboot
pm2 startup
pm2 save
```

**2. Log Rotation:**

`/etc/logrotate.d/enterprise-hub`:
```
/var/log/enterprise-hub/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
    postrotate
        systemctl reload nginx > /dev/null 2>&1
    endscript
}
```

### Performance Monitoring

**1. Setup Monitoring Tools:**
- Application: New Relic, Datadog, or AppDynamics
- Uptime: UptimeRobot or Pingdom
- Database: pgAdmin, Datadog, or CloudWatch

**2. Key Metrics to Monitor:**
- API response time
- Database query performance
- CPU and memory usage
- Disk space
- Error rate
- Active connections

### Security Checklist

- [ ] SSL/TLS enabled
- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] Firewall configured
- [ ] Regular security updates
- [ ] Backup strategy implemented
- [ ] Access logs enabled
- [ ] Rate limiting configured
- [ ] DDoS protection active
- [ ] Security headers configured

### Updating the Application

**Zero-Downtime Deployment:**

```bash
# Pull latest changes
git pull origin main

# Backend update
cd backend
npm ci
npm run build
pm2 reload enterprise-hub-backend

# Frontend update
cd ../frontend
npm ci
npm run build
rsync -av dist/ /var/www/enterprise-hub/frontend/dist/

# Database migrations (if needed)
cd ../backend
npx prisma migrate deploy
```

### Rollback Strategy

```bash
# View PM2 history
pm2 list

# Rollback to previous version
git checkout <previous-commit>
cd backend && npm run build
pm2 reload enterprise-hub-backend
```

## Troubleshooting

### Common Issues

**1. Database Connection Failed:**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check connection string
psql "postgresql://user:pass@host:5432/dbname"

# Check firewall
sudo ufw status
```

**2. CORS Errors:**
- Verify `CORS_ORIGIN` in backend `.env`
- Check API URL in frontend `.env`
- Ensure proper headers in nginx

**3. Out of Memory:**
```bash
# Increase Node.js memory
NODE_OPTIONS="--max-old-space-size=4096" npm start
```

**4. Slow Queries:**
```sql
-- Find slow queries
SELECT pid, now() - query_start as duration, query 
FROM pg_stat_activity 
WHERE state = 'active' 
ORDER BY duration DESC;
```

## Support

For deployment issues:
1. Check application logs
2. Review error messages
3. Consult documentation
4. Create GitHub issue with details

---

**Last Updated:** 2024  
**Version:** 1.0.0
