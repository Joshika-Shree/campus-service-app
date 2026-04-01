pipeline {
    agent any

    environment {
        CI = 'true'
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Environment') {
            steps {
                echo 'Ensuring Node.js and PM2 are installed...'
                sh '''
                if ! command -v npm > /dev/null 2>&1
                then
                    echo "Node.js not found. Bypassing 'apt' and installing pure binaries..."
                    wget https://nodejs.org/dist/v20.12.2/node-v20.12.2-linux-x64.tar.xz -O /tmp/node.tar.xz
                    sudo tar -xJvf /tmp/node.tar.xz -C /usr/local --strip-components=1
                    rm /tmp/node.tar.xz
                fi
                
                if ! command -v pm2 > /dev/null 2>&1
                then
                    echo "PM2 not found. Installing globally..."
                    sudo npm install -g pm2
                fi
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Server Dependencies...'
                dir('server') {
                    sh 'rm -rf node_modules package-lock.json || true'
                    sh 'npm install'
                }
                echo 'Installing Client Dependencies...'
                dir('client') {
                    sh 'rm -rf node_modules package-lock.json || true'
                    sh 'npm install'
                }
            }
        }

        stage('Test Backend') {
            steps {
                echo 'Testing Backend...'
                dir('server') {
                    sh 'chmod -R +x node_modules/.bin || true'
                    sh 'npm test'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Building Frontend...'
                dir('client') {
                    sh 'chmod -R +x node_modules/.bin || true'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy Host') {
            steps {
                echo 'Deploying to Host...'
                sh 'sudo chmod +x scripts/setup-host-vm.sh && sudo bash scripts/setup-host-vm.sh'
                
                // Deploy Backend using PM2
                sh 'pm2 delete campus-server || true'
                sh 'pm2 start server/server.js --name campus-server'
                
                // Deploy Frontend to Nginx directory
                sh 'sudo rm -rf /var/www/campus/*'
                sh 'sudo cp -r client/dist/* /var/www/campus/'
                
                echo 'Deployment Complete!'
            }
        }
    }
}
