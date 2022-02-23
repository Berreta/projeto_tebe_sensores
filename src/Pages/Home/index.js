import React, { useState, useEffect, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

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
    //const [xAxes, setX] = useState([]);
    //const [yAxes, setY] = useState([]);


    const handleGraph = () => {

        axios.get(`http://localhost:8080/rota2`).then(res => {
            const xAxis = [];
            const yAxis = [];
            console.log(res);
            const graph = res.data;           
            console.log(res);
            {graph.map((graph) => (
 
                yAxis.push((graph.y))
            ))};                           

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
      <><div className="App">
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
            <button type="bttnGraphOne" value={"rota1"} onClick={() => setBttnValue("rota1"),  handleGraph(bttnValue)}>Gráfico 1</button>
            <button type="bttnGraphTwo" value={"rota2"} onClick={() => setBttnValue("rota2"), handleGraph(bttnValue)}>Gráfico 2</button>
        </div></>
    )
}