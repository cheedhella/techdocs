import { User } './User';
import { Company } './Company';
import { CustomMap } from './Map';

const user = new User();
const c1 = new Company();
const customMap = new CustomMap('mapDiv');
customMap.addMarker(user);
customMap.addMarker(c1);

/*
Generating an API Key
    - Generate/Create a Google Dev Project at http://console.developers.google.com  // This requires a google account!
    - Enable Google Map support inside the project; // This project allows us to show google maps on our page;
    - Generate an API Key
    - Add Google Map's script tag our HTML file;

The next video shows how to hook up Google Maps by generating an API key on the Google Developer's Console.  Creating an API key requires a Google Developer account with billing enabled.  This means you have to have a credit card tied to your Google account.

If you do not have a credit card tied to your Google account, or do not want to add one, then please use this pre-generated API key instead:

AIzaSyBNLrJhOMz6idD05pzfn5lhA-TAw-mAZCU

You can skip the entire next video.  After the next video, your index.html file should look like this:

    <html>
      <body>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNLrJhOMz6idD05pzfn5lhA-TAw-mAZCU"></script>
        <script src="./src/index.ts"></script>
      </body>
    </html>
*/

/*
google apis should be added before index.ts file! 
            Once browser loads it(once you see http 200 response in network tab), an object named google is available;

But, if you try to access the global object named 'google' in any of the ts files, you will get an error;
So, you need to tell TypeScript about google and methods available on google object;
To do so, we need to install another type definition file: @types/googlemaps
It tells TypeScript about the global property named 'google' and different methods available on it;

We use Type Definition file not only for npm modules, but also for external libraries; 
*/


