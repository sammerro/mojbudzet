 /* Przepisywanie transakcji do listy */
 const przychodBtn = document.getElementById('przychod');
 const wydatekBtn = document.getElementById('wydatek');
 const inputKwota = document.querySelector('.wprowadzanie-kwota');
 const inputOpis = document.querySelector('.wprowadzanie-opis');

 const divPrzychod = document.getElementById('sumaPrzychodow');
 const divWydatki = document.getElementById('sumaWydatkow');
 const h1Bilans = document.getElementById('bilans');


 const budzet = new Budzet();


 przychodBtn.addEventListener('click', function () {
     let kwota = inputKwota.value;
     let opis = inputOpis.value;
     if (kwota != '' && opis != '') {
         let trans = new Transakcja(kwota, opis, true);
         trans.dodajDoListy();

         inputKwota.value = '';
         inputOpis.value = '';
     }

 });

 wydatekBtn.addEventListener('click', function () {
     let kwota = inputKwota.value;
     let opis = inputOpis.value;
     if (kwota != '' && opis != '') {
         let trans = new Transakcja(kwota, opis, false);
         trans.dodajDoListy();

         inputKwota.value = '';
         inputOpis.value = '';
     }

 });

 /* BUDZET */
 function Budzet() {
     this.transakcje = new Map();
     this.calyPrzychod = 0;
     this.calyWydatek = 0;
     this.bilans = 0;
 }
 //interfejs dla metody Transakcji dodajDoListy
 Budzet.prototype.dodajTransakcje = function (trans) {
     //dodanie do listy transakcji
     this.transakcje.set(trans.id, trans);
     // aktualizacja pol calyPrzychod, calyDochod i bilans
     let kwota = parseFloat(trans.kwota);
     (trans.czyPlus) ? this.calyPrzychod += kwota: this.calyWydatek += kwota;
     this.bilans = this.calyPrzychod - this.calyWydatek;
     /*     console.log(this.calyPrzychod);
         console.log(this.calyWydatek); */
         divPrzychod.innerHTML = this.calyPrzychod + ' zł';
         h1Bilans.innerHTML = this.bilans + ' zł';
         divWydatki.innerHTML = this.calyWydatek + ' zł';
 }
 //interfejs dla metody Transakcji UsunZListy
 Budzet.prototype.usunTransakcje = function (trans) {
     this.transakcje.delete(trans.id);
     let kwota = parseFloat(trans.kwota);
     (trans.czyPlus) ? this.calyPrzychod -= kwota: this.calyWydatek -= kwota;
     this.bilans = this.calyPrzychod - this.calyWydatek;
     /*     console.log(this.calyPrzychod);
         console.log(this.calyWydatek); */
         divPrzychod.innerHTML = this.calyPrzychod;
         h1Bilans.innerHTML = this.bilans;
         divWydatki.innerHTML = this.calyWydatek;
 }
 // ------------------------------------------------------------


 /*  Budzet.prototype.bilans = function() {
     let przychody = 0;
     let wydatki = 0;
     //callback do forEach
     function podsumuj(trans, key, map) {
         let kwota = parseFloat(trans.kwota);
         (trans.czyPlus === true)? przychody += kwota: wydatki += kwota;
       }
       
     this.transakcje.forEach(podsumuj);

     return new Map([['prz', przychody],['wyd', wydatki],['bil', przychody - wydatki]]);
  } */

 /* TRANSAKCJE */
 function Transakcja(kwota, opis, czyPlus = true) {
     this.kwota = kwota;
     this.opis = opis;
     this.czyPlus = czyPlus;
     Transakcja.numInstances = (Transakcja.numInstances || 0) + 1;
     this.id = Transakcja.numInstances;
 }

 Transakcja.prototype.dodajDoListy = function () {

     const li = document.createElement("li");
     const opis = document.createElement("span");
     const kwota = document.createElement("span");
     const deleteBtn = document.createElement("span");
     //pomocnicze _this dla eventHandlerow     
     let _this = this;

     //Dodanie znacznika w postaci klasy do elementu li:
     li.classList.add('id-' + this.id);

     opis.textContent = this.opis;
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
     budzet.dodajTransakcje(this);
     /*      console.log(budzet.transakcje); */

     li.addEventListener("mouseover", function () {
         deleteBtn.classList.add('aktywny');
     });
     li.addEventListener("mouseleave", function () {
         deleteBtn.classList.remove('aktywny');
     });
     deleteBtn.addEventListener('click', function () {
         budzet.usunTransakcje(_this);
         /*         console.log(budzet.transakcje); */
         li.remove();
     });
     /*     console.log(Transakcja.numInstances);
         console.log(this.id); */
 }





 /*  trans1 = new Transakcja(1000 , "czynsz");
  trans2 = new Transakcja(2000 , "czynsz", false);

  
  trans1.dodajDoListy();
  trans1.dodajDoListy();
  trans1.dodajDoListy();
  trans2.dodajDoListy();
  trans2.dodajDoListy(); */
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