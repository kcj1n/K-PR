# KITECH-PR
The code performs the function of displaying videos and films in a virtual exhibition hall.
Only the JavaScript code has been uploaded, and you need to upload files to the image and video directories.

## Demo Figure1
https://github.com/user-attachments/assets/cc44cbb9-ade2-4676-ac98-7223960d5c7b

## Demo Figure2
https://github.com/user-attachments/assets/cc44cbb9-ade2-4676-ac98-7223960d5c7b

## Demo Figure3
https://github.com/user-attachments/assets/85287c2f-fce9-453c-994a-f911bf898b9c

We cannot upload files due to intellectual property issues related to the images and videos.
To run thie KITECH-PR, 

in src/pages/View.jsx

1. Add jpg image and edit to  
   const textures = useTexture([
    "./assets/kitech_history/01_1900_00.jpg"
.....
2. Add gltf and edit
   const gallery    = useGLTF(`./assets/modeles/vr_gallery/scene.gltf`); 
   ....
3. Add audio and edit 
   audioLoader.load(`./assets/sounds/ambiance.mp3`
   ....

in src/components/Video/VideoMp4.jsx   
4. Add  mp4 file and edit 
 to VideoText muted={!isClicked} url= "./assets/video/kitech_5min_640x360.mp4" 

Good Luck~~~
 
##--------------------------------------------------------------------------------
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
