let randomName = 'Guest-' + Math.floor(Math.random() * 200);

// streamAdded event is emitted to other participants when a participant joins
VoxeetSDK.conference.on('streamAdded', (participant, stream) => {
  if (stream.getVideoTracks().length) {
    // Only add the video node if there is a video track
    addVideoNode(participant, stream);
  }
});

VoxeetSDK.conference.on('streamUpdated', (participant, stream) => {
  if (stream.getVideoTracks().length) {
    // Only add the video node if there is a video track
    addVideoNode(participant, stream);
  }
});

VoxeetSDK.conference.on('streamRemoved', (participant, stream) => {
  removeVideoNode(participant);
});

// Once the event 'received' has been dispatched by the command object,
// Update the position of the avatar belonging to the participant that sent the message
VoxeetSDK.command.on('received', (participant, message) => {
  let dataParsed = JSON.parse(message);
  if (
    dataParsed &&
    dataParsed.verticalPosition &&
    dataParsed.horizontalPosition
  ) {
    moveAvatarPosition(
      participant.id,
      dataParsed.verticalPosition,
      dataParsed.horizontalPosition
    );
  }
});

const main = async () => {
  VoxeetSDK.initialize('CUSTOMER_KEY', 'CUSTOMER_SECRET');

  try {
    // Open the session here
    await VoxeetSDK.session.open({ name: randomName });
    initUI();
  } catch (e) {
    alert('Something went wrong : ' + e);
  }
};

main();
