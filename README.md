# claudia-lambda-api
Lambda project with claudiajs, nodejs and dynamoDB

In order to execute this project you must:

1 - Install Nodejs

  npm install node

2 - Install claudiajs

  npm install claudia -g

3 - Install the project dependencies, run the following command on the project root:

  npm install

4 - Install AWS command line client

  apt-get install awscli

5 - Confige credentials to AWS Services

  run: aws configure

  fill with

  -aws_access_key_id

  -aws_secret_access_key

  -region

  This needs to be configure because claudiaJS use the AWS API to connect to aws services(lambda, gateway, etc...)  

  To get the access_key_id and secret_access_key go to your amazon account credentials settings.

6 - Run claudia command line

  claudia create --name greetings --region us-east-1 --api-module server
  This command is going to create the service on us-east-1, in order to see the server running on aws console, you must use the same region.

7 - Open your AWS gateway console, and you should see your service already deployed and ready to run.
