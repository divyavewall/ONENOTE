# ONENOTE - Real-time Drawing Board with Dark Mode

This project is a collaborative drawing application that supports real-time drawing synchronization across multiple clients and includes a dark mode feature. Users can draw on a shared canvas, use different tools (pencil, eraser), add sticky notes, upload images, and toggle between light and dark modes.

## DEMO


https://github.com/divyavewall/ONENOTE/assets/132549573/685333a8-3bc2-42f9-b577-1db5ed374cae


## Features

- **Real-time Drawing**: Multiple users can draw on the canvas simultaneously.
- **Dark Mode**: Toggle between light and dark themes.
- **Tools**: Includes pencil and eraser with adjustable sizes.
- **Sticky Notes**: Create sticky notes and upload images to the canvas.
- **Undo/Redo**: Supports undo and redo functionality.
- **Responsive Design**: Canvas adjusts to the window size.

## Setup

### Prerequisites

- Node.js (v12 or later)
- npm (Node package manager)

### Installation

1. **Clone the repository:**

   ```sh
   https://github.com/divyavewall/ONENOTE.git

2. **Install Dependencies:**
   ```sh
   npm install


3. **Start the server:**
   ```sh
   nodemon app.js


4. **Open your browser and navigate to:**
   ```sh
   http://localhost:5000


## Usage

### Drawing
1. **Pencil Tool:** Click the pencil icon to start drawing. Adjust the pencil size from the tool container.

2. **Eraser Tool:** Click the eraser icon to erase. Adjust the eraser size from the tool container.

3. **Sticky Notes:** Click the sticky note icon to add a new sticky note. You can move and minimize it.

4. **Upload Images:** Click the upload icon to upload an image to the canvas.

### Dark Mode
Toggle dark mode by clicking the sun/moon icon. The eraser color will automatically adjust to ensure visibility against the current background.

### Undo/Redo
Use the undo and redo buttons to revert or reapply changes on the canvas.

## Code Structure
- **app.js:** Server-side code that handles socket connections and broadcasts events to all clients.

- **frontend/index.html:** The main HTML file that includes the canvas and tool buttons.

- **frontend/styles.css:** Contains the styles for the application.

- **frontend/tools.js:** Manages tool interactions, including dark mode and sticky notes.

- **frontend/canvas.js:** Handles canvas drawing and synchronizes drawing events with the server.

## Socket Events

- **beginPath:** Initiates a new path when a user starts drawing.

- **drawStroke:** Broadcasts the stroke data to all clients.

- **redoUndo:** Handles undo and redo actions.

## Acknowledgements

- Socket.io for real time Communication
- Express for the server framework


