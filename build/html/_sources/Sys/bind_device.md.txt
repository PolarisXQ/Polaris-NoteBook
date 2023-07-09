# Bind a USB device under a static name

1. find the kernel name of the USB device you want to bind
```bash
ls /dev/
```

2. Find information on the connected USB
```bash
udevadm info --name=/dev/ttyUSB0 --attribute-walk

# ——————————————————- 
# … 
# ATTRS{devnum}==”x” 
# ATTRS{devpath}==”y” 
# ATTRS{idProduct}==”zzzz” 
# ATTRS{idVendor}==”wwww” 
# ATTRS{ltm_capable}==”no”
# … 
# ——————————————————-
```

3. Edit or create a file related to the kernel information
```bash
cd /etc/udev/rules.d
sudo gedit 99-usb-serial.rules
```
```
SUBSYSTEM==”tty”, ATTRS{idVendor}==”wwww”, ATTRS{idProduct}==”zzzz”, SYMLINK+=”device_name”
```
4. Load a new rule and verify the change
```bash
sudo udevadm trigger
```
then check if the static name setting is done properly
```bash
ls -l /dev/device_name
```