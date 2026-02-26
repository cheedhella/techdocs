# Helm Charts - Complete Learning Guide

This comprehensive learning resource covers everything you need to know about Helm, the package manager for Kubernetes.

## 📚 Structure

The content is organized into 13 sections with 72+ individual pages covering all aspects of Helm:

### 1️⃣ Introduction to Helm (5 pages)
- What is Helm?
- Why Helm is Needed in Kubernetes
- Helm vs kubectl
- Helm Architecture
- Installing Helm

### 2️⃣ Helm Basics (6 pages)
- Understanding Helm Charts
- Chart Directory Structure
- Installing a Chart
- Listing and Managing Releases
- Upgrading and Rolling Back Releases
- Uninstalling Releases

### 3️⃣ Working with Helm Charts (6 pages)
- Creating Your First Chart
- Chart.yaml Explained
- values.yaml Explained
- templates/ Directory Overview
- Managing Dependencies
- Helm Linting

### 4️⃣ Helm Templating Fundamentals (7 pages)
- Go Template Basics
- Variables and Functions
- Control Structures (if, with, range)
- Built-in Objects (.Values, .Chart, .Release)
- Template Helpers (_helpers.tpl)
- Using include and define
- Named Templates

### 5️⃣ Values and Configuration Management (5 pages)
- Default Values
- Overriding Values via CLI
- Using Multiple values.yaml Files
- Environment-Specific Configurations
- Using --set vs --set-string

### 6️⃣ Advanced Templating (6 pages)
- Conditional Resource Creation
- Loops and Iteration
- Dynamic Naming
- Template Pipelines
- Template Functions
- Required and Fail Functions

### 7️⃣ Chart Dependencies (5 pages)
- Subcharts
- requirements.yaml (Helm v2)
- dependencies in Chart.yaml (Helm v3)
- Updating Dependencies
- Using Condition and Tags

### 8️⃣ Packaging and Sharing Charts (5 pages)
- Packaging a Chart
- Creating a Helm Repository
- Publishing Charts
- Using Public Repositories
- OCI Registry Support

### 9️⃣ Helm Hooks (5 pages)
- What are Hooks?
- Pre-install and Post-install Hooks
- Pre-upgrade and Post-upgrade Hooks
- Hook Deletion Policies
- Hook Weights

### 🔟 Testing and Debugging (6 pages)
- helm template
- helm install --dry-run
- helm get
- helm history
- helm test
- Troubleshooting Common Errors

### 1️⃣1️⃣ Security and Best Practices (6 pages)
- RBAC Considerations
- Secrets Management
- Chart Versioning (SemVer)
- Avoiding Hardcoded Values
- Naming Conventions
- Production Best Practices

### 1️⃣2️⃣ Helm in CI/CD (5 pages)
- Using Helm in Pipelines
- GitOps with Helm
- Helm + ArgoCD
- Helm + Flux
- Version Promotion Strategies

### 1️⃣3️⃣ Advanced Production Topics (5 pages)
- Helm Plugins
- Writing Custom Plugins
- Helm SDK
- Helmfile Overview
- Multi-Cluster Management

## 🚀 Getting Started

Start with the [home page](./home.html) which provides a complete table of contents with links to all topics.

## 📖 Learning Path

**Beginners:** Start with sections 1-3 to understand Helm basics.

**Intermediate:** Move to sections 4-7 for templating and chart development.

**Advanced:** Explore sections 8-13 for production deployments and advanced topics.

## 🎯 Features

- **Comprehensive Coverage:** 72+ pages covering all Helm concepts
- **Practical Examples:** Real-world code examples in every section
- **Best Practices:** Industry-standard patterns and recommendations
- **Progressive Learning:** Organized from basics to advanced topics
- **Quick Reference:** Easy navigation with clear section organization

## 📝 Template Structure

Each page follows a consistent format:
- Overview and key concepts
- Detailed explanations with examples
- Code snippets and practical demonstrations
- Best practices and common pitfalls
- Troubleshooting tips

## 🔗 Resources

- Official Helm Documentation: https://helm.sh/docs/
- Helm GitHub: https://github.com/helm/helm
- Artifact Hub: https://artifacthub.io
- Helm Community: https://helm.sh/community/

---

**Created:** February 2026  
**Version:** 1.0.0  
**Total Pages:** 73 (1 home + 72 content pages)
