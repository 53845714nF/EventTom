# Terraform


## Set Env Vars 

For bash:
```bash
export AWS_ACCESS_KEY_ID=""
export AWS_SECRET_ACCESS_KEY=""
export AWS_SESSION_TOKEN=""
```

For fish: 
```bash
set -x AWS_ACCESS_KEY_ID {Token}
set -x AWS_SECRET_ACCESS_KEY {Token}
set -x AWS_SESSION_TOKEN {Token}
```



```bash 
terraform plan -target=network.tf
```
