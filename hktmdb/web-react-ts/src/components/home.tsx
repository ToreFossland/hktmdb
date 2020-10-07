import React, { FC, ChangeEvent, useState } from "react";
import { useDataStore } from "../context";
import { observer } from 'mobx-react-lite';


const Home: FC = observer(() => {

        const [query, setQuery] = useState<string>("");
        const store = useDataStore();
        const { data, addData, removeData } = store;
        const handleChange = (e: ChangeEvent<HTMLInputElement>):void => {
            setQuery(e.target.value);
        };
    
    return (
        <div>
            <div>
                <input type="text" value={query} onChange={handleChange} />
                <button onClick={() => addData(query)}>Add data</button>
            </div>
            <ul>
                {data.map((value:string) => (
                    <li>
                        <span>{value}</span>
                        <button onClick={() => removeData(value)}>Remove data</button>
                    </li>
                    ))}
            </ul>
        </div>
    );
});
  
  export default Home;