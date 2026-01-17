#!/bin/bash

# Stop and remove existing container
docker stop super-tic-tac-toe-socket 2>/dev/null || true
docker rm super-tic-tac-toe-socket 2>/dev/null || true

# Remove old images to save space
docker image prune -af

# Pull the latest image
docker pull ammarcodeable/super-tic-tac-toe_socket:latest

# Run the container
docker run -d \
  --name super-tic-tac-toe-socket \
  --restart unless-stopped \
  -p 443:443 \
  -e NODE_ENV=development \
  -e PORT=443 \
  ammarcodeable/super-tic-tac-toe_socket:latest

# Show container status
docker ps | grep super-tic-tac-toe-socket

# Show recent logs
echo "Recent logs:"
docker logs --tail 50 super-tic-tac-toe-socket
