let users=[], user={};
let n=-1;
user.name="";
user.level=10;
user.score=0;
user.unscore=0;

if (localStorage["umno.users"]) {
	users=JSON.parse(localStorage["umno.users"]);
	n=localStorage["umno.nusers"];
	
	user.name=users[n].name;
	user.level=users[n].level;
	user.score=users[n].score;
	user.unscore=users[n].unscore;

	uname=document.getElementById("name");
	uname.value=user.name;
}

showRecords();

updateTask();

function updateTask(){
	
	let ans=[];
	a=Math.round(Math.random()*user.level);
	//if (a>10) a=20-a;
	b=Math.round(Math.random()*user.level);
	//if (b>10) b=20-b;

	ans[0]=a+b
	i=1
	while (i<4){
		l=Math.round(Math.random()*2*user.level);
		for (j=0;j<i;j++){
			if (ans[j]==l){
				l=Math.round(Math.random()*2*user.level);
				j=0;
			}
		}
		ans[i++]=l;
	}

	shuffle(ans);

	quest = document.getElementById("quest");
	quest.innerHTML="<h1>"+a+" + "+b+"</h1>";

	for (i=0;i<4;i++){
		for (j=0;j<3;j++){
			ansvar = document.getElementById("ans"+j+i);
			ansvar.innerHTML="<p></p>";
		}
		j=Math.round(Math.random()*2);
		ansvar = document.getElementById("ans"+j+i);
		
		ansvar.innerHTML="<button class='button' onclick='check("+ans[i]+")'> "+ans[i]+"</button> <br>  <img src='str.png'>";
	}

}
	

function check(val) {
var audio = new Audio();
audio.preload = 'auto';

	
	if (val==a+b) {
		user.score++;
		if (n<0) {
			users.push(user);
			n=users.length-1;
		}
		else 
			users[n].score=user.score;
			
		localStorage["umno.users"]=JSON.stringify(users);
		localStorage["umno.nusers"]=n;

		scvar = document.getElementById("score");
		scvar.innerHTML = "Правильных ответов: "+user.score;
		
		audio.src = 'right.mp3';		
		audio.play();			
		//alert ("Правильно!");
		updateTask();
	}
	else {
		user.unscore++;
		if (n<0) {
			users.push(user);
			n=users.length-1;
		}
		else 
			users[n].unscore=user.unscore;
			
		localStorage["umno.users"]=JSON.stringify(users);
		localStorage["umno.nusers"]=n;
		
		audio.src = 'wrong.mp3';		
		audio.play();			
		//alert ("Неправильно!");
	}
	showRecords();
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

function chuser(name) {
	//alert(name);
	user.name=name;
	for (let i=users.length-1;i>=0;i--){
		if (users[i].name==name){
			n=i;
			user.level=users[n].level;
			user.score=users[n].score;
			user.unscore=users[n].unscore;
			
			scvar = document.getElementById("score");
			scvar.innerHTML = "Правильных ответов: "+user.score;
			
			return;
		}
	}
	
	user.level=10;
	user.score=0;
	user.unscore=0;
	
	scvar = document.getElementById("score");
	scvar.innerHTML = "Правильных ответов: "+user.score;
		
	n=-1;
	
}

function showRecords(){
	recField = document.getElementById("allscore");
	recField.innerHTML="<P>Наши рекорды:</P>";
	for (i=0;i<users.length;i++){
		recField.innerHTML+="<p>"+users[i].name+"\t"+users[i].score+"</p>"; 
		//recField.innerHTML+="<p onclick='chuser(\""+users[i].name+"\")'>"+users[i].name+"\t"+users[i].score+"</p>"; 
	}
	
	scvar = document.getElementById("score");
	scvar.innerHTML = "Правильных ответов: "+user.score;
}
