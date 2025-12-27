# Quick Deploy Reference - Rocky Linux

## One-Command Deployment

```bash
sudo ./deployment/deploy-rocky-unified.sh
```

## Common Options

```bash
# Quick redeploy (skip build)
sudo ./deployment/deploy-rocky-unified.sh --skip-build

# Skip Kafka check
sudo ./deployment/deploy-rocky-unified.sh --skip-kafka

# Custom wait time
sudo ./deployment/deploy-rocky-unified.sh --wait 60

# Fastest (development)
sudo ./deployment/deploy-rocky-unified.sh --skip-build --skip-kafka --wait 30
```

## What It Does

1. ✅ Verifies Tomcat installation
2. ✅ Checks Kafka connectivity (optional)
3. ✅ Builds project (optional)
4. ✅ Stops Tomcat
5. ✅ Cleans old deployments
6. ✅ Deploys new WARs
7. ✅ Starts Tomcat
8. ✅ Waits for deployment
9. ✅ Tests endpoints
10. ✅ Shows results

## After Deployment

```bash
# Test endpoints
curl http://localhost:8080/spec-producer/status
curl http://localhost:8080/spec-consumer/status

# Start consumer
curl -X POST http://localhost:8080/spec-consumer/start

# Produce orders
curl -X POST http://localhost:8080/spec-producer/produce

# View logs
tail -f /opt/tomcat/logs/catalina.out
```

## Troubleshooting

```bash
# Check Tomcat status
systemctl status tomcat

# View logs
tail -100 /opt/tomcat/logs/catalina.out | grep -i error

# Restart Tomcat
sudo systemctl restart tomcat

# Fix Tomcat structure
sudo ./deployment/fix-tomcat-structure.sh
```

## Help

```bash
./deployment/deploy-rocky-unified.sh --help
```

See `DEPLOY_GUIDE.md` for detailed documentation.
