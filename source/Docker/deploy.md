# Step by Step in detail: Deploy in NUC

Finally we can deploy our code to the robot!

## 1. install ubuntu in NUC

## 2. install docker, docker-compose, ssh

```bash
sudo apt-get install docker.io
sudo apt-get install docker-compose
sudo apt-get install openssh-server
```

## 3. Use Docker Without sudo

otherwise vscode docker extension will not work

```bash
# Step 1: Create/Make a Docker Group
sudo groupadd docker
#   groupadd: group 'docker' already exists

# Step 2: Add your user to the docker group.
sudo usermod -aG docker $USER
# The “usermod” command modifies an account of user on the system.
# The “-aG docker” option adds the new user to the Docker group. The “-a” flag determines that the user should be added to the group, the “-G” flag specifies the group to which user should be added.
# The “docker” is the group name.
# “$USER” is a variable for the current user’s username.

# Step 3: Log out and log back in so that your group membership is re-evaluated.
newgrp docker

# Step 4: Verify that you can run docker commands without sudo.
docker run hello-world
```

## 4. connect to NUC with ssh

    I prefer the wireless way.

    - turn on your personal hotspot on your computer.

    - connect to the hotspot with NUC
        
        in nuc, connect to the hotspot via cmd line

        ```bash
        nmcli device wifi connect <your_hotspot_name> password <your_hotspot_password>
        ```
        or use GUI if you are a green hand or you really do not care about the cost of GUI.

    - find the ip address of NUC

        in nuc, run

        ```bash
        ifconfig
        ```

    - connect your computer to NUC with ssh

        in your computer, Open VsCode and click remote Explorer, then click the plus button

        then just follow the instructions.

        ```bash
        ssh <username>@<ip_address>
        ```

        for example

        ```bash
        ssh sentry@192.168.137.235
        ```

        then you can see the NUC in your remote explorer. Connect to it.

## 5. pull your docker image from docker hub

    follow the instruction in coding "制品仓库"

    ```bash
    docker pull <your_image_name>
    ```

    install docker extension in the remote vscode

    finnally you can see your image in the image list

## 6. run the image

    ```bash
    export DISPLAY=<your hotspot ip>:0.0
    sudo xhost + && sudo docker run -it --network=host --privileged -v /dev:/dev DISPLAY=${DISPLAY} sentry:v0.0
    ```

    - --network=host: use host network, livox lidar trasfer data via UDP, and I am tired of forwarding ports. Do not care about security!

    - --privileged: use host devices, such as USB, GPU(Though we do not have one 🙃), etc.

    - -e: set environment variables, DISPLAY is used for GUI visualization # TODO:

    - -v: mount host devices, so that it support hot plug

## 7. connect to docker run in NUC

    open docker extension in remote vscode, you can see the container list, attach a vscode window to the container.

    DONE!

## 8. [OPTIONAL] test GUI forwarding

    in your computer, open XLaunch, and follow the instruction.

    in NUC, run

    ```bash
    echo "export DISPLAY=<your_computer_ip>:0.0" >> ~/.bashrc
    ```

    then restart the container(in NUC)

    ```bash 
    docker restart <container_name>
    # or use vscode docker extension to do this
    ```

    in docker container, run

    ```bash
    rviz2
    ```
    if you can see the rviz2 window in your computer, then it works!`

    if not working, in docker container, try to run

    ```bash
    code /etc/ssh/sshd_config
    ```

    add the following lines to the end of the file

    ```
    Port 22

    PermitRootLogin yes

    ChallengeResponseAuthentication no

    UsePAM yes

    X11Forwarding yes

    X11UseLocalhost no
    ```

    then restart ssh service

    ```bash
    sudo service ssh restart
    # or 
    /etc/init.d/ssh restart
    ```
    then try rviz again.

    Hope that the next time when you are writing a dockerfile, add lines above to the end of the file so that people who use your docker image do not need to do this again.

