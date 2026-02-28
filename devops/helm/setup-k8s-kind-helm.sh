#!/bin/bash
set -e

echo "===== Updating system ====="
sudo dnf update -y

echo "===== Installing required packages ====="
sudo dnf install -y yum-utils curl wget git

echo "===== Installing Docker ====="
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo dnf install -y docker-ce docker-ce-cli containerd.io

sudo systemctl enable docker
sudo systemctl start docker

# Allow current user to use docker without sudo
sudo usermod -aG docker $USER

echo "===== Installing kubectl ====="
KUBECTL_VERSION=$(curl -L -s https://dl.k8s.io/release/stable.txt)
curl -LO https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

echo "===== Installing Kind (Kubernetes in Docker) ====="
curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
chmod +x kind
sudo mv kind /usr/local/bin/kind

echo "===== Creating 1-node Kubernetes cluster ====="
kind create cluster --name rocky-cluster

echo "===== Installing Helm ====="
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

echo "===== Verifying installation ====="
kubectl cluster-info
kubectl get nodes
helm version

echo "===== DONE ====="
echo "You may need to log out and log back in for docker group changes to take effect."
