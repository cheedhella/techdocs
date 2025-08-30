/*
import { User } from './User';
import { Company } from './Company';
*/

// export is optional, why is it needed?
/*
Add new requirement to the interface CustomMap in Map.js, say color: string and try to compile the code;

You will get compilation error in index.js(where you are calling customMap.addMarker(user));

Change User -> User implements Mappable, Company -> Company implements Mappable so that you will get more meaningful error!

ERROR:  Property 'color' is missing in type 'User' but required in type 'Mappable'

If you want the error go away, you need to update User, Company definitions!

*/

export interface Mappable {     
    location: {
        latitude: number,
        longitude: number
    };
    markerContent(): string;
    color: string;
}
export class CustomMap {
    private googleMap: google.maps.Map;
    constructor(mapDivId: string) {
        this.googleMap = new google.maps.Map(document.getElementById(mapDivId), {
            zoom: 1,
            center: { lat: 0, lng: 0 }      // Center of the map will be at (0, 0)
        });
    }

    // Marker: Each location that you want to highlight in the map!
    // Bad code! B/C if you want mark one more type of object(say Park), you need import Park it and write another method addParkMarker();
    /*
    addUserMarker(user: User) {
        new google.maps.Marker({
            map: this.googleMap,
            position: { lat: user.location.latitude, lng: user.location.longitude }
        });
    }

    addCompanyMarker(company: Company) {
        new google.maps.Marker({
            map: this.googleMap,
            position: { lat: company.location.latitude, lng: company.location.longitude }
        });
    }
    */

    // Ok code: B/C if you want mark one more type of object(say Park), you need import Park it and add it to the union type;
    /*
    addMarker(mappable: User | Company) {   // Using mappable(a union type), you can only refer properties that are available in both User and Company; Other TSC will throw an error!
        new google.maps.Marker({
            map: this.googleMap,
            position: { lat: mappable.location.latitude, lng: mappable.location.longitude }
        });
    }
    */

    // Best code
    // You can use interface to define the type of objects that a method accepts;
    // In this case, addMarker accepts any object with location property containing an object with latitude and longitude properties of type number;
    // No need to import User and Company, in this case! No direct references to user and company;
    // User and Company need not to implement Mappable;
    addMarker(mappable: Mappable) {
        const marker = new google.maps.Marker({
            map: this.googleMap,
            position: { lat: mappable.location.latitude, lng: mappable.location.longitude }
        });
        marker.addListener("click", () => {
            const infowindow = new google.maps.InfoWindow({
                content: mappable.markerContent()
            });
            infowindow.open(this.googleMap, marker);
        });
    }

    /*
    If you click on the marker, you will get a pop-up with some information that is relavant to the marker;
    Let's add some information relavant to user and company;
    */

    /*
    // markup shown in the info window!
   const contentString =
   '<div id="content">' +
   '<div id="siteNotice">' +
   "</div>" +
   '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
   '<div id="bodyContent">' +
   "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
   "sandstone rock formation in the southern part of the " +
   "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
   "south west of the nearest large town, Alice Springs; 450&#160;km " +
   "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
   "features of the Uluru - Kata Tjuta National Park. Uluru is " +
   "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
   "Aboriginal people of the area. It has many springs, waterholes, " +
   "rock caves and ancient paintings. Uluru is listed as a World " +
   "Heritage Site.</p>" +
   '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
   "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
   "(last visited June 22, 2009).</p>" +
   "</div>" +
   "</div>";

 const infowindow = new google.maps.InfoWindow({
   content: contentString
 });

 const marker = new google.maps.Marker({
   position: uluru,
   map,
   title: "Uluru (Ayers Rock)",
 });
 marker.addListener("click", () => {
   infowindow.open(map, marker);
 });
*/
}