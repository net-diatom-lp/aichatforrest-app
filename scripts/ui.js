const initUI = () => {
  const joinButton = document.getElementById('join-btn');
  const conferenceNameInput = document.getElementById('alias-input');
  const conferenceNameInputPrompt = document.getElementById('btnGroupAddon');
  const leaveButton = document.getElementById('leave-btn');
  const startVideoBtn = document.getElementById('start-video-btn');
  const stopVideoBtn = document.getElementById('stop-video-btn');
  const cameraPrompt = document.getElementById('camera-msg');
  const cameraIconContainer = document.getElementById('camera-icon-container');
  const copyJoinLink = document.getElementById('copy-join-link');
  const copyJoinLinkMsg = document.getElementById('copy-join-link-msg');

  // handle conference name if present in url
  let conferenceUrl = getConferenceNameFromURL();
  setConferenceName(
    conferenceUrl,
    conferenceNameInput,
    conferenceNameInputPrompt
  );

  // as user types conference name, append alias to url as query string param
  conferenceNameInput.addEventListener('keyup', function (event) {
    updateConferenceName(event);
  });

  joinButton.onclick = () => {
    let conferenceName = getConferenceNameFromURL()
      ? getConferenceNameFromURL()
      : conferenceNameInput.value;

    // On join button click,
    // 1. Create a conference room with an alias
    // 2. Join the conference with its id
    // 3. Set the UI

    // when participant joins conference, event streamAdded is emmited to other participants
    VoxeetSDK.conference
      .create({ alias: conferenceName, params: { dolbyVoice: true } })
      .then((conference) =>
        VoxeetSDK.conference.join(conference, {
          constraints: { audio: true, video: false },
        })
      )
      .then(() => {
        handleControlBtnsOnJoinCall();
      })
      .catch((e) => console.log('Something wrong happened : ' + e));
  };

  leaveButton.onclick = () => {
    VoxeetSDK.conference
      .leave()
      .then(() => {
        handleControlBtnsOnLeaveCall();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  startVideoBtn.onclick = () => {
    VoxeetSDK.conference.startVideo(VoxeetSDK.session.participant).then(() => {
      stopVideoBtn.style.display = 'none';
      startVideoBtn.style.display = 'block';
      cameraPrompt.innerText = 'Camera On';
    });
  };

  stopVideoBtn.onclick = () => {
    VoxeetSDK.conference.stopVideo(VoxeetSDK.session.participant).then(() => {
      cameraPrompt.innerText = 'Camera Off';
    });
  };

  cameraIconContainer.onmouseenter = () => {
    handleVideoBtnMouseEnter();
  };

  cameraIconContainer.onmouseleave = () => {
    handleVideoBtnMouseLeave();
  };

  copyJoinLink.onclick = () => {
    handleCopyJoinLink();
  };

  // UI HELPERS /////////////////////////

  const handleCopyJoinLink = () => {
    let conferenceUrl = window.location.href;
    navigator.clipboard.writeText(conferenceUrl).then(
      function () {
        console.log('Copying to clipboard was successful!');
      },
      function (err) {
        console.error('Could not copy text: ', err);
      }
    );
    copyJoinLinkMsg.innerText = 'Copied!';
    setTimeout(function () {
      copyJoinLinkMsg.innerText = 'Copy Conference URL';
    }, 3000);
  };

  const handleControlBtnsOnJoinCall = () => {
    cameraIconContainer.style.opacity = 1.0;
    cameraIconContainer.style.pointerEvents = 'all';
    joinButton.style.display = 'none';
    leaveButton.style.display = 'block';
  };

  const handleControlBtnsOnLeaveCall = () => {
    joinButton.style.display = 'block';
    leaveButton.style.display = 'none';
    cameraIconContainer.style.opacity = 0.5;
    cameraIconContainer.style.pointerEvents = 'none';
    if (cameraPrompt.innerText === 'Camera On') {
      cameraPrompt.innerText = 'Camera Off';
    }
    if (startVideoBtn.style.display === 'block') {
      stopVideoBtn.style.display = 'block';
      startVideoBtn.style.display = 'none';
    }
  };

  const handleVideoBtnMouseEnter = () => {
    if (cameraPrompt.innerText === 'Camera On') {
      cameraPrompt.innerText = 'Turn Camera Off';
      stopVideoBtn.style.display = 'block';
      startVideoBtn.style.display = 'none';
    } else if (cameraPrompt.innerText === 'Camera Off') {
      cameraPrompt.innerText = 'Turn Camera On';
      stopVideoBtn.style.display = 'none';
      startVideoBtn.style.display = 'block';
    } else if (cameraPrompt.innerText == 'Turn Camera On') {
      cameraPrompt.innerText = 'Turn Camera Off';
      stopVideoBtn.style.display = 'block';
      startVideoBtn.style.display = 'none';
    }
  };

  const handleVideoBtnMouseLeave = () => {
    if (cameraPrompt.innerText === 'Camera On') {
      cameraPrompt.innerText = 'Camera On';
      stopVideoBtn.style.display = 'none';
      startVideoBtn.style.display = 'block';
    } else if (cameraPrompt.innerText === 'Camera Off') {
      cameraPrompt.innerText = 'Camera Off';
      stopVideoBtn.style.display = 'block';
      startVideoBtn.style.display = 'none';
    } else if (cameraPrompt.innerText === 'Turn Camera Off') {
      cameraPrompt.innerText = 'Camera On';
      stopVideoBtn.style.display = 'none';
      startVideoBtn.style.display = 'block';
    } else if (cameraPrompt.innerText === 'Turn Camera On') {
      cameraPrompt.innerText = 'Camera Off';
      stopVideoBtn.style.display = 'block';
      startVideoBtn.style.display = 'none';
    }
  };
};
