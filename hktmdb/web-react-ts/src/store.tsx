export function createStore() {
    return {
        data: [] as string[],
        addData(item: string) {
        this.data.push(item);
        },
        removeData(item: string){
        this.data.splice(this.data.indexOf(item), 1)
        },
    };
}
    export type TStore = ReturnType<typeof createStore>;