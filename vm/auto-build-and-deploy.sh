#!/bin/bash

# VARS
gitBranch=master
gitLocation=git@ssh.dev.azure.com:v3/southampton/ELEC6200%20-%20Group%20Design%20Project/Genetic-Test-Sharing

frontendLocation=frontend # Without leading slash.
backendLocation=backend # Without leading slash.

dockerfileName=Dockerfile.prod

# SCRIPT
echo "***** Cloning latest code *****"
git clone -b $gitBranch --single-branch --depth 1 $gitLocation temp_app_code

echo

echo "***** Building frontend image *****"
cd temp_app_code/$frontendLocation
docker build -f $dockerfileName -t local/frontend:latest .
cd ../..

echo

echo "***** Building backend image *****"
cd temp_app_code/$backendLocation
docker build -f $dockerfileName -t local/backend:latest .
cd ../..

echo

echo "***** Deploying (running docker-compose) *****"
docker-compose -f /home/cto1g17/docker-compose.yaml up -d --remove-orphans

echo

echo "***** Removing temp code folder *****"
rm -rf temp_app_code