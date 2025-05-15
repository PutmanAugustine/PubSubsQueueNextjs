To start the project, start a Redis docker instance using this command:
```bash
docker run -d --name redis \
  -p 6379:6379 \
  redis:7-alpine
```

Then start the four sub-folders `frontend`, `primary-backend`, `worker` and `ws`, following the README file in each one to start it up.

My recommendation is to add to the database in `worker`, as a component of the processing function. It allows for the maximum amount of progress before failing out, if something goes wrong.

As for how to deploy, I don't really know. My inclination is to say as a monorepo, but that is only how I would do it, not strictly the most effective way.
