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

## Set up App

```bash 
terraform apply -target=null_resource.frontend_build -target=aws_nat_gateway.aws_nat_gateway -target=aws_eip.nat_gateway_eip -target=aws_nat_gateway.backend -target=aws_route_table.public_route_table -target=aws_route_table_association.backend_route_table_association -auto-approve
terraform apply -auto-approve
```

Doppelte ausführen ist dem geschuldet das sich die Domain des ALBs immer ändert, dies wird zum Erstellen des Frontends gebraucht.
Das Frontend wird dann direkt in S3 hochladen.
Leider braucht Terraform die statischen Dateien (Webseite html, css, js), die dabei entstehen, schon in der Planungsphase.
In der Realität würde der ALB sicher nicht so oft auf- und abbauen.
Außerdem würde eine feste Domain auf den ALB gesetzt werden.
Des Weiteren wird das bauen und uploaden häufig separiert, vom Erstellen der Infrastruktur betrieben.
Es ist jedoch enttäuschend, dass ein Automatisierungs-Tool wie Terraform nicht in der Lage ist, die Dateien dynamisch zu erkennen.
