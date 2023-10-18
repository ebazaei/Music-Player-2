
/*
در بخش قبلی، قالب گرافیکی و همچنین دستورات اولیه برای شناخت المنت های مربوط به پخش کننده موزیک رو نوشتیم
در این بخش به فانکشن ها و دستورات مربوط به دکمه ها و ... می پردازیم
*/

let musics = [
    {
        name: "Adele: Set Fire To The Rain",
        cover:"imgs/adele.jpg",
        audio: new Audio("./musics/adele.mp3")
    },
    {
        name: "Pitbull: Don't Stop The Party ft. TJR",
        cover:"imgs/pitbull.jpg",
        audio: new Audio("./musics/pitbull.mp3")
    },
    {
        name: "Shakira: Beautiful Liar",
        cover:"imgs/shakira.jpg",
        audio: new Audio("./musics/shakira.mp3")
    }
]

/*
ریختن ایتم های مهم و اساسی درون متغییرها
*/

let musicName = document.querySelector("#music-name")
let musicCover = document.querySelector("#music-cvr")
let range = document.querySelector("#music-time")
let preBtn = document.querySelector("#pre-btn")
let playBtn = document.querySelector("#play-btn")
let nextBtn = document.querySelector("#next-btn")



//currentMusic موسیقی فعلی
let currentMusic = 0;
let audio = musics[currentMusic].audio
musicCover.src = musics[currentMusic].cover
musicName.innerText = musics[currentMusic].name


/*
کار بر روی فانکشن ها و دکمه های موزیک پلایر

اولین فدم کار بر روی رنج است که یک مینیمم و یک ماکسیمم داره- مینیمم 0 است 
اما ماکسیمم را به اندازه طول موزیک در نظر میگیریم، مثلا اگر 200 ثانیه است عدد 200. 

برای این کار اول لود شدن موزیک رو چک میکنیم  audio.addEventListener("canplay"...
این فانکشن با ایونت کن پلی، هر وقت مرزیک لود میشه، تابع درونش اجرا میشه

سپس با اودیو دوریشن، حداکثر رنج رو معادل طول موزیک میگذاریم. range.max = audio.duration

مرحله بعدی میخوایم همزمان با پخش اهنگ، درصد رنج نمایش داده شه و دستگیره رنجهمزمان با اهنگ حرکت کنه.
برای این کار یه ایونت لیسنار جدید مینویسیم با ایونت تام آپدیت  audio.addEventListener("timeupdate",()=>{...

مرحله بعدی، اینتراکتیو کردن رنج است.میخوایم هر وقت کاربر روی جایی از رنج کلیک کرد، آن بخش موزیک پخش شه
کافیه پروسه قبلی برعکس شه و البته نوع ایونت اینپوت میشه و جای اودیو از رنج استفاده میشه  range.addEventListener("input",()=>{

حالا وقتشه موزیک پلی شه، یه ایونت لیسنار روی دکمه پلی میگذاریم
playBtn.addEventListener("click",()=>{...
در این مرحله همزمان باید اگر موزیک متوقفه اجرا شه یا برعکس   if(audio.paused){audio.play()...  
ایکن باید در حالت متوقف و اجرا متفاوت شه  
و همچنین انیمیشن استایل دور عکس اجرا شه   musicCover.style.animationPlayState = "running"...


تا اینجا مهمترین کارها برای پخش 1 اهنگ اجرا شده، الان فقط باید ترتیب پخش موزیک های دیگر رو هم بدیم
در این مرحله برای دکمه های بعدی و قبلی باید ایونت لیسنار تعریف کنیم  nextBtn.addEventListener("click",()=>{...
ما یک فانکشن برای این تعریف میکنیم و در ایونت لیسنار ها صداش میزنیم تا یه سری عملیات مهم انجام شه  function changeMusic(state){...
این عملیات شامل متوقف شدن اهنگ و انیمیشن و ... فعلی، رفتن به موسیقی بعدی و قبلی، عوضی شدن عکس کاور و ... است

و در نهایت موزیک و کاور و نام موزیک رو روی المنت های صفحه اچ تی ام ال ست میکنیم
    audio = musics[currentMusic].audio
    musicCover.src = musics[currentMusic].cover
    musicName.innerText = musics[currentMusic].name
*/

//تنظیم حداکثر رنج معادل طول اهنگ
audio.addEventListener("canplay",()=>{
    //فایل های صوتی یا فیلم، ویژگی با نام دوریشن دارن که در حقیقت طول اون فایل است مثلا 200 ثانیه   console.log(audio.duration) //224.760
    range.max = audio.duration
})


//هماهنگ کردن حرکت نشانگر رنج همزمان با درصد اجرا
audio.addEventListener("timeupdate",()=>{
    range.value = audio.currentTime   //هماهنگ کردن مقدار رنج با ثانیه اهنگ
})

//هر جای رنج کاربر کلیک کرد موسیقی به همونجا بره
range.addEventListener("input",()=>{
    audio.currentTime =  range.value  //هماهنگ کردن موزیک با  مقدار رنج انتخاب شده توسط کاربر
})


// پخش موزیک با ایونت لیسنار روی دکمه -اگر موزیک متوقفه ران شه و اگر ران است متوقف شه و عوض شدن شکل ایکن هماهنگ با سکون یا پخش موزیک

playBtn.addEventListener("click",()=>{
    if(audio.paused){       //با شرط اودیو دات پاوز جواب یا ترو یا فالسه - اگر ترو باشه یعنی موزیک متوقفه و ...
        audio.play();                                       //متد اجرا شدن مدیا
        playBtn.classList.replace("fa-play","fa-pause");    //تغییر ایکن با جایگزینی ایکن پاوز به جای پلی
        musicCover.style.animationPlayState = "running";    //اجرا شدن انیمیشن افکت هنگام اجرای موزیک
    }else{
        audio.pause();                                       //متد متوقف شدن مدیا
        playBtn.classList.replace("fa-pause","fa-play");     //تغییر ایک به پلی
        musicCover.style.animationPlayState = "paused";      //متوقف شدن انیمیشن هنگام توقف موزیک
    }
})



//تعریف دکمه های بعدی و قبلی-در ایونت لیسنارشون، تابع چنچ موزیک رو صدا میزنیم و ورودی مربوط به بعدی یا قبلی رو میدیم بهشون
nextBtn.addEventListener("click",()=>{
    changeMusic("next")
})

preBtn.addEventListener("click",()=>{
    changeMusic("pre")
})
//با این تابع میگیم در صورت کلیک روی دکمه بعدی یا قبلی چه چیزایی پیش بیاد
function changeMusic(state){
    audio.pause()  //ابتدا باید مدیای فعلی متوقف شه 
    range.value = 0 //رنج باید به نقطه 0 برگرده چون مدیای بعدی قراره از اول شروع شه
    audio.currentTime = 0   //ثانیه اهنگ رو هم به 0 برمیگردونیم
    playBtn.classList.replace("fa-pause","fa-play");   //تغییر اکن به پلی
    musicCover.style.animationPlayState = "paused";    //توقف انیمیشن

    //حال میخوایم بسته به انتخاب دکمه بعدی یا قبلی (ورودی استیت در فانکشن) یه سری کارها انجام شه
    if(state == "next"){

        //یک شرط دیگه اینجا نیازه برای اینکه ببینیم به اخر لیست اهنگ ها و کارنت موزیک رسیدیم؟ اگر نه، یکی بهش اضافه کن
        if(currentMusic == musics.length -1){  
            //اگر ایندکس کارنت موزیک معادل آخرین مدیا است، یعنی کل آهنگ ها منهای عدد یک چون ارایه از 0 شروع میشه، ایندکس رو صفر کن تا به اولین اهنگ برگرده
            currentMusic = 0
        }else{
            currentMusic += 1  //در غیر اینصورت ، عدد ایندکس موسیقی فعلی رو یکی زیاد کن
        }

    }else{

        //یک شرط دیگه اینجا نیازه برای اینکه ببینیم به اول لیست اهنگ ها و کارنت موزیک رسیدیم؟ اگر نه، یکی ازش کم کن
        if(currentMusic == 0){  
            //اگر ایندکس کارنت موزیک معادل اولین مدیا است، ایندکس رو به آخرین مدیا تغییر میدیم، یعنی musics.length -1  
            currentMusic = musics.length -1
        }else{
            currentMusic -= 1  //در غیر اینصورت ، عدد ایندکس موسیقی فعلی رو یکی کم کن
        }

    }

    //حال موزیک، کاورش و نامش رو روی المنت های صفجه ست میکنیم
    audio = musics[currentMusic].audio
    musicCover.src = musics[currentMusic].cover
    musicName.innerText = musics[currentMusic].name

    //با تغییر موزیک، نمایشگر رنج از کار میافته، پس اینجا اضافه اش میکنیم
    audio.addEventListener("timeupdate",()=>{
        range.value = audio.currentTime   //هماهنگ کردن مقدار رنج با ثانیه اهنگ
    })

    //اگر میخوایم با زدن دکمه بعدی و قبلی، موزیک جدید خودکار پخش شه از کدهای زیر استفاده میکنیم.
    //  در غیر اینصورت موزیک بعدی متوقف خواهد بود تا زمانی که ما دکمه پلی رو بزنیم
    audio.play()
    playBtn.classList.replace("fa-play","fa-pause");
    musicCover.style.animationPlayState = "running";


}

//01:35