"use strict";

/*%%%%%%%%%%%%%%%%%%%%%%% Funkcje pomocnicze %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/


//zaokroglenie do 2 miejsc po przecinku
const zaokraglenie = (x) => parseFloat(x.toFixed(2));

// Format na polskie złotowki
const formatWaluta = (x, waluta='zł') => {
    x = zaokraglenie(x);
    let calkowita = Math.floor(x);
    let dziesietna = (x - calkowita).toFixed(2);
    dziesietna = dziesietna.slice(2);
    return `${calkowita},${dziesietna}\xa0${waluta}`;
}
//walidacja inputow
 const walidacja = (opis, kwota) => {
    let komunikat = '';
    inputOpis.classList.remove('zle-dane');
    inputKwota.classList.remove('zle-dane');

    if (kwota === '') {
        komunikat = komunikat.concat("Nie podano kwoty lub podana kwota jest nieprawidłowo zapisana.\n");
        inputKwota.classList.add('zle-dane');
        inputKwota.focus();
    }
    if (kwota < 0 ) {
        komunikat = komunikat.concat("Kwota musi być dodatnia.\n");
        inputKwota.classList.add('zle-dane');
        inputKwota.focus();
    }
    if ( opis === '') {
        komunikat = komunikat.concat("Opis nie może być pusty.\n");
        inputOpis.classList.add('zle-dane');
        inputOpis.focus();
    }


    if (komunikat !== '' ) {
        alert(komunikat);
        return false;
    }
    else return true;
 }
 /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

/* Dzialanie aplikacji %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

 const przychodBtn = document.getElementById('przychod');
 const wydatekBtn = document.getElementById('wydatek');
 const inputKwota = document.querySelector('.wprowadzanie-kwota');
 const inputOpis = document.querySelector('.wprowadzanie-opis');

 const divPrzychod = document.getElementById('sumaPrzychodow');
 const divWydatki = document.getElementById('sumaWydatkow');
 const h1Bilans = document.getElementById('bilans');

 inputOpis.focus();

 const budzet = new Budzet();

 przychodBtn.addEventListener('click', function () {
     let kwota = inputKwota.value;
     let opis = inputOpis.value;
     if (walidacja(opis, kwota)) {
         let trans = new Transakcja(parseFloat(kwota), opis, true);
         trans.dodajDoListy();

         inputKwota.value = '';
         inputOpis.value = '';
     }

 });

 wydatekBtn.addEventListener('click', function () {
     let kwota = inputKwota.value;
     let opis = inputOpis.value;
     if (walidacja(opis, kwota)) {
         let trans = new Transakcja(parseFloat(kwota), opis, false);
         trans.dodajDoListy();

         inputKwota.value = '';
         inputOpis.value = '';
     }

 });

 //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%



 /* BUDZET */
 function Budzet() {
     this.transakcje = new Map();
     this.calyPrzychod = 0;
     this.calyWydatek = 0;
     this.bilans = 0;
 }
 //interfejs dla metody Transakcji dodajDoListy
 Budzet.prototype.dodajTransakcje = function (trans) {
     //dodanie do transakcji do budzetu
     this.transakcje.set(trans.id, trans);
     // aktualizacja pol calyPrzychod, calyDochod i bilans
     let kwota = parseFloat(trans.kwota);
     
    if (trans.czyPlus) {
        this.calyPrzychod = this.calyPrzychod + kwota;        
    }
    else {
        this.calyWydatek = this.calyWydatek + kwota;
    }

     this.bilans = this.calyPrzychod - this.calyWydatek;
     divPrzychod.innerHTML = formatWaluta(this.calyPrzychod);
     h1Bilans.innerHTML = formatWaluta(this.bilans);
     divWydatki.innerHTML = formatWaluta(this.calyWydatek);
 }
 //interfejs dla metody Transakcji UsunZListy
 Budzet.prototype.usunTransakcje = function (trans) {
     this.transakcje.delete(trans.id);
     let kwota = parseFloat(trans.kwota);
     if (trans.czyPlus) {
        this.calyPrzychod = this.calyPrzychod - kwota;        
    }
    else {
        this.calyWydatek = this.calyWydatek - kwota;
    }
     this.bilans = this.calyPrzychod - this.calyWydatek;
     divPrzychod.innerHTML = formatWaluta(this.calyPrzychod);
     h1Bilans.innerHTML = formatWaluta(this.bilans);
     divWydatki.innerHTML = formatWaluta(this.calyWydatek);
 }
 // ------------------------------------------------------------


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


     //Dodanie znacznika w postaci klasy do elementu li:
     li.classList.add('id-' + this.id);

     opis.textContent = this.opis;
     kwota.textContent = formatWaluta(this.kwota);
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


     li.addEventListener("mouseover", function () {
         deleteBtn.classList.add('aktywny');
     });
     li.addEventListener("mouseleave", function () {
         deleteBtn.classList.remove('aktywny');
     });
     deleteBtn.addEventListener('click', () => {
         budzet.usunTransakcje(this);
         li.remove();
     });
 }

