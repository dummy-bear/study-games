let users=[], user={};
let n=0;
user.name="";
user.level=10;
user.score=0;
user.unscore=0;

if (users=localStorage["umno.users"]) {
	n=localStorage["umno.nuser"];
	user=users[n].copy();
	uname=document.getElementById("name");
	uname.value=user.name;
}

updateTask();

function updateTask(){
	
	let ans=[];
	a=Math.round(Math.random()*user.level);
	b=Math.round(Math.random()*user.level);

	ans[0]=a*b
	i=1
	while (i<4){
		l=Math.round(Math.random()*100);
		for (j=0;j<i;j++){
			if (ans[j]==l){
				l=Math.round(Math.random()*100);
				j=0;
			}
		}
		ans[i++]=l;
	}

	shuffle(ans);

	quest = document.getElementById("quest");
	quest.innerHTML=a+" * "+b;

	for (i=0;i<4;i++){
		ansvar = document.getElementById("ans"+i);
		ansvar.innerHTML="<button onclick='check("+ans[i]+")'> "+ans[i]+" </button>";
	}

}
	

function check(val) {
	if (val==a*b) {
		user.score++;
		
/*		for (let i = users.length - 1; i > 0; i--) {
			if (users[i].name==user.name){
				users[i].score=user.score;
			}
			else users.push(user);
		}
		
		/*users[user].score=score;
		users[user].level=level;
		localStorage["umno.users"]=JSON.stringify(users);
		*/
		scvar = document.getElementById("score");
		scvar.innerHTML = "Правильных ответов: "+user.score;
		//alert ("Правильно!");
		updateTask();
	}
	else {
		user.unscore++;
	
		alert ("Неправильно!");
	}
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

    // поменять элементы местами
    // мы используем для этого синтаксис "деструктурирующее присваивание"
    // подробнее о нём - в следующих главах
    // то же самое можно записать как:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}


