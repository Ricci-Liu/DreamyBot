let replicate_api_proxy = "https://splashy-rambunctious-leader.glitch.me/";
let pifuhd_api = "https://gpu.gohai.xyz:3001/";
let multiImg = [];
let imageNum = 5;
let currentImg = 0;

let age, gender, skinColor, hairColor, hairLength, bodyWeight, bodyHeight, clothes, addition;
let imgGenerationInProgress = false;
let btn1, btn2, btn3, btn4, btn5;
let obj;
let modelIsGenerating = false;
let width1 = 960;
let imagePicked;
let buttonShowed = false;

let showImageProgressBar = showModelProgressing = false;
let font;

let AppearanceInstruction = true;

function preload() {
    font = loadFont("Roboto-Light.ttf");
}

function setup() {
    let a = createCanvas(1800, 960, WEBGL);
    a.parent("chooseImage");

    btn1 = createButton(">>");
    btn1.size(70, 60);
    btn1.position(width1 - 100, height / 2);
    btn1.style("font-size", "50px");
    btn1.mouseClicked(nextImage);
    btn1.hide();

    btn2 = createButton("<<");
    btn2.size(70, 60);
    btn2.position(60, height / 2);
    btn2.style("font-size", "50px");
    btn2.hide();
    btn2.mouseClicked(previousImage);
    btn2.hide();

    btn3 = createButton("This is my DreamyBot, Preview 3D Model >>");
    btn3.size(500, 100);
    btn3.position(210, height - 140);
    btn3.style("font-size", "30px");
    btn3.mouseClicked(sendImage);
    btn3.hide();

    btn4 = createButton("OK");
    btn4.size(100, 60);
    btn4.position(850, height / 2);
    btn4.style("font-size", "30px");
    btn4.mouseClicked(hideAppearanceInstruction);

    btn5 = createButton("Good, preview personality >>");
    btn5.size(300, 100);
    btn5.position(1250, height - 150);
    btn5.style("font-size", "30px");
    btn5.mouseClicked(changeTop);
    btn5.hide();
}


function hideAppearanceInstruction() {
    AppearanceInstruction = false;
    btn4.hide();
}

function generateImg() {
    for (let i = 0; i < imageNum; i++) {
        let modelInput = {
            prompt:
                "one kid" + gender + age + ", (full body:1.5), wearings shoes,  (standing pose:1.5), facing front, " + skinColor + " , (dye " + hairColor + " hair:1.5)," + hairLength + "," + clothes + ", " + bodyWeight + "," + bodyHeight + "," + addition + "(RAW photo, best quality),clean background,captured with Fujifilm X-T3 for vibrant color reproduction, high resolution for fine details.",
            scheduler: "K_EULER",
            width: 640,
            height: 960,
            negative_prompt:
                "oldface, multiple persons, bad, immature, cartoon, anime, 3d, painting, b&w, low quality, watermark, photo, frame,ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, extra limbs, disfigured, deformed, body out of frame, bad anatomy, watermark, signature, cut off, low contrast, underexposed, overexposed, bad art, beginner, amateur, distorted face, blurry, draft, grainy",
            //"seed":9000,
        };

        predictReplicate(
            "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
            modelInput,
            donePredictingRep
        );
    }
    imgGenerationInProgress = true;
    console.log("Starting prediction, this might take a bit");

    showImageProgressBar = true;
}

function donePredictingRep(imageSource) {
    if (imageSource) {
        img = loadImage(imageSource[0]);
    }
    multiImg.push(img);
}

function nextImage() {
    btn2.show();
    currentImg++;
    currentImg = constrain(currentImg, 0, imageNum - 1);
    if (currentImg == imageNum - 1) {
        btn1.hide();
    }
}

function previousImage() {
    btn1.show();
    currentImg--;
    currentImg = constrain(currentImg, 0, imageNum - 1);
    if (currentImg == 0) {
        btn2.hide();
    }
}

function sendImage() {
    console.log('imagesent');
    btn1.hide();
    btn2.hide();
    btn3.hide();
    imagePicked = multiImg[currentImg];
    if (imagePicked) {
        convertOBJ();
    }
}

function showButton() {
    if (AppearanceInstruction == false) {
        btn1.show();
        // btn2.show();
        btn3.show();
        buttonShowed = true;
    }
}

function convertOBJ() {
    let modelInput = {
        image: imagePicked,
    };
    img2obj(modelInput, donePredicting);
    modelIsGenerating = false;
    showModelProgressing = true;
}

function donePredicting(results) {
    if (results.url) {
        loadModel(results.url, true, function (foo) {
            console.log("Model loaded");
            obj = foo;
        });
    } else {
        console.log("Unable to create 3d model");
    }
}
function changeTop() {
    window.location.href = '../../chatBox/chatBox.html';
    let personality = parent.document.getElementById('top');
    console.log(personality);
    personality.textContent = "Preview Personality";
    let htmlButton = parent.document.getElementById('shopping');
    htmlButton.style.display = 'block';
}

function draw() {
    background(255);
    //get all the user input
    age = localStorage.getItem('inputAge');
    gender = localStorage.getItem('inputGender');
    skinColor = localStorage.getItem('inputSkinColor');
    hairColor = localStorage.getItem('inputHairColor');
    bodyWeight = localStorage.getItem('inputBodyWeight');
    clothes = localStorage.getItem('inputClothes');
    addition = localStorage.getItem('inputAddition');



    if (age != 0) {
        if (imgGenerationInProgress == false) {
            generateImg();
            prevAge = age;
            prevGender = gender;
        }
    }//if use change input, generate image again

    if (multiImg.length == imageNum) {
        showImageProgressBar = false;
        imageMode(CENTER);
        image(multiImg[currentImg], -420, -50, 600, 900);
        if (buttonShowed == false) {
            showButton();
        }
    }

    if (showImageProgressBar == true) {
        push();
        rectMode(CENTER);
        noFill();
        strokeWeight(3);
        rect(-450, -50, 600, 50);
        stroke(0);
        pop();

        textFont(font);
        textSize(36);
        let curImg = multiImg.length + 1
        text("Images loading, please wait" + "(" + curImg + "/" + imageNum + ")", -750, -95);
        let rectLength = (curImg / imageNum) * 600;
        fill(0);
        rectMode(CORNER);
        rect(-750, -50 - 25, rectLength, 50);
    }

    if (showModelProgressing == true) {
        textFont(font);
        textSize(20);
        let curImg = multiImg.length + 1
        text("Your DreamyBot model is progressing, this may take a few seconds.", 180, -320);
    }


    if (obj) {
        showModelProgressing = false;
        push();
        translate(480, 0, 0); // 将模型移动到右侧
        rotateX(PI);
        scale(2);
        rotateY(frameCount * 0.02); // 模型绕 y 轴旋转
        normalMaterial();
        model(obj);
        pop();
        btn5.show();
    }

    //3d model canvas
    push();
    rectMode(CENTER);
    noFill();
    strokeWeight(5);
    stroke(20);
    rect(480, 0, 600, 600);
    pop();
    //

    // Instructions for mdoel page
    if (AppearanceInstruction == true) {
        push();
        rectMode(CENTER);
        fill(0, 240);
        textAlign(CENTER);
        textSize(50);
        rect(-450, -50, 10000, 10000);
        fill(255);
        text("Make sure to choose the one with full body and best quality.", 10, -150);
        text("But most importantly, the one you like.", -5, -75);
        pop();
    }


}


