var option_a = 1,
  option_b = 2,
  option_c = 4,
  option_d = 8;
var total = option_a | option_b | option_c | option_d;

// 存储数值
console.log("total:", total);

// 判断 某个value 是否存在
check = total & option_c;

if (check) {
  console.log("check result:", " exsits");
}

var result = option_a | option_b;
console.log(option_a.toString(2));
console.log(result.toString(2));

