### To create jwt related keys

- ssh-keygen -t rsa -b 4096 -m PEM -f <file-name>.key
- openssl rsa -in jwtRS256.key -pubout -outform PEM -out <file-name>.key.pub
