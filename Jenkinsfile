pipeline {
    agent any 
    environment {
        DOCKER_IMAGE = 'priyanshu112/sample'
        DOCKER_TAG = "${env.BUILD_ID}"
        AWS_ACCOUNT_ID="891377211670"
        IMAGE_REPO_NAME="testing"
        IMAGE_TAG="latest"
        REPOSITORY_URI = "891377211670.dkr.ecr.ap-south-1.amazonaws.com/testing"
        AWS_DEFAULT_REGION = 'ap-south-1' // Set your AWS region
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID') // Use Jenkins credentials
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
        ECS_CLUSTER_NAME = "prerna-demo-project-cluster"
        ECS_SERVICE_NAME = "my-prerna-app-svc"
        ECS_TASK_DEFINITION_NAME = "prerna-demo-applicaction-td"
        
    }
    stages{
        stage('Loging to ECR'){
            steps{
                script{
                    sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
                    sh "echo hell"
                }
            }
        }
        stage('Building image') {
        steps{
        script {
        dockerImage = docker.build "${IMAGE_REPO_NAME}:${IMAGE_TAG}"
         }
        }
        }
         stage('Pushing to ECR') {
         steps{ 
            script {
                sh "docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:$IMAGE_TAG"
                sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}"
            }
            }
            }
        stage('deleting previous tasks') {
         steps{ 
            script {
                sh "aws ecs update-service --cluster ${ECS_CLUSTER_NAME} --service ${ECS_SERVICE_NAME} --desired-count 0"
            }
            }
            }
            stage('Deploying to ECS'){
                steps{
                script {

                    def LATEST_IMAGE_URI = sh(script: "aws ecr describe-images --region ${AWS_DEFAULT_REGION} --repository-name testing --query 'sort_by(imageDetails,& imagePushedAt)[-1].imageTags[0]' --output text", returnStdout: true).trim()
                    sh "echo  ${LATEST_IMAGE_URI} " 
                    
                    sh "aws ecs update-service --cluster ${ECS_CLUSTER_NAME} --service ${ECS_SERVICE_NAME} --desired-count 1 --force-new-deployment"
                }
                }
                }
            }

    }
    
    

