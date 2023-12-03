let age, gender;
let skinColor, hairLength, hairColor, bodyWeight, bodyHeight, clothes, addition;
let E, S, T, J;
let priceEI, priceNS, priceTF, priceJP;
let skill, personalityAddition;
let EpriceRaw, NpriceRaw, TpriceRaw, JpriceRaw;

let ageCost, genderCost;
let hairLengthCost, bodyWeightCost, bodyHeightCost, clothesCost, additionCost;
let personalityAdditionCost, skillCost;

let basicCost, appearanceCost, personalityCost;



function nextContainer() {
    let currentFieldset = document.querySelector('.current-fieldset');
    let nextFieldset = currentFieldset.nextElementSibling;

    if (nextFieldset) {
        currentFieldset.classList.add('slide-out-left');

        setTimeout(() => {
            currentFieldset.classList.remove('current-fieldset', 'slide-out-left');
            nextFieldset.classList.add('current-fieldset', 'slide-in-right');

            // 额外的步骤：确保移除下一个fieldset的slide-in-right类，
            // 这样下次它成为当前fieldset时不会再次应用入场动画
            setTimeout(() => {
                nextFieldset.classList.remove('slide-in-right');
            }, 500); // 与动画持续时间相匹配
        }, 500); // 调整以匹配动画持续时间
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // 使用平滑滚动效果
    });
}


function collectData() {
    // var selectAge = document.querySelector('.age-option');
    // age = selectAge.value;
    // ageCost = selectAge.getAttribute('ageCost');
    // console.log(ageCost);

    var selectAge = document.querySelector('.age-option');
    var selectedOption = selectAge.options[selectAge.selectedIndex];
    age = selectedOption.value;
    ageCost = selectedOption.getAttribute('ageCost');
    console.log(age);


    const genderRadios = document.querySelectorAll('input[name="genderRadios"]');
    genderRadios.forEach(radio => {
        if (radio.checked) {
            gender = radio.value;
        }
    });

    localStorage.setItem('inputAge', age);
    localStorage.setItem('inputGender', gender);
    nextContainer();

    if (age = "Large select") {
        ageCost = 20000;
    }


    if (gender == ",") {
        genderCost = 10000;
    } else if (!gender) {
        genderCost = 8000;
    } else {
        genderCost = 5000;
    }

    ageCost = parseInt(ageCost);
    genderCost = parseInt(genderCost);
    basicCost = ageCost + genderCost;
    localStorage.setItem('cost1', basicCost);

}

function collectData2() {
    const skinColorRadios = document.querySelectorAll('input[name="skinColorRadios"]');
    skinColorRadios.forEach(radio => {
        if (radio.checked) {
            skinColor = radio.value;
        }
    });

    const hairLengthRadios = document.querySelectorAll('input[name="hairLengthRadios"]');
    hairLengthRadios.forEach(radio => {
        if (radio.checked) {
            hairLength = radio.value;
            hairLengthCost = radio.getAttribute('data-hair-length-cost');
        }
    });


    const bodyWeightRadios = document.querySelectorAll('input[name="bodyWeightRadios"]');
    bodyWeightRadios.forEach(radio => {
        if (radio.checked) {
            bodyWeight = radio.value;
            bodyWeightCost = radio.getAttribute('data-body-weight-cost');
            // 这里使用正确的属性名称
        }
    });

    const bodyHeightRadios = document.querySelectorAll('input[name="bodyHeightRadios"]');
    bodyHeightRadios.forEach(radio => {
        if (radio.checked) {
            bodyHeight = radio.value;
            bodyHeightCost = radio.getAttribute('data-body-height-cost');
            // 这里使用正确的属性名称
        }
    });

    hairColor = document.getElementById('hair-color').value;
    clothes = document.getElementById('clothes').value;
    addition = document.getElementById('addition').value;

    if (!hairLength) {
        hairLengthCost = 1300;
    }

    if (!bodyWeight) {
        bodyWeightCost = 10000;
    }

    if (!bodyHeight) {
        bodyHeightCost = 70000;
    }

    if (addition) {
        additionCost = 100000;
    } else {
        additionCost = 0;
    }

    hairLengthCost = parseFloat(hairLengthCost); // float numbers
    bodyHeightCost = parseFloat(bodyHeightCost);
    bodyWeightCost = parseFloat(bodyWeightCost);
    additionCost = parseFloat(additionCost);

    appearanceCost = 20000 + hairLengthCost + 5000 + bodyHeightCost + bodyWeightCost + 300 + additionCost;

    // console.log(skinColor, hairLength, hairColor, bodyWeight, bodyHeight, clothes, addition);


    localStorage.setItem('inputSkinColor', skinColor);
    localStorage.setItem('inputHairLength', hairLength);
    localStorage.setItem('inputHairColor', hairColor);
    localStorage.setItem('inputBodyWeight', bodyWeight);
    localStorage.setItem('inputBodyHeight', bodyHeight);
    localStorage.setItem('inputClothes', clothes);
    localStorage.setItem('inputAddition', addition);

    nextContainer();
    localStorage.setItem('cost2', appearanceCost);

}
function collectData3() {
    skill = document.getElementById('skills').value;
    personalityAddition = document.getElementById('personality-addition').value;
    localStorage.setItem('inputE', EpriceRaw);
    localStorage.setItem('inputN', NpriceRaw);
    localStorage.setItem('inputT', TpriceRaw);
    localStorage.setItem('inputJ', JpriceRaw);
    localStorage.setItem('inputSkill', skill);
    localStorage.setItem('inputPersonalityAddition', personalityAddition);

    if (skill) {
        skillCost = 50000;
    } else {
        skillCost = 0;
    }

    if (personalityAddition) {
        personalityAdditionCost = 50000;
    } else {
        personalityAdditionCost = 0;
    }
    if (!Eprice) {
        Eprice = 20000;
    }
    if (!Nprice) {
        Eprice = 10000;
    }
    if (!Tprice) {
        Eprice = 10000;
    }
    if (!Jprice) {
        Jprice = 10000;
    }


    personalityCost = Eprice + Nprice + Tprice + Jprice + skillCost + personalityAdditionCost;
    localStorage.setItem('cost3', personalityCost);
}


var rangeSliderEI = document.getElementById("rs-range-line-EI");
var rangeBulletEI = document.getElementById("rs-bullet-EI");

rangeSliderEI.addEventListener("input", showSliderValueEI, false);

function showSliderValueEI() {
    rangeBulletEI.innerHTML = rangeSliderEI.value;
    var bulletPositionEI = (rangeSliderEI.value / rangeSliderEI.max);
    rangeBulletEI.style.left = (bulletPositionEI * 578) + "px";
}

var rangeSliderNS = document.getElementById("rs-range-line-NS");
var rangeBulletNS = document.getElementById("rs-bullet-NS");

rangeSliderNS.addEventListener("input", showSliderValueNS, false);

function showSliderValueNS() {
    rangeBulletNS.innerHTML = rangeSliderNS.value;
    var bulletPositionNS = (rangeSliderNS.value / rangeSliderNS.max);
    rangeBulletNS.style.left = (bulletPositionNS * 578) + "px";
}

var rangeSliderTF = document.getElementById("rs-range-line-TF");
var rangeBulletTF = document.getElementById("rs-bullet-TF");

rangeSliderTF.addEventListener("input", showSliderValueTF, false);

function showSliderValueTF() {
    rangeBulletTF.innerHTML = rangeSliderTF.value;
    var bulletPositionTF = (rangeSliderTF.value / rangeSliderTF.max);
    rangeBulletTF.style.left = (bulletPositionTF * 578) + "px";
}

var rangeSliderJP = document.getElementById("rs-range-line-JP");
var rangeBulletJP = document.getElementById("rs-bullet-JP");

rangeSliderJP.addEventListener("input", showSliderValueJP, false);

function showSliderValueJP() {
    rangeBulletJP.innerHTML = rangeSliderJP.value;
    var bulletPositionJP = (rangeSliderJP.value / rangeSliderJP.max);
    rangeBulletJP.style.left = (bulletPositionJP * 578) + "px";
}

function setup() {

}

function draw() {


    Eprice = document.getElementById('rs-bullet-EI');
    EpriceRaw = Eprice.textContent;
    Eprice = 20000 + EpriceRaw * 30000;
    priceParagraphE = document.getElementById('priceE');
    priceParagraphE.textContent = 'Price: $' + Eprice.toFixed(2);

    Nprice = document.getElementById('rs-bullet-NS');
    NpriceRaw = Nprice.textContent;
    Nprice = 20000 + NpriceRaw * 10000;
    priceParagraphN = document.getElementById('priceN');
    priceParagraphN.textContent = 'Price: $' + Nprice.toFixed(2);


    Tprice = document.getElementById('rs-bullet-TF');
    TpriceRaw = Tprice.textContent;
    Tprice = 20000 + TpriceRaw * 10000;
    priceParagraphT = document.getElementById('priceT');
    priceParagraphT.textContent = 'Price: $' + Tprice.toFixed(2);


    Jprice = document.getElementById('rs-bullet-JP');
    JpriceRaw = Jprice.textContent;
    Jprice = 20000 + JpriceRaw * 50000;
    priceParagraphJ = document.getElementById('priceJ');
    priceParagraphJ.textContent = 'Price: $' + Jprice.toFixed(2);

    skill = document.getElementById('skills').value;
    personalityAddition = document.getElementById('personality-addition').value;


    console.log(basicCost, appearanceCost, personalityCost);
}
