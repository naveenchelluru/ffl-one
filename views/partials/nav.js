function myFunction() {
    var x = document.getElementById("myTopnav");
    console.log("FUnction");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }