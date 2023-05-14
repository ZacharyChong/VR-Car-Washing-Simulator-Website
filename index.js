import {
    getDatabase, ref, child, get, set, onValue, orderByChild
    } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


    const db = getDatabase();
    
//[STEP 2] Setup our node/path reference
const lvl0PlayerStatsRef = ref(db, "lvl0playerStats");
const lvl1PlayerStatsRef = ref(db, "lvl1playerStats");
//[STEP 4] Setup our player function to display info

//[STEP 3] Setup our event listener
window.onload(getLvl1Stats(), getLvl2Stats(), getPlayerStats());


function getLvl1Stats() {
 //   e.preventDefault();
      console.log("enter")
      //playerRef is declared at the top using a constant
      //const playerRef = ref(db, "players");
      //get(child(db,`players/`))
      get(lvl0PlayerStatsRef).then((snapshot) => { //retrieve a snapshot of the data using a callback
          if (snapshot.exists()) {
              //if the data exist
              try {
                  //let's do something about it
                  var userName = document.getElementById("userName");
                  var lvl0 = document.getElementById("lvl0");    
                  var LastLoggedInStat = document.getElementById("LastLoggedIn");            
                  var LGIContent = "";          
                  var name = "";
                  var lvl0HS = "";
                  const userKey = localStorage.getItem("key");
                  snapshot.forEach((childSnapshot) => {
                      //looping through each snapshot
                      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
                      if(childSnapshot.key == userKey)
                      {
                            console.log("User key: " + childSnapshot.key);
                            console.log("Username: " + childSnapshot.child("userName").val());
                            console.log("Level 0 High Score: " + childSnapshot.child("lvl0HighScore").val());
                            console.log("Last Logged In: " + childSnapshot.child("updatedOn").val());
                            name += `<tr>
                            <td>${childSnapshot.child("userName").val()}</td>
                            </tr>`;
                            lvl0HS += `<tr>
                            <td>${Math.round(childSnapshot.child("lvl0HighScore").val())}secs</td>
                            </tr>`; 
                            ;
                            LGIContent += `<tr>
                            <td>${new Date(childSnapshot.child("updatedOn").val() * 1000)}</td>
                            </tr>`;    
                      }                                
                  });
                  //update our table content
                  userName.innerHTML = name;
                  lvl0.innerHTML =lvl0HS;
                  LastLoggedInStat.innerHTML = LGIContent;
              } catch (error) {
                  console.log("Error getPlayerData" + error);
              }
          } else {
              //@TODO what if no data ?
          }
      });
  } //end getPlayerData


  function getLvl2Stats() {
    //   e.preventDefault();
         console.log("enter")
         //playerRef is declared at the top using a constant
         //const playerRef = ref(db, "players");
         //get(child(db,`players/`))
         get(lvl1PlayerStatsRef).then((snapshot) => { //retrieve a snapshot of the data using a callback
             if (snapshot.exists()) {
                 //if the data exist
                 try {
                     //let's do something about it
                     var lvl1 = document.getElementById("lvl1");            
                     var lvl1HS = "";
                     const userKey = localStorage.getItem("key");
                     snapshot.forEach((childSnapshot) => {
                         //looping through each snapshot
                         //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
                         if(childSnapshot.key == userKey)
                         {
                                console.log("User key: " + childSnapshot.key);
                                console.log("Level 0 High Score: " + childSnapshot.child("lvl1HighScore").val());

                                lvl1HS += `<tr>
                                <td>${Math.round(childSnapshot.child("lvl1HighScore").val())}secs</td>
                                </tr>`;    
                         }                                      
                     });
                     //update our table content
                     lvl1.innerHTML = lvl1HS;
                 } catch (error) {
                     console.log("Error getPlayerData" + error);
                 }
             } else {
                 //@TODO what if no data ?
             }
         });
     } //end getPlayerData

     function getPlayerStats() {
        //   e.preventDefault();
             console.log("enter")
             //playerRef is declared at the top using a constant
             //const playerRef = ref(db, "players");
             //get(child(db,`players/`))
             get(lvl0PlayerStatsRef).then((snapshot) => { //retrieve a snapshot of the data using a callback
                 if (snapshot.exists()) {
                     //if the data exist
                     try {
                         //let's do something about it
                         var tableContent = document.getElementById("tbody1");            
                         var content = "";

                         snapshot.forEach((childSnapshot) => {
                             //looping through each snapshot
                             //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
                                    console.log("User key: " + childSnapshot.key);
                                    console.log("Level 0 High Score: " + childSnapshot.child("lvl0HighScore").val());
    
                                    content += `<tr>
                                    <td>${childSnapshot.child("userName").val()}</td>
                                    <td>${Math.round(childSnapshot.child("lvl0HighScore").val())} secs</td>
                                    <td>${new Date(childSnapshot.child("updatedOn").val() * 1000)}</td>
                                    </tr>`;                                        
                         });
                         //update our table content
                         tableContent.innerHTML = content;
                     } catch (error) {
                         console.log("Error getPlayerData" + error);
                     }
                 } else {
                     //@TODO what if no data ?
                 }
             });
         } //end getPlayerData


         



  

     