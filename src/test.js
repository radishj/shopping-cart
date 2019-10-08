console.log("hello!");

navigator.usb.getDevices().then(devices => {
    devices.map(device => {
      alert(device.productName);      // "Arduino Micro"
      console.log(device.manufacturerName); // "Arduino LLC"
    });
  })