import { gql, useQuery } from '@apollo/client';
import React, { ChangeEvent, useState } from 'react';
import { useDataStore } from "../context";
import { useObserver } from 'mobx-react-lite';


const MobxExample= () => {
    const dataStore = useDataStore();
    return useObserver(() => (
        <div>
            <p>{dataStore.currentResultId}</p>
            <p>{dataStore.currentPersonId}</p>
        </div>
    ))
  }

  export default MobxExample;