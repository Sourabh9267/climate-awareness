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
      if (top === 0 && $(this).attr("id") !== "home") return; // Skip if offset invalid (rare case)
      const bottom = top + $(this).outerHeight();
      if (cur_pos >= top && cur_pos <= bottom) {
        currentSectionId = $(this).attr("id");
      }
    });
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
        .animate({ scrollTop: $target.offset().top - 56 }, 500, "swing", () =>
          $(e.target).blur()
        );
    }
  });

  // --- Climate Clock ---
  const clockInterval = setInterval(updateClimateClock, 1000); // Store interval ID
  function updateClimateClock() {
    const deadline = new Date("2030-01-01T00:00:00Z").getTime(); // Placeholder - UPDATE!
    const now = new Date().getTime();
    const timeLeft = deadline - now;
    if (timeLeft <= 0) {
      $("#climate-clock").html(
        `<span class="text-danger fw-bold">Time is Up!</span>`
      );
      clearInterval(clockInterval);
      return;
    }
    const years = Math.floor(timeLeft / (365.25 * 86400000));
    const days = Math.floor((timeLeft / 86400000) % 365.25);
    const hours = Math.floor((timeLeft / 3600000) % 24);
    const minutes = Math.floor((timeLeft / 60000) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    $("#clock-years").text(years);
    $("#clock-days").text(String(days).padStart(3, "0"));
    $("#clock-hours").text(String(hours).padStart(2, "0"));
    $("#clock-minutes").text(String(minutes).padStart(2, "0"));
    $("#clock-seconds").text(String(seconds).padStart(2, "0"));
  }
  updateClimateClock(); // Initial call
const apii='__API_KEY__';

  // --- Weather & Future Climate ---
  const $weatherInfo = $("#weather-info");
  const $manualForm = $("#manual-location-form");
  const $locationPlaceholders = $(".location-name");
  const openWeatherApiKey = apii; // !!! <<<=== PASTE YOUR REAL KEY HERE ===!!!

  function fetchWeather(lat, lon) {
    /* Fetches Weather and AQI */ if (
      !openWeatherApiKey ||
      openWeatherApiKey === apii
    ) {
      displayWeatherError("API Key needed for weather.", false);
      console.error("OWM Key missing!");
      return;
    }
    const units = "metric";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${openWeatherApiKey}`;
    const aqUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`;
    $weatherInfo
      .html(
        `<p><span class="spinner-border spinner-border-sm"></span> Fetching weather...</p>`
      )
      .removeClass("border rounded p-3 bg-white"); // Show loading
    Promise.allSettled([fetch(weatherUrl), fetch(aqUrl)]).then(
      handleWeatherResponses
    );
  }
  function handleWeatherResponses(results) {
    /* Processes fetch responses */ let weatherData = null,
      airData = null,
      locationName = "your area";
    if (results[0].status === "fulfilled") {
      // Weather promise
      const weatherResult = results[0].value;
      weatherResult
        .json()
        .then((data) => {
          if (data?.cod === 200 && data?.name) {
            weatherData = data;
            locationName = data.name;
            sessionStorage.setItem("weatherLocationName", locationName);
          } else {
            throw new Error(data?.message || "Invalid weather data");
          }
          // Check AQI only after successful weather fetch
          if (results[1].status === "fulfilled") {
            results[1].value
              .json()
              .then((aqD) => {
                if (aqD?.list?.[0]) airData = aqD;
              })
              .catch(() => {
                /* ignore AQI parse error*/
              })
              .finally(() => {
                displayWeather(weatherData, airData);
                updateLocationPlaceholders(locationName);
              });
          } else {
            console.warn("AQI Fetch Error:", results[1].reason);
            displayWeather(weatherData, null);
            updateLocationPlaceholders(locationName);
          }
        })
        .catch((err) => {
          console.error("Weather processing error:", err);
          displayWeatherError("Error processing weather data.", true);
          updateLocationPlaceholders("your area");
        });
    } else {
      console.error("Weather Fetch Error:", results[0].reason);
      displayWeatherError("Could not fetch weather data.", true);
      updateLocationPlaceholders("your area");
    }
  }
  function displayWeather(wData, aData) {
    /* Renders Weather and AQI */ if (
      !wData?.main ||
      !wData?.weather?.[0] ||
      !wData?.name
    ) {
      displayWeatherError("Incomplete weather data.", false);
      return;
    }
    const { main, weather, wind, name, sys } = wData;
    const temp = main.temp.toFixed(1);
    const feels = main.feels_like.toFixed(1);
    const desc = weather[0].description.replace(/\b\w/g, (l) =>
      l.toUpperCase()
    );
    const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    const humidity = main.humidity;
    const windS = wind.speed.toFixed(1);
    const country = sys.country;
    let aqiTxt = "N/A",
      aqiCls = "text-muted";
    if (aData?.list?.[0]?.main?.aqi) {
      const aqi = aData.list[0].main.aqi;
      aqiTxt = ["Good", "Fair", "Mod.", "Poor", "V. Poor"][aqi - 1] ?? "N/A";
      aqiCls =
        [
          "text-success",
          "text-success",
          "text-warning",
          "text-danger",
          "text-danger fw-bold",
        ][aqi - 1] ?? "text-muted";
    }
    $weatherInfo
      .html(
        `<h4><i class="fas fa-map-marker-alt me-1 text-primary"></i> ${name}, ${country}</h4><div class="d-flex align-items-center justify-content-center mb-1"><img src="${icon}" alt="${desc}" width="50" height="50"><span class="fs-2 fw-bold ms-2">${temp}°C</span></div><p class="mb-1 small text-muted">Feels like ${feels}°C. ${desc}.</p><div class="small d-flex justify-content-center flex-wrap gap-3"><span title="Humidity"><i class="fas fa-tint me-1 text-info"></i>${humidity}%</span><span title="Wind Speed"><i class="fas fa-wind me-1 text-secondary"></i>${windS} m/s</span><span title="Air Quality Index"><i class="fas fa-smog me-1 ${aqiCls}"></i>AQI: <span class="${aqiCls}">${aqiTxt}</span></span></div>`
      )
      .addClass("border rounded p-3 bg-white"); // Add container style on success
    $manualForm.addClass("d-none"); // Hide manual form
  }
  function displayWeatherError(msg, showManual) {
    $weatherInfo
      .html(
        `<p class="text-danger mb-0"><i class="fas fa-exclamation-triangle me-1"></i> ${msg}</p>`
      )
      .removeClass("border rounded p-3 bg-white");
    if (showManual) $manualForm.removeClass("d-none");
  }
  function updateLocationPlaceholders(locName) {
    $locationPlaceholders.text(
      locName ? locName.split(",")[0].trim() : "your area"
    );
  }
  function fetchWeatherByCity(city, country, state) {
    /* Fetches via City Name */ if (
      !openWeatherApiKey ||
      openWeatherApiKey === apii
    ) {
      displayWeatherError("API Key needed.", false);
      return;
    }
    const query = `${city}${state ? "," + state : ""},${country}`;
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      query
    )}&limit=1&appid=${openWeatherApiKey}`;
    $weatherInfo
      .html(
        `<p><span class="spinner-border spinner-border-sm"></span> Looking up ${city}...</p>`
      )
      .removeClass("border rounded p-3 bg-white");
    fetch(geoUrl)
      .then((r) => r.json())
      .then((d) => {
        if (d?.length > 0) fetchWeather(d[0].lat, d[0].lon);
        else throw new Error("Not found");
      })
      .catch((e) =>
        displayWeatherError(`Couldn't find weather for ${city}.`, true)
      );
  }
  $manualForm.on("submit", function (e) {
    e.preventDefault();
    fetchWeatherByCity(
      $("#cityInput").val().trim(),
      $("#countryInput").val(),
      $("#stateInput").val().trim()
    );
  });
  function tryGeolocation() {
    /* Attempts Geolocation */ if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (p) => fetchWeather(p.coords.latitude, p.coords.longitude),
        (e) => {
          console.warn("Geo Error:", e.message);
          displayWeatherError("Auto location failed.", true);
          fetchWeatherByCity("Ahmedabad", "IN");
          updateLocationPlaceholders("Ahmedabad (default)");
        },
        { timeout: 7000 }
      );
    } else {
      displayWeatherError("Geolocation unavailable.", true);
      fetchWeatherByCity("Ahmedabad", "IN");
      updateLocationPlaceholders("Ahmedabad (default)");
    }
  }
  tryGeolocation(); // Attempt on load

  // --- Role-Based Duties ---
  const $roleSelector = $("#role-selector");
  const $dutiesDisplay = $("#role-specific-duties-display");
  if (typeof roleDuties === "object" && Object.keys(roleDuties).length > 0) {
    $.each(roleDuties, (key, cat) =>
      $roleSelector.append($("<option>", { value: key, text: cat.title }))
    );
  } else {
    $dutiesDisplay.html('<p class="text-warning">Role data unavailable.</p>');
  }
  $roleSelector.on("change", function () {
    /* Handles Role Display */ const key = $(this).val();
    const catData = roleDuties[key];
    $dutiesDisplay.empty();
    if (!key || !catData?.roles) {
      $dutiesDisplay.html('<p class="text-muted">Select category.</p>');
      return;
    }
    let html = `<h5 class="text-center fw-normal mb-3">Actions for Roles in ${catData.title}:</h5><div class="accordion accordion-flush" id="rolesAccordionInner">`;
    let i = 0;
    $.each(catData.roles, (rKey, rData) => {
      if (rData?.title && rData?.duties?.length > 0) {
        const cId = `c-${key}-${rKey}-${i}`;
        const hId = `h-${key}-${rKey}-${i}`;
        html += `<div class="accordion-item"><h2 class="accordion-header" id="${hId}"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${cId}" aria-controls="${cId}"><i class="fas fa-user-tie fa-fw me-2"></i> ${
          rData.title
        }</button></h2><div id="${cId}" class="accordion-collapse collapse" data-bs-parent="#rolesAccordionInner"><div class="accordion-body"><ul>${rData.duties
          .map(
            (d) =>
              `<li><i class="fas fa-check-circle text-success me-2"></i>${d}</li>`
          )
          .join("")}</ul></div></div></div>`;
        i++;
      }
    });
    html += "</div>";
    $dutiesDisplay.html(
      html ||
        `<p class="text-warning text-center mt-3">No specific roles listed for ${catData.title}.</p>`
    );
  });

  // --- Populate Contributors ---
  const $contribList = $("#contributors-list").empty(); // Clear spinner
  if (typeof contributors === "object" && contributors.length > 0) {
    contributors.forEach((p) => {
      const imgHtml = p.image
        ? `<img src="${p.image}" class="contributor-img" alt="${p.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
        : "";
      const placeholder = `<div class="contributor-img-placeholder" style="${
        p.image ? "display:none;" : "display:flex;"
      }" title="${
        p.name
      }"><i class="fas fa-user fa-2x text-secondary"></i></div>`;
      const link =
        p.link && p.link !== "#"
          ? `<a href="${p.link}" target="_blank" class="btn btn-sm btn-outline-primary mt-2 align-self-center">Learn More <i class="fas fa-external-link-alt fa-xs"></i></a>`
          : "";
      $contribList.append(
        `<div class="col-md-6 col-lg-4 d-flex"><div class="card h-100 text-center contributor-card mb-4 w-100 shadow-sm">${imgHtml}${placeholder}<div class="card-body d-flex flex-column pt-2"><h5 class="card-title mt-2 mb-1">${p.name}</h5><p class="card-text flex-grow-1 small text-muted">${p.description}</p>${link}</div></div></div>`
      );
    });
  } else $contribList.html('<p class="text-center text-muted">Contributors data not available.</p>');

  // --- Footer Year ---
  $("#current-year").text(new Date().getFullYear());

  // --- Role Suggestion Modal Logic ---
  $("#submitSuggestionBtn").on("click", function () {
    const form = $("#suggestRoleForm")[0];
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const category = $("#suggestCategory").val().trim(),
      role = $("#suggestedRole").val().trim(),
      duties = $("#suggestedDuties").val().trim();
    console.log("Suggestion:", { category, role, duties }); // In real app, send to backend
    bootstrap.Modal.getInstance($("#suggestRoleModal")[0])?.hide();
    form.reset();
    // Consider adding a small success message alert/toast
  });

  // --- Activate Bootstrap Tooltips (Global) ---
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map((el) => new bootstrap.Tooltip(el));
}); // End (document).ready()
