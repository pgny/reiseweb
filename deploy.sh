#!/bin/bash
SERVER="ec2-user@3.122.228.19"
KEY="~/.ssh/reiseweb-key.pem"

echo "=== Building frontend ==="
cd ~/IdeaProjects/reiseweb/reiseweb-frontend && ng build

echo "=== Building backend ==="
cd ~/IdeaProjects/reiseweb && mvn clean package -DskipTests

echo "=== Uploading frontend ==="
scp -i $KEY -r ~/IdeaProjects/reiseweb/reiseweb-frontend/dist/reiseweb-frontend/browser/* $SERVER:~/frontend-update/

echo "=== Uploading backend ==="
scp -i $KEY ~/IdeaProjects/reiseweb/reiseweb-rest/target/reiseweb-rest-0.0.1-SNAPSHOT.jar $SERVER:~/

echo "=== Deploying on server ==="
ssh -i $KEY $SERVER "sudo cp -r ~/frontend-update/* /usr/share/nginx/html/browser/ && sudo systemctl restart reiseweb && sudo systemctl restart nginx"

echo "=== Done! App is live at http://3.122.228.19 ==="
