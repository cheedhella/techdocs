.PHONY: all proto tidy run build clean

# The directory where protoc will place the generated Go files.
# This is derived by stripping the module path (from go.mod) from the go_package option in the .proto file.
PROTO_OUT_DIR := usr

all: build

proto: clean
	@echo "--> Generating Protobuf Go code..."
	@protoc --go_out=. --go_opt=module=example.com/myapp user.proto

tidy: check-gomod
	@echo "--> Tidying Go modules..."
	@go mod tidy

check-gomod:
	@if [ ! -f "go.mod" ]; then \
		echo "Makefile error: go.mod not found."; \
		echo "Please run 'make' from the project root directory containing go.mod."; \
		exit 1; \
	fi

run: run-writer

run-writer: proto tidy
	@echo "--> Running writer application..."
	@go run writer.go

run-reader:
	@echo "--> Running reader application..."
	@go run reader.go

build: proto tidy
	@go build -o writer_app .

clean:
	@echo "--> Cleaning up generated files and artifacts..."
	# The 'example.com' is removed to clean up the old, incorrectly generated directory.
	@rm -rf $(PROTO_OUT_DIR) user.bin writer_app example.com
