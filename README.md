# P2P Connect Experiment

Using QR codes to share signalling data between two devices a WebRTC connection is established.

1. Open up https://aquigorka.com/webrtc-qr/ in a desktop browser and in a mobile browser.
1. In either browser choose `Host` and in the other one `Join`
1. The browser that _hosts_ will show a series of QR codes (the data for the `signalling offer` plus some metadata to read it on the other device)
1. When the _guest device_ (the one that joined) shows a series of QR codes it means it has read the `offer` and it is showing the `signalling answer`. Point the qr codes towards the _host_ device so that it can read the qr codes.
1. When the connection is established a chime will ring (not in Mobile Safari though) and the devices will be connected.

For the time being a semi-transparent video is shown to help point the QR codes towards the center of the _scanning_ device - this needs improvement.


## Dev

```sh
npm i
npm start
```

## Build

```sh
npm build
```
