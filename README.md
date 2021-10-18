# CommandService Avatar App Net Diatom www.aichatforest.com

Sample implementation for JavaScript (Web) of the CommandService for multiple participants to move avatars across the screen.

## Getting Started

We used the dolby.io api with our own `CUSTOMER_KEY` and `CUSTOMER_SECRET` inside `client.js` with our own key and secret.
To run the app just visit www.aichatforest.com in your browser. 

## What's Inside Our package

### 📁 icons/

- svg files for button icons and dolbyio logo with the aichatforest.com logo

### 📁 scripts/

- 📄 **client.js**
  - Recieves and handles events emitted by the Conference and Command objects
  - Initializes VoxeetSDK using customer key and secret
  - Opens a Voxeet session
- 📄 **ui.js**
  - handles joining conference, leaving conference, starting video, stopping video
  - UI helper functions
- 📄 **utils.js**
  - sends CommandService object when avatar moves
  - handles movement of avatar
  - handles updating conference name in URL as user types conference name
- 📄 **video.js**
  - tracks which participant is in which video container
  - handles appending and removing video nodes on the DOM as participants join/leave conference and turns video on/off

### 📄 index.css

- styling
- additional formatting done with Bootstrap

### 📄 index.html

- main entry file

Net Diatom
www.netdiatom.org
See the chat forrest in action at 
www.aichatforrest.com
