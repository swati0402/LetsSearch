# LetsSearch
docker build -t swatiojha/nodeapp1:nodeapp .
docker run -p 3000:3000 -d swatiojha/nodeapp1:nodeapp
docker push swatiojha/nodeapp1:nodeapp

kubectl create -f deploy.yaml
kubectl expose deployment node-app-deployment
kubectl get svc