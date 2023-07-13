import { CurrentFuelUsage } from "../interfaces/CurrentFuelUsage";
import { Chart } from "react-google-charts";

interface Props {
    title : string;
    data : (string | number)[][];
}

export const ListData : React.FC<Props> = ({title, data}) => 
  {
  console.log(data.length);
  if (data == null){
    return (<div>No data found</div>)
  }
  else{
    return(
          <div>
            <div className="heading">{title}</div>
              <div className="list">
              {data.map(item => <li>{item}</li>)}
              </div>
          </div>
    );
  }
}