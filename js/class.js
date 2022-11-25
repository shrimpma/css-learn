let Empoly = class {
    name;
   
    constructor(name,age){
        this.name = name;
        this.age = age;
    }

    changeAge(age){
        this.age = age;
    }
    getFullName(){
        return `my name is ${this.name} , I'm ${this.age}`
    }

    /*
     必须定义属性 name;
    */
    get name(){
        return this.name;
    }

   
}

var zhangsan = new Empoly('zhangsan',30);
zhangsan.changeAge(40);
console.log(zhangsan.getFullName());
var zhangsan2 = new Empoly('zhangsan2',30);
zhangsan2.changeAge(45);
zhangsan.changeAge(38);
console.log(zhangsan2.getFullName());

console.log(zhangsan2.age = 32);

console.log(zhangsan2.getFullName());

