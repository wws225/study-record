
export class Row{
    constructor (
        public title:string,
        public time:number,
        public id?:string,
        public create_at? : string,
    ){}
    public static newRow(
        id:string,
        title:string,
        time:number,
        create_at:string
    ) : Row {
        return new Row(title,time,id,formatDate(create_at))
    }
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    // getMonth() は0から始まるため、1を足す
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}/${month}/${day}`;
  }