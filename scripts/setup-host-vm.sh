#!/bin/bash

# Update system
sudo apt-get update -y
sudo apt-get upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt-get install -y nginx

# Setup Directory for Frontend
sudo mkdir -p /var/www/campus
sudo chown -R jenkins:jenkins /var/www/campus

# Create Nginx config for Campus App
sudo tee /etc/nginx/sites-available/campus <<EOF
server {
    listen 3005;
    server_name _;

    location / {
        root /var/www/campus;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable the config and restart Nginx
sudo ln -s /etc/nginx/sites-available/campus /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl restart nginx

echo "Host-side setup complete!"
