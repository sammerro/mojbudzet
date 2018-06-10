 
 
 function Transakcja(kwota, opis, czyPlus = true) {
     this.kwota = kwota;
     this.opis = opis;
     this.czyPlus = czyPlus;
 }


 Transakcja.prototype.dodajDoListy = function() {


     const li = document.createElement("li");
     const opis = document.createElement("span");
     const kwota = document.createElement("span");
     const deleteBtn = document.createElement("span");


     opis.textContent = this.opis ;
     kwota.textContent = this.kwota;
     deleteBtn.innerHTML = '<p>&#x274C</p>';

     opis.classList.add("lista-span-opis");
     kwota.classList.add("lista-span-kwota");
     deleteBtn.classList.add("lista-span-delete");

     li.appendChild(kwota);    
     li.appendChild(opis);
     li.appendChild(deleteBtn);
     

     
     if (this.czyPlus) {
        document.getElementById('przychody-ul').appendChild(li);
     } else {
        document.getElementById('wydatki-ul').appendChild(li);
     }

     li.addEventListener("mouseover", function () {
         deleteBtn.classList.add('aktywny');
     });
     li.addEventListener("mouseleave", function () {
        deleteBtn.classList.remove('aktywny');
    });
    deleteBtn.addEventListener('click', function() {
        li.style.display = "none";
    });


 }

 trans1 = new Transakcja(1000 , "czynsz");
 trans2 = new Transakcja(2000 , "czynsz", false);

 
 trans1.dodajDoListy();
 trans1.dodajDoListy();
 trans1.dodajDoListy();
 trans2.dodajDoListy();
 trans2.dodajDoListy();
 /* console.log('LALALALAALALAL');
 /* console.log('LALALALAALALAL');
 /* console.log('LALALALAALALAL');
 /* console.log('LALALALAALALAL');


 const li = document.createElement("li");
 const opis = document.createElement("span");
 const kwota = document.createElement("span");
 const deleteBtn = document.createElement("span");

 opis.textContent = " NA SAMOCHÓD";
 kwota.textContent = " 56 tys. zł";
 deleteBtn.textContent = " X";

 li.classList.add("wydatek-lista");

 li.appendChild(opis);
 li.appendChild(kwota);
 li.appendChild(deleteBtn);

 document.getElementById('przychody-ul').appendChild(li);
  */
