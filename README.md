<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h3 align="center">Three.js App</h3>

  <p align="center">
    Three.js test app using angular and node.js
    <br />
    <br />
    <a href="https://github.com/nkopak/ThreeJS-App/issues">Report Bug</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Three.js allows the creation of graphical processing unit (GPU)-accelerated 3D animations using the JavaScript language as part of a website without relying on proprietary browser plugins. 
This is possible due to the advent of WebGL.

High-level libraries such as Three.js or GLGE, SceneJS, PhiloGL, or a number of other libraries make it possible to author complex 3D computer animations that display in the browser without the effort required for a traditional standalone application or a plugin.

This project is a three.js app created with angular and node.js where user can naviagate through an abstract scene using keyboard keys. 
Each user gets unique id for their scenes. This id is stored in local storage. 
When users leave app, their last position is saved to the database with coordinates and unique id. 
When they will come back to the app again, their last position will restored.
### Built With

* [Angular](https://angular.io)
* [Node.js](https://nodejs.org)
* [Three.js](https://threejs.org)



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nkopak/ThreeJS-App.git
   ```
2. Install NPM packages
   ```sh
   cd backend
   npm build
   npm start
   ```


<!-- USAGE EXAMPLES -->
## Usage

User start navigating from starting position. Using keyboard arrow and WASD keys users can change their position in the scene.
<br />
W - move forward
<br />
S - move back
<br />
D - move right
<br />
A - move left
<br />
<br />
UP arrow key - rotate camera angle upwards
<br />
DOWN arrow key - rotate camera angle downwards
<br />
LEFT arrow key - rotate camera angle left
<br />
RIGHT arrow key - rotate camera angle right

When users leave app, their last position is saved to the database. When users will come back to the app again, their last position will be restored.


<!-- ROADMAP -->
## Roadmap

See the [open issues](href="https://github.com/nkopak/ThreeJS-App/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See <a href="https://opensource.org/licenses/MIT">`LICENSE`</a> for more information.


<!-- CONTACT -->
## Contact

Project Link: [https://github.com/nkopak/ThreeJS-App](https://github.com/nkopak/ThreeJS-App)
