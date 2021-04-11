# VM Deployment

1. Update variables in `auto-build-and-deploy.sh` if required. 
2. Copy `auto-build-and-deploy.sh` and `docker-compose.yaml` to the VM, remember to make `auto-build-and-deploy.sh` executable if need be.
3. Ensure the VM has docker/docker-compose installed.
4. Add the VMs ssh public key to the git repo for authentication (create a ssh key if need be).
5. Update variables in `auto-build-and-deploy.sh` if required.
6. Set `auto-build-and-deploy.sh` to run every x minutes/hours/days or at a specific time etc.
7. Done!

Changes to the code on master should eventually result in a docker image rebuild and update to show the latest changes.