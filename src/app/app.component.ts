import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

interface Futbolcu {
  ad: string;
  mevki: string;
  deger: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ad: string = '';
  mevki: string = 'kaleci';
  deger: number | null = null;

  kaleciListesi: Futbolcu[] = [
    { ad: 'Dominik Livaković', mevki: 'kaleci', deger: 9000000 },
    { ad: 'İrfan Can Eğribayat', mevki: 'kaleci', deger: 2800000 },
    { ad: 'Tarık Çetin', mevki: 'kaleci', deger: 325000 }
  ];

  stoperBekListesi: Futbolcu[] = [
    { ad: 'Milan Škriniar', mevki: 'stoperbek', deger: 15000000 },
    { ad: 'Jayden Oosterwolde', mevki: 'stoperbek', deger: 13000000 },
    { ad: 'Yusuf Akçiçek', mevki: 'stoperbek', deger: 12000000 },
    { ad: 'Nélson Semedo', mevki: 'stoperbek', deger: 9000000 }
  ];

  ortaSahaListesi: Futbolcu[] = [
    { ad: 'Sofyan Amrabat', mevki: 'orta', deger: 17000000 },
    { ad: 'Sebastian Szymański', mevki: 'orta', deger: 15000000 },
    { ad: 'İsmail Yüksek', mevki: 'orta', deger: 11000000 },
    { ad: 'Fred', mevki: 'orta', deger: 10000000 }
  ];

  kanatListesi: Futbolcu[] = [
    { ad: 'Cengiz Ünder', mevki: 'kanat', deger: 7500000 },
    { ad: 'İrfan Can Kahveci', mevki: 'kanat', deger: 7000000 }
  ];

  forvetListesi: Futbolcu[] = [
    { ad: 'Jhon Durán', mevki: 'forvet', deger: 35000000 },
    { ad: 'Youssef En‑Nesyri', mevki: 'forvet', deger: 24000000 },
    { ad: 'Oğuz Aydın', mevki: 'forvet', deger: 11000000 }
  ];

  duzenlemeIndex: number | null = null;
  duzenlemeKategori: string = '';

  kategoriEtiketleri: string[] = ['Kaleciler', 'Stoper/Bekler', 'Orta Sahalar', 'Kanatlar', 'Forvetler'];
  kategoriDegerleri: number[] = [];

  // Pie Chart (Sadece değerler ve renkler)
public pieChartOptions1: ChartOptions<'pie'> = { responsive: true };
public pieChartData1: ChartConfiguration<'pie'>['data'] = {
  labels: this.kategoriEtiketleri,
  datasets: [
    {
      data: [], // grafikVerisiniGuncelle() ile doldurulacak
      backgroundColor: [
        '#007bff',
        '#28a745',
        '#ffc107',
        '#17a2b8',
        '#dc3545'
      ],
      borderWidth: 1
    }
  ]
};


// Radar Chart
public radarChartOptions1: ChartOptions<'radar'> = { responsive: true };
public radarChartData1: ChartConfiguration<'radar'>['data'] = {
  labels: this.kategoriEtiketleri,
  datasets: [
    {
      data: [],
      label: 'Piyasa Değeri',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      pointBackgroundColor: 'rgba(255, 99, 132, 1)'
    }
  ]
};

// Bar Chart
public barChartOptions1: ChartOptions<'bar'> = { responsive: true };
public barChartData1: ChartConfiguration<'bar'>['data'] = {
  labels: this.kategoriEtiketleri,
  datasets: [
    {
      data: [],
      label: 'Piyasa Değeri',
      backgroundColor: ['#007bff', '#28a745', '#ffc107', '#17a2b8', '#dc3545']
    }
  ]
};

  constructor() {
    this.grafikVerisiniGuncelle();
  }

  ekle() {
    if (!this.ad.trim() || this.deger === null) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }
    const yeniFutbolcu: Futbolcu = { ad: this.ad.trim(), mevki: this.mevki, deger: this.deger };
    if (this.duzenlemeIndex !== null) {
      this.guncelleFutbolcu(yeniFutbolcu);
    } else {
      this.kategoriyeEkle(yeniFutbolcu);
    }
    this.ad = '';
    this.deger = null;
    this.mevki = 'kaleci';
    this.duzenlemeIndex = null;
    this.duzenlemeKategori = '';
    this.grafikVerisiniGuncelle();
  }

  private kategoriyeEkle(futbolcu: Futbolcu) {
    switch (futbolcu.mevki) {
      case 'kaleci': this.kaleciListesi.push(futbolcu); break;
      case 'stoperbek': this.stoperBekListesi.push(futbolcu); break;
      case 'orta': this.ortaSahaListesi.push(futbolcu); break;
      case 'kanat': this.kanatListesi.push(futbolcu); break;
      case 'forvet': this.forvetListesi.push(futbolcu); break;
    }
  }

  sil(kategori: string, index: number) {
    switch (kategori) {
      case 'kaleci': this.kaleciListesi.splice(index, 1); break;
      case 'stoperbek': this.stoperBekListesi.splice(index, 1); break;
      case 'orta': this.ortaSahaListesi.splice(index, 1); break;
      case 'kanat': this.kanatListesi.splice(index, 1); break;
      case 'forvet': this.forvetListesi.splice(index, 1); break;
    }
    this.grafikVerisiniGuncelle();
  }

  duzenle(kategori: string, index: number) {
    let secilen: Futbolcu;
    switch (kategori) {
      case 'kaleci': secilen = this.kaleciListesi[index]; break;
      case 'stoperbek': secilen = this.stoperBekListesi[index]; break;
      case 'orta': secilen = this.ortaSahaListesi[index]; break;
      case 'kanat': secilen = this.kanatListesi[index]; break;
      case 'forvet': secilen = this.forvetListesi[index]; break;
      default: return;
    }
    this.ad = secilen.ad;
    this.mevki = secilen.mevki;
    this.deger = secilen.deger;
    this.duzenlemeIndex = index;
    this.duzenlemeKategori = kategori;
  }

  private guncelleFutbolcu(futbolcu: Futbolcu) {
    switch (this.duzenlemeKategori) {
      case 'kaleci': this.kaleciListesi[this.duzenlemeIndex!] = futbolcu; break;
      case 'stoperbek': this.stoperBekListesi[this.duzenlemeIndex!] = futbolcu; break;
      case 'orta': this.ortaSahaListesi[this.duzenlemeIndex!] = futbolcu; break;
      case 'kanat': this.kanatListesi[this.duzenlemeIndex!] = futbolcu; break;
      case 'forvet': this.forvetListesi[this.duzenlemeIndex!] = futbolcu; break;
    }
  }

  getKategoriToplam(liste: Futbolcu[]): number {
    return liste.reduce((toplam, oyuncu) => toplam + oyuncu.deger, 0);
  }

  grafikVerisiniGuncelle() {
  this.kategoriDegerleri = [
    this.getKategoriToplam(this.kaleciListesi),
    this.getKategoriToplam(this.stoperBekListesi),
    this.getKategoriToplam(this.ortaSahaListesi),
    this.getKategoriToplam(this.kanatListesi),
    this.getKategoriToplam(this.forvetListesi)
  ];

  // Pie chart
  this.pieChartData1.datasets[0].data = this.kategoriDegerleri;

  // Radar chart
  this.radarChartData1.datasets[0].data = this.kategoriDegerleri;

  // Bar chart
  this.barChartData1.datasets[0].data = this.kategoriDegerleri;
}

}
