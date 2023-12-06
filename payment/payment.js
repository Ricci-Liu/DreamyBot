let basic = appearance = personality = 0;
let cost1, cost2, cost3;
let total;

function setup() {
    console.log('setuo');
}
function draw() {
    basic = localStorage.getItem('cost1');
    appearance = localStorage.getItem('cost2');
    personality = localStorage.getItem('cost3');


    console.log("basic:", basic);
    console.log("appearance:", appearance);
    console.log("personality:", personality);

    cost1 = parseInt(basic); // 将字符串解析为整数
    cost2 = parseInt(appearance); // 将字符串解析为整数
    cost3 = parseInt(personality);



    if (isNaN(cost1)) {
        cost1 = 0;
    }

    if (isNaN(cost2)) {
        cost2 = 0;
    }

    if (isNaN(cost3)) {
        cost3 = 0;
    }

    total = cost1 + cost2 + cost3;
    // 将整数值赋值给对应的HTML元素
    document.getElementById('basic-cost').textContent = "$" + cost1;
    document.getElementById('appearance-cost').textContent = "$" + cost2;
    document.getElementById('personality-cost').textContent = "$" + cost3;
    document.getElementById('total').textContent = "$" + total;
}

document.getElementById('print').addEventListener('click', function () {
    var price = document.getElementById('total').value;
    if (price) {
        fetch('http://localhost:3000/' + price)
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    } else {
        alert('Oops, something went wrong...');
    }
});