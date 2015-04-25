function getMessage (msg) {
    console.log("message", msg.data);
}

navigator.requestMIDIAccess().then(
  function(midiAccess) {
    console.log(midiAccess.inputs, midiAccess.outputs)
    midiAccess.inputs.forEach(function(input, id) {
      input.addEventListener('midimessage', getMessage);
      input.open();
    });

    midiAccess.outputs.forEach(function(output, id) {
      document.getElementById('send-message').addEventListener( 'click', function(e) {
        output.send([144,48,127]) // noteOn, channel 1, note 48, full velocity
        output.send([128,48,0], window.performance.now() + 1000.0) // noteOff, note 48!
      });
    });

  },
  function(error) {
    console.log("MIDI init went wrong", error);
  }
);
