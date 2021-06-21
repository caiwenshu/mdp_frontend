npm run build:prod
cd /Users/caiwenshu/Documents/workspace/webstorm_workspace/mdp_frontend/mdp/
zip -q -r mdp.zip *
scp -i "/Users/caiwenshu/Documents/aws/KEY_AWS.pem" mdp.zip root@161.189.61.28:/root/mdp/mdp/
ssh -i "/Users/caiwenshu/Documents/aws/KEY_AWS.pem" root@161.189.61.28 'unzip -o /root/mdp/mdp/mdp.zip -d /root/mdp/mdp/'
