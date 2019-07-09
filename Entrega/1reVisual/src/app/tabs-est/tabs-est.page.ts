import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { Chart } from "chart.js";


@Component({
  selector: 'app-tabs-est',
  templateUrl: './tabs-est.page.html',
  styleUrls: ['./tabs-est.page.scss'],
})
export class TabsEstPage implements OnInit {

  @ViewChild('canvasLindas') canvasLindas;
  graficoLinda: any;
  @ViewChild('canvasFeas') canvasFeas;
  graficoFeas: any;
 
  estadisticas: any;
  // OrdenGenerales: { leyenda: string, votos: number }[] = [];
  cosaslindas: { leyenda: string, votos: number }[] = [];
  cosasfeas: { leyenda: string, votos: number }[] = [];
  // limpiezas: { leyenda: string, votos: number }[] = [];


  constructor( private dbService: FirebaseService) {

    this.dbService.getItems("cosasEdificio").then(est => {
      this.estadisticas = est;
      // this.agruparOrdenGenerales();
      // this.crearGraficoOrdenGenerales();
      this.agruparcosaslindas();
      this.creargraficoLindas();
      this.agruparcosasfeas();
      this.crearGraficocosasfeas();
     
    });

   }

  ngOnInit() {
  }


  agruparcosaslindas() {
    console.log(this.estadisticas);
    this.estadisticas.forEach(esta => {

      let result = this.cosaslindas.find(conf => conf.leyenda == esta.likes );
        if (result) {
          result.votos += 1;
        } else {
          this.cosaslindas.push({ leyenda: esta.likes, votos: 1 });
        }
     
    });
  }

  creargraficoLindas() {
    let leyendas: string[] = [];
    let valores: number[] = [];
    this.cosaslindas.forEach(conf => {
      leyendas.push(conf.leyenda);
      valores.push(conf.votos);
    });
    this.graficoLinda = new Chart(this.canvasLindas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: leyendas,
        datasets: [{
          label: '',
          data: valores,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }
    });
  }


  agruparcosasfeas() {
    this.estadisticas.forEach(esta => {
      let result = this.cosasfeas.find(conf => conf.leyenda == esta.likes);
      if (result) {
        result.votos += 1;
      } else {
        this.cosasfeas.push({ leyenda: esta.likes, votos: 1 });
      }
    });
  }

  crearGraficocosasfeas() {
    let leyendas: string[] = [];
    let valores: number[] = [];
    this.cosasfeas.forEach(limpi => {
      leyendas.push(limpi.leyenda);
      valores.push(limpi.votos);
    });
    this.graficoFeas = new Chart(this.canvasFeas.nativeElement, {

      type: 'bar',
      data: {
        labels: leyendas,
        datasets: [{
          label: '',
          data: valores,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384"
          ]
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
