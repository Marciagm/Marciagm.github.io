** To actually be able to display anything with three.js, we need three things: A scene, a camera, and a render so we can render the scene with the camera **

## Questions
* How many types of cameras in three.js?
* How many renders in three.js?
* geometry and material construc the cube by mesh
* why use requestAnimationFrame but not setInterval?
The most important one is that it pauses when the user navigates to another browser tab, hence not wasting their precious processing power and battery life.
* PerspectiveCamera：远景相机，类似于人眼观察的方式
* field of view:视角（根据观察越大物体越小，可以理解为距离？？）
* aspect ration: alomost always element.width/element.height
说明一下：
* near clipping plane: 
* far clipping plane:
* view frustum: 视椎体（能够看到的立体图形压扁到视觉范围内的平面区域）
* 