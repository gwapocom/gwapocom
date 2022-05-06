/**
 * EasyHTTP Library
 * Library for making HTTP requests
 *
 * @version 2.0.0
 * @author  Brad Traversy
 * @license MIT
 *
 **/

class EasyHTTP{


async get(url){

const response = await fetch(url);

const resData = await response.json();
    
return resData;




}


async post(url, data){
const response = await fetch(url, 


{
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data)

});


    const resData = await response.json();
    return resData;

}


async put(url, data){


const response = await fetch(url, 

{
    method: 'PUT',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(data)




});
    const resData = await response.json();
    return resData; 
}


delete(url){
return new Promise((resolve, reject) =>{
 
fetch(url, 

{
    method: 'DELETE',
    headers: {'Content-type': 'application/json'}

} )



    .then(res => res.json() )
    .then(() => resolve('Resource Deleted'))
    .catch(err => reject(err));
});
}


}



















