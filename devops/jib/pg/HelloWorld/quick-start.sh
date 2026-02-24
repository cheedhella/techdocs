#!/bin/bash

# Quick Start Script for Spring Boot Jib Demo
# This script helps you quickly build and run the application

set -e

echo "================================================"
echo "Spring Boot Hello World with Jib - Quick Start"
echo "================================================"
echo ""

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install Maven first."
    exit 1
fi

# Check if Docker is installed (optional)
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed. You can still run locally with Maven."
    DOCKER_AVAILABLE=false
else
    DOCKER_AVAILABLE=true
fi

echo "What would you like to do?"
echo ""
echo "1. Build and run locally (Maven)"
echo "2. Build Docker image with Jib (requires Docker)"
echo "3. Build and run with Docker"
echo "4. Run tests"
echo "5. Clean project"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "🔨 Building the application..."
        mvn clean package -DskipTests
        echo ""
        echo "✅ Build complete!"
        echo ""
        echo "🚀 Starting the application..."
        echo "   Access the application at: http://localhost:8080"
        echo "   Press Ctrl+C to stop"
        echo ""
        mvn spring-boot:run
        ;;
    2)
        if [ "$DOCKER_AVAILABLE" = false ]; then
            echo "❌ Docker is not available. Please install Docker first."
            exit 1
        fi
        echo ""
        echo "🔨 Building Docker image with Jib..."
        mvn compile jib:dockerBuild
        echo ""
        echo "✅ Docker image built successfully!"
        echo ""
        echo "📦 Image: spring-boot-jib-demo:1.0-SNAPSHOT"
        echo ""
        echo "To run the container, use:"
        echo "  docker run -p 8080:8080 spring-boot-jib-demo:1.0-SNAPSHOT"
        ;;
    3)
        if [ "$DOCKER_AVAILABLE" = false ]; then
            echo "❌ Docker is not available. Please install Docker first."
            exit 1
        fi
        echo ""
        echo "🔨 Building Docker image with Jib..."
        mvn compile jib:dockerBuild
        echo ""
        echo "✅ Docker image built successfully!"
        echo ""
        echo "🚀 Starting container..."
        docker run -p 8080:8080 --name spring-boot-app spring-boot-jib-demo:1.0-SNAPSHOT
        ;;
    4)
        echo ""
        echo "🧪 Running tests..."
        mvn test
        echo ""
        echo "✅ Tests complete!"
        ;;
    5)
        echo ""
        echo "🧹 Cleaning project..."
        mvn clean
        echo ""
        echo "✅ Project cleaned!"
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "================================================"
echo "Available endpoints:"
echo "  - http://localhost:8080/api/hello"
echo "  - http://localhost:8080/api/hello/YourName"
echo "  - http://localhost:8080/api/health"
echo "  - http://localhost:8080/actuator/health"
echo "================================================"
