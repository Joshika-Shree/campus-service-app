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
                    echo "Node.js not found. Installing..."
                    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
                    sudo apt-get install -y nodejs
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
                    sh 'npm install'
                }
                echo 'Installing Client Dependencies...'
                dir('client') {
                    sh 'npm install'
                }
            }
        }

        stage('Test Backend') {
            steps {
                echo 'Testing Backend...'
                dir('server') {
                    sh 'npm test'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Building Frontend...'
                dir('client') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy Host') {
            steps {
                echo 'Deploying to Host...'
                
                // Deploy Backend using PM2
                sh 'pm2 delete campus-server || true'
                sh 'pm2 start server/server.js --name campus-server'
                
                // Deploy Frontend to Nginx directory
                sh 'rm -rf /var/www/campus/*'
                sh 'cp -r client/dist/* /var/www/campus/'
                
                echo 'Deployment Complete!'
            }
        }
    }
}