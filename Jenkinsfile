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