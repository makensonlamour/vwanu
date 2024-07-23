.PHONY: check-docker install-docker start-docker up detect-os

# Check if Docker is installed
check-docker:
	@which docker > /dev/null || make install-docker

# Install Docker based on the detected OS
install-docker: detect-os
	@echo "Installing Docker for $(OS)..."
	@if [ "$(OS)" = "Linux" ]; then \
		sudo apt-get update && sudo apt-get install -y docker-ce docker-ce-cli containerd.io; \
	elif [ "$(OS)" = "Darwin" ]; then \
		/bin/bash -c "$$(curl -fsSL https://get.docker.com)"; \
	elif [ "$(OS)" = "Windows" ]; then \
		echo "Please install Docker Desktop manually from https://www.docker.com/products/docker-desktop"; \
	else \
		echo "Unsupported OS"; \
	fi

# Ensure Docker daemon is running
start-docker: detect-os
	@echo "Ensuring Docker daemon is running for $(OS)..."
	@if [ "$(OS)" = "Linux" ]; then \
		sudo systemctl start docker; \
	elif [ "$(OS)" = "Darwin" ]; then \
		open /Applications/Docker.app; \
	elif [ "$(OS)" = "Windows" ]; then \
		echo "Please ensure Docker Desktop is running"; \
	else \
		echo "Unsupported OS"; \
	fi

# Detect the operating system
detect-os:
	$(eval OS := $(shell uname -s))


# Check if tmux is installed
check-tmux:
	@which tmux > /dev/null || make install-tmux

# Install tmux (Linux and macOS)
install-tmux: detect-os
	@echo "Installing tmux..."
	@if [ "$(OS)" = "Linux" ]; then \
		sudo apt-get update && sudo apt-get install -y tmux; \
	elif [ "$(OS)" = "Darwin" ]; then \
		brew install tmux; \
	else \
		echo "tmux installation is not supported on this OS"; \
	fi

# Project startup command with optional argument for running the frontend
# To start both Docker Compose and the frontend React application in new tmux sessions, use:
# make up FRONTEND=yes
# To attach to a tmux session, use:
# tmux attach-session -t [session-name]
# For example, tmux attach-session -t docker-compose or tmux attach-session -t react-frontend
# To detach from a tmux session and leave it running in the background, press Ctrl+B and then D .
dev: check-docker start-docker check-tmux
	echo "Setting up dev environment on the machine" 
	npm ci --ignore-scripts
	npm run server-install
	echo "Server modules downloaded" 
	@if [ "$(FRONTEND)" = "yes" ]; then \
		echo "Starting both Docker Compose and Frontend React Application in new tmux sessions..."; \
		tmux new-session -d -s docker-compose 'docker-compose -f docker-compose.dev.yml up'; \
		tmux new-session -d -s react-frontend 'cd client && npm start'; \
		echo "Started Docker Compose in tmux session 'docker-compose'"; \
		echo "Started frontend in tmux session 'react-frontend'"; \
	else \
		docker-compose -f docker-compose.dev.yml up --build; \
	fi
production: check-docker start-docker
	docker-compose -f docker-compose.yml up --build; 
	