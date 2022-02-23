import React, { useState, useEffect, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import * as S from './styled';

function timeConverter(tmp){
    var a = new Date(tmp * 1000);
    var months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

export default function App(props) {

    const [chartData, setChartData] = useState([]);
    const [bttnValue, setBttnValue] = useState([]);


    const handleGraph = () => {

        axios.get(`http://localhost:8080/${bttnValue}`).then(res => {
            const xAxis = [];
            const yAxis = [];
            console.log(res);
            
            const graph = res.data;           

        graph.map((graph) => {
            xAxis.push((timeConverter(graph.x)));
            yAxis.push((parseInt(graph.y)));
        });               


            setChartData({
                labels: xAxis,
                dataset: [
                    {   
                        data: yAxis,
                        backgroundColor: ["rgba(75, 192, 192, 0.6)"],
                        borderWidth: 4
                    } 
                ]
            });
        })
            .catch(err => {
               console.log(err);
            });     
    }

    useEffect(() => {
        handleGraph();
      }, []);

    return(
      <S.Container><div className="App">
            <div>
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        title: { text: "Graph", display: true },
                        scales: {
                            yAxis: [
                                {
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 10,
                                        beginAtZero: true
                                    },
                                    gridLines: {
                                        display: true
                                    }
                                }
                            ],
                            xAxis: [
                                {
                                    gridLines: {
                                        display: true
                                    }
                                }
                            ]
                        }
                    }} />
            </div>
            
        </div>
        <div>
            <S.Button type="bttnGraphOne" value={"rota1"} onClick={() => setBttnValue("rota1"),  handleGraph(bttnValue)}>Gráfico 1</S.Button>
            <S.Button type="bttnGraphTwo" value={"rota2"} onClick={() => setBttnValue("rota2"), handleGraph(bttnValue)}>Gráfico 2</S.Button>
        </div>
        </S.Container>
    )
}