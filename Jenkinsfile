pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy Docker') {
            steps {
                sh 'docker compose up -d --build'
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker image prune -f'
            }
        }
    }
}