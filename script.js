function check(){
    if((document.getElementById("field1").value == "")  || 
    (document.getElementById("period").value == "")     ||
    (document.getElementById("period").value <= 0)      ||
    (document.getElementById("selectperiod").value == 0)||
    (document.getElementById("selectpayment").value == 1) & (document.getElementById("payment").value == "") ||
    (document.getElementById("selectpayment").value == 1) & (document.getElementById("payment").value <= 0) ||
    (document.getElementById("selectpayment").value == 2) & (document.getElementById("payment").value == "") ||
    (document.getElementById("selectpayment").value == 2) & (document.getElementById("payment").value <= 0) ||
    (document.getElementById("selectpayment").value == 0) || 
    //(document.getElementById("payment").value == "")    ||
   // (document.getElementById("payment").value <= 0)     || 
  
   // (document.getElementById("selectpayment").value == 3) ||
   // (document.getElementById("selectpayment").value == 4) ||
    (document.getElementById("rate").value == "")       || 
    (document.getElementById("rate").value <= 0)
    )
    {   
       
        alert("Veendu, et kõik väljad on täidetud korrektselt.")
        
    } else {
        arvuta(); 
        
        
        
        

        
        
}

function arvuta() {
    
    document.getElementById("btn").disabled = true;
    document.getElementById("btnExcel").style.visibility = "visible";
  
    
   
j = Number(document.getElementById("period").value);
payment = Number(document.getElementById("payment").value);

if(document.getElementById("perioodkuu").selected == true) {
    rate = Number(document.getElementById("rate").value) / 100 / 12;
} else {
    rate = Number(document.getElementById("rate").value) / 100;
}

let table = document.createElement('table');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');

table.appendChild(thead);
table.appendChild(tbody);

// Adding the entire table to the body tag
document.getElementById('tableData').appendChild(table);

// Creating and adding data to first row of the table
let row_1 = document.createElement('tr');

let heading_1 = document.createElement('th');
heading_1.innerHTML = "Periood (" + document.getElementById("selectperiod").value + ")";
let heading_2 = document.createElement('th');
if((document.getElementById("selectpayment").value == 1)){
    heading_2.innerHTML = "Rendimakse (annuiteet)";
} 
if((document.getElementById("selectpayment").value == 2)){
    heading_2.innerHTML = "Rendimakse (avanssannuiteet)";
}
if((document.getElementById("selectpayment").value == 3)){
    heading_2.innerHTML = "Rendimakse (muutuvad irregulaarsed maksed)";
}
if((document.getElementById("selectpayment").value == 4)){
    heading_2.innerHTML = "Rendimakse (muutuvad irregulaarsed avansilised maksed)";
}

let heading_3 = document.createElement('th');
heading_3.innerHTML = "Renditava vara bilansiline maksumus perioodi algul";
let heading_4 = document.createElement('th');
heading_4.innerHTML = "Renditava vara amortisatsioon";
let heading_5 = document.createElement('th');
heading_5.innerHTML = "Renditava vara bilansiline maksumus perioodi lõpul";
let heading_6 = document.createElement('th');
heading_6.innerHTML = "Rendikohustise bilansiline maksumus perioodi algul";
let heading_7 = document.createElement('th');
heading_7.innerHTML = "Intress rendikohustiselt (diskontomäär " + document.getElementById("rate").value + "%)"
let heading_8 = document.createElement('th');
heading_8.innerHTML = "Rendikohustise bilansiline maksumus perioodi lõpul";


row_1.appendChild(heading_1);
row_1.appendChild(heading_2);
row_1.appendChild(heading_3);
row_1.appendChild(heading_4);
row_1.appendChild(heading_5);
row_1.appendChild(heading_6);
row_1.appendChild(heading_7);
row_1.appendChild(heading_8);
thead.appendChild(row_1);

//Column Kuu
function myTable(){
   
    for(i=1; i<(j+1); i++){

// Creating and adding data to second row of the table
let row_2 = document.createElement('tr');
let row_2_data_1 = document.createElement('td');
row_2_data_1.innerHTML = i;
let row_2_data_2 = document.createElement('td');
let row_2_data_3 = document.createElement('td');
let row_2_data_4 = document.createElement('td');
let row_2_data_5 = document.createElement('td');
let row_2_data_6 = document.createElement('td');
let row_2_data_7 = document.createElement('td');
let row_2_data_8 = document.createElement('td');

row_2.appendChild(row_2_data_1);
row_2.appendChild(row_2_data_2);
row_2.appendChild(row_2_data_3);
row_2.appendChild(row_2_data_4);
row_2.appendChild(row_2_data_5);
row_2.appendChild(row_2_data_6);
row_2.appendChild(row_2_data_7);
row_2.appendChild(row_2_data_8);
tbody.appendChild(row_2);

}
}
myTable();

if((document.getElementById("selectpayment").value == 1)) {

    for(i=1; i<(j+1); i++){
        table.rows[i].cells[1].innerHTML = payment;
    }
    function npvSum(){
        var total = 0;
        for(i=1; i<(j+1); i++){
        arvutaNpv = payment / Math.pow(1 + rate, i);
        total = total + arvutaNpv;
    }
        return total;
    }   
        table.rows[1].cells[2].innerHTML = Number(npvSum());
        table.rows[1].cells[5].innerHTML = Number(npvSum());
    
    // Vara amortisatsioon
    for(i=1; i<(j+1); i++){
        table.rows[i].cells[3].innerHTML = Number(table.rows[1].cells[2].innerHTML / j);
    }
    
    // Vara bilansiline maksumus kuu alguses row 1+
    for(i=2; i<(j+1); i++){
        table.rows[i].cells[2].innerHTML = Number(table.rows[i-1].cells[2].innerHTML) - Number(table.rows[i-1].cells[3].innerHTML);
    }
    
    for(i=1; i<(j+1); i++){
        table.rows[i].cells[6].innerHTML = Number(table.rows[i].cells[5].innerHTML * rate);
    }
    
    for(i=2; i<(j+1); i++){
        table.rows[i].cells[5].innerHTML = Number(table.rows[i-1].cells[5].innerHTML) - Number(table.rows[i-1].cells[1].innerHTML) + Number(table.rows[i-1].cells[6].innerHTML);
        table.rows[i].cells[6].innerHTML = Number(table.rows[i].cells[5].innerHTML * rate);
    }
    
    // Vara bilansiline maksumus kuu lõpus, Kohustise bilansiline maksumus kuu lõpus
    for(i=1; i<(j+1); i++){
        table.rows[i].cells[4].innerHTML = Number(table.rows[i+1].cells[2].innerHTML);
        table.rows[i].cells[7].innerHTML = Number(table.rows[i+1].cells[5].innerHTML);
    }
    
}
    
        
if((document.getElementById("selectpayment").value == 2)) {

    for(i=1; i<(j+1); i++){
        table.rows[i].cells[1].innerHTML = payment;
    }
         
function npvSum(){
    var total = 0;
    for(i=2; i<(j+1); i++){
    arvutaNpv = payment / Math.pow(1 + rate, (i-1));
    total = total + arvutaNpv;
}
    return total;
}

    table.rows[1].cells[2].innerHTML = Number(npvSum());
    table.rows[1].cells[5].innerHTML = Number(npvSum());

// Vara amortisatsioon
for(i=1; i<(j+1); i++){
    table.rows[i].cells[3].innerHTML = Number(table.rows[1].cells[2].innerHTML / j);
}

// Vara bilansiline maksumus kuu alguses row 1+
for(i=2; i<(j+1); i++){
    table.rows[i].cells[2].innerHTML = Number(table.rows[i-1].cells[2].innerHTML) - Number(table.rows[i-1].cells[3].innerHTML);
}

for(i=1; i<(j+1); i++){
    table.rows[i].cells[6].innerHTML = Number(table.rows[i].cells[5].innerHTML * rate);
}

for(i=2; i<(j+1); i++){
    table.rows[i].cells[5].innerHTML = Number(table.rows[i-1].cells[5].innerHTML) + Number(table.rows[i-1].cells[6].innerHTML) - Number(table.rows[i].cells[1].innerHTML);
    table.rows[i].cells[6].innerHTML = Number(table.rows[i].cells[5].innerHTML * rate);
}

for(i=1; i<(j+1); i++){
    table.rows[i].cells[7].innerHTML = Number(table.rows[i].cells[5].innerHTML) + Number(table.rows[i].cells[6].innerHTML); 
}

for(i=1; i<(j+1); i++){
    table.rows[i].cells[4].innerHTML = Number(table.rows[i+1].cells[2].innerHTML);
}

}
if((document.getElementById("selectpayment").value == 3)) {
    
    for(i=1; i<(j+1); i++ ){
        table.rows[i].cells[1].innerHTML = Number(document.getElementById(i).value);
    }

        function npvSum(){
            var total = 0;
            for(i=1; i<(j+1); i++){
            arvutaNpv = Number(document.getElementById(i).value) / Math.pow(1 + rate, i);
            total = total + arvutaNpv;
        }
            return total;
        }   
            table.rows[1].cells[2].innerHTML = Number(npvSum());
            table.rows[1].cells[5].innerHTML = Number(npvSum());
        
        // Vara amortisatsioon
        for(i=1; i<(j+1); i++){
            table.rows[i].cells[3].innerHTML = Number(table.rows[1].cells[2].innerHTML / j);
        }
        
        // Vara bilansiline maksumus kuu alguses row 1+
        for(i=2; i<(j+1); i++){
            table.rows[i].cells[2].innerHTML = Number(table.rows[i-1].cells[2].innerHTML) - Number(table.rows[i-1].cells[3].innerHTML);
        }
        
        for(i=1; i<(j+1); i++){
            table.rows[i].cells[6].innerHTML = Number(table.rows[i].cells[5].innerHTML * rate);
        }
        
        for(i=2; i<(j+1); i++){
            table.rows[i].cells[5].innerHTML = Number(table.rows[i-1].cells[5].innerHTML) - Number(table.rows[i-1].cells[1].innerHTML) + Number(table.rows[i-1].cells[6].innerHTML);
            table.rows[i].cells[6].innerHTML = Number(table.rows[i].cells[5].innerHTML * rate);
        }
        
        // Vara bilansiline maksumus kuu lõpus, Kohustise bilansiline maksumus kuu lõpus
        for(i=1; i<(j+1); i++){
            table.rows[i].cells[4].innerHTML = Number(table.rows[i+1].cells[2].innerHTML);
            table.rows[i].cells[7].innerHTML = Number(table.rows[i+1].cells[5].innerHTML);
        }

}
if((document.getElementById("selectpayment").value == 4)) {

    for(i=1; i<(j+1); i++ ){
        table.rows[i].cells[1].innerHTML = Number(document.getElementById(i).value);
    }
         
function npvSum(){
    var total = 0;
    for(i=2; i<(j+1); i++){
    arvutaNpv = Number(document.getElementById(i).value) / Math.pow(1 + rate, (i-1));
    total = total + arvutaNpv;
}
    return total;
}

    table.rows[1].cells[2].innerHTML = Number(npvSum());
    table.rows[1].cells[5].innerHTML = Number(npvSum());

// Vara amortisatsioon
for(i=1; i<(j+1); i++){
    table.rows[i].cells[3].innerHTML = Number(table.rows[1].cells[2].innerHTML / j);
}

// Vara bilansiline maksumus kuu alguses row 1+
for(i=2; i<(j+1); i++){
    table.rows[i].cells[2].innerHTML = Number(table.rows[i-1].cells[2].innerHTML) - Number(table.rows[i-1].cells[3].innerHTML);
}

for(i=1; i<(j+1); i++){
    table.rows[i].cells[6].innerHTML = Number(table.rows[i].cells[5].innerHTML * rate);
}

for(i=2; i<(j+1); i++){
    table.rows[i].cells[5].innerHTML = Number(table.rows[i-1].cells[5].innerHTML) + Number(table.rows[i-1].cells[6].innerHTML) - Number(table.rows[i].cells[1].innerHTML);
    table.rows[i].cells[6].innerHTML = Number(table.rows[i].cells[5].innerHTML * rate);
}

for(i=1; i<(j+1); i++){
    table.rows[i].cells[7].innerHTML = Number(table.rows[i].cells[5].innerHTML) + Number(table.rows[i].cells[6].innerHTML); 
}

for(i=1; i<(j+1); i++){
    table.rows[i].cells[4].innerHTML = Number(table.rows[i+1].cells[2].innerHTML);
}

}
}


}

//<form id="form" action="https://formspree.io/f/xwkzryag" method="POST" target="_blank">
//button type="submit"


// window.location.reload();

//<div class="text">
//Raamatupidamisteenuseid osutab <a href="https://www.kutseregister.ee/ctrl/et/Tunnistused/vaata/11038431/1" target="_blank">kutseline raamatupidaja</a>.      
//<br><a href="mailto:aleksei.komarov@icloud.com" target="blank">Kirjelda oma tööd ja küsi hinnapakkumist</a>.<br><br>
//</div>



