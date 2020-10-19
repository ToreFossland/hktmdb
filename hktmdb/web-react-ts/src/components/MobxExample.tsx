import { gql, useQuery } from '@apollo/client';
import React, { ChangeEvent, useState } from 'react';
import { useDataStore } from "../context";
import { observer } from 'mobx-react-lite';



const MobxExample = ({ ...props }) => {
    const [query, setQuery] = useState<string>("");

    const store = useDataStore();
    console.log(store.data)

    const handleChange = (e: ChangeEvent<HTMLInputElement>):void => {
        setQuery(e.target.value);
    };


    return (

    <div id="mobxExample">
    <div>
        <input type="text" value={query} onChange={handleChange} />
        <button onClick={() => store.addData(query)}>Add data</button>
    </div>
        <ul>
            {store.data.map((value:string) => (
                <li>
                    <span>{value}</span>
                    <button onClick={() => store.removeData(value)}>Remove data</button>
                </li>
                ))}
        </ul>
    </div>
    )
}

export default MobxExample;