import { Chart } from "react-google-charts";

interface Props {
    title : string;
    data : (string | number)[][];
    vAxis : string;
    hAxis: string;
}

export const LineChart : React.FC<Props> = ({title, data, vAxis, hAxis}) => 
{
    const options = {
        title: title,
        backgroundColor: 'transparent',
        vAxis: { title: vAxis},
        hAxis: { title : hAxis}
    };

    console.log(data);

    if (data.length === 0){
      return (<div></div>)
    }

    return (
        <div className="tilebackground">
        <div className="tileforeground">
        <div className="heading">Generation of Energy</div>    
        <Chart
          chartType="LineChart"
          data={data}
          options={options}
          width="100%"
          height="100%"
        />
        </div>
        </div>
      );
}