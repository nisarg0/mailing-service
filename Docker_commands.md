#Few IMP docker commands

How to make docker image
--> docker build -t hello-docker .

Images.contianers?
--> docker image ls
--> docker container ls

RUn?
--> docker run hello-docker
--> docker run -it ubunutu (For running iterative)
--> docker run -p 8080:8080 mailing-server (To expose port)

1st 8080 tells what port will be opened
2nd 8080 tells the port on which the application is running

Running Containers list?
docker ps
-a for all containers

Creating a container:
-->docker run -d -t --name "MyContainerName" (-d detachable -t terminal)

Docker commit command:
docker commit 12345 newImgName (12345 - containre id)

// This creates a new image

docker login
id
pass

docker push newImgName

---

-   docker build -t nisarg0/email-service .
-   docker push nisarg0/mailService

---

Ubuntu

check if docker is running?
--> sudo systemctl status docker

To enable
--> sudo systemctl enable --now docker
