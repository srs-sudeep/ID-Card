const temp= [
    {
        text : "hello",
        id : "1"
    },
    {
        text : "world",
        id : "2"
    },
    {
        text : "what",
        id : "3"
    },
    {
        text : "4",
        id : "4"
    },
    {
        text : "5",
        id : "5"
    },
    {
        text : "hello",
        id : "6"
    }
]

const fil =(val) =>{
    if(val.id < 3)
    return true
}

const arr = temp.filter(fil);

console.log(arr[0].text);