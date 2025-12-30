let serviceTypes = ["delivery", "shopping", "errands"];
let selectedServiceType = "delivery";
let svg = document.getElementById(selectedServiceType).querySelector("svg");
document.getElementById(selectedServiceType).classList.add("selected-service");
console.log(`Default service type: ${selectedServiceType}`);

const serviceTypeButtons = document.querySelectorAll(".service-option");
serviceTypeButtons.forEach((button) => {
  //Remove all the stylings when another button is clicked
  button.addEventListener("click", (event) => {
    serviceTypeButtons.forEach((btn) => {
      btn.classList.remove("selected-service");
      btn.querySelector("svg").style.fill = "black";
    });
    //Add styling to the selected button
    selectedServiceType = event.currentTarget.id;
    svg = event.currentTarget.querySelector("svg");
    event.currentTarget.classList.add("selected-service");
    svg.style.fill = "white";
    console.log(`Selected service type: ${selectedServiceType}`);

    //Check out for the service that was selected and customize the form to meet it
    if (
      selectedServiceType === "delivery" ||
      selectedServiceType === "errands"
    ) {
      document.querySelector(".service-details").innerHTML = `
   <label for="details"
            >Service Details</label
          >
          <textarea
            id="details"
            name="request_details"
            placeholder="Please describe what needs to be done. Example go buy me an airpod from Kejetia"
            required
          ></textarea>
  `;
    } else if (selectedServiceType === "shopping") {
      document.querySelector(".service-details").innerHTML = `
      <label for="details"
            >Enter Shopping list</label
          >
          <textarea
            id="details"
            name="request_details"
            placeholder="Please describe what needs to be done. Example: Airpod pro case, A bag of Rice, A bottle of Oil"
            required
          ></textarea>

  `;
    }
    if (selectedServiceType == "shopping") {
      document.querySelector(".locations-info").innerHTML = `
          <label for="delivery-location"
            >Delivery Location</label
          >
          <input
            type="text"
            id="delivery-location"
            name="delivery_location"
            required
            placeholder="Where should your package be delivered to"
          />
      `;
    } else if (selectedServiceType === "errands") {
      document.querySelector(".locations-info").innerHTML = `
          <label for="destination"
            >Destination</label
          >
          <input
            type="text"
            id="destination"
            name="errand_destination"
            placeholder="Where is the errand destination"
            required
          />
            <label for="delivery-location"
            >Delivery Location</label
          >
          <input
            type="text"
            id="delivery-location"
            name="delivery_location"
            placeholder="Where should your package be delivered to"
            required
          />
      `;
    } else if (selectedServiceType === "delivery") {
      document.querySelector(".locations-info").innerHTML = `
          <label for="pick-up"
            >Pick up Location</label
          >
          <input
            type="text"
            id="pick-up"
            name="pickup_location"
            placeholder="Please Enter where we are supposed to pickup the package"
            required
          />
          <label for="drop-off"
            >Drop-off Location</label
          >
          <input
            type="text"
            id="drop-off"
            name="dropoff_location"
            placeholder="Where should we drop off the package"
            required
          />
      `;
    }
  });
});
const form = document.querySelector("#service-request-form");
const submitButton = form.querySelector(".submit-button");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("service-type").value = selectedServiceType;
  if (!selectedServiceType) {
    alert("Please select a service type before submitting the form.");
    return;
  }
  const formData = new FormData(form);
  const backend_url =
    "https://errand-app-backend.onrender.com/api/service_requests/";
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
  fetch(backend_url, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    });
});

//You can add more functionality here such as updating a hidden input field in the form to reflect the selected service type.
