import { useState } from "react";
import axios from "axios";
let loadingDots = 0;

setInterval(function () {
  if (loadingDots == 3) {
    loadingDots = 0;
  }
  try {
    document.getElementById("loading").innerText = `Loading${".".repeat(
      loadingDots + 1
    )}`;
    loadingDots++;
  } catch (e) {}
}, 1000);
function App() {
  axios
    .get("http://localhost:8080/api/v1/bdays")
    .then(({ data }) => {
      setBdays({ data: data.data });
      setLoading(false);
    })
    .catch(console.log);
  const [loading, setLoading] = useState(true);
  const [getBdays, setBdays] = useState({
    data: [
      { Name: "Kiko", BirthDay: "06.08.1988", Relation: "Family" },
      { Name: "Ivaylo", BirthDay: "05.07.2005", Relation: "Family" },
      { Name: "Mihail", BirthDay: "08.08.2007", Relation: "Friend" },
    ],
  });
  if (loading) {
    return (
      <div>
        <h2 id="title">Birthday Service!</h2>
        <div id="bdays-wrapper">
          <h2 id="loading"></h2>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2 id="title">Birthday Service!</h2>
        <div id="bdays-wrapper">
          {getBdays.data.length < 1 ? (
            <h2>No birthdays available right now!</h2>
          ) : (
            getBdays.data.map((data) => {
              return (
                <>
                  <div className="bdays-rows">
                    {Object.keys(data).map((key) => {
                      return (
                        <div>
                          <h2>{key}</h2>
                          <p>{data[key]}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div id="hr" style={{ minWidth: "100%" }}>
                    <hr style={{ minWidth: "100%" }} />
                  </div>
                </>
              );
              console.log(data);
            })
          )}
        </div>
      </div>
    );
  }
}

export default App;
