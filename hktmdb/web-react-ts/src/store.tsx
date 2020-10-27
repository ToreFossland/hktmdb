

export function createStore() {
     
    return {

        filterProps: new Map([
            ["searchInput", "---"],
            ["firstYear", "0"],
            ["secondYear", "2020"],
            ["movieFilterType", "title"],
            ["personFilterType", "name"],
            ["dataFilterType", "Movie"]
        ]),
        addFilterProps(key:string, value:string) {this.filterProps.set(key, value)}, 

        searchResults: [] as string[],
        addsearchResults(item: string) {this.searchResults.push(item);},
        removesearchResults(item: string){this.searchResults.splice(this.searchResults.indexOf(item), 1)},
        



        currentResultId: "1",
        addCurrentResultId(item: string) {this.currentResultId = item},
        removeCurrentResultId(){this.currentResultId=""},


        currentPersonId: "142",
        addCurrentPersonId(item: string) {this.currentPersonId = item},
        removeCurrentPersonId(){this.currentPersonId=""},
    };
}





export type TStore = ReturnType<typeof createStore>;

