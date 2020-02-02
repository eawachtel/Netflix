export interface Inetflixdatalist {
    data: Inetflixdata[]
}

export interface Inetflixdata {
    netflix_type:string;
    title:string;
    director:string;
    netflix_cast: string;
    country: string;
    date_added:string;
    release_year:number;
    rating:string;
    duration:string;
    listed_in:string;
    description:string;
    showDate:boolean;
}