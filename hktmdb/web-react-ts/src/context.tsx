import { useLocalObservable} from 'mobx-react-lite';
//useLocalStore is deprecated and replaced by useLocalObservable
import React from 'react';

import { createStore, TStore } from "./store";



const StoreContext = React.createContext<TStore | null>(null);

export const DataStoreProvider = ({ children }: any) => {
    //Vi gjør store observable
    const store = useLocalObservable(createStore);
    return <StoreContext.Provider value={store}> {children} </StoreContext.Provider>;
};

export const useDataStore = () => {
    const store = React.useContext(StoreContext);
    if (!store) {
        throw new Error('useStore must be used within a StoreProvider.');
    }
    return store;
}
