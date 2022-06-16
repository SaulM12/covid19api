pipeline {
  agent {
    docker {
      image 'node:lts-bullseye-slim'
      args '-p 4200:4200'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }

  }
}