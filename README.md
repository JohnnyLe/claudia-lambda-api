# claudia-lambda-api
Lambda project with claudiajs, nodejs and dynamoDB

In order to execute this project you must:

1 - Install Nodejs
  npm install node

2 - Install the project dependencies, run the following command on the project root:
  npm install

3 - Install AWS Commandline client
  apt-get install awscli

4 - Confige credentials to AWS Services
  aws configure

  -aws_access_key_id
  -aws_secret_access_key
  -region
  
  To get the access key id and secret access key go to your Amazon account credentials settings.
  This needs to be configure because the claudiaJS use the AWS API to connect with the aws services(lambda, gateway, etc...)
