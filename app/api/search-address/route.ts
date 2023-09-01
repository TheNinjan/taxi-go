import { NextResponse } from "next/server";
const BASE_URL="https://api.mapbox.com/search/searchbox/v1/suggest"
export async function GET(request:any) {

    const {searchParams}=new URL(request.url);
    const searchText=searchParams.get('q');
    const res=await fetch(`${BASE_URL}?q=${searchText}&language=en&limit=6&session_token=f2a750d4-8cab-4833-a88c-b9eb6169a123&access_token=pk.eyJ1IjoidGhlbmluamFuIiwiYSI6ImNsbHA2cmxzcjAzaGQzZ3BzbnM0bnp2ZGwifQ.uxKf-dQC1sKqGwFIo0vhSA`,
    {
        headers:{
            "Content-Type": "application/json"
        }
    })
    // console.log(res);
    
    const searchResult=await res.json();
    // console.log(searchResult)
    return NextResponse.json(searchResult)
    
}