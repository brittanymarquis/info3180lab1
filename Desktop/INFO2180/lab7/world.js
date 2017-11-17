function world(){
    var xhttp = new XMLHttpRequest();
    var word = document.getElementById('country').value;
    var check = document.getElementById('checking').checked;
    var url = "https://info2180-lab7-termin4321.c9users.io/world.php?country="+ word;
    
    if (check == true){
         var url = "https://info2180-lab7-termin4321.c9users.io/world.php?all="+ check;
    }else {
         var url = "https://info2180-lab7-termin4321.c9users.io/world.php?country="+ word;
    }
    
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("result").innerHTML = this.responseText;
           alert(this.responseText);
        }
    }
     xhttp.open("GET", url);
     xhttp.send();
}