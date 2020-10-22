import { gql, useQuery } from '@apollo/client';
import React, { ChangeEvent, useState } from 'react';
import { useDataStore } from "../context";
import { useObserver } from 'mobx-react-lite';


const Test = () => {
    const store = useDataStore();
    return useObserver(() => (
        <ul>
        {store.data.map((value:string) => (
            <li>
                <span>{value}</span>
                <button onClick={() => store.removeData(value)}>Remove data</button>
            </li>
            ))}
        </ul>
    ))
}


const MovieInput = ({ ...props }) => {
    const [query, setQuery] = useState<string>("");

    const store = useDataStore();
    console.log(store.data)

    const handleChange = (e: ChangeEvent<HTMLInputElement>):void => {
        setQuery(e.target.value);
    };

    return (
        <div>
            <input type="text" value={query} onChange={handleChange} />
            <button onClick={() => store.addData(query)}>Add data</button>
        </div>
    )
}


const MobxExample= () => {
    return (
        <div>
            <MovieInput/>
            <Test/>
        </div>
    );
  }

  export default MobxExample;