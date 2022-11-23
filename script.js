// import flatpickr from "flatpickr";
const galleryEl = document.querySelector(".gallery") ;
const fullimEl = document.querySelector(".fullim");
const videoEl = document.querySelector(".video");
const flatpickrEl = document.querySelector(".flatpickr") ;
const loadButtonEl = document.querySelector(".load-button");
const fileEl = document.querySelector(".file-string");

var myvids =[] ;
var mydirs =[] ;


setTimeout(function(){
  let date = new Date() ;
  var dateout = date.toLocaleDateString() ;
  var timeout = date.toLocaleTimeString() ;
  document.querySelector(".date-string").textContent=dateout+'  '+timeout ;

},10000) ;


flatpickr(document.getElementById("date-input"), {
  allowInput: true,
  dateFormat: "m/d/Y",
  maxDate: "today"
});
function getdatadirs(ddir){
  var outdir = 'images/'+ddir ;
  var m_outdir = 'images/m_'+ddir ;
  return ([outdir,m_outdir]) ;
}

function loadDate() {
  
  const newDate =  flatpickrEl.value ;
  console.log (newDate) ;
  var dtfields = newDate.split("/");
  var outstring=dtfields[2]+'_'+dtfields[0]+'_'+dtfields[1];
  loadImages(outstring);
  
}

loadButtonEl.addEventListener("click", loadDate);

function loadImages(datadir){
  galleryEl.textContent="" ;
  mydirs = getdatadirs (datadir);
  $ajaxUtils.sendGetRequest(mydirs[1]+'/files.txt',function(responseText){
    responseText=responseText+"\naabc\n";
    var vidfiles = responseText.split("\n");
    vidfiles.forEach(vidfile=>{
      if (vidfile.length>5){
        console.log(vidfile);
        myvids.push(vidfile);
      }
    });  
  },false);

  // load in a ne set of images by reading the date field and then calling loadImages
  


  $ajaxUtils.sendGetRequest(mydirs[0]+'/files.txt',function(responseText){
    console.log(responseText) ;
    responseText=responseText+"\naabc\n";
    var imfiles = responseText.split("\n") ;
    let count=0 ;
    imfiles.forEach(imfile=>{
        var vidfile=mydirs[1]+'/'+myvids[count];
        count=count+1 ; 
  	    if(imfile.length<5) {
	    }
	    else {
        console.log(imfile);
        var fullim = mydirs[0]+'/'+imfile ;
        const imgEl = document.createElement("img") ;
        imgEl.classList.add ("thumbnail") ;
        imgEl.src=mydirs[0]+"/"+imfile;
        //imgEl.width=320 ;
        
        galleryEl.appendChild(imgEl);
        imgEl.addEventListener("click",()=>{
          const imgAll = document.querySelectorAll(".thumbnail") ;
          imgAll.forEach (img0=>{
            img0.classList.remove("selected") ;

          }) ;
          imgEl.classList.add("selected");
          fileEl.innerText = `Filename : ${imfile}` ;
          console.log("Video file is "+vidfile);
          fullimEl.src=fullim ;
          // videoEl.innerHTML="" ;
          // videoEl.innerHTML = `<source src="${vidfile}" tyoe="video/mp4">`
          videoEl.src=`${vidfile}` ;
          videoEl.type="video/mp4" ;
        });
	    }

    });

  


  },false)
} ; 

console.log("HELLO");
loadImages("2022_11_18");
