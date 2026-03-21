pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                // In a real Jenkins environment, this relies on SCM configuration
                // checkout scm  
                echo "Code checked out."
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo "Installing Server Dependencies..."
                dir('server') {
                    bat 'npm install'
                }
                echo "Installing Client Dependencies..."
                dir('client') {
                    bat 'npm install'
                }
            }
        }
        
        stage('Test Backend') {
            steps {
                dir('server') {
                    bat 'npm test'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir('client') {
                    bat 'npm run build'
                }
            }
        }
    }
}
