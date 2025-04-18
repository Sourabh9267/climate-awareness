// --- START OF FILE script.js ---

// WARNING: API Key is embedded directly in the code.
// This is generally discouraged for security reasons in production applications.
// It is done here based on user request for this specific context.
const EMBEDDED_API_KEY = "f73a898f8c74a6d09f20d63088b4a9dd"; // Your actual API key

$(document).ready(function () {
  // --- Navbar Active Link Highlighting ---
  const sections = $("section[id]");
  const navLi = $(".navbar-nav .nav-item");
  let scrollTimeout;
  function checkActiveSection() {
    const cur_pos = $(window).scrollTop() + 70;
    let currentSectionId = null;
    sections.each(function () {
      const top = $(this).offset().top;
      if (top <= 1 && $(this).attr("id") !== "home") return;
      const bottom = top + $(this).outerHeight();
      if (cur_pos >= top && cur_pos <= bottom) {
        currentSectionId = $(this).attr("id");
        return false;
      }
    });
    if (!currentSectionId && $(window).scrollTop() < sections.first().offset().top) {
        currentSectionId = 'home';
    }
    navLi.find("a").removeClass("active");
    const activeLink = currentSectionId
      ? navLi.find(`a[href="#${currentSectionId}"]`)
      : navLi.find('a[href="#home"]');
    activeLink.addClass("active");
  }
  checkActiveSection();
  $(window).on("scroll", function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(checkActiveSection, 50);
  });

  // --- Smooth Scrolling ---
  $('.navbar-nav a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    const targetId = this.hash;
    const $target = $(targetId);
    if ($target.length) {
      $("html, body")
        .stop()
        .animate({ scrollTop: $target.offset().top - 56 }, 500, "swing", () => {
            $(e.target).blur();
            checkActiveSection();
        });
    }
  });

// Climate Clock API Integration
  let climateDeadlineTimestamp = null; // Store the fetched deadline
  let clockDisplayInterval = null; // Interval ID for the display updates

  function updateClockDisplay() {
    // Only proceed if we have a valid deadline timestamp
    if (!climateDeadlineTimestamp) {
        // This shouldn't normally be called if the interval is managed correctly,
        // but adding a safeguard.
        console.warn("updateClockDisplay called without a deadline.");
        if (clockDisplayInterval) clearInterval(clockDisplayInterval);
         // Ensure loading isn't stuck if something went wrong before interval start
        if ($("#climate-clock").html().includes("Loading")) {
             displayClockError("Failed to update clock.");
        }
        return;
    }

    const deadline = new Date(climateDeadlineTimestamp).getTime();
    const now = new Date().getTime();
    const timeLeft = deadline - now;

    // Check if the deadline has passed
    if (timeLeft <= 0) {
      $("#climate-clock").html(
        `<span class="text-danger fw-bold">Budget Depleted (Based on Live Data)!</span>`
      );
      if (clockDisplayInterval) clearInterval(clockDisplayInterval); // Stop updating
      return;
    }

    // Calculation constants
    const secondsInDay = 86400;
    const secondsInHour = 3600;
    const secondsInMinute = 60;
    const secondsInYear = 31556952; // Average year length

    let remainingSecondsTotal = Math.floor(timeLeft / 1000);

    // Calculate years, days, hours, minutes, seconds
    const years = Math.floor(remainingSecondsTotal / secondsInYear);
    remainingSecondsTotal -= years * secondsInYear;

    const days = Math.floor(remainingSecondsTotal / secondsInDay);
    remainingSecondsTotal -= days * secondsInDay;

    const hours = Math.floor(remainingSecondsTotal / secondsInHour);
    remainingSecondsTotal -= hours * secondsInHour;

    const minutes = Math.floor(remainingSecondsTotal / secondsInMinute);
    remainingSecondsTotal -= minutes * secondsInMinute;

    const seconds = remainingSecondsTotal;

    // *** Ensure the clock structure exists before updating ***
    // If the clock was showing an error or loading, recreate the spans
    if ($("#clock-years").length === 0) {
        $("#climate-clock").html(
             `<span id="clock-years" style="color:red;">--</span> y : <span id="clock-days" style="color:red !important;">---</span> d : <span style="color:red !important;" id="clock-hours">--</span> h : <span style="color:red !important;" id="clock-minutes">--</span> m : <span style="color:red !important;" id="clock-seconds">--</span>s`
        );
    }

    // Update the DOM elements
    $("#clock-years").text(years);
    $("#clock-days").text(String(days).padStart(3, "0"));
    $("#clock-hours").text(String(hours).padStart(2, "0"));
    $("#clock-minutes").text(String(minutes).padStart(2, "0"));
    $("#clock-seconds").text(String(seconds).padStart(2, "0"));
  }

  // Renamed function for clarity
  function startOrRestartDisplayInterval() {
    // Clear any previous interval
    if (clockDisplayInterval) {
        clearInterval(clockDisplayInterval);
        clockDisplayInterval = null; // Reset interval ID
    }

    // Only start interval if we have a valid deadline
    if (climateDeadlineTimestamp) {
        // Start the interval to update display every second
        clockDisplayInterval = setInterval(updateClockDisplay, 1000);
        console.log("Climate Clock display interval started."); // Debug log
    } else {
         console.warn("Not starting clock interval: No deadline timestamp."); // Debug log
         displayClockError("Failed to start clock update.");
    }
  }

  function displayClockError(message) {
    $("#climate-clock").html(
      `<span class="text-warning small fw-bold">${message}</span>`
    );
    // Stop any running interval if an error occurs
    if (clockDisplayInterval) {
        clearInterval(clockDisplayInterval);
        clockDisplayInterval = null;
    }
  }

  function fetchClimateClockData() {
    const apiUrl = "https://api.climateclock.world/v1/clock";

    // Show loading state initially or during refetch
    // Only show loading if the clock isn't already showing numbers
    if ($("#clock-years").length === 0) {
         $("#climate-clock").html(`<span class="spinner-border spinner-border-sm"></span> Loading...`);
    }

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data?.status === "success" && data?.data?.modules?.carbon_deadline_1?.timestamp) {
          const newTimestamp = data.data.modules.carbon_deadline_1.timestamp;
          console.log("Climate Clock Deadline Fetched:", newTimestamp); // For debugging

          // Check if the timestamp has actually changed or if it's the first fetch
          if (newTimestamp !== climateDeadlineTimestamp) {
                climateDeadlineTimestamp = newTimestamp;
                // *** CRITICAL FIX: Update display immediately after successful fetch ***
                updateClockDisplay();
                // Then start/restart the interval for subsequent updates
                startOrRestartDisplayInterval();
          } else if (!clockDisplayInterval) {
              // If timestamp is the same but interval isn't running (e.g., first load), start it
              startOrRestartDisplayInterval();
          }

        } else {
          console.error("Invalid Climate Clock API data format (timestamp not found as expected):", data);
          throw new Error("Invalid API data format.");
        }
      })
      .catch(error => {
        console.error("Error fetching Climate Clock data:", error);
        displayClockError(`Error fetching data: ${error.message}`);
        climateDeadlineTimestamp = null; // Ensure no stale data is used
        if (clockDisplayInterval) { // Stop updates on error
            clearInterval(clockDisplayInterval);
            clockDisplayInterval = null;
        }
      });
  }

  // Initial fetch on page load
  fetchClimateClockData();

  // Set interval to re-fetch the deadline periodically (e.g., every hour)
  // This updates the actual deadline value from the API without stopping the second-by-second display interval
  setInterval(fetchClimateClockData, 3600 * 1000); // 1 hour

  // --- Weather & Future Climate ---
  // API Key is now embedded directly
  const openWeatherApiKey = EMBEDDED_API_KEY;
  // console.log("Using Embedded API Key:", openWeatherApiKey); // For debugging if needed

  const $weatherInfo = $("#weather-info");
  const $manualForm = $("#manual-location-form");
  const $locationPlaceholders = $(".location-name");

  function fetchWeather(lat, lon) {
    /* Fetches Weather and AQI */
    // REMOVED API Key check here as it's embedded
    if (!openWeatherApiKey) { // Basic check if somehow it's still empty
        console.error("Embedded API Key is missing!");
        displayWeatherError("API Key configuration error.", true);
        return;
    }

    const units = "metric";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${openWeatherApiKey}`;
    const aqUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`;

    $weatherInfo
      .html(
        `<p><span class="spinner-border spinner-border-sm"></span> Fetching weather...</p>`
      )
      .removeClass("border rounded p-3 bg-white");

    Promise.allSettled([fetch(weatherUrl), fetch(aqUrl)])
      .then(handleWeatherResponses)
      .catch(error => {
          console.error("Network or fetch error:", error);
          displayWeatherError("Network error fetching weather.", true);
      });
  }

  function handleWeatherResponses(results) {
    /* Processes fetch responses */
    let weatherPromise = results[0];
    let aqPromise = results[1];
    let weatherData = null;
    let airData = null;
    let locationName = "your area";
    let fetchError = false;

    if (weatherPromise.status === "fulfilled") {
      weatherPromise.value.json()
        .then(data => {
          if (data?.cod === 200 && data?.name) {
            weatherData = data;
            locationName = data.name + (data.sys?.country ? ', ' + data.sys.country : '');
            sessionStorage.setItem("weatherLocationName", locationName);
          } else {
            console.error("Invalid weather data received:", data);
            // Check for specific API key errors from OpenWeatherMap
             if (data?.cod === 401) {
                 throw new Error("Invalid API Key (Unauthorized)");
             } else {
                 throw new Error(data?.message || "Invalid weather data format");
             }
          }

          if (aqPromise.status === "fulfilled") {
             aqPromise.value.json()
               .then(aqD => {
                   if (aqD?.list?.[0]) { airData = aqD; }
               })
               .catch(aqErr => { console.warn("AQI JSON parsing error:", aqErr); })
               .finally(() => {
                   displayWeather(weatherData, airData);
                   updateLocationPlaceholders(locationName);
               });
          } else {
            console.warn("AQI Fetch Error:", aqPromise.reason);
            displayWeather(weatherData, null);
            updateLocationPlaceholders(locationName);
          }
        })
        .catch(err => {
          console.error("Weather processing error:", err);
          displayWeatherError(`Error processing weather: ${err.message}.`, true);
          updateLocationPlaceholders("your area");
          fetchError = true;
        });
    } else {
      console.error("Weather Fetch Error:", weatherPromise.reason);
       // Try to get more specific error info if possible
       let reasonText = weatherPromise.reason?.message || "Could not fetch weather data";
       if (weatherPromise.reason instanceof TypeError && weatherPromise.reason.message.includes('API key')) {
            reasonText = "Invalid API Key (Network Error)"; // Common symptom
       }
      displayWeatherError(`${reasonText}.`, true);
      updateLocationPlaceholders("your area");
      fetchError = true;
    }
  }

  function displayWeather(wData, aData) {
    /* Renders Weather and AQI */
    if (!wData?.main || !wData?.weather?.[0] || !wData?.name || !wData?.sys) {
        console.error("Incomplete weather data passed to displayWeather:", wData);
        displayWeatherError("Received incomplete weather data.", false);
        return;
    }
    const { main, weather, wind, name, sys } = wData;
    const temp = main.temp.toFixed(1);
    const feels = main.feels_like.toFixed(1);
    const desc = weather[0].description.replace(/\b\w/g, (l) => l.toUpperCase());
    const iconCode = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const humidity = main.humidity;
    const windS = wind.speed.toFixed(1);
    const country = sys.country;
    let aqiTxt = "N/A", aqiCls = "text-muted";
    if (aData?.list?.[0]?.main?.aqi) {
        const aqi = aData.list[0].main.aqi;
        aqiTxt = ["Good", "Fair", "Moderate", "Poor", "Very Poor"][aqi - 1] ?? "N/A";
        aqiCls = ["text-success", "text-success", "text-warning", "text-danger", "text-danger fw-bold"][aqi - 1] ?? "text-muted";
    }
    const weatherHtml = `<h4><i class="fas fa-map-marker-alt me-1 text-primary"></i> ${name}, ${country}</h4><div class="d-flex align-items-center justify-content-center mb-1"><img src="${iconUrl}" alt="${desc}" width="50" height="50"><span class="fs-2 fw-bold ms-2">${temp}°C</span></div><p class="mb-1 small text-muted">Feels like ${feels}°C. ${desc}.</p><div class="small d-flex justify-content-center flex-wrap gap-3"><span title="Humidity"><i class="fas fa-tint me-1 text-info"></i> ${humidity}%</span><span title="Wind Speed"><i class="fas fa-wind me-1 text-secondary"></i> ${windS} m/s</span><span title="Air Quality Index"><i class="fas fa-smog me-1 ${aqiCls}"></i> AQI: <span class="${aqiCls}">${aqiTxt}</span></span></div>`;
    $weatherInfo.html(weatherHtml).addClass("border rounded p-3 bg-white");
    $manualForm.addClass("d-none");
  }

  function displayWeatherError(msg, showManual) {
    $weatherInfo.html(`<p class="text-danger mb-0"><i class="fas fa-exclamation-triangle me-1"></i> ${msg}</p>`).removeClass("border rounded p-3 bg-white");
    if (showManual) { $manualForm.removeClass("d-none"); }
    else { $manualForm.addClass("d-none"); }
  }

  function updateLocationPlaceholders(locName) {
    const finalName = sessionStorage.getItem("weatherLocationName") || locName || "your area";
    const cityPart = finalName.split(",")[0].trim() || "your area";
    $locationPlaceholders.text(cityPart);
  }

  function fetchWeatherByCity(city, country, state = "") {
    /* Fetches via City Name */
    // REMOVED API Key check here as it's embedded
    if (!openWeatherApiKey) { // Basic check
        console.error("Embedded API Key is missing!");
        displayWeatherError("API Key configuration error.", false);
        return;
    }
    if (!city || !country) {
        displayWeatherError("City and Country are required.", false);
        return;
    }
    const query = `${city}${state ? "," + state.trim() : ""},${country}`;
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${openWeatherApiKey}`;
    $weatherInfo.html(`<p><span class="spinner-border spinner-border-sm"></span> Looking up ${city}...</p>`).removeClass("border rounded p-3 bg-white");
    fetch(geoUrl)
      .then(response => {
          if (!response.ok) {
              // Check specifically for 401 Unauthorized, which usually means bad API key for Geocoding
              if (response.status === 401) {
                   throw new Error(`Geocoding failed: Invalid API Key (Unauthorized)`);
              }
              throw new Error(`Geocoding failed: ${response.statusText} (Status ${response.status})`);
          }
          return response.json();
       })
      .then(data => {
        if (data && data.length > 0) {
          fetchWeather(data[0].lat, data[0].lon);
        } else {
          throw new Error(`Location "${city}" not found.`);
        }
      })
      .catch(error => {
        console.error("Geocoding or subsequent fetch error:", error);
        displayWeatherError(`Couldn't find weather for ${city}. ${error.message}`, true);
      });
  }

  // Manual Location Form Submission
  $manualForm.on("submit", function (e) {
    e.preventDefault();
    const city = $("#cityInput").val().trim();
    const country = $("#countryInput").val();
    const state = $("#stateInput").val().trim();
    fetchWeatherByCity(city, country, state);
  });

  function tryGeolocation() {
    /* Attempts Geolocation */
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => { fetchWeather(position.coords.latitude, position.coords.longitude); },
        (error) => {
            console.warn("Geolocation Error:", error.message);
            // Don't display the generic "API Key missing" error here, let fetchWeatherByCity handle API issues
            displayWeatherError("Auto location failed. Showing default/manual input.", true);
            fetchWeatherByCity("Ahmedabad", "IN"); // Default fallback
            updateLocationPlaceholders("Ahmedabad (default)");
        },
        { timeout: 8000 }
      );
    } else {
      displayWeatherError("Geolocation unavailable. Showing default/manual input.", true);
      fetchWeatherByCity("Ahmedabad", "IN"); // Default fallback
      updateLocationPlaceholders("Ahmedabad (default)");
    }
  }

  // --- Initial Weather Load ---
  tryGeolocation(); // Attempt geolocation on page load

  // --- Role-Based Duties ---
  const $roleSelector = $("#role-selector");
  const $dutiesDisplay = $("#role-specific-duties-display");
  if (typeof roleDuties === "object" && Object.keys(roleDuties).length > 0) {
    $.each(roleDuties, (categoryKey, categoryData) => {
        if (categoryData?.title) {
            $roleSelector.append($("<option>", { value: categoryKey, text: categoryData.title }));
        }
    });
    $roleSelector.on("change", function () {
      const selectedCategoryKey = $(this).val();
      const categoryData = roleDuties[selectedCategoryKey];
      $dutiesDisplay.empty();
      if (!selectedCategoryKey || !categoryData?.roles) {
        $dutiesDisplay.html('<p class="text-muted text-center">Select a category to see role-specific actions.</p>');
        return;
      }
      let rolesHtml = `<h5 class="text-center fw-normal mb-3">Actions for Roles in ${categoryData.title}:</h5><div class="accordion accordion-flush" id="rolesAccordionInner">`;
      let roleIndex = 0;
      let hasRoles = false;
      $.each(categoryData.roles, (roleKey, roleData) => {
        if (roleData?.title && Array.isArray(roleData.duties) && roleData.duties.length > 0) {
          hasRoles = true;
          const collapseId = `collapse-${selectedCategoryKey}-${roleKey}-${roleIndex}`;
          const headerId = `header-${selectedCategoryKey}-${roleKey}-${roleIndex}`;
          rolesHtml += `<div class="accordion-item"><h2 class="accordion-header" id="${headerId}"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}"><i class="fas fa-user-tie fa-fw me-2"></i> ${roleData.title}</button></h2><div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="${headerId}" data-bs-parent="#rolesAccordionInner"><div class="accordion-body"><ul class="list-unstyled">${roleData.duties.map(duty => `<li><i class="fas fa-check-circle text-success me-1 fa-fw"></i> ${duty}</li>`).join("")}</ul></div></div></div>`;
          roleIndex++;
        }
      });
      rolesHtml += '</div>';
      if (hasRoles) { $dutiesDisplay.html(rolesHtml); }
      else { $dutiesDisplay.html(`<p class="text-warning text-center mt-3">No specific roles with actions listed for ${categoryData.title}.</p>`); }
    });
  } else {
    $dutiesDisplay.html('<p class="text-danger text-center">Role data could not be loaded.</p>');
    $roleSelector.prop('disabled', true);
  }

  // --- Populate Contributors ---
  // **ACTION NEEDED:** Make sure the image paths in data.js are correct!
  const $contribList = $("#contributors-list");
  if (typeof contributors === "object" && Array.isArray(contributors) && contributors.length > 0) {
      $contribList.empty();
      contributors.forEach((person) => {
          const imgHtml = person.image ? `<img src="${person.image}" class="contributor-img rounded-circle mb-3 mx-auto" alt="${person.name}" style="width: 100px; height: 100px; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : '';
          const placeholderHtml = `<div class="contributor-img-placeholder rounded-circle mb-3 mx-auto bg-light d-flex align-items-center justify-content-center" style="${person.image ? 'display:none;' : 'display:flex;'} width: 100px; height: 100px;" title="${person.name}"><i class="fas fa-user fa-2x text-secondary"></i></div>`;
          const linkHtml = (person.link && person.link !== '#') ? `<a href="${person.link}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-primary mt-auto align-self-center">Learn More <i class="fas fa-external-link-alt fa-xs ms-1"></i></a>` : '<div class="mt-auto"></div>';
          $contribList.append(`<div class="col-md-6 col-lg-4 d-flex align-items-stretch"><div class="card h-100 text-center contributor-card mb-4 w-100 shadow-sm p-3">${imgHtml}${placeholderHtml}<div class="card-body d-flex flex-column p-0 pt-2"><h5 class="card-title mt-2 mb-1">${person.name}</h5><p class="card-text flex-grow-1 small text-muted mb-3">${person.description}</p>${linkHtml}</div></div></div>`);
      });
  } else {
      $contribList.html('<p class="text-center text-muted col-12">Contributors data not available.</p>');
  }

  // --- Footer Year ---
  $("#current-year").text(new Date().getFullYear());

  // --- Role Suggestion Modal Logic ---
  $("#submitSuggestionBtn").on("click", function () {
    const form = $("#suggestRoleForm")[0];
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    form.classList.remove('was-validated');
    const category = $("#suggestCategory").val().trim();
    const role = $("#suggestedRole").val().trim();
    const duties = $("#suggestedDuties").val().trim();
    console.log("Role Suggestion Submitted:", { category, role, duties });
    alert("Thank you for your suggestion!");
    const modalInstance = bootstrap.Modal.getInstance($("#suggestRoleModal")[0]);
    if (modalInstance) { modalInstance.hide(); }
    form.reset();
  });
   $('#suggestRoleModal').on('hidden.bs.modal', function () {
      const form = $("#suggestRoleForm")[0];
      form.classList.remove('was-validated');
      form.reset();
   });

  // --- Activate Bootstrap Tooltips ---
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

}); // End (document).ready()