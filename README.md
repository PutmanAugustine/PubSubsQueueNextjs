To start the project, start a Redis docker instance using this command:
```bash
docker run -d --name redis \
  -p 6379:6379 \
  redis:7-alpine```

Then start the four sub-folders `frontend`, `primary-backend`, `worker` and `ws`, following the README file in each one to start it up.
