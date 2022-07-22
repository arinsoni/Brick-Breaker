h = ['./assets/images/arrow.png', './assets/images/paddle.png']

function displayImage(n) {

    // get a reference to the existing <img /> elements within
    // the node you refer to as 'l':
    var existingImage = main.getElementsByTagName('img');
 
    // if there are any <img> elements found:
    if (existingImage.length) {
 
        // we navigate to the parent-element of that first <img>
        // and replace that <img> element's src property:
        existingImage[0].src = h[n].imgUrl
     }
 }