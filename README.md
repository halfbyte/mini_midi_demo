# Web MIDI demos

Written for the JSUnconf.eu 2015 presentation "Making Noise with Web Audio and Web MIDI"

&copy; Jan 'half/byte' Krutisch

All examples should work from local disk, so to run them, simply clone the Repo and open examples in your Browser.

## Browser Compatibility

The Web MIDI API is still pretty much a moving target so currently this only works in Chrome Canary (at least out of the box). As this was written in a hurry, I didn't try to make this running using [Chris' Web MIDI shim](https://github.com/cwilso/WebMIDIAPIShim).

## The Examples in Detail

### [minimal.html](minimal.html)

A minimal example on how to initialize the API and send and receive MIDI events.

### [monitor.html](monitor.html)

Open up the console and monitor incoming midi data. Good for debugging.

### [input.html](input.html)

A demo to drive the Web Audio API with MIDI

### [output.html](output.html)

A simple sequencer that drives any connected synthesizer.

### [canvas.html](canvas.html)

An example of driving some simple canvas drawing by MIDI commands. You probably need to adapt the MIDI controller numbers.
