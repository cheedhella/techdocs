#!/bin/bash
set -e

# ── 1. Install Docker ──
dnf install -y dnf-utils
dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
dnf install -y docker-ce docker-ce-cli containerd.io
systemctl enable --now docker
docker --version

# ── 2. Install kubectl ──
curl -LO "https://dl.k8s.io/release/$(curl -Ls https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
mv kubectl /usr/local/bin/
kubectl version --client

# ── 3. Install kind (Kubernetes in Docker — single node cluster) ──
curl -Lo /usr/local/bin/kind https://kind.sigs.k8s.io/dl/v0.24.0/kind-linux-amd64
chmod +x /usr/local/bin/kind
kind version

# ── 4. Create a 1-node cluster ──
kind create cluster --name demo --wait 60s
kubectl cluster-info
kubectl get nodes

# ── 5. Install Helm ──
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
helm version

# ── 6. Verify Helm-to-cluster connectivity ──
helm list

# ── 7. Add a repo and install a simple chart ──
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm install my-nginx bitnami/nginx --namespace default --wait

# ── 8. Verify everything ──
echo "=== Helm Releases ==="
helm list

echo "=== Pods ==="
kubectl get pods

echo "=== Services ==="
kubectl get svc
