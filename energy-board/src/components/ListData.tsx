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
      // <table>
      //   <thead>
      //     <tr>
      //         <th>
      //             <h3>{title}</h3>
      //         </th>
      //     </tr>
      //   </thead>
      //   <tbody>
          // {/* <tr> */}
          <div>
            <div className="heading">{title}</div>
            {/* <h3>{title}</h3>
            <ul>
            {data.map(item => <li>{item}</li>)}
            {data.map(item => <li>{item}</li>)}
            </ul> */}
              <div className="list">
              {data.map(item => <li>{item}</li>)}
              </div>
                        

          </div>
          // {/* </tr> */}
        // </tbody>
      // </table>
    );
  }
}