pipeline {
    agent any
    stages {
      
        stage('muhandis_edu') {
            steps {
                sh 'ansible-playbook /var/lib/jenkins/ansible/muhandis_edu-front.yml -l prof_edu'
            }
        }
    }
}
