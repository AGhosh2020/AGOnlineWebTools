let date = new Date();
let current_year = date.getFullYear();
let year = document.getElementsByClassName("year");
if(current_year>2023) 
{
        
        year[0].textContent =  "2023-"+current_year;
        year[1].textContent =  "2023-"+current_year;
        year[2].textContent =  "2023-"+current_year;

}
else 
{
    year[0].textContent =  "2023";
    year[1].textContent =  "2023";
    year[2].textContent =  "2023";
}